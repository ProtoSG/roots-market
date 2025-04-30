export class SocialNetwork {
  socialNetworkId?: number;
  artisanId: number;
  type: string;
  url: string;

  constructor(
    artisanId: number,
    type: string,
    url: string,
    socialNetworkId?: number, 
  ) {
    this.socialNetworkId = socialNetworkId;
    this.artisanId = artisanId;
    this.type = type;
    this.url = url;
  }
}

export class SocialNetworkUpdate {
  type: string
  url: string

  constructor(
    type: string,
    url: string,
  ) {
    this.type = type,
    this.url = url
  }
}
