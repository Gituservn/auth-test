import create from "zustand";

const useUserStore = create(set => ({
  user: {},
  updateUser: newUser => set(state => ({ user: { ...newUser } })),
}));

export default useUserStore;
