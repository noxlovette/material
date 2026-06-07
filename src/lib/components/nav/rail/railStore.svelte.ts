let _collapsed = $state(true);

export const railStore = {
  get collapsed() {
    return _collapsed;
  },
  set collapsed(v: boolean) {
    _collapsed = v;
  }
};
