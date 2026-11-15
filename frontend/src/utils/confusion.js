// The backend stores confusion as 0-4. The UI shows it as 1-5.
export const toDisplayLevel = (apiLevel) => apiLevel + 1
export const toApiLevel = (displayLevel) => displayLevel - 1

// Class average for the meter / chart. With nobody active the backend returns 0,
// which would wrongly read as "1 - Following well", so show 0 instead.
export function displayAverage(apiAvg, participants) {
  return participants ? apiAvg + 1 : 0
}