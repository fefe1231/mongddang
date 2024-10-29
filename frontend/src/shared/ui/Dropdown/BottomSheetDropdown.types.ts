export interface BottomSheetDropdownProps {
  options: string[];
  onSelect: (value: string) => void;
  isOpen: boolean;
  onClose: () => void;
  selectedValue?: string;
}