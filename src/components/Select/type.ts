import React from "react";

export type Options<TData> = TData extends Record<string, any> ? TData : never;

export interface SelectProps<T> {
  options?: Options<T>[];
  value?: Options<T>[] | string | number | boolean | any;
  onChange?: (selected: any) => void;
  multiple?: boolean;
  name?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  getOptionLabel?: keyof Options<T> | ((option: any) => React.ReactNode);
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: string | any;
}
