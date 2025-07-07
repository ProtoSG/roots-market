import type { ProductCreate, ProductFilter, ProductResponse, ProductResponseInfo, ProductUpdate } from "../models/product.model";
import { connection } from "../connection"
import { parseJsonArray } from "../utils/parseJsonArray.utils";
import type { TagResponse } from "../models/tag.model";
import type { ImageResponse } from "../models/image.model";

export const createProduct = async(product: ProductCreate)=> {
  const transaction = await connection.transaction("write")

  try {
    // Insertar Producto Nuevo
    const queryInsertProduct = `
      INSERT INTO Product 
        (name, story, price, stock, artisanId, categoryId)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const { lastInsertRowid } = await transaction.execute({
      sql: queryInsertProduct,
      args: [
        product.name,
        product.story,
        product.price,
        product.stock,
        product.artisanId,
        product.categoryId,
      ],
    });
    const productId = Number(lastInsertRowid)
     
    // Insertar las imagenes
    const queryInsertImages = `
      INSERT INTO Image (productId, imageUrl)
      VALUES (?, ?)
    `
    
    for (const url of product.images) {
      await transaction.execute({
        sql: queryInsertImages,
        args: [productId, url]
      })
    }
      
    // Insertar los tags

    const querySelectTag = `
      SELECT tagId FROM Tag 
      WHERE name = ? AND artisanId = ? 
    `  
    const queryInsertTag = `
      INSERT INTO Tag (artisanId, name)
      VALUES (?, ?)
    `
    const queryInsertProductTag = `
      INSERT OR IGNORE INTO ProductTag (productId, tagId)
      VALUES (?, ?)
    `

    for (const tagName of product.tags) {
      // Verificamos si ya existe el tag
      const existing = await transaction
        .execute({
          sql: querySelectTag,
          args: [tagName, product.artisanId]
        })
        .then(r => r.rows?.[0] as { tagId: number } | undefined);

      let tagId: number 
      if (existing) {
        tagId = existing.tagId
      } else {
        // Creamos nu nuevo Tag
        const { lastInsertRowid: newTagId }  = await transaction.execute({
          sql: queryInsertTag,
          args: [product.artisanId, tagName]
        })
        tagId = Number(newTagId)
      }

      // Por último la asiciamos en la tabla ProductTag
      await transaction.execute({
        sql: queryInsertProductTag,
        args: [productId, tagId]
      })
    }

    // Si la transaccion salio bien => la confirmamos
    await transaction.commit()

    return { 
      productId: productId,
      message: "Producto creado exitosamente"
    };
  } catch (error) {
    // Si algo falla realizamos un rollback
    await transaction.rollback();
    throw new Error("Error al crear el producto");
  } finally {
    transaction.close();
  }
}

export const updateProduct = async(id: number, artisanId: number, product: ProductUpdate) => {
  const transaction = await connection.transaction("write")

  try {
    // Actualizamos el producto
    const queryUpdateProduct = `
      UPDATE Product
      SET 
        name        = ?,
        story       = ?,
        price       = ?, 
        stock       = ?, 
        categoryId  = ?, 
        updatedAt   = CURRENT_TIMESTAMP
      WHERE 
        productId   = ?
        AND 
        artisanId   = ?
    `;

    const { rowsAffected } = await transaction.execute({
      sql: queryUpdateProduct,
      args: [
        product.name,
        product.story,
        product.price,
        product.stock,
        product.categoryId,
        id,
        artisanId
      ],
    });

    if (rowsAffected === 0) return null
    // Eliminiamos las images si el usuario asi lo decidio
    if (product.imagesIdDelete.length > 0) {
      await transaction.execute({
        sql: `
          DELETE FROM Image
          WHERE imageId IN (${product.imagesIdDelete.map(() => "?").join(",")})
        `,
        args: [...product.imagesIdDelete],
      })
    }

    // Actualizamos las imágenes
    const queryUpdateImage = `
      UPDATE Image 
      SET imageUrl = ?
      WHERE imageId = ?
    `
    const queryInsertImage = `
      INSERT INTO Image (productId, imageUrl)
      VALUES (?, ?)
    `

    for (const image of product.images) {
      if (image.imageId !== 0) {
        await transaction.execute({
          sql: queryUpdateImage,
          args: [image.imageUrl, image.imageId]
        })
      } else {
        await transaction.execute({
          sql: queryInsertImage,
          args: [id, image.imageUrl]
        })
      }
    }

    // Eliminamos los tags vinculado al producto, mas no los Tags creados
    if (product.tagsIdDelete.length > 0) {
      await transaction.execute({
        sql: `
          DELETE FROM ProductTag
          WHERE productId = ?
            AND tagId IN (${product.tagsIdDelete.map(() => "?").join(",")})
        `,
        args: [id, ...product.tagsIdDelete],
      });
    }

    // Actualizamos los tags 
    const querySelectTag = `
      SELECT tagId FROM Tag 
      WHERE name = ? AND artisanId = ? 
    `  
    const queryInsertTag = `
      INSERT INTO Tag (artisanId, name)
      VALUES (?, ?)
    `
    const queryInsertProductTag = `
      INSERT OR IGNORE INTO ProductTag (productId, tagId)
      VALUES (?, ?)
    `

    for (const tagName of product.tags) {
      // Verificamos si ya existe el tag
      const existing = await transaction
        .execute({
          sql: querySelectTag,
          args: [tagName, artisanId]
        })
        .then(r => r.rows?.[0] as { tagId: number } | undefined);

      let tagId: number 
      if (existing) {
        tagId = existing.tagId
      } else {
        // Creamos nu nuevo Tag
        const { lastInsertRowid: newTagId }  = await transaction.execute({
          sql: queryInsertTag,
          args: [artisanId, tagName]
        })
        tagId = Number(newTagId)
      }

      // Por último la asiciamos en la tabla ProductTag
      await transaction.execute({
        sql: queryInsertProductTag,
        args: [id, tagId]
      })
    }
    
    
    await transaction.commit()

    return id;
  } catch (error) {
    await transaction.rollback()
    throw new Error("Error al actualizar el producto");
  } finally {
    transaction.close()
  }
}

export const deleteProduct = async(productId: number, artisanId: number) => {
  try {
    const query = `
      UPDATE Product
      SET isDeleted = 1
      WHERE productId = ?
      AND artisanId = ?;
    `   
    const {rowsAffected} = await connection.execute({
      sql: query,
      args: [productId, artisanId]
    })

    if (rowsAffected === 0) return null 

    return productId
  } catch (error) {
    console.error("Error en la base de datos al eliminar el producto")
    throw new Error(`Error en la base de datos: `, error.message)
  }
} 

export const readProductsByArtisan = async (
  id: number,
  page = 1,
  limit = 10
): Promise<ProductResponse> => {
  const offset = (page - 1) * limit 

  const countSql = `
    SELECT COUNT(*) AS total 
    FROM Product p
    WHERE p.artisanId = ? AND p.isDeleted = 0
  `

  try {
    const query = `
      SELECT 
          p.productId,
          p.name,
          p.price,
          p.story,
          p.categoryId,
          p.soldCount,
          (
              SELECT json_group_array(json_object(
                'tagId', t.tagId,
                'name', t.name
              ))
              FROM ProductTag pt
              JOIN Tag t ON t.tagId = pt.tagId
              WHERE pt.productId = p.productId
          ) AS tags,
          (
              SELECT json_group_array(
                json_object(
                  'imageId', i.imageId,
                  'imageUrl', i.imageUrl
                )
              )
              FROM Image i
              WHERE i.productId = p.productId
          ) AS images
      FROM Product p
      WHERE p.artisanId = ? AND p.isDeleted = 0
      ORDER BY p.createdAt DESC
      LIMIT ? OFFSET ?;
    `

    const { rows: totalRow } = await connection.execute({
      sql: countSql,
      args: [id]
    })

    const totalItems = totalRow.length > 0 ? Number(totalRow[0]?.total) : 0

    const { rows } = await connection.execute({
      sql: query,
      args: [id, limit, offset]
    })

    const data: ProductResponseInfo[] = rows.map((row) => ({
      productId: Number(row.productId ?? row[0]),
      name: String(row.name ?? row[1]),
      price: Number(row.price ?? row[2]),
      story: String(row.story ?? row[3]),
      categoryId: Number(row.categoryId ?? row[4]),
      stock: Number(row.stock ?? row[5] ?? 0),
      soldCount: Number(row.soldCount ?? row[6]),
      artisanId: Number(row.artisanId ?? row[7]),
      artisanName: String(row.artisanName ?? row[8]),
      tags: parseJsonArray<TagResponse>(row.tags ?? row[9]),
      images: parseJsonArray<ImageResponse>(row.images ?? row[10]),
    }));
  
    const totalPages = Math.ceil(totalItems / limit)

    return {
      data,
      meta: {
        page,
        limit,
        totalItems,
        totalPages
      }
    }
  } catch (error) {
    throw new Error("Error al leer el producto")
  }
}

export const readProducts = async(
  page = 1,
  limit = 9,
  filters: ProductFilter
): Promise<ProductResponse> => {
  const offset = (page - 1) * limit

  const whereClauses = ["p.isDeleted = 0"];
  const args: (string | number)[] = [];

  if (filters.categoryId !== null) {
    whereClauses.push("p.categoryId = ?");
    args.push(filters.categoryId);
  }
  if (filters.rangePrice[0] !== null && filters.rangePrice[1] === null) {
    whereClauses.push("p.price >= ?");
    args.push(filters.rangePrice[0]);
  }
  if (filters.rangePrice[0] === null && filters.rangePrice[1] !== null) {
    whereClauses.push("p.price <= ?");
    args.push(filters.rangePrice[1]);
  }
  if (filters.rangePrice[0] !== null && filters.rangePrice[1] !== null) {
    whereClauses.push("p.price BETWEEN ? AND ?");
    args.push(filters.rangePrice[0], filters.rangePrice[1]);
  }
  if (filters.artisanId !== null) {
    whereClauses.push("p.artisanId = ?");
    args.push(filters.artisanId);
  }

  const countSql = `
    SELECT COUNT(*) AS total
    FROM Product p
    WHERE ${whereClauses.join(" AND ")};
  `;

  const pageArgs = [...args, limit, offset];
  
  const query = `
    SELECT 
        p.productId,
        p.name,
        p.price,
        p.story,
        p.categoryId,
        p.stock,
        p.soldCount,
        a.artisanId,
        a.name AS artisanName,
        (
            SELECT json_group_array(json_object(
              'tagId', t.tagId,
              'name', t.name
            ))
            FROM ProductTag pt
            JOIN Tag t ON t.tagId = pt.tagId
            WHERE pt.productId = p.productId
        ) AS tags,
        (
            SELECT json_group_array(
              json_object(
                'imageId', i.imageId,
                'imageUrl', i.imageUrl
              )
            )
            FROM Image i
            WHERE i.productId = p.productId
        ) AS images
    FROM Product p
    JOIN Artisan a ON a.artisanId = p.artisanId
    WHERE ${whereClauses.join(" AND ")}
    ORDER BY p.createdAt DESC
    LIMIT ? OFFSET ?;
  `;

  try {
    const { rows: totalRow} = await connection.execute({
      sql: countSql,
      args,
    });
    
    const totalItems = totalRow.length > 0 ? Number(totalRow[0]?.total) : 0;

    const { rows } = await connection.execute({
      sql: query,
      args: pageArgs,
    });

    const data: ProductResponseInfo[] = rows.map((row) => ({
      productId: Number(row.productId ?? row[0]),
      name: String(row.name ?? row[1]),
      price: Number(row.price ?? row[2]),
      story: String(row.story ?? row[3]),
      categoryId: Number(row.categoryId ?? row[4]),
      stock: Number(row.stock ?? row[5] ?? 0),
      soldCount: Number(row.soldCount ?? row[6]),
      artisanId: Number(row.artisanId ?? row[7]),
      artisanName: String(row.artisanName ?? row[8]),
      tags: parseJsonArray<TagResponse>(row.tags ?? row[9]),
      images: parseJsonArray<ImageResponse>(row.images ?? row[10]),
    }));

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data,
      meta: {
        page,
        limit,
        totalItems,
        totalPages,
      }
    };
  } catch (error) {
    throw new Error("Error al leer los productos");
  }
} 

// export const readProductById = async(id: number) => {
//   try {
//     const query = "SELECT * FROM Product WHERE productId = ?";
//
//     const { rows } = await connection.execute({
//       sql: query,
//       args: [id],
//     });
//
//     return rows[0];
//   } catch (error) {
//     throw new Error("Error al leer el producto");
//   }
// }

export const readRankingProduct = async() => {
  try{
    const query = `
      SELECT 
          p.productId,
          p.name,
          p.price,
          p.story,
          p.categoryId,
          p.stock,
          p.soldCount,
          a.artisanId,
          a.name AS artisanName,
          (
              SELECT json_group_array(json_object(
                'tagId', t.tagId,
                'name', t.name
              ))
              FROM ProductTag pt
              JOIN Tag t ON t.tagId = pt.tagId
              WHERE pt.productId = p.productId
          ) AS tags,
          (
              SELECT json_group_array(json_object(
                'imageId', i.imageId,
                'imageUrl', i.imageUrl
              ))
              FROM Image i
              WHERE i.productId = p.productId
          ) AS images
      FROM Product p
      JOIN Artisan a ON a.artisanId = p.artisanId
      ORDER BY p.soldCount DESC 
      LIMIT 4;
    `
    
    const { rows } = await connection.execute({
      sql: query
    })

   const parsedRows = rows.map((row) => ({
      ...row, 
      tags: parseJsonArray(row.tags),
      images: parseJsonArray(row.images),
    }));

    return parsedRows;
  } catch (error) {
    throw new Error("Error al leer el producto")
  }
}

export const readRankingProductByArtisan = async(id: number) => {
  try {
    const query = `
      SELECT 
          p.productId,
          p.name,
          p.price,
          p.story,
          p.categoryId,
          p.soldCount,
          p.stock,
          a.artisanId,
          a.name AS artisanName,
          (
              SELECT json_group_array(json_object(
                'tagId', t.tagId,
                'name', t.name
              ))
              FROM ProductTag pt
              JOIN Tag t ON t.tagId = pt.tagId
              WHERE pt.productId = p.productId
          ) AS tags,
          (
              SELECT json_group_array(json_object(
                'imageId', i.imageId,
                'imageUrl', i.imageUrl
              ))
              FROM Image i
              WHERE i.productId = p.productId
          ) AS images
      FROM Product p
      JOIN Artisan a ON a.artisanId = p.artisanId
      WHERE a.artisanId = ?
      ORDER BY p.soldCount DESC 
      LIMIT 4;
    `

    const { rows } = await connection.execute({
      sql: query,
      args: [id],
    })

    const parsedRows = rows.map((row) => ({
      ...row,
      tags: parseJsonArray(row.tags),
      images: parseJsonArray(row.images),
    }))
  
    return parsedRows
  } catch (error) {
    throw new Error("Error al leer el producto")
  }
}
