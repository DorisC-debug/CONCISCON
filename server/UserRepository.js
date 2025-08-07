import { getConnection, sql } from './db.js';

export async function buscarControlesPorTexto(texto) {
  try {
    const pool = await getConnection();
    if (!pool) return [];

    const result = await pool.request()
      .input('texto', sql.NVarChar, `%${texto}%`)
      .query(`
        SELECT * FROM vw_Salvaguardas_Completa
        WHERE NombreRiesgo LIKE @texto
          OR NombreSalvaguarda LIKE @texto
          OR NombreControl LIKE @texto
          OR FuncionCiberseguridad LIKE @texto
          OR TipoActivo LIKE @texto
          OR IG_Nombre LIKE @texto
      `);

    return result.recordset;
  } catch (error) {
  console.error('❌ Error al conectar a la base de datos:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
  return null;

  }
}
