import { create } from "zustand";

const useThemeStore = create((set) => ({
  theme: "light",
  mainClass: "",
  setTheme: (theme) => set({ theme }),
  setMainClass: (mainClass) => set({ mainClass }),
  toggleTheme: () => set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}));

export default useThemeStore;
