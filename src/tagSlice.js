export const createTagSlice = (set) => ({
  tags: [],
  initializeTags: (tags) => set(() => ({ tags: tags })),
});
