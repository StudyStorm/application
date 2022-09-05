export type FieldError = {
  rule: string;
  field: string;
  message: string;
};

export type FormError = {
  errors: Array<FieldError>;
};

export type Pagination<T> = {
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    first_page: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string;
    previous_page_url: string;
  };
  data: T[];
};
