import { TagResponse } from "../../models/tag.model"
import { Tag } from "./Tag"

interface Props{
  tags: TagResponse[]
}

export function ListTags({tags}: Props){
  return(
    <div className="flex gap-3">
      {tags.map((tag, index) => (
        <Tag key={index} name={tag.name} />
      ))}
    </div>
  )
}
