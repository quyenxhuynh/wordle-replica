<script>
export default {
  methods: {
    resetFocus() {
      $("#userInput").trigger("focus");
    },
  },
};
</script>
<template>
  <!-- Button trigger modal -->

  <button
    type="button"
    class="btn-wordle"
    data-bs-toggle="modal"
    data-bs-target="#instructionsPopUp"
    @focus="resetFocus"
  >
    <svg
      width="25"
      height="25"
      fill="currentColor"
      class="bi bi-question-circle"
      viewBox="0 0 16 16"
    >
      <path
        d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
      />
      <path
        d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"
      />
    </svg>
  </button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="instructionsPopUp"
    tabindex="-1"
    aria-labelledby="instructionsPopUpLabel"
    aria-hidden="true"
    @blur="resetFocus"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="d-flex justify-content-center">
            <h5 class="modal-title" id="instructionsPopUpLabel">HOW TO PLAY</h5>
          </div>

          <hr />
          <div>Guess the <strong>WORDLE</strong> in six tries.</div>
          <div>
            Each guess must be a valid five-letter word. Hit the enter button to
            submit.
          </div>
          <div>
            After each guess, the color of the tiles will change to show how
            close your guess was to the word.
          </div>

          <hr />

          <div class="game-group">
            <h6><strong>Examples</strong></h6>
          </div>
          <div class="game-group">
            <div class="game-row">
              <div class="game-square game-bg-correct">
                <span class="game-letter no-select">W</span>
              </div>
              <div class="game-square game-bg-default">
                <span class="game-letter game-letter-current no-select">E</span>
              </div>
              <div class="game-square game-bg-default">
                <span class="game-letter game-letter-current no-select">A</span>
              </div>
              <div class="game-square game-bg-default">
                <span class="game-letter game-letter-current no-select">R</span>
              </div>
              <div class="game-square game-bg-default">
                <span class="game-letter game-letter-current no-select">Y</span>
              </div>
            </div>
            <div>
              The letter <strong>W</strong> is in the word and in the correct
              spot.
            </div>
          </div>
          <div class="game-group">
            <div class="game-row">
              <div class="game-square game-bg-default">
                <span class="game-letter game-letter-current no-select">P</span>
              </div>
              <div class="game-square game-bg-semicorrect">
                <span class="game-letter no-select">I</span>
              </div>
              <div class="game-square game-bg-default">
                <span class="game-letter game-letter-current no-select">L</span>
              </div>
              <div class="game-square game-bg-default">
                <span class="game-letter game-letter-current no-select">L</span>
              </div>
              <div class="game-square game-bg-default">
                <span class="game-letter game-letter-current no-select">S</span>
              </div>
            </div>
            <div>
              The letter <strong>I</strong> is in the word but in the wrong
              spot.
            </div>
          </div>

          <div class="game-group">
            <div class="game-row">
              <div class="game-square game-bg-default">
                <span class="game-letter game-letter-current no-select">V</span>
              </div>
              <div class="game-square game-bg-default">
                <span class="game-letter game-letter-current no-select">A</span>
              </div>
              <div class="game-square game-bg-default">
                <span class="game-letter game-letter-current no-select">G</span>
              </div>
              <div class="game-square game-bg-incorrect">
                <span class="game-letter no-select">U</span>
              </div>
              <div class="game-square game-bg-default">
                <span class="game-letter game-letter-current no-select">E</span>
              </div>
            </div>
            <div>
              The letter <strong>U</strong> is not in the word in any spot.
            </div>
          </div>

          <hr />
          <div><strong>A new WORDLE will be available each day!</strong></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
div {
  margin-bottom: 0.2rem;
}
.game-group {
  margin-bottom: 1rem;
}
.game-row {
  margin-right: 10em;
}
.game-square {
  margin: 0.1rem;
}
</style>
