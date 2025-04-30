export class Artisan{
  artisanId?: number;
  name: string;
  username: string;
  password: string;
  bio: string;
  location: string;
  profileImageUrl: string;
  email: string;
  createdAt: Date;

  constructor(
    name: string,
    username: string,
    password: string,
    bio: string,
    location: string,
    profileImageUrl: string,
    email: string,
    createdAt: Date,
    artisanId?: number,
  ){
    this.artisanId = artisanId
    this.name = name
    this.username = username
    this.password = password
    this.bio = bio
    this.location = location
    this.profileImageUrl = profileImageUrl
    this.email = email
    this.createdAt = createdAt
  }
}
