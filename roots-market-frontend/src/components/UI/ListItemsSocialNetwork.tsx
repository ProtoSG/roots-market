import { SocialNetwork } from "../../models/socialNetwork.model";
import { ItemSocialNetwork } from "../Artisans";

interface Props {
  items: SocialNetwork[]
}

export function ListItemsSocialNetwork({items}: Props) {
  return (
   <div className="flex gap-8">
      {items.length === 0 ? (
          <p className="text-primary">No hay redes sociales</p>
      ) : (
        items.map((sn) => (
          <ItemSocialNetwork key={sn.id} item={sn} />
        ))
      )}
    </div>
  )
}
