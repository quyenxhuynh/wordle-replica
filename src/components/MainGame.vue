<script>
import { answers } from "@/components/Words/allWords.js";
import { useCurrentGameStore } from "@/stores/currentGame.js";
import { useSettingsStore } from "@/stores/modes";
import { storeToRefs } from "pinia";

export default {
  data() {
    return {
      wordOfDay: undefined,
    };
  },

  setup() {
    const store = useCurrentGameStore();
    const {
      continueGame,
      currentGuess,
      guessCount,
      guesses,
      validGuesses,
      letterCount,
      lastWord,
      wordOfDay,
      alert,
    } = storeToRefs(store);
    const {
      tryGuess,
      validateGuess,
      resetCurrentGame,
      resetLetterCount,
      sendAlert,
      resetAlert,
    } = store;

    const modes = useSettingsStore();
    const { endlessMode } = storeToRefs(modes);

    return {
      continueGame,
      currentGuess,
      guessCount,
      guesses,
      validGuesses,
      letterCount,
      lastWord,
      wordOfDay,
      alert,
      endlessMode,
      tryGuess,
      validateGuess,
      resetCurrentGame,
      resetLetterCount,
      sendAlert,
      resetAlert,
    };
  },
  methods: {
    getWordOfDay() {
      if (this.endlessMode) {
        this.wordOfDay = answers[Math.floor(Math.random() * answers.length)];
      } else {
        let now = new Date(Date.now());
        let formula =
          now.getYear() * 1000 +
          Math.PI / now.getMonth() +
          now.getDay() -
          Math.E ** now.getDate() / now.getFullYear();
        answers[Math.floor(formula % answers.length)];
      }

      if (this.lastWord !== this.wordOfDay) {
        this.resetCurrentGame();
      }

      for (let letter = 0; letter < this.wordOfDay.length; letter++) {
        let arrayPos = this.wordOfDay.charCodeAt(letter) - "a".charCodeAt(0);
        this.letterCount[arrayPos]++;
      }
    },
    resetCurrentGuess() {
      this.currentGuess = "";
    },
    isLetterOrBackspace(e) {
      if (!this.continueGame) e.preventDefault();
      let char = String.fromCharCode(e.keyCode);
      if (/^[A-Za-z]+$/.test(char) || e.keyCode === 8) {
        return true;
      } else if (e.ctrlKey && e.keyCode) return true;
      else if (e.metaKey && e.keyCode) return true;
      else {
        e.preventDefault();
      }
    },
    newGame() {
      this.getWordOfDay();
      this.resetCurrentGuess();
    },
    getSolution() {
      this.sendAlert(`The solution is: ${this.wordOfDay}`);
      this.resetAlert();
    },
    getHint() {
      let randomIndex = Math.floor(Math.random() * 5);
      this.sendAlert(
        `The solution contains the letter "${this.wordOfDay[
          randomIndex
        ].toUpperCase()}"`
      );
      this.resetAlert();
    },
  },

  mounted() {
    this.getWordOfDay();
    this.resetCurrentGuess();
  },
};
</script>

<template>
  <div v-if="this.alert" class="alert" role="alert">
    {{ this.alert }}
  </div>

  <!-- <h2>correctAnswer: {{ this.wordOfDay }}</h2>
  <h2>made guesses: {{ validGuesses }}</h2>
  <h4>{{ continueGame }}</h4>
  <li v-for="(row, _ignore) in guesses">
    <span v-for="(letter, _ignore) in row"> {{ letter }}</span>
  </li>
  <p>Guess: {{ currentGuess }} - Guesses: {{ guessCount }}</p> -->
  <input
    id="userInput"
    class="userInput"
    v-model="currentGuess"
    autoFocus="true"
    maxlength="5"
    type="text"
    spellcheck="false"
    autocomplete="false"
    @keyup.enter="tryGuess"
    @keydown="isLetterOrBackspace($event)"
    onblur="this.focus()"
  />

  <br />
  <br />

  <div class="container">
    <div class="game-grid">
      <span class="game-row" v-for="(row, rowIndex) in guesses">
        <div class="game-col game-square" v-for="(letter, letterIndex) in row">
          <div
            class="game-square game-current-guess"
            v-if="
              letter['state'] === 0 &&
              guessCount === rowIndex &&
              letterIndex < currentGuess.length
            "
          >
            <span class="game-letter game-letter-current no-select">
              {{ currentGuess[letterIndex] }}
            </span>
          </div>
          <div
            class="game-square game-bg-default"
            v-else-if="letter['state'] === 0"
          ></div>
          <div
            class="game-square game-bg-incorrect"
            v-else-if="letter['state'] === 1"
          >
            <span class="game-letter no-select">{{ letter["letter"] }}</span>
          </div>
          <div
            class="game-square game-bg-semicorrect"
            v-else-if="letter['state'] === 2"
          >
            <span class="game-letter no-select">{{ letter["letter"] }}</span>
          </div>
          <div
            class="game-square game-bg-correct no-select"
            v-else-if="letter['state'] === 3"
          >
            <span class="game-letter no-select">{{ letter["letter"] }}</span>
          </div>
        </div>
      </span>
      <div class="d-flex flex-row-reverse mt-2">
        <button id="hint" class="btn-wordle-outline" @click="getHint">
          Hint
        </button>
        <button id="solution" class="btn-wordle-outline" @click="getSolution">
          Solution
        </button>
      </div>
    </div>
    <div class="d-flex flex-row-reverse bottom-right-sticky">
      <button
        v-if="this.endlessMode"
        class="btn-wordle-outline"
        @click="newGame"
      >
        Next Game
      </button>
    </div>
  </div>
</template>

<style scoped>
.userInput,
.userInput:focus {
  background-color: transparent;
  color: transparent;
  border: none;
  outline-width: 0;
  pointer-events: none;
}

.game-grid {
  /* background-color: aquamarine; */
  display: flex;
  flex-direction: column;
  margin: 2em 29em;
}

.game-square {
  flex-grow: 1;
  flex-basis: 0;
  min-width: 0;
  aspect-ratio: 1;
  align-items: center;
  display: flex;
  justify-content: center;
}

.game-current-guess {
  border: 2px solid var(--grid-current);
}

.game-bg-default {
  border: 2px solid var(--grid-color);
  background-color: transparent;
}

.game-bg-correct {
  background-color: var(--primary);
}

.game-bg-semicorrect {
  background-color: var(--secondary);
}

.game-bg-incorrect {
  background-color: var(--tertiary);
}

.game-row {
  display: flex;
}

.game-col {
  margin: 0.15rem;
}

.bg-default {
  /* background-color: red; */
  border: 1px solid var(--title-color-hover);
}

.bottom-left-sticky {
  position: absolute;
  left: 5%;
  bottom: 5%;
}

.bottom-right-sticky {
  position: absolute;
  right: 5%;
  bottom: 5%;
}

#solution {
  margin: 0 1rem;
}
</style>
