/**
 * app.js — comportamiento de registro.html y login.html:
 * mostrar/ocultar contraseña, validaciones y envío a Firebase.
 */

import { registrar, entrar } from './firebase.js';
import { validarRegistro, validarLogin } from './validacion.js';

const $ = (selector) => document.querySelector(selector);

const MENSAJES_FIREBASE = {
  'auth/invalid-email': 'El correo no tiene un formato válido.',
  'auth/email-already-in-use': 'Ya existe una cuenta con ese correo. Prueba a iniciar sesión.',
  'auth/weak-password': 'Firebase exige una contraseña de al menos 6 caracteres.',
  'auth/invalid-credential': 'Correo o contraseña incorrectos.',
  'auth/user-not-found': 'No encontramos ninguna cuenta con ese correo.',
  'auth/wrong-password': 'Contraseña incorrecta.',
  'auth/too-many-requests': 'Demasiados intentos. Espera un momento y vuelve a probar.',
  'auth/network-request-failed': 'No se pudo conectar. Revisa tu conexión e inténtalo de nuevo.',
  'firestore/permission-denied': 'Firebase ha rechazado la operación. Comprueba las reglas de Firestore.'
};

function mensajeError(error) {
  return MENSAJES_FIREBASE[error?.code] ||
    error?.message ||
    'Se ha producido un error. Inténtalo de nuevo.';
}

function valor(formulario, nombre) {
  return formulario.elements[nombre]?.value ?? '';
}

function limpiarErrores(formulario) {
  formulario.querySelectorAll('.is-invalid').forEach((elemento) => {
    elemento.classList.remove('is-invalid');
  });
  formulario.querySelectorAll('.field__error').forEach((elemento) => {
    elemento.textContent = '';
  });
  const aviso = $('#aviso-general');
  if (aviso) {
    aviso.hidden = true;
    aviso.textContent = '';
  }
}

function mostrarErrores(formulario, errores) {
  Object.entries(errores).forEach(([campo, mensaje]) => {
    const contenedor = formulario.querySelector(`[data-error-for="${campo}"]`);
    if (!contenedor) return;
    contenedor.textContent = mensaje;
    contenedor.closest('.field, .consent')?.classList.add('is-invalid');
  });
  const primero = formulario.querySelector('.is-invalid input, .is-invalid textarea');
  if (primero) primero.focus();
}

function mostrarAviso(mensaje) {
  const aviso = $('#aviso-general');
  if (!aviso) return;
  aviso.textContent = mensaje;
  aviso.hidden = false;
}

function cargando(formulario, activo) {
  const boton = formulario.querySelector('[type="submit"]');
  if (!boton) return;
  if (!boton.dataset.texto) boton.dataset.texto = boton.textContent;
  boton.disabled = activo;
  boton.textContent = activo ? 'Enviando…' : boton.dataset.texto;
}

function borrarErrorAlEscribir(formulario) {
  formulario.querySelectorAll('input, textarea').forEach((campo) => {
    const evento = campo.type === 'checkbox' ? 'change' : 'input';
    campo.addEventListener(evento, () => {
      const contenedor = formulario.querySelector(`[data-error-for="${campo.name}"]`);
      if (!contenedor) return;
      contenedor.textContent = '';
      contenedor.closest('.field, .consent')?.classList.remove('is-invalid');
    });
  });
}

function iniciarOjos() {
  document.querySelectorAll('[data-toggle-password]').forEach((boton) => {
    boton.addEventListener('click', () => {
      const campo = document.getElementById(boton.dataset.togglePassword);
      if (!campo) return;
      const mostrar = campo.type === 'password';
      campo.type = mostrar ? 'text' : 'password';
      boton.classList.toggle('is-visible', mostrar);
      boton.setAttribute('aria-pressed', String(mostrar));
      boton.setAttribute('aria-label', mostrar ? 'Ocultar contraseña' : 'Mostrar contraseña');
      campo.focus();
    });
  });
}

function iniciarRegistro() {
  const formulario = $('#form-registro');
  if (!formulario) return;

  formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    limpiarErrores(formulario);

    const datos = {
      nombre: valor(formulario, 'nombre'),
      apellidos: valor(formulario, 'apellidos'),
      email: valor(formulario, 'email'),
      password: valor(formulario, 'password'),
      confirmacion: valor(formulario, 'confirmacion'),
      fechaNacimiento: valor(formulario, 'fechaNacimiento'),
      direccion: valor(formulario, 'direccion'),
      telefono: valor(formulario, 'telefono'),
      rgpd: formulario.elements.rgpd.checked
    };

    const errores = validarRegistro(datos);
    if (Object.keys(errores).length) {
      mostrarErrores(formulario, errores);
      return;
    }

    cargando(formulario, true);
    try {
      const resultado = await registrar(datos);
      formulario.hidden = true;
      $('#registro-exito').hidden = false;
      if (!resultado.accesoRegistrado) {
        $('#aviso-registro-acceso').hidden = false;
      }
    } catch (error) {
      mostrarAviso(mensajeError(error));
    } finally {
      cargando(formulario, false);
    }
  });

  borrarErrorAlEscribir(formulario);
}

function iniciarLogin() {
  const formulario = $('#form-login');
  if (!formulario) return;

  formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    limpiarErrores(formulario);

    const errores = validarLogin({
      email: valor(formulario, 'email'),
      password: valor(formulario, 'password')
    });
    if (Object.keys(errores).length) {
      mostrarErrores(formulario, errores);
      return;
    }

    cargando(formulario, true);
    try {
      const resultado = await entrar(valor(formulario, 'email'), valor(formulario, 'password'));
      if (resultado.accesoRegistrado) {
        window.location.href = 'index.html';
      } else {
        formulario.hidden = true;
        $('#aviso-acceso-fallido').hidden = false;
      }
    } catch (error) {
      mostrarAviso(mensajeError(error));
    } finally {
      cargando(formulario, false);
    }
  });

  borrarErrorAlEscribir(formulario);
}

document.querySelectorAll('input[type="date"]').forEach((campo) => {
  campo.max = new Date().toISOString().slice(0, 10);
});

iniciarOjos();
iniciarRegistro();
iniciarLogin();
