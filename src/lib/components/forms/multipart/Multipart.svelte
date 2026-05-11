<!--
@component
@component
Multipart file upload component that supports chunked uploads for large files.
Follows Material 3 design principles for file uploaders.
-->
<script lang="ts">
  import { onDestroy } from "svelte";
  import { formatPercentage, Layer } from "$lib/utils/index.js";
  import Icon from "$lib/utils/icon/Icon.svelte";
  import ButtonIcon from "$lib/components/buttons/ButtonIcon.svelte";
  import CircularProgress from "$lib/components/progress/CircularProgress.svelte";
  import Label from "$lib/components/typography/label/Label.svelte";
  import Title from "$lib/components/typography/title/Title.svelte";
  import HStack from "$lib/components/containers/stack/HStack.svelte";
  import Dialogue from "../../containers/dialogue/Dialogue.svelte";
  import { nanoid } from "nanoid";

  type UploadStatus = "waiting" | "uploading" | "complete" | "error";

  interface PartUploadUrl {
    partNumber: number;
    url: string;
  }

  interface InitResponse {
    uploadId: string;
    fileId: string;
    s3Key: string;
    parts: PartUploadUrl[];
  }

  interface CompletedPart {
    partNumber: number;
    etag: string;
  }

  /**
   * Internal state for a single file upload.
   */
  interface FileUploadState {
    /** Unique identifier for the upload session */
    id: string;
    /** The file being uploaded */
    file: File;
    /** Upload progress tracking */
    progress: {
      /** Number of chunks uploaded */
      uploaded: number;
      /** Total number of chunks */
      total: number;
      /** Total bytes uploaded */
      bytes: number;
      /** Total size of the file in bytes */
      totalBytes: number;
      /** Percentage of upload completed (0-100) */
      percentComplete: number;
    };
    /** Current status of the upload */
    status: UploadStatus;
    /** Optional error message if status is 'error' */
    errorMessage?: string;
    /** AbortController for cancelling the upload */
    abortController?: AbortController;
  }

  let {
    taskId = null,
    folderId = null,
    readonly = false,
    initialUploads = [],
    title = "Загрузка файлов",
    label = "Область загрузки файлов",
  }: {
    /** Unique ID of the task associated with these uploads */
    taskId?: string | null;
    /** ID of the folder where files will be stored */
    folderId?: string | null;
    /** Whether the upload area is interactive */
    readonly?: boolean;
    /** Initial list of files to display */
    initialUploads?: FileUploadState[];
    /** Title displayed above the upload area */
    title?: string;
    /** Accessibility label for the upload zone */
    label?: string;
  } = $props();

  let fileUploads: FileUploadState[] = $state([...initialUploads]);
  let fileToRemove = $state<FileUploadState | null>(null);
  let fileInputRef = $state<HTMLInputElement>();

  const CHUNK_SIZE = 5 * 1024 * 1024;
  const MAX_FILE_SIZE = 99 * 1024 * 1024; // 99MB

  function calculateChunks(file: File): number {
    return Math.ceil(file.size / CHUNK_SIZE);
  }

  async function handleFileSelect(event: Event) {
    if (readonly) return;

    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const validFiles: File[] = [];
    const rejectedFiles: string[] = [];

    Array.from(input.files).forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        rejectedFiles.push(file.name);
      } else {
        validFiles.push(file);
      }
    });

    const newFiles = validFiles.map((file) => ({
      id: nanoid(),
      file,
      progress: {
        uploaded: 0,
        total: calculateChunks(file),
        bytes: 0,
        totalBytes: file.size,
        percentComplete: 0,
      },
      status: "waiting" as UploadStatus,
    }));

    fileUploads = [...fileUploads, ...newFiles];

    input.value = "";
    startUploads();
  }
  function startUploads() {
    if (readonly) return;
    fileUploads
      .filter((upload) => upload.status === "waiting")
      .forEach(uploadFile);
  }
  async function uploadFile(fileState: FileUploadState) {
    if (readonly) return;
    const { id, file } = fileState;
    let uploadIdLocal = "";
    let fileIdLocal = "";
    let s3Key = "";

    try {
      fileState.status = "uploading";
      fileState.abortController = new AbortController();

      const initResponse = await fetch("/api/multipart/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type || "application/octet-stream",
          fileSize: file.size,
          totalParts: calculateChunks(file),
          parentId: folderId,
          taskId: taskId,
        }),
      });

      if (!initResponse.ok) {
        throw new Error(
          `Failed to initialize upload: ${await initResponse.text()}`,
        );
      }

      const {
        uploadId,
        fileId,
        s3Key: fileKey,
        parts,
      } = (await initResponse.json()) as InitResponse;
      uploadIdLocal = uploadId;
      fileIdLocal = fileId;
      s3Key = fileKey;

      const signal = fileState.abortController.signal;
      const completedParts: CompletedPart[] = [];

      for (let i = 0; i < parts.length; i++) {
        if (signal.aborted) {
          throw new Error("Upload aborted by user");
        }

        const { partNumber, url } = parts[i];
        const start = (partNumber - 1) * CHUNK_SIZE;
        const end = Math.min(file.size, start + CHUNK_SIZE);
        const chunk = file.slice(start, end);

        try {
          const uploadResult = await uploadWithProgress(
            url,
            chunk,
            signal,
            (loaded) => {
              // LE FIX: calcul propre du progress
              const previousBytes = (partNumber - 1) * CHUNK_SIZE;
              fileState.progress.bytes = previousBytes + loaded;
              fileState.progress.percentComplete =
                (fileState.progress.bytes / file.size) * 100;
            },
          );

          if (!uploadResult.ok) {
            throw new Error(
              `Failed to upload part ${partNumber}: ${uploadResult.statusText}`,
            );
          }

          const etag =
            uploadResult.headers.get("ETag")?.replace(/['"]/g, "") || "";
          completedParts.push({ partNumber, etag });

          // Pas besoin de double update ici, c'est déjà fait dans le callback
          fileState.progress.uploaded = i + 1;
        } catch (error) {
          throw new Error("Failed to upload");
        }
      }

      // 3. Complete the multipart upload
      const completeResponse = await fetch(
        `/api/multipart/complete?taskId=${taskId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uploadId,
            fileId: fileIdLocal,
            s3Key,
            parts: completedParts,
          }),
        },
      );

      if (!completeResponse.ok) {
        throw new Error(
          `Failed to complete upload: ${await completeResponse.text()}`,
        );
      }

      fileState.status = "complete";
    } catch (error: any) {
      fileState.status = "error";
      fileState.errorMessage = "Ошибка загрузки";

      // Try to abort the upload on S3 if it was initialized
      if (uploadIdLocal && s3Key && fileIdLocal) {
        try {
          await fetch("/api/multipart/abort", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              uploadId: uploadIdLocal,
              fileId: fileIdLocal,
              s3Key,
            }),
          });
        } catch (abortError: any) {
          console.error(abortError);
        }
      }
    }
  }

  // Cancel an upload
  function cancelUpload(fileState: FileUploadState) {
    fileState.abortController?.abort();
    fileState.status = "error";
    fileState.errorMessage = "Загрузка отменена пользователем";
  }

  // Remove a file from the list
  function removeFile(fileState: FileUploadState) {
    // Cancel upload if in progress
    if (fileState.status === "uploading") {
      cancelUpload(fileState);
    }

    // Remove from list
    fileUploads = fileUploads.filter((upload) => upload.id !== fileState.id);
  }

  // Clean up abort controllers on component destroy
  onDestroy(() => {
    fileUploads.forEach((upload) => {
      upload.abortController?.abort();
    });
  });

  // Upload with progress tracking
  async function uploadWithProgress(
    url: string,
    data: Blob,
    signal: AbortSignal,
    onProgress: (loaded: number) => void,
  ): Promise<Response> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          onProgress(event.loaded);
        }
      });

      xhr.addEventListener("loadend", () => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            // Convert XHR response to fetch Response for consistency
            const response = new Response(xhr.response, {
              status: xhr.status,
              statusText: xhr.statusText,
              headers: new Headers({
                ETag: xhr.getResponseHeader("ETag") || "",
              }),
            });
            resolve(response);
          } else {
            reject(new Error(`HTTP error ${xhr.status}: ${xhr.statusText}`));
          }
        }
      });

      xhr.addEventListener("error", () => {
        reject(new Error("Network error occurred"));
      });

      xhr.addEventListener("abort", () => {
        reject(new Error("Upload aborted"));
      });

      // Initialize the request
      xhr.open("PUT", url);
      xhr.send(data);

      // Handle abort signal
      if (signal) {
        signal.addEventListener("abort", () => {
          xhr.abort();
        });
      }
    });
  }
  let isDragging = $state(false);

  function handleDragOver(e: DragEvent) {
    if (readonly) return;
    e.preventDefault();
    isDragging = true;
  }

  function handleDragLeave() {
    isDragging = false;
  }

  function handleDrop(e: DragEvent) {
    if (readonly) return;
    e.preventDefault();
    isDragging = false;

    if (!e.dataTransfer?.files.length) return;

    // Create a synthetic event that mimics an input change event
    const mockEvent = {
      target: {
        files: e.dataTransfer.files,
      },
    } as unknown as Event;

    // Use your existing file handling function
    handleFileSelect(mockEvent);
  }

  function triggerBrowse() {
    if (readonly) return;
    fileInputRef?.click();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (readonly) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      triggerBrowse();
    }
  }

  const statusTone = (status: UploadStatus) => {
    switch (status) {
      case "complete":
        return "bg-md-sys-color-primary-container text-md-sys-color-on-primary-container";
      case "error":
        return "bg-md-sys-color-error/12 text-md-sys-color-error";
      case "uploading":
        return "bg-md-sys-color-primary/10 text-md-sys-color-primary";
      default:
        return "bg-md-sys-color-surface-variant text-md-sys-color-on-surface-variant";
    }
  };

  const statusIcon = (status: UploadStatus) => {
    switch (status) {
      case "complete":
        return "check_circle";
      case "error":
        return "error";
      case "uploading":
        return "cloud_upload";
      default:
        return "schedule";
    }
  };

  const statusLabel = (fileState: FileUploadState) => {
    switch (fileState.status) {
      case "complete":
        return "Готово";
      case "error":
        return "Ошибка";
      case "uploading":
        return `Загрузка — ${formatPercentage(fileState.progress.percentComplete)}%`;
      default:
        return "В очереди";
    }
  };

  const progressWidth = (fileState: FileUploadState) =>
    fileState.status === "complete"
      ? 100
      : formatPercentage(fileState.progress.percentComplete);
</script>

<HStack>
  <Title>{title}</Title>
  <Label>Максимальный размер файла — 100 Мб.</Label>

  <label
    for="fileInput"
    ondragover={handleDragOver}
    ondragleave={handleDragLeave}
    ondrop={handleDrop}
    aria-label="Область загрузки файлов"
    aria-disabled={readonly}
    class={`group state-layer relative block ${readonly ? "cursor-not-allowed opacity-80" : "cursor-pointer"} focus-within:outline-md-sys-color-primary rounded-lg p-4 focus-within:outline-2 ${
      isDragging
        ? " bg-md-sys-color-primary/6 shadow-elevation-1"
        : " bg-md-sys-color-surface-container-high "
    }`}
  >
    <input
      id="fileInput"
      type="file"
      name="file"
      onchange={handleFileSelect}
      multiple
      class="sr-only"
      disabled={readonly}
    />

    <div class="flex flex-col items-center gap-3 text-center">
      <div
        class={`flex size-12 items-center justify-center rounded-full ${
          isDragging
            ? "bg-md-sys-color-primary text-md-sys-color-on-primary"
            : "bg-md-sys-color-primary-container text-md-sys-color-on-primary-container group-hover:bg-md-sys-color-primary group-hover:text-md-sys-color-on-primary"
        }`}
      >
        <Icon name="file_upload" />
      </div>

      <div class="space-y-1">
        <p class="md-sys-typescale-title-medium text-md-sys-color-on-surface">
          Перетащите файлы сюда
        </p>
        <p
          class="md-sys-typescale-body-small text-md-sys-color-on-surface-variant"
        >
          Или нажмите, чтобы выбрать их на устройстве
        </p>
      </div>
    </div>

    <Layer />
  </label>

  {#if fileUploads.length > 0}
    <div class="space-y-3">
      {#each fileUploads as fileState (fileState.id)}
        <div
          class=" bg-md-sys-color-surface-container-high flex items-center gap-3 rounded-lg p-3"
        >
          {#if fileState.status === "uploading"}
            <CircularProgress percent={progressWidth(fileState)} />
          {:else}
            <div
              class={`flex size-10 items-center justify-center rounded-full ${statusTone(fileState.status)}`}
            >
              <Icon name={statusIcon(fileState.status)} />
            </div>
          {/if}

          <div class="flex-1 space-y-1 overflow-hidden">
            <p
              class="md-sys-typescale-body-large text-md-sys-color-on-surface truncate"
            >
              {fileState.file.name}
            </p>

            {#if fileState.errorMessage}
              <p class="md-sys-typescale-body-small text-md-sys-color-error">
                {fileState.errorMessage}
              </p>
            {/if}
          </div>

          <div class="flex items-center gap-1">
            {#if fileState.status === "uploading"}
              <ButtonIcon
                variant="text"
                iconProps={{ name: "close" }}
                type="button"
                onclick={() => cancelUpload(fileState)}
              ></ButtonIcon>
            {:else}
              <ButtonIcon
                variant="text"
                iconProps={{ name: "delete" }}
                type="button"
                onclick={() => (fileToRemove = fileState)}
              ></ButtonIcon>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</HStack>

<Dialogue
  open={!!fileToRemove}
  toggle={() => (fileToRemove = null)}
  onconfirm={() => {
    if (fileToRemove) {
      removeFile(fileToRemove);
      fileToRemove = null;
    }
  }}
  confirmText="Удалить"
  headline="Удаление файла"
  supportingText={fileToRemove
    ? `Вы действительно хотите удалить файл "${fileToRemove.file.name}"?`
    : ""}
  enhance={null}
/>
