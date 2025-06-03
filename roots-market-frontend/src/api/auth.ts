import { Login, LoginResponse, Register, RegisterResponse, VerifyResponse } from "../models/auth.model";
import { requestJSON } from "./fetchData";

export const loginRequest =  (user: Login) => 
  requestJSON<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(user)
  })

export const registerRequest = async (user: Register) => {
  const cleanData = {
    username: user.username,
    password: user.password,
    name: user.name,
    bio: user.bio,
    location: user.location,
    profileImageURL: user.profileImageURL,
    email: user.email,
    testimony: user.testimony || ""
  }  

  console.log({cleanData})

  return requestJSON<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(cleanData),
  });
}

export const verifyTokenRequest = async () =>
  requestJSON<VerifyResponse>("/auth/verify", {
    method: "GET",
  });
