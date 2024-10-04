import {
  ChangeEvent,
  FocusEvent,
  forwardRef,
  InputHTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Input } from "@s3react/core/Input";
import { InputWrapper } from "@s3react/core/InputWrapper";
import { Dropdown, DropdownOption } from "@s3react/core/Dropdown";
import clsx from "clsx";

export type SelectOption = DropdownOption;

export interface SelectProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  options: SelectOption[];
  error?: string;
  message?: string;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  label?: ReactNode;
  asterisk?: ReactNode;
  maxHeight?: number | string;
  offset?: number;
  asModal?: boolean;
  dropdownIcon?: ReactNode;
  separator?: boolean;
  searchable?: boolean;
  closeOnSelect?: boolean;
  emptyOption?: ReactNode;
  clearable?: boolean;
  creatable?: boolean;
  clearIcon?: ReactNode;
  filterOption?(option: SelectOption, query: string): boolean;
  renderOption?(option: SelectOption): ReactElement;
  onChange?(e: SyntheticEvent<HTMLInputElement>, option?: SelectOption): void;
  onSearch?(query: string): void;
  componentClassName?: {
    wrapper?: string;
    input?: string;
    leftSection?: string;
    rightSection?: string;
    label?: string;
    labelInner?: string;
    error?: string;
    message?: string;
    asterisk?: string;
    dropdown?: string;
    dropdownInner?: string;
    dropdownContent?: string;
    menu: string;
    menuModal?: string;
    menuItem?: string;
    menuItemDisabled?: string;
    menuItemActive?: string;
    modal?: string;
    modalBackdrop?: string;
    modalBackdropOpened?: string;
    modalContent?: string;
    modalContentOpened?: string;
    dropdownIconWrapper?: string;
    dropdownIcon?: string;
    separator?: string;
    emptyOption?: string;
    clear?: string;
    clearIcon?: string;
  };
}

