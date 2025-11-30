import { getAllResidentes, getAllPagos, getAllPagosRecientes, actualizarResidente, agregarPago, addResidente } from './db.controller.js';

const residentes = await getAllResidentes();
const pagos = await getAllPagos();

const $ = el => document.querySelector(el);
// MODAL NUEVO RESIDENTE
const modal = $('#modal-nuevo-residente');
const BtnNuevoResidente1 = $('#movil-nuevo-residente');
const BtnNuevoResidente2 = $('#desktop-nuevo-residente');
const BtnCancelarResidente = $('#cancelar-nuevo-residente');
const BtnAceptarResidente = $('#aceptar-nuevo-residente');
const form = $('#form-nuevo-residente');

const navRegistroResidentes1 = $('#movil-registro-residentes');
const navRegistroResidentes2 = $('#desktop-registro-residentes');
const navRegistroPagos1 = $('#movil-registro-pagos');
const navRegistroPagos2 = $('#desktop-registro-pagos');
// VENTANA REGISTRO DE RESIDENTES
navRegistroResidentes1.addEventListener('click', () => {
  window.location.href = '../views/registroResidentes.html'
})
navRegistroResidentes2.addEventListener('click', () => {
  window.location.href = '../views/registroResidentes.html'
})
// VENTANA REGISTRO DE PAGOS
navRegistroPagos1.addEventListener('click', () => {
  window.location.href = '../views/registroPagos.html'
})
navRegistroPagos2.addEventListener('click', () => {
  window.location.href = '../views/registroPagos.html'
})

let inputApartamento = $('#input-apartamento-residente').value;
let inputNombre = $('#input-nombre-residente').value;
let inputTelefono = $('#input-telefono-residente').value;
let inputEmail = $('#input-email-residente').value;

BtnNuevoResidente1.addEventListener('click', togglelModal);
BtnNuevoResidente2.addEventListener('click', togglelModal);
BtnCancelarResidente.addEventListener('click', togglelModal);

function togglelModal() {
  modal.classList.toggle('hidden');
}

const $tabla = $('#tabla-registro-pagos');

async function obtenerPagosRecientes() {
  $tabla.innerHTML = '';
  const pagos = await getAllPagosRecientes();
  for (const pago of pagos) {
    const { apartamento, nombre, fecha, monto } = pago;

    const $apt = document.createElement('p');
    $apt.classList.add('basis-1/4', 'px-1', 'bg-orange-400');
    $apt.textContent = apartamento;

    const $nombre = document.createElement('p');
    $nombre.classList.add('basis-1/4', 'px-1', 'bg-orange-400');
    $nombre.textContent = nombre;

    const $fecha = document.createElement('p');
    $fecha.classList.add('basis-1/4', 'px-1', 'bg-orange-400');
    $fecha.textContent = fecha;

    const $monto = document.createElement('p');
    $monto.classList.add('basis-1/4', 'px-1', 'bg-orange-400');
    $monto.textContent = monto;

    $tabla.append($apt, $nombre, $fecha, $monto);
  }
}
obtenerPagosRecientes()

form.addEventListener('change', () => {
  inputApartamento = $('#input-apartamento-residente').value;
  inputNombre = $('#input-nombre-residente').value;
  inputTelefono = $('#input-telefono-residente').value;
  inputEmail = $('#input-email-residente').value;
});

BtnAceptarResidente.addEventListener('click', () => {
  const nuevoResidente = {
    apartamento: inputApartamento,
    nombre: inputNombre,
    telefono: inputTelefono,
    email: inputEmail,
  };
  togglelModal()
  addResidente(nuevoResidente);
  actualizarEstadisticas();
});

// MODAL AGREGAR PAGO

const modalAgregarPago = $('#modal-agregar-pago');
const BtnAgregarPago1 = $('#movil-agregar-pago');
const BtnAgregarPago2 = $('#desktop-agregar-pago');
const $apartamento = $('#apartamento-agregar-pago');
const BtnEfectivo = $('#pago-efectivo');
const AptNotFound = $('#AptNotFound');

const modalMetodoEfectivo = $('#metodo-efectivo-agregar-pago');
const modalSelecionPago = $('#seleccion-metodo-pago');
const idApartamento = $('#pago-id-apartamento')
const totalDeuda = $('#pago-total-deuda')
const BtnCancelarpago = $('#cancelar-pago');
const BtnAceptarpago = $('#aceptar-pago');

let apt, deudaR, currentIDResidente, nombreResidente;

$apartamento.addEventListener('change', () => {
  AptNotFound.classList.add('hidden');
  BtnEfectivo.addEventListener('click', comprobarApt)
})

BtnAgregarPago1.addEventListener('click', toggleAgregarPago);
BtnAgregarPago2.addEventListener('click', toggleAgregarPago);
BtnCancelarpago.addEventListener('click', toggleAgregarPago);

function toggleAgregarPago() {
  modalAgregarPago.classList.toggle('hidden');
  modalMetodoEfectivo.classList.add('hidden');
  modalSelecionPago.classList.remove('hidden');
}

function comprobarApt() {
  apt = $apartamento.value;
  residentes.some(({ apartamento, nombre, deuda }, id) => {
    if (apartamento === apt) {
      modalSelecionPago.classList.add('hidden');
      modalMetodoEfectivo.classList.remove('hidden');
      idApartamento.textContent = apt;
      totalDeuda.textContent = deuda;
      deudaR = deuda;
      currentIDResidente = id;
      nombreResidente = nombre;
    } else {
      AptNotFound.classList.remove('hidden');
    }
  });
}

// SUB MODAL MONTO PAGO
const inputMonto = $('#monto-agregar-pago');
const msgErrorMonto = $('#msg-error-monto');

inputMonto.addEventListener('change', () => {
  const monto = inputMonto.value
  if (monto <= 0 || isNaN(monto) || monto > deudaR) {
    msgErrorMonto.textContent = 'Error el monto no es valido';
    msgErrorMonto.classList.remove('hidden')
  } else {
    msgErrorMonto.classList.add('hidden');
    BtnAceptarpago.addEventListener('click', () => {
      const monto = inputMonto.value
      inputMonto.value = '';
      actualizarResidente(apt, deudaR - monto);
      agregarPago(apt, nombreResidente, new Date().toISOString().replace('T', ' ').substring(0, 19), monto);
      const modalMonto = $('#modal-monto-pago');
      const msgPagoExitoso = $('#pago-exitoso');
      modalMonto.classList.add('hidden');
      msgPagoExitoso.classList.remove('hidden');
      setTimeout(() => {
        actualizarEstadisticas();
        obtenerPagosRecientes();
      }, 1000)
      setTimeout(() => {
        modalAgregarPago.classList.add('hidden');
        modalMonto.classList.remove('hidden');
        msgPagoExitoso.classList.add('hidden');
      }, 2000);
    })
  }
})

const NResidentes = $('#numero-residentes');
const NPagos = $('#numero-pagos');
const TDeudas = $('#total-deudas');

async function actualizarEstadisticas() {
  const response = await fetch('http://localhost:3000/obtener-estadisticas')
  const { totalResidentes, totalPagos, totalDeuda } = await response.json();

  NResidentes.textContent = `+${totalResidentes ?? 0}`;
  NPagos.textContent = `+${totalPagos ?? 0}`;
  TDeudas.textContent = `$ ${totalDeuda ?? 0}`
}

actualizarEstadisticas()

