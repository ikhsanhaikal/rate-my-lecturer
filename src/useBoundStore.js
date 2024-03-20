import { create } from "zustand";
import { createAuthSlice } from "./authSlice";
import { createTagSlice } from "./authSlice";
export const useBoundStore = create((...a) => ({
  ...createAuthSlice(...a),
  ...createTagSlice(...a),
}));
