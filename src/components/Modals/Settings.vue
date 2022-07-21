<script>
import { useSettingsStore } from "@/stores/modes";
import { useStatisticsStore } from "@/stores/stats";
import { useCurrentGameStore } from "@/stores/currentGame";

export default {
  data() {
    return {
      endlessMode: false,
      hardMode: false,
      darkTheme: false,
      highContrastMode: false,
    };
  },

  mounted() {
    const modes = useSettingsStore();
    this.endlessMode = modes.endlessMode;
    this.hardMode = modes.hardMode;
    this.darkTheme = modes.darkTheme;
    this.highContrastMode = modes.highContrastMode;
  },

  methods: {
    toggleEndlessMode() {
      const modes = useSettingsStore();
      modes.toggleEndlessMode();
      this.endlessMode = modes.endlessMode;
    },
    toggleHardMode() {
      const modes = useSettingsStore();
      modes.toggleHardMode();
      this.hardMode = modes.hardMode;
    },
    toggleDarkTheme() {
      const modes = useSettingsStore();
      modes.toggleDarkTheme();
      this.darkTheme = modes.darkTheme;

      if (this.darkTheme) {
        document.documentElement.setAttribute("theme", "dark");
      } else {
        document.documentElement.setAttribute("theme", "light");
      }
    },
    toggleHighContrastMode() {
      const modes = useSettingsStore();
      modes.toggleHighContrastMode();
      this.highContrastMode = modes.highContrastMode;

      if (this.highContrastMode) {
        document.documentElement.setAttribute("high-contrast", "on");
      } else {
        document.documentElement.setAttribute("high-contrast", "off");
      }
    },
    resetFocus() {
      $("#userInput").trigger("focus");
    },
    hardReset() {
      const settings = useStatisticsStore();
      settings.resetStats();
      const game = useCurrentGameStore();
      game.resetCurrentGame();
      $("#settingsPopUp").modal("hide");
    },
  },
};
</script>

<template>
  <button
    type="button"
    class="btn-wordle"
    data-bs-toggle="modal"
    data-bs-target="#settingsPopUp"
    @focus="resetFocus"
  >
    <svg
      width="30"
      height="30"
      fill="currentColor"
      class="bi bi-gear-fill"
      viewBox="0 0 16 16"
    >
      <path
        d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"
      />
    </svg>
  </button>

  <div
    class="modal fade"
    id="settingsPopUp"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    @blur="resetFocus"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="d-flex justify-content-center">
            <h5 class="modal-title" id="instructionsPopUpLabel">SETTINGS</h5>
          </div>

          <hr />

          <div class="d-flex justify-content-between">
            <div>Endless Mode</div>
            <div>
              <button
                class="btn-wordle-toggle toggle-on"
                v-if="this.endlessMode"
                @click="toggleEndlessMode"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-toggle-on"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                  />
                </svg>
              </button>
              <button
                class="btn-wordle-toggle"
                v-else
                @click="toggleEndlessMode"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-toggle-off"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <hr />
          <!-- <div class="modal-body">
          Hard Mode
          <button
            class="btn-wordle-toggle toggle-on"
            v-if="this.hardMode"
            @click="toggleHardMode"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-toggle-on"
              viewBox="0 0 16 16"
            >
              <path
                d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
              />
            </svg>
          </button>
          <button
            class="btn-wordle-toggle hard-mode-toggle"
            v-else
            @click="toggleHardMode"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-toggle-off"
              viewBox="0 0 16 16"
            >
              <path
                d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z"
              />
            </svg>
          </button>
        </div>
        <hr /> -->
          <div class="d-flex justify-content-between">
            <div>Dark Theme</div>
            <div>
              <button
                class="btn-wordle-toggle toggle-on"
                v-if="this.darkTheme"
                @click="toggleDarkTheme"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-toggle-on"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                  />
                </svg>
              </button>
              <button class="btn-wordle-toggle" v-else @click="toggleDarkTheme">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-toggle-off"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <hr />

          <div class="d-flex justify-content-between align-items-center">
            <div>
              <div>High Contrast Mode</div>
              <div class="subtext">For improved color vision</div>
            </div>
            <div>
              <button
                class="btn-wordle-toggle toggle-on"
                v-if="this.highContrastMode"
                @click="toggleHighContrastMode"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-toggle-on"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                  />
                </svg>
              </button>
              <button
                class="btn-wordle-toggle"
                v-else
                @click="toggleHighContrastMode"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-toggle-off"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <hr />
          <div class="d-flex flex-row-reverse">
            <button class="btn btn-danger" @click="hardReset">Reset</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.subtext {
  font-size: small;
  color: var(--grid-current);
}
</style>
