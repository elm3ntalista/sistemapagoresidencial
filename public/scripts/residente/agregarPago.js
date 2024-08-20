
const clavePagos = 'registroPago';
const claveUnaVez = 'ejecutarUnaVez';
const $ = el => document.querySelector(el)

const agregarPago1 = $('#agregar-pago1');
const agregarPago2 = $('#agregar-pago2');
const modalAgregarPago = $('#modal-agregar-pago');
const BtnPagoEfectivo = $('#pago-efectivo');
const modalEfectivo = $('#metodo-efectivo-agregar-pago');
const modalSelecionMetodo = $('#seleccion-metodo-pago');
const inputMonto = $('#monto-agregar-pago');
const cancelarPago = $('#cancelar-pago');
const aceptarPago = $('#aceptar-pago');
const msgErrorMonto = $('#msg-error-monto');
const labelDeuda = $('#pago-total-deuda');
const labelDeuda2 = $('#label-deuda2');
const modalDeuda = $('#modal-label-deuda');
const tabla = $('#tabla-registro-pagos');


function ejecutarUnaVez() {
  if (!localStorage.getItem(claveUnaVez)) {
    setDeuda(2500)
  }
  localStorage.setItem(claveUnaVez, 'true');
}

ejecutarUnaVez()



let deuda = localStorage.getItem('deudaR') || 0;

function setDeuda(deuda) {
  localStorage.setItem('deudaR', deuda);
}

function setRegistroPago(pago) {
  localStorage.setItem(clavePagos, JSON.stringify(pago));
}
function getRegistroPago() {
  return JSON.parse(localStorage.getItem(clavePagos)) || [];
}
let registroPagos = getRegistroPago();


agregarPago1.addEventListener('click', togglelModal);
agregarPago2.addEventListener('click', togglelModal);
cancelarPago.addEventListener('click', togglelModal);
BtnPagoEfectivo.addEventListener('click', verModalEfectivo);

function verModalEfectivo() {
  modalEfectivo.classList.remove('hidden');
  modalSelecionMetodo.classList.add('hidden');
}

function togglelModal() {
  modalAgregarPago.classList.toggle('hidden');
}

inputMonto.addEventListener('change', () => {
  const monto = inputMonto.value
  if (monto < 0 || isNaN(monto)) {
    msgErrorMonto.textContent = 'Error el monto no es valido';
    msgErrorMonto.classList.remove('hidden')
  } else if (monto > 2500) {
    msgErrorMonto.classList.remove('hidden');
  } else {
    msgErrorMonto.classList.add('hidden');
    aceptarPago.addEventListener('click', () => {
      inputMonto.value = '';
      deuda -= monto;
      setDeuda(deuda)
      const modalMonto = $('#modal-monto-pago');
      const msgPagoExitoso = $('#pago-exitoso');
      modalMonto.classList.add('hidden');
      msgPagoExitoso.classList.remove('hidden');
      setTimeout(() => {
        modalAgregarPago.classList.add('hidden');
        msgPagoExitoso.classList.add('hidden');
        modalSelecionMetodo.classList.remove('hidden')
        modalEfectivo.classList.add('hidden')
        modalMonto.classList.remove('hidden')
      }, 2000);

      const pago = {
        tipo: 'Efectivo',
        fecha: new Date().toLocaleDateString(),
        Monto: monto
      }

      registroPagos.push(pago);
      setRegistroPago(registroPagos);
      actualizarEstadistica();
    })
  }
})

actualizarEstadistica()

function actualizarEstadistica() {
  labelDeuda.textContent = deuda;
  labelDeuda2.textContent = deuda;
  tabla.innerHTML = '';
  registroPagos.forEach(pago => {
    for (clave in pago) {
      const p = document.createElement('p');
      p.classList.add('basis-1/4', 'px-1', 'bg-orange-400');
      p.textContent = pago[clave];
      tabla.appendChild(p);
    }
  })
}
