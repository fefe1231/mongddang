export interface DropdownProps {
  options: string[];
  onSelect: (value: string) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  buttonLabel: string;
  selectedValue?: string;
}
