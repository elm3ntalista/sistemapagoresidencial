const $ = el => document.querySelector(el);
const form = $('#inicio-sesion');
const msgError = $('#msgError');

let email = $('#email').value;
let password = $('#password').value;

function setUsuario(tipo, email, password) {
  const datos = JSON.stringify({ tipo, email, password });
  localStorage.setItem(email, datos);
}
setUsuario('admin', 'admin123@gmail.com', 'residencialpa');
setUsuario('residente', 'residente123@gmail.com', 'residencialpa');

function getUsuario(email) {
  return localStorage.getItem(email);
}

form.addEventListener('change', () => {
  msgError.classList.add('hidden')
})


form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  email = $('#email').value;
  password = $('#password').value;

  const datos = JSON.parse(getUsuario(email));
  if (datos.email === email && datos.password === password) {
    if (datos.tipo === 'admin') {
      window.location.href = "admin.html";
    } else if (datos.tipo === 'residente') {
      window.location.href = "residente.html";
    }
  } else {
    msgError.classList.remove('hidden')
  }
})