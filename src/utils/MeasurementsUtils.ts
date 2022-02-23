const hectogramsToLbs = (hectograms: number) => {
  return Math.round(hectograms * 0.220462 * 100) / 100
}

const hectogramsToKilograms = (hectograms: number) => {
  return Math.round((hectograms / 10) * 100) / 100
}

const decimetresToFeet = (decimeters: number) => {
  return Math.round(decimeters * 0.328084 * 100) / 100
}

const decimetresToMeters = (decimeters: number) => {
  return Math.round((decimeters / 10) * 100) / 100
}

export const formatHeight = (height: number): string => {
  const m = decimetresToMeters(height)
  const f = decimetresToFeet(height)
  return `${m} m. (${f} ft.)`
}

export const formatWeight = (weight: number): string => {
  const kg = hectogramsToKilograms(weight)
  const lbs = hectogramsToLbs(weight)
  return `${kg} kg (${lbs} lbs)`
}
