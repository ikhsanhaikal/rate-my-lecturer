import { create } from "zustand";
import { createAuthSlice } from "./authSlice";
import { createTagSlice } from "./tagSlice";

const createFilterSlice = (set) => ({
  traits: null,
  subjects: null,
  gender: null,
  setGender: (value) =>
    set(() => ({ gender: value !== null ? [value] : null })),
  setSubjects: (value) =>
    set(() => ({
      subjects: value !== null ? value.map((id) => parseInt(id)) : null,
    })),
  setTraits: (value) =>
    set(() => ({
      traits: value !== null ? value.map((id) => parseInt(id)) : null,
    })),
});

export const useBoundStore = create((...a) => ({
  ...createAuthSlice(...a),
  ...createTagSlice(...a),
  ...createFilterSlice(...a),
}));
