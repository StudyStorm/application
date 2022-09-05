export type FieldError = {
  rule: string;
  field: string;
  message: string;
};
export type FormError = {
  errors: Array<FieldError>;
};
