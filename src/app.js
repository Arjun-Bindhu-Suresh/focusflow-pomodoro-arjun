import { createTimer } from "./timer.js";

function queryRequiredElement(selector) {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error(`Missing required element: ${selector}`);
  }

  return element;
}

function createTimerView() {
  const modeLabel = queryRequiredElement("#mode-label");
  const timerDisplay = queryRequiredElement("#timer-display");
  const startButton = queryRequiredElement("#start-button");
  const pauseButton = queryRequiredElement("#pause-button");
  const resetButton = queryRequiredElement("#reset-button");

  function render(state) {
    modeLabel.textContent = state.mode === "focus" ? "Focus" : "Break";
    timerDisplay.textContent = state.display;
    startButton.disabled = state.controls.startDisabled;
    pauseButton.disabled = state.controls.pauseDisabled;
    resetButton.disabled = state.controls.resetDisabled;
  }

  return {
    render,
    startButton,
    pauseButton,
    resetButton,
  };
}

function createApp({ timer, view, now = () => Date.now() }) {
  let renderIntervalId = null;

  function stopRendering() {
    if (renderIntervalId === null) {
      return;
    }

    window.clearInterval(renderIntervalId);
    renderIntervalId = null;
  }

  function renderCurrentState() {
    const currentState = timer.getState(now());
    view.render(currentState);

    if (currentState.timerState !== "running" || currentState.remainingMs === 0) {
      stopRendering();
    }
  }

  function startRendering() {
    if (renderIntervalId !== null) {
      return;
    }

    renderIntervalId = window.setInterval(renderCurrentState, 250);
  }

  function handleStart() {
    timer.start(now());
    renderCurrentState();
    startRendering();
  }

  function handlePause() {
    timer.pause(now());
    renderCurrentState();
  }

  function handleReset() {
    timer.reset(now());
    renderCurrentState();
  }

  function mount() {
    view.startButton.addEventListener("click", handleStart);
    view.pauseButton.addEventListener("click", handlePause);
    view.resetButton.addEventListener("click", handleReset);
    document.addEventListener("visibilitychange", renderCurrentState);
    renderCurrentState();
  }

  return {
    mount,
  };
}

const app = createApp({
  timer: createTimer(),
  view: createTimerView(),
});

app.mount();
