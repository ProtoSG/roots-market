export const toInt = (numberBig: bigint | undefined):  number => {
  return parseInt(numberBig?.toString() as string)
} 
