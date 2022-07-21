import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useSettingsStore = defineStore({
  id: "settings",
  state: () => {
    return {
      endlessMode: useStorage("endlessMode", false),
      hardMode: useStorage("hardMode", false),
      darkTheme: useStorage("darkTheme", false),
      highContrastMode: useStorage("highContrastMode", false),
    };
  },
  actions: {
    toggleEndlessMode() {
      this.endlessMode = !this.endlessMode;
    },
    toggleHardMode() {
      this.hardMode = !this.hardMode;
    },
    toggleDarkTheme() {
      this.darkTheme = !this.darkTheme;
    },
    toggleHighContrastMode() {
      this.highContrastMode = !this.highContrastMode;
    },
  },
});
