import type { Checkbox, WithoutChildrenOrChild } from 'bits-ui';

export type CheckboxProps = WithoutChildrenOrChild<Checkbox.RootProps> & {
  labelText: string;
  labelRef?: HTMLLabelElement;
} & {
  disabled?: boolean;
  error?: boolean;
};
