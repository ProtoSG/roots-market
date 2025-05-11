interface Props {
  name: string
}

export function Tag({name}: Props){
  return(
    <small 
      className="bg-primary shadow-xl/20 px-3 py-1 rounded-full text-white"
    >
      {name}
    </small>
  )
}
