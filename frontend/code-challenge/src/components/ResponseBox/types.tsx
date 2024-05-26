export type ResponseBoxProps = {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
};
