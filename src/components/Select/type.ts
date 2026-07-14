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
  /** Extract a short label for compact multi mode (e.g. first name). If not set, falls back to getOptionLabel. */
  getCompactLabel?: (option: any) => string;
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  loading?: boolean;
  /** Enable search feature */
  search?: boolean;
  error?: string | any;
  /** Enable compact display for multi-select: 1→name, >1→"Name... (+N)" with tag chips below */
  compactMulti?: boolean;
  /** Called when user clicks X on a tag chip in compactMulti mode */
  onRemoveItem?: (item: any) => void;
}
