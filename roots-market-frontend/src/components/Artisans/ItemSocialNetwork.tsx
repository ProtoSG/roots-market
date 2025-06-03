import { ReactNode } from "react"
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "../../icons"
import { SocialNetwork } from "../../models/socialNetwork.model"

interface Props {
  item: SocialNetwork
}

const ICONS: Record<string, ReactNode> = {
  instagram: <InstagramIcon />,
  facebook: <FacebookIcon />,
  youtube: <YoutubeIcon />
}

export function ItemSocialNetwork({item}: Props){
  const icon = ICONS[item.type.toLowerCase()]

  return (
    <a 
      href={item.url}
      target="_blank"
      className="flex gap-3 text-sm items-center focus:outline-none transition-all hover:text-primary hover:underline"
    >
      {icon}
      {item.type}
    </a>
  )
}
