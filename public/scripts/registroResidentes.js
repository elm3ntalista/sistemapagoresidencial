const $ = el => document.querySelector(el)
const registroResidentes = 'registroResidentes';
const volver = $('#volver-atras');
const $tabla = $('#tabla-registro-residentes');

volver.addEventListener('click', () => {
  window.location.href = "admin.html";
})

const registro = JSON.parse(localStorage.getItem(registroResidentes)) || [];

registro.forEach(residente => {
  for (propiedad in residente) {
    const p = document.createElement('p');
    p.classList.add('basis-1/4', 'px-1', 'bg-orange-400');
    p.textContent = residente[propiedad];
    $tabla.appendChild(p)
  }
});

