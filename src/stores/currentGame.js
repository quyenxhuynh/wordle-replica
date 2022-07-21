import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { answers } from "@/components/words/allWords.js";
import { LetterState } from "@/components/words/wordState.ts";
import { useStatisticsStore } from "./stats.js";

export const useCurrentGameStore = defineStore({
  id: "currentGame",
  state: () => {
    return {
      continueGame: useStorage("continueGame", true),
      wordOfDay: useStorage("wordOfDay", ""),
      lastWord: useStorage("lastWord", ""),
      currentGuess: useStorage("currentGuess", ""),
      guessCount: useStorage("guessCount", 0),
      guesses: useStorage(
        "guesses",
        Array.from({ length: 6 }, () =>
          Array.from({ length: 5 }, () => ({
            letter: "",
            state: 0,
          }))
        )
      ),
      validGuesses: useStorage("validGuesses", []),
      letterCount: useStorage(
        "letterCount",
        Array.from({ length: 26 }, () => 0)
      ),
      alert: useStorage("alert", ""),
    };
  },
  actions: {
    tryGuess() {
      const store = useStatisticsStore();
      if (this.continueGame) {
        if (this.validateGuess()) {
          let tempLetterCount = this.letterCount;
          for (let letterIndex = 0; letterIndex < 5; letterIndex++) {
            // get letter
            this.guesses[this.guessCount][letterIndex]["letter"] =
              this.currentGuess[letterIndex];

            let arrayPos =
              this.currentGuess.charCodeAt(letterIndex) - "a".charCodeAt(0);

            // get state
            if (this.currentGuess[letterIndex] == this.wordOfDay[letterIndex]) {
              this.guesses[this.guessCount][letterIndex]["state"] =
                LetterState.CORRECT;

              this.letterCount[arrayPos]--;
              tempLetterCount[arrayPos]--;
            } else if (
              this.wordOfDay.includes(this.currentGuess[letterIndex]) &&
              tempLetterCount[arrayPos] > 0
            ) {
              this.guesses[this.guessCount][letterIndex]["state"] =
                LetterState.CONTAINS;

              tempLetterCount[arrayPos]--;
            } else {
              this.guesses[this.guessCount][letterIndex]["state"] =
                LetterState.INCORRECT;
            }
          }

          this.guessCount++;
          this.validGuesses.push(this.currentGuess);
          if (this.currentGuess === this.wordOfDay || this.guessCount == 6) {
            this.continueGame = false;
          }
          if (this.guessCount == 6 && this.currentGuess !== this.wordOfDay) {
            this.continueGame = false;
            this.guessCount = -1;
          }

          if (!this.continueGame) {
            store.updateStats(this.guessCount);
            $("#statisticsPopUp").modal("show");
          }

          this.currentGuess = "";
          this.lastWord = this.wordOfDay;
        }

        this.resetAlert();
      }
    },

    sendAlert(msg) {
      this.alert = msg;
    },

    resetAlert() {
      setTimeout(() => (this.alert = ""), 3 * 1000);
    },

    validateGuess() {
      if (this.currentGuess.length !== 5) {
        this.sendAlert(
          `"${this.currentGuess.toUpperCase()}" does not have enough letters`
        );
        return false;
      }
      if (!answers.includes(this.currentGuess)) {
        this.sendAlert(
          `"${this.currentGuess.toUpperCase()}" is not in the word list`
        );
        return false;
      }
      // if (this.validGuesses.includes(this.currentGuess)) {
      //   console.log(`Already guessed the word "${this.currentGuess}".`);
      //   return false;
      // }
      return true;
    },

    resetLetterCount() {
      this.letterCount = Array.from({ length: 26 }, () => 0);
    },

    resetCurrentGame() {
      this.continueGame = true;
      this.currentGuess = "";
      this.guessCount = 0;
      this.guesses = Array.from({ length: 6 }, () =>
        Array.from({ length: 5 }, () => ({
          letter: LetterState.UNDEFINED,
          state: 0,
        }))
      );
      this.validGuesses = [];
      this.letterCount = Array.from({ length: 26 }, () => 0);
    },
  },
});
