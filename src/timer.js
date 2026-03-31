const DEFAULT_FOCUS_DURATION_MS = 25 * 60 * 1000;
const DEFAULT_MODE = "focus";
const DEFAULT_TIMER_STATE = "idle";

function clampRemainingMs(value) {
  return Math.max(0, value);
}

export function formatRemainingTime(remainingMs) {
  const totalSeconds = Math.floor(clampRemainingMs(remainingMs) / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function createTimer({ focusDurationMs = DEFAULT_FOCUS_DURATION_MS } = {}) {
  const state = {
    timerState: DEFAULT_TIMER_STATE,
    mode: DEFAULT_MODE,
    completedSessions: 0,
    remainingMs: focusDurationMs,
    targetEndTime: null,
  };

  function readRemainingMs(now) {
    if (state.timerState !== "running" || state.targetEndTime === null) {
      return state.remainingMs;
    }

    return clampRemainingMs(state.targetEndTime - now);
  }

  function buildControls(timerState) {
    return {
      startDisabled: timerState === "running",
      pauseDisabled: timerState !== "running",
      resetDisabled: false,
    };
  }

  function buildSnapshot(now) {
    const remainingMs = readRemainingMs(now);

    return {
      mode: state.mode,
      timerState: state.timerState,
      remainingMs,
      display: formatRemainingTime(remainingMs),
      completedSessions: state.completedSessions,
      controls: buildControls(state.timerState),
    };
  }

  function getState(now = Date.now()) {
    return buildSnapshot(now);
  }

  function start(now = Date.now()) {
    if (state.timerState === "running") {
      return getState(now);
    }

    state.targetEndTime = now + state.remainingMs;
    state.timerState = "running";

    return getState(now);
  }

  function pause(now = Date.now()) {
    if (state.timerState !== "running") {
      return getState(now);
    }

    state.remainingMs = readRemainingMs(now);
    state.targetEndTime = null;
    state.timerState = "paused";

    return getState(now);
  }

  function reset(now = Date.now()) {
    state.timerState = DEFAULT_TIMER_STATE;
    state.mode = DEFAULT_MODE;
    state.remainingMs = focusDurationMs;
    state.targetEndTime = null;

    return getState(now);
  }

  return {
    getState,
    start,
    pause,
    reset,
  };
}
