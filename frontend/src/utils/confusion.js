// The backend stores confusion as 0-4. The UI shows it as 1-5.
// Keep every conversion in this one file so the two scales never get mixed up.

export const toDisplayLevel = (apiLevel) => apiLevel
export const toApiLevel = (displayLevel) => displayLevel

// Class average for the meter / chart. With nobody active the backend returns 0,
// which would wrongly read as "1 - Following well", so show 0 instead.
export function displayAverage(apiAvg, participants) {
  return participants ? apiAvg + 1 : 0
}
