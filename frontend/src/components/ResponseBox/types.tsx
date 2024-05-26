export type SuccessResponse = {
  tintaNecessaria: string;
  latasSugeridas: Record<string, number>;
};

export type ErrorResponse = {
  message: string;
};

export type ResponseBoxProps = {
  responseData: SuccessResponse | ErrorResponse;
  onClose: () => void;
};
