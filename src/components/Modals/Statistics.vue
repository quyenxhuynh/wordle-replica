<script>
import { useStatisticsStore } from "@/stores/stats";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const store = useStatisticsStore();
    const {
      gamesWon,
      gamesPlayed,
      currentStreak,
      maxStreak,
      maxGuesses,
      guessDistribution,
    } = storeToRefs(store);

    return {
      gamesWon,
      gamesPlayed,
      currentStreak,
      maxStreak,
      maxGuesses,
      guessDistribution,
    };
  },
  methods: {
    resetFocus() {
      $("#userInput").trigger("focus");
    },
  },
};
</script>

<template>
  <button
    type="button"
    class="btn-wordle"
    data-bs-toggle="modal"
    data-bs-target="#statisticsPopUp"
    @focus="resetFocus"
  >
    <svg
      width="25"
      height="25"
      fill="currentColor"
      class="bi bi-bar-chart"
      viewBox="0 0 16 16"
    >
      <path
        d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"
      />
    </svg>
  </button>

  <div
    class="modal fade"
    id="statisticsPopUp"
    tabindex="-1"
    aria-labelledby="statisticsPopUpLabel"
    aria-hidden="true"
    @blur="resetFocus"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="d-flex justify-content-center">
            <h5 class="modal-title" id="statisticsPopUpLabel">STATISTICS</h5>
          </div>
          <hr />
          <div class="d-flex justify-content-center">
            <div class="d-flex flex-column align-items-center text-center mx-4">
              <div class="stat-num xl">
                {{
                  gamesPlayed === 0
                    ? 100
                    : Math.floor((gamesWon * 100) / gamesPlayed)
                }}%
              </div>
              <div class="stat-name">Win Percentage</div>
            </div>
          </div>
          <hr />
          <div class="d-flex justify-content-center">
            <div class="d-flex flex-column align-items-center text-center mx-4">
              <div class="stat-num">{{ gamesWon }}</div>
              <div class="stat-name">Won</div>
            </div>
            <div class="d-flex flex-column align-items-center text-center mx-4">
              <div class="stat-num">{{ gamesPlayed }}</div>
              <div class="stat-name">Played</div>
            </div>
            <div class="d-flex flex-column align-items-center text-center mx-4">
              <div class="stat-num">{{ currentStreak }}</div>
              <div class="stat-name">
                Current <br />
                Streak
              </div>
            </div>
            <div class="d-flex flex-column align-items-center text-center mx-4">
              <div class="stat-num">{{ maxStreak }}</div>
              <div class="stat-name">
                Max <br />
                Streak
              </div>
            </div>
          </div>

          <hr />
          <div>Guess Distribution</div>
          <div class="progress">
            <div
              class="progress-bar bg-red"
              role="progressbar"
              :style="`width: ${Math.floor(
                (guessDistribution['1'] * 100) / maxGuesses
              )}%`"
              :aria-valuenow="gamesPlayed['1']"
              aria-valuemin="0"
              :aria-valuemax="maxGuesses"
            ></div>
          </div>
          <div class="progress">
            <div
              class="progress-bar bg-orange"
              role="progressbar"
              :style="`width: ${Math.floor(
                (guessDistribution['2'] * 100) / maxGuesses
              )}%`"
              :aria-valuenow="gamesPlayed['2']"
              aria-valuemin="0"
              :aria-valuemax="maxGuesses"
            ></div>
          </div>
          <div class="progress">
            <div
              class="progress-bar bg-yellow"
              role="progressbar"
              :style="`width: ${Math.floor(
                (guessDistribution['3'] * 100) / maxGuesses
              )}%`"
              :aria-valuenow="gamesPlayed['3']"
              aria-valuemin="0"
              :aria-valuemax="maxGuesses"
            ></div>
          </div>
          <div class="progress">
            <div
              class="progress-bar bg-green"
              role="progressbar"
              :style="`width: ${Math.floor(
                (guessDistribution['4'] * 100) / maxGuesses
              )}%`"
              :aria-valuenow="gamesPlayed['4']"
              aria-valuemin="0"
              :aria-valuemax="maxGuesses"
            ></div>
          </div>
          <div class="progress">
            <div
              class="progress-bar bg-blue"
              role="progressbar"
              :style="`width: ${Math.floor(
                (guessDistribution['5'] * 100) / maxGuesses
              )}%`"
              :aria-valuenow="gamesPlayed['5']"
              aria-valuemin="0"
              :aria-valuemax="maxGuesses"
            ></div>
          </div>
          <div class="progress">
            <div
              class="progress-bar bg-purple"
              role="progressbar"
              :style="`width: ${Math.floor(
                (guessDistribution['6'] * 100) / maxGuesses
              )}%`"
              :aria-valuenow="gamesPlayed['6']"
              aria-valuemin="0"
              :aria-valuemax="maxGuesses"
            ></div>
          </div>
          <!-- {{ guessDistribution }} -->
          <!-- <div>My stats don't look right.</div> -->
        </div>
        <!-- <hr />
        <div class="modal-body">
          <div>log in info</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.stat-num {
  font-size: xx-large;
  font-weight: 500;
}

.stat-name {
  font-size: small;
}

.xl {
  font-size: 3rem;
}

.progress {
  border: 1px solid var(--grid-color);
  margin: 0.5rem 0;
}

.bg-red {
  background-color: rgb(255, 139, 139);
}

.bg-orange {
  background-color: rgb(255, 206, 116);
}

.bg-yellow {
  background-color: rgb(255, 255, 132);
}

.bg-green {
  background-color: rgb(125, 255, 125);
}

.bg-blue {
  background-color: rgb(130, 130, 255);
}

.bg-purple {
  background-color: rgb(255, 121, 255);
}
</style>
