import { create } from 'zustand';

type MedicationStandardType = {
  standardFields: { id: number }[];
  addStandardField: () => void;
  deleteStandardField: () => void;
};

export const useMedicationStandardStore = create<MedicationStandardType>(
  (set) => ({
    standardFields: [{ id: 0 }],
    addStandardField: () => {
      set((state) => ({
        standardFields: [
          ...state.standardFields,
          { id: state.standardFields.length + 1 },
        ],
      }));
    },
    deleteStandardField: () => {
      set((state) => ({
        standardFields:
          state.standardFields.length > 1
            ? state.standardFields.slice(0, -1)
            : state.standardFields,
      }));
    },
  })
);
