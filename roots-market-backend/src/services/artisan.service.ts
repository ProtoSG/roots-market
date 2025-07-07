import { connection } from "../connection.ts";
import type { ArtisanBase, ArtisanCreate, ArtisanInfoResponse, ArtisanResponse, ArtisanUpdate } from "../models/artisan.model.ts";
import type { AuthLogin } from "../models/auth.model.ts";
import { parseJsonArray } from "../utils/parseJsonArray.utils.ts";
import { toInt } from "../utils/toInt.utils.ts";

export const createArtisan = async(artisan: ArtisanCreate) => {
  const query = `
    INSERT INTO Artisan (name, username, password, bio, location, profileImageUrl, email, testimony)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  const { lastInsertRowid } = await connection.execute({
    sql: query,
    args: [
      artisan.name,
      artisan.username,
      artisan.password,
      artisan.bio,
      artisan.location,
      artisan.profileImageUrl,
      artisan.email,
      artisan.testimony
    ]
  });

  return { id : toInt(lastInsertRowid)}
}

export const readArtisanById = async(id: number) => {
  const query = `
    SELECT 
        a.artisanId,
        a.name,
        a.username,
        a.bio,
        a.location,
        a.email,
        a.profileImageUrl,
        json_group_array(
            json_object(
                'socialNetworkId', sn.socialNetworkId,
                'type', sn.type,
                'URL', sn.URL
            )
        ) AS socialNetworks
    FROM Artisan a
    LEFT JOIN SocialNetwork sn ON sn.artisanId = a.artisanId
    WHERE a.artisanId = ?
    GROUP BY a.artisanId
  `;

  const { rows } = await connection.execute({
    sql: query,
    args: [id]
  });

  const data: ArtisanInfoResponse = {
    artisanId: Number(rows[0]?.artisanId),
    name: String(rows[0]?.name),
    username: String(rows[0]?.username),
    bio: String(rows[0]?.bio),
    location: String(rows[0]?.location),
    email: String(rows[0]?.email),
    profileImageUrl: String(rows[0]?.profileImageUrl),
    socialNetworks: parseJsonArray(rows[0]?.socialNetworks),
  }

  return data; 
}

export const updateArtisan = async(id:number, artisan: ArtisanUpdate) => {
  try {
    const query = `
    UPDATE Artisan
    SET
      name            = ?,
      email           = ?,
      bio             = ?,
      location        = ?,
      profileImageUrl = ?
    WHERE artisanId = ?;
    `
    const {rowsAffected} = await connection.execute({
      sql: query,
      args: [
        artisan.name,
        artisan.email,
        artisan.bio,
        artisan.location,
        artisan.profileImageUrl,
        id
      ] 
    })

    if (rowsAffected === 0) return null 
    return id
  } catch (error) {
    console.error("Error en la base de datos: ", error.message)
    throw new Error("Error al actualizar en la base de datos")
  }
}

export const readArtisans = async(page = 1, limit = 9) => {
  const offset = (page - 1) * limit
  
  const countSql = `
    SELECT COUNT(*) AS total 
    FROM Artisan a
  `
  const query = `
    SELECT 
        a.artisanId,
        a.name,
        a.bio,
        a.location,
        a.email,
        a.profileImageUrl,
        json_group_array(
            json_object(
                'socialNetworkId', sn.socialNetworkId,
                'type', sn.type,
                'URL', sn.URL
            )
        ) AS socialNetworks
    FROM Artisan a
    LEFT JOIN SocialNetwork sn ON sn.artisanId = a.artisanId
    GROUP BY a.artisanId
    LIMIT ? OFFSET ?;
  `
  
  const { rows: totalRow } = await connection.execute({
    sql: countSql
  })

  const totalItems = totalRow.length > 0 ? Number(totalRow[0]?.total) : 0 

  const { rows } = await connection.execute({
    sql: query,
    args: [limit, offset]
  })

  const data = rows.map((row) => ({
    ...row,
    socialNetworks: parseJsonArray(row.socialNetworks),
  }))

  const totalPages = Math.ceil(totalItems / limit)

  return {
    data,
    meta: {
      page,
      limit,
      totalItems,
      totalPages,
    }
  }
}

export const readLastedArtisan = async() => {
  const query = `
    SELECT
        a.artisanId,
        a.name,
        a.testimony,
        a.profileImageUrl
    FROM Artisan a 
    WHERE a.testimony <> ''
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

