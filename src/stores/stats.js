import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useStatisticsStore = defineStore({
  id: "statistics",
  state: () => {
    return {
      gamesWon: useStorage("gamesWon", 0),
      gamesPlayed: useStorage("gamesPlayed", 0),
      currentStreak: useStorage("currentStreak", 0),
      maxStreak: useStorage("maxStreak", 0),
      maxGuesses: useStorage("maxGuesses", 0),
      guessDistribution: useStorage("guessDistribution", {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
      }),
    };
  },
  actions: {
    updateStats(guessCount) {
      if (guessCount >= 1 && guessCount <= 6) {
        this.gamesWon++;
        this.currentStreak++;
        this.maxStreak = Math.max(this.currentStreak, this.maxStreak);
        this.guessDistribution[guessCount]++;
        this.maxGuesses = Math.max(
          this.guessDistribution[guessCount],
          this.maxGuesses
        );
      } else {
        this.currentStreak = 0;
      }
      this.gamesPlayed++;
    },

    resetStats() {
      this.gamesPlayed = 0;
      this.gamesWon = 0;
      this.currentStreak = 0;
      this.maxStreak = 0;
      this.guessDistribution = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
      };
    },
  },
});
