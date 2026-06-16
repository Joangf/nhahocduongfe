import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";
import { SelectProps } from "./type";

/**
 *
 * @param getOptionLabel: how option is displayed, can be a key of option item or JSX element
 * @returns
 */
function Select<T>({
  options = [],
  value,
  onChange,
  multiple = false,
  name,
  label,
  placeholder = "",
  className = "",
  getOptionLabel = "label",
  fullWidth = true,
  disabled = false,
  required = false,
  error,
}: SelectProps<T>) {
  const renderSelected = (selected: any): React.ReactNode => {
    if (!selected || (Array.isArray(selected) && selected.length === 0))
      return placeholder;
    let selectedLabel;
    if (Array.isArray(selected)) {
      selectedLabel = selected.map((item: any) => {
        const itemLabel = renderOption(item, getOptionLabel);
        return (
          <span className="rounded-md bg-slate-200 px-1">{itemLabel}</span>
        );
      });
    } else {
      selectedLabel = renderOption(selected, getOptionLabel);
    }
    return selectedLabel;
  };

  function renderOption(option: any, getOptionLabel: any): React.ReactNode {
    if (typeof getOptionLabel === "string") {
      return option[getOptionLabel];
    } else if (typeof getOptionLabel === "function") {
      return getOptionLabel(option);
    } else {
      return null;
    }
  }

  return (
    <Listbox
      value={value}
      onChange={onChange}
      disabled={disabled}
      multiple={multiple}
      as="div"
      className={twMerge("relative w-72 ", fullWidth && "w-full", className)}
      name={name}
    >
      <Listbox.Label
        htmlFor={name}
        as="label"
        className="mb-1 block text-sm font-semibold leading-6 text-gray-900"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </Listbox.Label>
      <Listbox.Button className="relative min-h-[36px] w-full cursor-default rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
        <span className="flex flex-wrap gap-1">{renderSelected(value)}</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </Listbox.Button>

      <Listbox.Options className="absolute z-10 mt-1 max-h-72 w-full overflow-auto bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        {options.map((option, index) => (
          <Listbox.Option
            key={index}
            value={option}
            className={({ active, selected }) =>
              twMerge(
                "cursor-default select-none py-2 pl-3 pr-9",
                active && "bg-blue-100 text-blue-900",
                selected && "font-semibold",
              )
            }
          >
            {({ active, selected }) => (
              <div className="flex items-center">
                <span
                  className={twMerge(
                    "ml-3 block ",
                    selected && "font-semibold",
                  )}
                >
                  {renderOption(option, getOptionLabel)}
                </span>
                {selected && (
                  <span className="ml-auto">
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                )}
              </div>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
      {error && (
        <p className="absolute -bottom-6 text-sm text-red-600" id="email-error">
          {error}
        </p>
      )}
    </Listbox>
  );
}

export default Select;
