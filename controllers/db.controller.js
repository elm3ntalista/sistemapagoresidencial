export async function getAllResidentes() {
  const response = await fetch('http://localhost:3000/obtener-residentes');
  const residentes = await response.json();
  return residentes;
}

export function addResidente(residente) {
  fetch('http://localhost:3000/agregar-residentes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(residente)
  })
}

export async function getAllPagos() {
  const response = await fetch('http://localhost:3000/obtener-pagos');
  const pagos = await response.json();
  return pagos;
}

export async function getAllPagosRecientes() {
  const response = await fetch('http://localhost:3000/obtener-pagos-recientes');
  const pagos = await response.json();
  return pagos;
}

export function actualizarResidente(apt, deuda) {
  fetch('http://localhost:3000/actualizar-residente', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ apt, deuda })
  })
}

export function agregarPago(apartamento, nombre, fecha, monto) {
  fetch('http://localhost:3000/agregar-pagos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ apartamento, nombre, fecha, monto })
  })
}

