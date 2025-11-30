import { open } from "sqlite";
import sqlite3 from "sqlite3";

const DB_PATH = "./data/database.db";

/**
 * @returns {Promise<Database>} instancia de la base de datos
 */
export async function openDb() {
  return open({
    filename: DB_PATH,
    driver: sqlite3.Database,
  });
}

async function setupDatabase() {
  const db = await openDb();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS residentes (
      apartamento TEXT UNIQUE PRIMARY KEY NOT NULL,
      nombre TEXT NOT NULL,
      telefono TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      deuda INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS pagos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      apartamento TEXT NOT NULL,
      nombre TEXT NOT NULL,
      fecha TEXT NOT NULL,
      monto INTEGER NOT NULL,
      FOREIGN KEY (apartamento) REFERENCES residentes(apartamento)
    );
  `);

  console.log("Base de datos y tablas configuradas.");
}

setupDatabase();