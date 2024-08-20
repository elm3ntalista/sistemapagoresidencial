// localStorage.clear()
// ------------------------------------


const registroResidentes = 'registroResidentes';
const registroPagos = 'registroPagos';

let registroAnteriorResidentes, registroAnteriorPagos;
let sumaDeuda = 0;
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
  window.location.href = 'registroResidentes.html'
})
navRegistroResidentes2.addEventListener('click', () => {
  window.location.href = 'registroResidentes.html'
})
// VENTANA REGISTRO DE PAGOS
navRegistroPagos1.addEventListener('click', () => {
  window.location.href = 'registroPagos.html'
})
navRegistroPagos2.addEventListener('click', () => {
  window.location.href = 'registroPagos.html'
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

function getRegistroResidentes() {
  const registro = localStorage.getItem(registroResidentes);
  return registro ? JSON.parse(registro) : [];
}

registroAnteriorResidentes = getRegistroResidentes();
function setResidente(residente) {
  registroAnteriorResidentes.push(residente);
  localStorage.setItem(registroResidentes, JSON.stringify(registroAnteriorResidentes));
}

form.addEventListener('submit', (evt) => evt.preventDefault());

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
    deuda: 0
  };
  togglelModal()
  setResidente(nuevoResidente);
  actualizarEstadisticas();
});

// MODAL AGREGAR PAGO

const modalAgregarPago = $('#modal-agregar-pago');
const BtnAgregarPago1 = $('#movil-agregar-pago');
const BtnAgregarPago2 = $('#desktop-agregar-pago');
const pagoApartamento = $('#apartamento-agregar-pago');
const BtnEfectivo = $('#pago-efectivo');
const AptNotFound = $('#AptNotFound');

const modalMetodoEfectivo = $('#metodo-efectivo-agregar-pago');
const modalSelecionPago = $('#seleccion-metodo-pago');
const idApartamento = $('#pago-id-apartamento')
const totalDeuda = $('#pago-total-deuda')
const BtnCancelarpago = $('#cancelar-pago');
const BtnAceptarpago = $('#aceptar-pago');

let apt, deudaR, currentIDResidente, nombreResidente;

