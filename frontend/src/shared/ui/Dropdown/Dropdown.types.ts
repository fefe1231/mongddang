import { ConnectedUser } from '@/entities/user/model';

export interface DropdownProps {
  options: ConnectedUser[];
  onSelect: (value: string) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  buttonLabel: string;
  selectedValue?: string;
  disabled: boolean;
}
