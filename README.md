# MurciaGram · Registro y autenticación

Extensión de la galería **MurciaGram** con registro y login. HTML, CSS y
JavaScript nativos; Firebase (Authentication y Cloud Firestore) como backend.

## 1. Ejecutar en local

Los módulos ES de Firebase necesitan HTTP (no funcionan con `file://`). Desde
esta carpeta:

```powershell
python -m http.server 8123
```

Abre <http://localhost:8123/index.html>. También funciona Live Server en VS Code.

## 2. Estructura

```
index.html          Galería original + icono de acceso
registro.html       Formulario de registro
login.html          Formulario de autenticación
privacidad.html     Aviso RGPD/LOPDGDD
css/reset.css       Normalización (copia de la tarea anterior)
css/styles.css      Estilos de la galería (copia de la tarea anterior)
css/auth.css        Estilos de los formularios
js/firebase.js      Configuración y llamadas a Firebase
js/validacion.js    Reglas de validación
js/app.js           Eventos y mensajes
firestore.rules     Reglas de seguridad
design.md           Sistema de diseño
docs/               Memoria, prompts y capturas
```

## 3. Firebase ya configurado

La aplicación ya apunta al proyecto Firebase de esta entrega desde
`js/firebase.js`; no crees otro proyecto ni sustituyas esos valores si vas a
usar el ya preparado. En Firebase Console, comprueba que están habilitados
**Authentication → Correo electrónico/contraseña**, Firestore y el dominio
`localhost` en **Authentication → Dominios autorizados**.

Las reglas de `firestore.rules` se han endurecido en esta versión. Pégalas en
**Firestore → Reglas** y publícalas; después sigue la lista de comprobación de
la memoria para probar registro, inicio de sesión y escrituras. No publiques
credenciales administrativas en el cliente.

## 4. Modelo de datos

```
users/{uid}                  nombre, apellidos, email, fechaNacimiento,
                             direccion, telefono, creadoEn
users/{uid}/accesos/{id}     fecha (serverTimestamp), tipo = "registro" | "acceso"
```

**No se guarda ninguna contraseña en Firestore.** Las credenciales las gestiona
Firebase Authentication.

## 5. Seguridad

- Las reglas limitan el acceso al `uid` autenticado y validan los campos del
  perfil y del historial.
- El historial de accesos solo se puede crear y leer, nunca editar ni borrar.
- La API key de una app web es pública; la protección son las reglas y los
  dominios autorizados.
- El historial escrito directamente desde el navegador no es un registro de
  auditoría inviolable: un usuario autenticado puede intentar crear eventos
  propios que cumplan las reglas.
- Las validaciones de JavaScript son complementarias: Firebase comprueba la
  identidad en el servidor.

## 6. Pendiente antes de publicar

- Para esta práctica académica, el contacto de `privacidad.html` es ficticio y
  no operativo; no hace falta publicar un correo personal. Usa datos ficticios
  al probar la aplicación.
- Si la aplicación se publica para usuarios reales, sustituir el contacto de
  demostración y revisar el aviso de privacidad completo.
- Comprobar la ubicación de Firestore y completar la información de privacidad
  sobre el proveedor y las transferencias aplicables antes de una publicación
  real.
- Ejecutar las pruebas reales descritas en `docs/memoria.md`.

## 7. Documentación

- `design.md` — sistema de diseño.
- `docs/memoria.md` — proceso y herramientas de IA.
- `docs/prompts.md` — prompts y revisiones.
- `docs/capturas/` — capturas de pantalla.
