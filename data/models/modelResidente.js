import { openDb } from '../db.js';

export async function addResidente({ apartamento, nombre, telefono, email }) {
  const db = await openDb();
  const sql = `
  INSERT INTO residentes (apartamento, nombre, telefono, email)
  VALUES (?, ?, ?, ?)`;
  try {
    const resultado = await db.run(sql, [apartamento, nombre, telefono, email]);
    return resultado;
  }
  catch (error) {
    console.error("Error al insertar residente:", error.message);
    throw error;
  }
}

export async function actualizarResidente(apt, deuda) {
  const db = await openDb();
  try {
    const resultado = await db.run("UPDATE residentes SET deuda = ? WHERE apartamento = ?", [deuda, apt]);
    return resultado;
  }
  catch (error) {
    console.error("Error al actualizar residente:", error.message);
    throw error;
  }
}

export async function getAllResidentes() {
  const db = await openDb();
  try {
    const resultado = await db.all("SELECT * FROM residentes");
    return resultado;
  }
  catch (error) {
    console.error("Error al obtener todos los residentes:", error.message);
    throw error;
  }
}

export async function getTotalResidentes() {
  const db = await openDb();
  try {
    const resultado = await db.get("SELECT COUNT(*) AS total FROM residentes");
    return resultado.total;
  }
  catch (error) {
    console.error("Error al obtener total de residentes:", error.message);
    throw error;
  }
}

export async function getTotalDeuda() {
  const db = await openDb();
  try {
    const resultado = await db.get("SELECT SUM(deuda) AS total FROM residentes");
    return resultado.total;
  }
  catch (error) {
    console.error("Error al obtener total de deuda:", error.message);
    throw error;
  }
}
