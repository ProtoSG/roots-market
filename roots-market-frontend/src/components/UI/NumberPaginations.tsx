interface Props {
  num: number 
  page: number
  onPageChange: (num: number) => void
}

export function NumberPaginations({num, page, onPageChange}: Props) {
  return (
    <span
      onClick={() => onPageChange(num)}
    className={`
  flex items-center justify-center size-8 rounded-full border-black cursor-pointer
transition-colors
  ${num === page ? 'bg-primary text-white' : 'hover:bg-primary/80 hover:text-white'}
  `}>
      {num}
    </span>
  )
}
