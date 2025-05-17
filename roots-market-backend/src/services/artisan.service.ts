import { connection } from "../connection.ts";
import type { Artisan } from "../models/artisan.model.ts";
import type { AuthLogin } from "../models/auth.model.ts";
import { parseJsonArray } from "../utils/parseJsonArray.utils.ts";
import { toInt } from "../utils/toInt.utils.ts";

export const createArtisan = async(artisan: Artisan) => {
  const query = `
    INSERT INTO Artisan (name, username, password, bio, location, profileImageUrl, email)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  
  const { lastInsertRowid } = await connection.execute({
    sql: query,
    args: [
      artisan.name,
      artisan.username,
      artisan.password,
      artisan.bio,
      artisan.location,
      artisan.profileImageURL,
      artisan.email,
    ]
  });

  return { id : toInt(lastInsertRowid)}
}

export const readArtisans = async() => {
  const query = `
    SELECT 
        a.artisanId,
        a.name,
        a.bio,
        a.location,
        a.profileImageUrl,
        json_group_array(
            json_object(
                'socialNetworkId', sn.socialNetworkId,
                'type', sn.type,
                'URL', sn.URL
            )
        ) AS socialNetworks
    FROM Artisan a
    INNER JOIN SocialNetwork sn ON sn.artisanId = a.artisanId
    GROUP BY a.artisanId;
  `

  const { rows } = await connection.execute({
    sql: query
  })

  const parsedRows = rows.map((row) => ({
    ...row,
    socialNetworks: parseJsonArray(row.socialNetworks),
  }))

  return parsedRows
}

export const readArtisanById = async(id: number) => {
  const query = `
    SELECT * FROM Artisan WHERE artisanId = ?;
  `;

  const { rows } = await connection.execute({
    sql: query,
    args: [id]
  });

  return rows[0]; 
}

export const readLastedArtisan = async() => {
  const query = `
    SELECT
        a.artisanId,
        a.name,
        a.testimony,
        a.profileImageUrl
    FROM Artisan a 
    ORDER BY a.artisanId DESC 
    LIMIT 1;
  `

  const { rows } = await connection.execute({
    sql: query
  })

  return rows[0]
}

export const foundArtisanByEmail = async(email: string) => {
  const query = `
    SELECT * FROM Artisan WHERE email = ?;
  `
  const { rows } = await connection.execute(({
    sql: query,
    args: [email]
  }))

  if (rows.length !== 0) {
    return true
  }

  return false
}

export const foundArtisanByUsername = async(username: string): Promise<AuthLogin|null>  => {
  const query = `
    SELECT artisanId, username, password FROM Artisan WHERE username = ?;
  `
  const { rows }: any = await connection.execute(({
    sql: query,
    args: [username]
  }))

  if (!rows || rows.length === 0) {
    return null
  }

  const newUser: AuthLogin = {
    id: toInt(rows[0].artisanId),
    username: rows[0].username,
    password: rows[0].password,
  }

  return newUser
}

