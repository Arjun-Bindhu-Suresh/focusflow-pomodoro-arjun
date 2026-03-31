# FocusFlow – Pomodoro Timer App PRD

## 1. Project Overview

FocusFlow is a small frontend-only Pomodoro timer web app built with plain HTML, CSS, and JavaScript for a class assignment. The project is meant to demonstrate a complete but lightweight software workflow, including planning, implementation, testing, and documentation, while keeping the product scope intentionally small.

The app helps a user run Pomodoro work sessions with a countdown timer, automatic focus and break transitions, and a completed-session counter. The implementation will prioritize a working vertical slice first, then expand into the full Pomodoro cycle.

## 2. Problem Statement

Small academic software projects often fail in one of two ways: they are too shallow to demonstrate real engineering workflow, or they become over-scoped and hard to finish. FocusFlow addresses that by using a simple product with enough state, behavior, and testing surface area to show disciplined software development without unnecessary complexity.

The project must clearly demonstrate scoped requirements, milestone-based delivery, isolated logic, automated testing, and repo artifacts that show progression from planning to implementation.

## 3. Goals

- Build a simple, usable Pomodoro timer with clear focus and break states.
- Demonstrate a complete software workflow suitable for an academic assignment.
- Keep the implementation frontend-only and framework-free.
- Separate timer/session logic from DOM code so core behavior can be tested independently.
- Deliver a stable milestone 1 vertical slice before adding automatic session transitions.

## 4. Non-Goals

- User accounts, authentication, or cloud sync.
- Persistence of timer state or completed sessions across page refreshes.
- Custom timer durations or advanced settings.
- Manual switching between focus and break modes.
- Native mobile or desktop packaging.
- Extra polish that delays completion of the core working slice.

## 5. Target User

The primary user is a student or casual user who wants a simple browser-based Pomodoro timer for focused work sessions. For the assignment, the secondary audience is an instructor evaluating whether the project demonstrates clear scope control, architecture, testing, and workflow discipline.

## 6. Core Features

- Start, pause, and reset a 25-minute timer.
- Show the countdown in `MM:SS` format.
- Display the current mode: `Focus` or `Break`.
- Automatically switch between focus and break sessions.
- Track the number of completed focus sessions.
- Show a visible mode change and a simple alert when sessions transition.

## 7. Functional Requirements

### Timer Behavior

- The app must initialize in `Focus` mode with a displayed time of `25:00`.
- The timer must use timestamp-based countdown logic so it remains accurate after tab switching or browser throttling.
- The displayed time must use `MM:SS` format only.
- Pressing `Start` must begin the countdown when the timer is idle.
- Pressing `Pause` must freeze the remaining time exactly.
- Pressing `Start` after pausing must resume from the paused remaining time.
- Pressing `Reset` must stop the timer and return the app to `Focus` mode at `25:00`.
- `Reset` must preserve the completed focus-session count.

### Control State

- `Start` must be disabled while the timer is running.
- `Pause` must be disabled while the timer is idle or paused.
- `Reset` must remain enabled at all times.

### Session Flow

- A completed `Focus` session must automatically switch to a `5-minute Break`.
- The break must begin automatically when focus reaches `00:00`.
- A completed `Break` session must automatically switch to a new `25-minute Focus` session.
- The focus/break cycle must continue automatically until the user pauses or resets.
- The completed-session counter must increase only when a focus session completes.
- There must be no manual mode-switch button.

### State Model

- The app must keep `timerState` separate from `mode`.
- `timerState` values: `idle`, `running`, `paused`.
- `mode` values: `focus`, `break`.

## 8. Milestones / Scope Breakdown

### Milestone 1: Focus Timer Vertical Slice

- Focus mode only.
- Initial display shows `Focus` and `25:00`.
- `Start`, `Pause`, and `Reset` work as defined.
- Countdown is timestamp-based and accurate across tab switching/minimization.
- Display format is `MM:SS`.
- Button enabled/disabled states are correct.
- Automated tests cover milestone 1 timer state transitions using plain Node and isolated timer logic.

### Milestone 2: Full Pomodoro Cycle

- Add automatic switch from `25-minute Focus` to `5-minute Break`.
- Start break automatically after focus ends.
- Start the next focus session automatically after break ends.
- Track completed focus sessions.
- Display current mode clearly.
- Trigger a visible mode change and simple alert at each transition.

## 9. Technical Approach

The project will be implemented as a small static web app with a clear separation between UI and business logic.

Planned structure:

- `index.html`: application layout and controls
- `styles.css`: presentation and responsive styling
- `src/timer.js`: pure timer and session logic
- `src/app.js`: DOM event handling and UI updates
- `test/timer.test.js`: automated tests for timer/session logic
- `docs/spec.md`: project PRD/specification

The core design decision is to isolate timer and session rules in a pure JavaScript module. This keeps state transitions simple, testable, and independent of browser DOM concerns. The UI layer will read from and dispatch actions to that logic module rather than embedding business rules directly in event handlers.

## 10. Testing Strategy

The testing approach will combine a small automated test suite with manual verification.

Automated testing:

- Use plain Node with a minimal test approach for the isolated timer logic.
- Focus on external behavior and state transitions rather than DOM implementation details.
- Cover milestone 1 behavior first: initial state, start, pause, resume, reset, and button-state-related logic where applicable.

Manual testing:

- Verify countdown rendering in the browser.
- Verify timestamp accuracy after tab switching or minimization.
- Verify control enable/disable behavior.
- Verify milestone 2 automatic transitions, completed-session counting, and alert behavior.

## 11. Acceptance Criteria

### Milestone 1 Acceptance Criteria

- On initial load, the app shows `Focus` and `25:00`.
- `Start` begins a timestamp-based countdown.
- `Pause` freezes the remaining time exactly.
- `Start` resumes from the paused remaining time.
- `Reset` stops the timer, returns to `Focus` at `25:00`, and preserves completed sessions.
- The timer remains accurate after tab switching or minimization.
- The display uses `MM:SS` only.
- `Start` is disabled while running.
- `Pause` is disabled while idle or paused.
- `Reset` is always enabled.
- Automated tests exist for milestone 1 timer state transitions.

### Milestone 2 Acceptance Criteria

- A completed focus session automatically starts a `5-minute Break`.
- A completed break automatically starts a new `25-minute Focus` session.
- The cycle continues automatically.
- Completed sessions increase only after completed focus sessions.
- The current mode is always visible.
- A visible mode change and simple alert occur at each session transition.
- No manual mode switch control exists.

## 12. Deliverables for the Assignment

- Working frontend-only Pomodoro timer web app.
- Source files for UI, styling, and isolated timer logic.
- `docs/spec.md` PRD/specification.
- `README` describing the project, setup, usage, and workflow summary.
- `test/timer.test.js` with automated logic tests.
- GitHub issues showing milestone-based planning.
- Commit history demonstrating implementation progression.

This project is successful if it delivers a stable milestone 1 vertical slice first, then extends cleanly into milestone 2 without sacrificing simplicity, clarity, or testability.
