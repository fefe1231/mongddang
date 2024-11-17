import { create } from 'zustand';

type MedicationType = {
  timeFields: { id: number }[];
  addTimeField: () => void;
  deleteTimeField: () => void;
};

export const useMedicationTimeStore = create<MedicationType>((set) => ({
  timeFields: [{ id: 0 }],
  addTimeField: () => {
    set((state) => ({
      timeFields: [...state.timeFields, { id: state.timeFields.length + 1 }],
    }));
  },
  deleteTimeField: () => {
    set((state) => ({
      timeFields:
        state.timeFields.length > 1
          ? state.timeFields.slice(0, -1)
          : state.timeFields,
    }));
  },
}));
