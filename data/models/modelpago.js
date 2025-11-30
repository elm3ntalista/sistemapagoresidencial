import { createLogger } from 'vite';
import { openDb } from '../db.js';

export async function addPago({ apartamento, nombre, fecha, monto }) {
  const db = await openDb();
  const sql = `
  INSERT INTO pagos (apartamento, nombre, fecha, monto)
  VALUES (?, ?, ?, ?)`;
  try {
    const resultado = await db.run(sql, [apartamento, nombre, fecha, monto]);
    return resultado;
  }
  catch (error) {
    console.error("Error al insertar pago:", error.message);
    throw error;
  }
}

export async function getAllPagos(soloRecientes = false) {
  const db = await openDb();
  let resultado;
  try {
    if (soloRecientes) {
      resultado = await db.all("SELECT * FROM pagos ORDER BY fecha DESC LIMIT 5");
    } else {
      resultado = await db.all("SELECT * FROM pagos");
    }

    return resultado;
  }
  catch (error) {
    console.error("Error al obtener todos los pagos:", error.message);
    throw error;
  }
}

export async function getTotalPagos() {
  const db = await openDb();
  try {
    const resultado = await db.get("SELECT COUNT(*) AS total FROM pagos");
    return resultado.total;
  }
  catch (error) {
    console.error("Error al obtener total de pagos:", error.message);
    throw error;
  }
}