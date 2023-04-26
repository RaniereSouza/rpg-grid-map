export function randomIntFrom1to100() {
  return Math.round((Math.random() * 99) + 1)
}

export function randomlyChooseBetween(options) {
  return options[Math.round(Math.random() * (options.length - 1))]
}