export const Select = forwardRef<HTMLInputElement, SelectProps>(function Select(props, ref) {
  const {
    options,
    error,
    message,
    leftSection,
    rightSection,
    id,
    required,
    label,
    asterisk = "*",
    autoComplete = "off",
    value = "",
    className,
    maxHeight,
    offset,
    asModal = true,
    dropdownIcon,
    componentClassName,
    separator,
    searchable,
    readOnly,
    closeOnSelect,
    emptyOption,
    clearable,
    creatable,
    clearIcon,
    onFocus,
    onChange,
    renderOption,
    filterOption,
    onSearch,
    ...rest
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [query, setQuery] = useState("");
  const anchorRef = useRef<HTMLDivElement>(null);
  const memorizedOptions = useMemo(() => options, [options]);

  const filteredOptions = useMemo(() => {
    if (!query?.trim()) return memorizedOptions;
    return memorizedOptions.filter((option) => {
      if (filterOption) {
        return filterOption(option, query);
      }

      return option.label.toLowerCase().includes(query.trim().toLowerCase());
    });
  }, [memorizedOptions, query, filterOption]);

  const currentOption = useMemo(() => options.find((o) => o.value === currentValue), [currentValue, options]);
  const selectedValue = useMemo(() => {
    if (isOpen) {
      return query || currentValue;
    }

    if (creatable && !currentOption) {
      return currentValue;
    }

    return currentOption?.label ?? "";
  }, [currentOption, currentValue, query, creatable, isOpen]);

  useEffect(() => {
    value === currentValue || setCurrentValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClickAdronment = (_: MouseEvent<HTMLDivElement>, position: "left" | "right") => {
    position === "right" && handleOpen();
  };

  const handleSelect = (e: MouseEvent<HTMLInputElement>, option: SelectOption) => {
    setQuery("");
    (e.target as HTMLInputElement).value = option.value as string;
    setCurrentValue(option.value);
    onChange?.(e as SyntheticEvent<HTMLInputElement>, option);
  };

  const handleClose = () => {
    if (creatable) {
      const newValue = query.trim() || currentValue;
      setCurrentValue(newValue);
      onChange?.({
        target: {
          value: newValue,
        },
      } as unknown as SyntheticEvent<HTMLInputElement>);
    }
    setQuery("");
    setIsOpen(false);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (!readOnly && searchable && !query && !!currentValue) {
      setQuery((currentOption?.label ?? (creatable ? currentValue : "")) as string);
    }

    onFocus?.(e);
  };

  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setQuery("");
  };

  const emptyComponent = (
    <div
      className={clsx(
        "h-16 w-full flex items-center justify-center text-sm text-gray-400",
        componentClassName?.emptyOption
      )}
    >
      {emptyOption ?? "No results found"}
    </div>
  );

  const hasRightSection = (clearable && !!query) || separator || dropdownIcon !== false || !!rightSection;

  return (
    <InputWrapper
      {...{
        label,
        required,
        htmlFor: id,
        asterisk,
        error,
        message,
        className,
        componentClassName: {
          label: componentClassName?.label,
          labelInner: componentClassName?.labelInner,
          asterisk: componentClassName?.asterisk,
          error: componentClassName?.error,
          message: componentClassName?.message,
        },
      }}
    >
      <Dropdown
        {...{
          isOpen,
          onOpen: handleOpen,
          onClose: handleClose,
          onSelect: handleSelect,
          options: filteredOptions,
          asModal,
          maxHeight,
          offset,
          anchorRef,
          className: componentClassName?.dropdown,
          closeOnSelect,
          value: selectedValue as string,
          emptyOption: emptyComponent,
          componentClassName: {
            inner: componentClassName?.dropdownInner,
            content: componentClassName?.dropdownContent,
            menu: componentClassName?.menu,
            menuModal: componentClassName?.menuModal,
            menuItem: clsx("", componentClassName?.menuItem),
            menuItemDisabled: componentClassName?.menuItemDisabled,
            modal: componentClassName?.modal,
            modalBackdrop: componentClassName?.modalBackdrop,
            modalBackdropOpened: componentClassName?.modalBackdropOpened,
            modalContent: componentClassName?.modalContent,
            modalContentOpened: componentClassName?.modalContentOpened,
            menuItemActive: componentClassName?.menuItemActive,
          },
        }}
      >
        <Input
          {...rest}
          ref={ref}
          rootRef={anchorRef}
          readOnly={!searchable || readOnly}
          onFocus={handleFocus}
          onClickAdronment={handleClickAdronment}
          value={selectedValue}
          onChange={handleChange}
          componentClassName={{
            leftSection: componentClassName?.leftSection,
            rightSection: componentClassName?.rightSection,
            input: componentClassName?.input,
          }}
          rightSection={
            hasRightSection ? (
              <>
                {clearable && !!query && (
                  <button
                    type="button"
                    className={clsx(
                      "w-5 h-5 min-w-5 mr-0.5 flex items-center justify-center bg-transparent rounded-full transition-all hover:bg-gray-300/80",
                      componentClassName?.clear
                    )}
                    onClick={handleClear}
                  >
                    {clearIcon !== undefined ? (
                      clearIcon
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={componentClassName?.clearIcon}
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    )}
                  </button>
                )}
                {separator && (
                  <span
                    className={clsx(
                      "inline-block h-1/2 min-h-[20px] mr-2 border-r border-gray-300",
                      componentClassName?.separator
                    )}
                  />
                )}
                {dropdownIcon !== false && (
                  <span className={clsx("inline-flex items-center h-full", componentClassName?.dropdownIconWrapper)}>
                    {dropdownIcon !== undefined ? (
                      dropdownIcon
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={componentClassName?.dropdownIcon}
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M6 9l6 6l6 -6"></path>
                      </svg>
                    )}
                  </span>
                )}
                {rightSection}
              </>
            ) : undefined
          }
        />
      </Dropdown>
    </InputWrapper>
  );
});
