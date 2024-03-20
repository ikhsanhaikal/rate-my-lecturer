export const createAuthSlice = (set) => ({
  user: null,
  login: (user) => set(() => ({ user: user })),
  logout: () => set(() => ({ user: null })),
});
