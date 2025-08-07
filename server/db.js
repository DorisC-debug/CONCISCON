import sql from 'mssql';
import { dbSettings } from './config.js';

let pool;

export async function getConnection() {
  try {
    if (!pool) {
      pool = await new sql.ConnectionPool(dbSettings).connect();
      console.log('✅ Conexión a SQL Server exitosa');
    }
    return pool;
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    return null;
  }
}

export { sql };
