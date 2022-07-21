<script setup>
import Statistics from "./Modals/Statistics.vue";
import Instructions from "./Modals/Instructions.vue";
import Settings from "./Modals/Settings.vue";
</script>
<script>
import { useSettingsStore } from "@/stores/modes";
import { useCurrentGameStore } from "@/stores/currentGame";
export default {
  data() {
    return {
      darkTheme: undefined,
      highContrastMode: undefined,
    };
  },
  mounted() {
    const store = useSettingsStore();
    this.darkTheme = store.darkTheme;
    this.highContrastMode = store.highContrastMode;

    const storageDarkTheme = store.darkTheme;
    const storageHighContrastMode = store.highContrastMode;
    document.documentElement.setAttribute(
      "theme",
      storageDarkTheme ? "dark" : "light"
    );
    document.documentElement.setAttribute(
      "high-contrast",
      storageHighContrastMode ? "on" : "off"
    );

    const game = useCurrentGameStore();
  },
};
</script>

<template>
  <nav class="navbar navbar-wordle justify-content-between">
    <div class="container-fluid temp">
      <div class="navbar-brand wordle-brand mx-auto order-0 text-center">
        Wordle
      </div>
      <div class="modal-popups ms-auto">
        <div class="modal-icon">
          <Instructions />
        </div>
        <div class="modal-icon">
          <Statistics />
        </div>
        <div class="modal-icon">
          <Settings />
        </div>
      </div>
    </div>
  </nav>
  <!-- <nav class="navbar navbar-expand-xxl bg-dark">
    <div class="me-2">hi</div>
  </nav> -->
</template>

<style scoped>
.modal-icon {
  vertical-align: middle;
  display: inline-block;
  color: var(--title-color);
  /* font-size: xx-large; */
}

.temp {
  /* background-color: purple; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  stroke: 3px solid red;
}

.navbar-brand {
  /* background-color: blue; */
  font-family: "PT Serif", serif;
  font-weight: bold;
  font-size: xx-large;
  grid-column-start: 2;
  grid-column-end: 3;
  align-self: stretch;
}

.modal-popups {
  /* background-color: green; */
  grid-column-start: 3;
  grid-column-end: 4;
}

/* .navbar-custom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  background-color: red;
} */
</style>
