/**
 * validacion.js — reglas puras del formulario.
 * No importa Firebase ni toca el DOM: devuelve un objeto { campo: mensaje }.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TELEFONO_RE = /^[0-9+()\s-]{7,20}$/;

export function esEmailValido(valor) {
  return EMAIL_RE.test(String(valor ?? '').trim());
}

export function validarRegistro(datos) {
  const errores = {};
  const nombre = (datos.nombre ?? '').trim();
  const apellidos = (datos.apellidos ?? '').trim();
  const email = (datos.email ?? '').trim();
  const password = datos.password ?? '';
  const confirmacion = datos.confirmacion ?? '';
  const fecha = datos.fechaNacimiento ?? '';
  const direccion = (datos.direccion ?? '').trim();
  const telefono = (datos.telefono ?? '').trim();
  const hoy = new Date().toISOString().slice(0, 10);

  if (nombre.length < 2) {
    errores.nombre = 'Escribe tu nombre (al menos 2 caracteres).';
  }
  if (apellidos.length < 2) {
    errores.apellidos = 'Escribe tus apellidos (al menos 2 caracteres).';
  }
  if (!esEmailValido(email)) {
    errores.email = 'Introduce un correo electrónico válido, por ejemplo nombre@ejemplo.com.';
  }
  if (password.length < 8) {
    errores.password = 'La contraseña debe tener al menos 8 caracteres.';
  }
  if (!confirmacion) {
    errores.confirmacion = 'Repite la contraseña.';
  } else if (password !== confirmacion) {
    errores.confirmacion = 'Las contraseñas no coinciden.';
  }
  if (!fecha) {
    errores.fechaNacimiento = 'Indica tu fecha de nacimiento.';
  } else if (fecha > hoy) {
    errores.fechaNacimiento = 'La fecha de nacimiento no puede ser futura.';
  } else if (fecha < '1900-01-01') {
    errores.fechaNacimiento = 'Revisa la fecha: parece demasiado antigua.';
  }
  if (direccion.length < 5) {
    errores.direccion = 'Escribe una dirección postal completa.';
  }
  if (telefono && !TELEFONO_RE.test(telefono)) {
    errores.telefono = 'El teléfono solo admite números, espacios y + - ( ).';
  }
  if (!datos.rgpd) {
    errores.rgpd = 'Debes aceptar el aviso legal para poder registrarte.';
  }

  return errores;
}

export function validarLogin(datos) {
  const errores = {};
  const email = (datos.email ?? '').trim();

  if (!esEmailValido(email)) {
    errores.email = 'Introduce un correo electrónico válido.';
  }
  if (!(datos.password ?? '')) {
    errores.password = 'Escribe tu contraseña.';
  }

  return errores;
}
