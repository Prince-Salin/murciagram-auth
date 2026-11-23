# Memoria del proyecto

## 1. Objetivo

Ampliar la galería **MurciaGram** con un sistema de registro y autenticación
que mantenga su identidad visual, usando IA como apoyo y Firebase como backend.

## 2. Herramientas de IA

| Fase | Herramienta | Proveedor / modelo | Coste |
|---|---|---|---|
| Análisis, diseño, implementación y memoria | OpenCode | Big Pickle | No se contrató ningún servicio de pago para el proyecto |
| Revisión en el editor | GitHub Copilot en VS Code | GitHub Copilot | Plan de GitHub (gratuito o de pago según la cuenta) |

El enunciado permite elegir cualquier agente, así que no se usó ningún modelo
de clase. Las dificultades están en el apartado 4.

## 3. Proceso

1. Análisis del enunciado y localización de la galería anterior.
2. Extracción de tokens de `css/styles.css` a `design.md`.
3. Copia independiente del proyecto para no romper la entrega anterior.
4. Formularios, validaciones y estilos con esos tokens.
5. Firebase: Authentication, Firestore y reglas de seguridad.
6. Revisión con Copilot y decisión humana sobre cada cambio (`prompts.md`).
7. Pruebas manuales y capturas.

## 4. Dificultades

- Configuración de Firebase en varios sitios: proveedor de correo, base de
  datos, dominios autorizados y reglas.
- Los módulos ES del SDK requieren HTTP; se usa `python -m http.server`.
- La ubicación de Firestore debe confirmarse en la consola y reflejarse
  correctamente en el aviso de privacidad antes de publicar.

## 5. Matriz requisito → código

| Requisito | Dónde se cumple |
|---|---|
| `design.md` con tokens | `design.md` |
| Campos de registro | `registro.html` |
| Correo como identificador y regex | `js/validacion.js` |
| Contraseña oculta y botón mostrar/ocultar | `js/app.js` e iconos `eye*.svg` |
| Contraseñas coincidentes | `js/validacion.js` |
| Mensajes claros y bloqueo de envío | `js/app.js`, `novalidate` |
| Aviso RGPD/LOPDGDD | Checkbox en `registro.html` + `privacidad.html` |
| Login y enlaces entre páginas | `login.html` y `registro.html` |
| Icono de acceso en la galería | `index.html` y `css/auth.css` |
| Estilos, focus y responsive | `css/auth.css` |
| Credenciales en Authentication | `js/firebase.js` → `registrar()` |
| Datos adicionales en Firestore | `js/firebase.js` → `registrar()` |
| Fecha y hora de acceso | `js/firebase.js` → `guardarAcceso()` |
| Sin contraseñas en Firestore | Modelo de datos en `README.md` |
| Reglas de seguridad | `firestore.rules` |
| Uso de IA, prompts y revisiones | `docs/prompts.md` |

## 6. Capturas

En `docs/capturas/`: galería con el icono de acceso, registro, error de
validación, login y aviso legal.

## 7. Comprobaciones pendientes para la entrega

Firebase ya está configurado para este proyecto. Antes de entregar:

1. En Firebase Console, confirmar que Correo electrónico/contraseña está
   habilitado, Firestore está disponible y `localhost` figura como dominio
   autorizado.
2. Publicar las reglas actualizadas de `firestore.rules`.
3. Servir el proyecto por HTTP y registrar una cuenta de prueba. Confirmar en
   Authentication que se creó el usuario y en Firestore que `users/{uid}` y
   `users/{uid}/accesos/{id}` contienen los datos previstos, sin contraseña.
4. Iniciar sesión con esa cuenta y confirmar que aparece otra entrada de
   acceso. Probar también un correo incorrecto y una contraseña errónea.
5. Si un perfil o un acceso no se guarda, revisar la consola del navegador y
   los errores de Firestore; la aplicación muestra un aviso cuando el acceso
   al historial falla.
6. Para la entrega académica, mantener claro que el contacto de
   `privacidad.html` es ficticio y usar solo datos de prueba. Si se publica para
   usuarios reales, sustituirlo por un contacto operativo y verificar la
   ubicación de Firestore y la información aplicable sobre transferencias.
7. Volver a tomar las capturas después de esas pruebas, sin incluir
   contraseñas ni datos personales reales.

## 8. Conclusión

La galería original solo cambia para añadir el icono de acceso; los formularios
usan los mismos tokens y Firebase queda aislado en un solo archivo. Toda la
IA propuso cambios que se revisaron antes de aceptarlos.
