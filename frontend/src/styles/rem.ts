export function rem(value: number, base = 16) {
  return `${value / base}rem`
}

export function em(value: number, base: number) {
  return `${value / base}em`
}
