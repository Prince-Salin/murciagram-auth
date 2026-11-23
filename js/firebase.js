/**
 * firebase.js — única puerta de entrada a Firebase.
 * El resto del código NO importa el SDK directamente.
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser
} from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js';
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyAudUzz_ndEkvPoOFsWQsdDFNKG4QhLlm8",
  authDomain: "murciagram-auth.firebaseapp.com",
  projectId: "murciagram-auth",
  storageBucket: "murciagram-auth.firebasestorage.app",
  messagingSenderId: "1058366250550",
  appId: "1:1058366250550:web:c3d2937fe33c206bb38297",
  measurementId: "G-XFDEGBHJ85"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/** Registra la fecha y hora del acceso. Nunca guarda contraseñas. */
export async function guardarAcceso(uid, tipo) {
  return addDoc(collection(db, 'users', uid, 'accesos'), {
    fecha: serverTimestamp(),
    tipo
  });
}

/** Crea la credencial en Authentication y los datos adicionales en Firestore. */
export async function registrar(datos) {
  const credencial = await createUserWithEmailAndPassword(
    auth,
    datos.email.trim(),
    datos.password
  );
  const uid = credencial.user.uid;

  try {
    await setDoc(doc(db, 'users', uid), {
      nombre: datos.nombre.trim(),
      apellidos: datos.apellidos.trim(),
      email: credencial.user.email,
      fechaNacimiento: datos.fechaNacimiento,
      direccion: datos.direccion.trim(),
      telefono: datos.telefono.trim(),
      creadoEn: serverTimestamp()
    });
  } catch (error) {
    try {
      await deleteUser(credencial.user);
    } catch (rollbackError) {
      console.error('No se pudo eliminar la cuenta tras fallar el perfil:', rollbackError);
      throw new Error(
        'No se pudo guardar el perfil y tampoco eliminar la cuenta creada. ' +
        'Contacta con la persona responsable antes de volver a intentarlo.'
      );
    }
    throw error;
  }

  let accesoRegistrado = true;
  try {
    await guardarAcceso(uid, 'registro');
  } catch (error) {
    console.error('Cuenta creada, pero no se pudo registrar el acceso:', error);
    accesoRegistrado = false;
  }

  return { accesoRegistrado };
}

/** Autentica y guarda la fecha y hora del acceso. */
export async function entrar(email, password) {
  const credencial = await signInWithEmailAndPassword(auth, email.trim(), password);
  let accesoRegistrado = true;
  try {
    await guardarAcceso(credencial.user.uid, 'acceso');
  } catch (error) {
    console.error('Sesión iniciada, pero no se pudo registrar el acceso:', error);
    accesoRegistrado = false;
  }
  return { accesoRegistrado };
}
