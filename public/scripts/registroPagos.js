const $ = el => document.querySelector(el)
const volver = $('#pagos-volver-atras');

volver.addEventListener('click', () => {
  window.location.href = 'admin.html'
})

const registroPagos = 'registroPagos';
const $tabla = $('#tabla-registro-pagos');

const registro = JSON.parse(localStorage.getItem(registroPagos)) || [];

registro.forEach(residente => {
  for (propiedad in residente) {
    const p = document.createElement('p');
    p.classList.add('basis-1/4', 'px-1', 'bg-orange-400');
    p.textContent = residente[propiedad];
    $tabla.appendChild(p)
  }
});


