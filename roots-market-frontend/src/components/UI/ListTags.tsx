import { Tag } from "./Tag"

interface Props{
  tags: string[]
}

export function ListTags({tags}: Props){
  return(
    <div className="flex gap-3">
      {tags.map((tag, index) => (
        <Tag key={index} name={tag} />
      ))}
    </div>
  )
}
