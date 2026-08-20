export function normalizeCnpj(value: string) {
  return value.replace(/\D/g, '').slice(0, 14)
}

export function formatCnpj(value: string) {
  const digits = normalizeCnpj(value)
  return digits
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4')
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5')
}

export function isValidCnpj(value: string) {
  const digits = normalizeCnpj(value)
  if (digits.length !== 14 || /^([0-9])\1+$/.test(digits)) return false
  const calculate = (length: number) => {
    let sum = 0
    let weight = length - 7
    for (let index = 0; index < length; index += 1) {
      sum += Number(digits[index]) * weight
      weight -= 1
      if (weight < 2) weight = 9
    }
    const remainder = sum % 11
    return remainder < 2 ? 0 : 11 - remainder
  }
  return calculate(12) === Number(digits[12]) && calculate(13) === Number(digits[13])
}

export const cnpjExample = '12.345.678/0001-95'
