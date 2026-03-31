import test from "node:test";
import assert from "node:assert/strict";

import { createTimer } from "../src/timer.js";

const FOCUS_DURATION_MS = 25 * 60 * 1000;

test("initializes in focus mode at 25:00 while idle", () => {
  const timer = createTimer();

  assert.deepEqual(timer.getState(0), {
    mode: "focus",
    timerState: "idle",
    remainingMs: FOCUS_DURATION_MS,
    display: "25:00",
    completedSessions: 0,
    controls: {
      startDisabled: false,
      pauseDisabled: true,
      resetDisabled: false,
    },
  });
});

test("start begins a countdown based on the provided timestamp", () => {
  const timer = createTimer();

  timer.start(1_000);

  assert.equal(timer.getState(61_000).timerState, "running");
  assert.equal(timer.getState(61_000).remainingMs, 1_440_000);
  assert.equal(timer.getState(61_000).display, "24:00");
});

test("pause freezes the remaining time exactly", () => {
  const timer = createTimer();

  timer.start(1_000);
  timer.pause(91_500);

  const pausedState = timer.getState(200_000);

  assert.equal(pausedState.timerState, "paused");
  assert.equal(pausedState.remainingMs, 1_409_500);
  assert.equal(pausedState.display, "23:29");
});

test("start resumes from the paused remaining time", () => {
  const timer = createTimer();

  timer.start(0);
  timer.pause(120_000);
  timer.start(180_000);

  const runningState = timer.getState(240_000);

  assert.equal(runningState.timerState, "running");
  assert.equal(runningState.remainingMs, 1_320_000);
  assert.equal(runningState.display, "22:00");
});

test("reset returns the timer to focus mode at 25:00", () => {
  const timer = createTimer();

  timer.start(0);
  timer.pause(45_000);
  timer.reset();

  assert.deepEqual(timer.getState(500_000), {
    mode: "focus",
    timerState: "idle",
    remainingMs: FOCUS_DURATION_MS,
    display: "25:00",
    completedSessions: 0,
    controls: {
      startDisabled: false,
      pauseDisabled: true,
      resetDisabled: false,
    },
  });
});

test("control states reflect whether the timer is idle, running, or paused", () => {
  const timer = createTimer();

  assert.deepEqual(timer.getState(0).controls, {
    startDisabled: false,
    pauseDisabled: true,
    resetDisabled: false,
  });

  timer.start(0);
  assert.deepEqual(timer.getState(1_000).controls, {
    startDisabled: true,
    pauseDisabled: false,
    resetDisabled: false,
  });

  timer.pause(10_000);
  assert.deepEqual(timer.getState(20_000).controls, {
    startDisabled: false,
    pauseDisabled: true,
    resetDisabled: false,
  });
});

test("elapsed time is clamped at zero when the focus session completes", () => {
  const timer = createTimer();

  timer.start(0);

  const finishedState = timer.getState(FOCUS_DURATION_MS + 5_000);

  assert.equal(finishedState.remainingMs, 0);
  assert.equal(finishedState.display, "00:00");
});