pagoApartamento.addEventListener('change', () => {
  apt = pagoApartamento.value;
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
  pagoApartamento.value = '';
  registroAnteriorResidentes.forEach(({ apartamento, nombre, deuda }, id) => {
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
  if (monto < 0 || isNaN(monto)) {
    msgErrorMonto.textContent = 'Error el monto no es valido';
    msgErrorMonto.classList.remove('hidden')
  } else if (monto > deudaR) {
    msgErrorMonto.classList.remove('hidden');
  } else {
    inputMonto.value = '';
    msgErrorMonto.classList.add('hidden');
    BtnAceptarpago.addEventListener('click', () => {
      registroAnteriorResidentes[currentIDResidente].deuda = deudaR - monto;
      localStorage.setItem(registroResidentes, JSON.stringify(registroAnteriorResidentes))

      const modalMonto = $('#modal-monto-pago');
      const msgPagoExitoso = $('#pago-exitoso');
      modalMonto.classList.add('hidden');
      msgPagoExitoso.classList.remove('hidden');
      setTimeout(() => {
      }, 1000)
      setTimeout(() => {
        modalAgregarPago.classList.add('hidden');
        modalMonto.classList.remove('hidden');
        msgPagoExitoso.classList.add('hidden');
      }, 2000);
      const currentPago = {
        apartamento: apt,
        nombre: nombreResidente,
        fecha: new Date().toLocaleDateString(),
        monto: monto,
      }
      sumaDeuda = parseInt(localStorage.getItem('deuda'));
      sumaDeuda -= monto;
      localStorage.setItem('deuda', sumaDeuda);
      setPago(currentPago);
      actualizarEstadisticas();
    })
  }
})

function getRegistroPagos() {
  const registro = localStorage.getItem(registroPagos);
  return registro ? JSON.parse(registro) : [];
}

registroAnteriorPagos = getRegistroPagos();

function setPago(pago) {
  registroAnteriorPagos.push(pago);
  localStorage.setItem(registroPagos, JSON.stringify(registroAnteriorPagos));
}

const $tabla = $('#tabla-registro-pagos');

registroAnteriorPagos.forEach(residente => {
  for (propiedad in residente) {
    const p = document.createElement('p');
    p.classList.add('basis-1/4', 'px-1', 'bg-orange-400');
    p.textContent = residente[propiedad];
    $tabla.appendChild(p)
  }
});


const NResidentes = $('#numero-residentes');
const NPagos = $('#numero-pagos');
const TDeudas = $('#total-deudas');


const claveEjecucion = 'codigoYaEjecutado';

function ejecutarCodigoUnaVez() {
  if (!localStorage.getItem(claveEjecucion)) {
    localStorage.clear();

    const residentesDefault = [
      {
        apartamento: 'A41 A2',
        nombre: 'Wander Marte',
        telefono: '809-845-0000',
        email: 'wander005@gmail.com',
        deuda: 3200
      },
      {
        apartamento: 'A32 B4',
        nombre: 'Daniela Pérez',
        telefono: '809-875-4856',
        email: 'daniela45@gmail.com',
        deuda: 15300
      },
      {
        apartamento: 'C21 D3',
        nombre: 'Juan Rodríguez',
        telefono: '809-912-3456',
        email: 'juanrodriguez@example.com',
        deuda: 12000
      },
      {
        apartamento: 'B12 A1',
        nombre: 'María Gómez',
        telefono: '829-654-7890',
        email: 'maria.gomez@example.com',
        deuda: 17500
      },
      {
        apartamento: 'D45 C2',
        nombre: 'Pedro Martínez',
        telefono: '809-876-5432',
        email: 'pedrom@example.com',
        deuda: 9800
      },
      {
        apartamento: 'A18 B7',
        nombre: 'Lucía Fernández',
        telefono: '809-123-4567',
        email: 'lucia.fernandez@example.com',
        deuda: 21000
      }
    ];

    residentesDefault.forEach(residente => {
      setResidente(residente)
    })

    const pagosDefault = [
      {
        apartamento: 'A41 A2',
        nombre: 'Wander Marte',
        fecha: '18/5/2024',
        monto: 2500
      },
      {
        apartamento: 'C21 D3',
        nombre: 'Juan Rodríguez',
        fecha: '15/5/2024',
        monto: 3000
      },
      {
        apartamento: 'B12 A1',
        nombre: 'María Gómez',
        fecha: '10/5/2024',
        monto: 3500
      },
      {
        apartamento: 'C21 D3',
        nombre: 'Juan Rodríguez',
        fecha: '12/5/2024',
        monto: 1800
      },
      {
        apartamento: 'A18 B7',
        nombre: 'Lucía Fernández',
        fecha: '1/6/2024',
        monto: 4000
      },
      {
        apartamento: 'D45 C2',
        nombre: 'Pedro Martínez',
        fecha: '8/6/2024',
        monto: 2200
      },
      {
        apartamento: 'A32 B4',
        nombre: 'Daniela Pérez',
        fecha: '20/6/2024',
        monto: 1500
      },
      {
        apartamento: 'B12 A1',
        nombre: 'María Gómez',
        fecha: '5/7/2024',
        monto: 3200
      },
      {
        apartamento: 'A18 B7',
        nombre: 'Lucía Fernández',
        fecha: '25/7/2024',
        monto: 3500
      },
      {
        apartamento: 'D45 C2',
        nombre: 'Pedro Martínez',
        fecha: '2/7/2024',
        monto: 1800
      }
    ];

    pagosDefault.forEach(pagos => {
      setPago(pagos);
    })

    registroAnteriorResidentes.forEach(({ deuda }) => {
      sumaDeuda += deuda;
      TDeudas.textContent = `+${sumaDeuda}`
    })

    localStorage.setItem('deuda', sumaDeuda);
    localStorage.setItem(claveEjecucion, 'true');
  }
}

ejecutarCodigoUnaVez();


function actualizarEstadisticas() {
  NResidentes.textContent = `+${registroAnteriorResidentes.length}`;
  NPagos.textContent = `+${registroAnteriorPagos.length}`;
  TDeudas.textContent = `$ ${localStorage.getItem('deuda')}`
}

actualizarEstadisticas()

