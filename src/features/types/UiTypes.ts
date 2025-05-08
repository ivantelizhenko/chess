export type StateType = {
  isOpenModalWindow: ModalWindowType;
};

export type ModalWindowType =
  | 'promotion'
  | 'gameOver'
  | 'surrender'
  | 'offerDrawSend'
  | 'offerDrawGet'
  | null;
