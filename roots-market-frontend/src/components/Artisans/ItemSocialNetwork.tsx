import { ReactNode } from "react"
import { FacebookIcon, InstagramIcon, TiktokIcon, YoutubeIcon } from "../../icons"
import { listSocialNetworks, SocialNetwork } from "../../models/socialNetwork.model"

interface Props {
  item: SocialNetwork
}

const ICONS: Record<listSocialNetworks, ReactNode> = {
  [listSocialNetworks.INSTAGRAM]: <InstagramIcon />,
  [listSocialNetworks.FACEBOOK]: <FacebookIcon />,
  [listSocialNetworks.YOUTUBE]: <YoutubeIcon />,
  [listSocialNetworks.TIKTOK]: <TiktokIcon />
}

export function ItemSocialNetwork({item}: Props){
  const icon = ICONS[item.type]

  return (
    <a 
      href={item.url}
      target="_blank"
      className="flex basis-1/6 gap-3 text-sm items-center focus:outline-none transition-all hover:text-primary hover:underline"
    >
      {icon}
      {item.type}
    </a>
  )
}
