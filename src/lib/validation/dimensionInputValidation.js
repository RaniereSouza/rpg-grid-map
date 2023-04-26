export function isDimensionValueValid(value) {
  if ((typeof value !== 'number') && (typeof value !== 'string')) return false

  const valueStr = (typeof value === 'number') ? String(value) : value
  return (
    !isNaN(Number(valueStr)) &&
    (Number(valueStr) > 0) &&
    !valueStr.includes('.')
  )
}
