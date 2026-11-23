# Prompts y revisión humana

Selección de instrucciones usadas con **OpenCode (Big Pickle)** y las revisiones
pasadas a **GitHub Copilot en VS Code**. No se cita ningún modelo de clase.

## 1. Prompts de generación

### Prompt 1 — Encargo inicial

> Copia la galería MurciaGram del Escritorio a una carpeta nueva y crea el
> registro y el login con Firebase Authentication y Cloud Firestore. Incluye
> validaciones, mostrar/ocultar contraseña, reglas de seguridad y RGPD. Hazlo
> lo más sencillo y fácil de defender posible, sin tocar la entrega original.

### Prompt 2 — Diseño antes de programar

> Extrae los tokens reales de `css/styles.css` (colores, tipografía, radios,
> sombras y breakpoints) y guárdalos en `design.md`. Los formularios deben
> usar esas mismas variables. Si hace falta algo nuevo, márcalo como
> EXTENSIÓN y justifícalo.

### Prompt 3 — Firebase

> Usa el SDK modular por CDN. Aísla las llamadas en `js/firebase.js`, guarda
> los datos adicionales en `users/{uid}` y la fecha de acceso en
> `users/{uid}/accesos/{id}`. Nunca guardes contraseñas en Firestore. Escribe
> `firestore.rules` para que cada usuario solo vea lo suyo.

## 2. Prompts de revisión (GitHub Copilot en VS Code)

### Revisión funcional

> Revisa `registro.html`, `login.html`, `js/validacion.js` y `js/app.js`:
> etiquetas, `aria-describedby`, mensajes de error, botón de mostrar/ocultar
> contraseña y estilos inline. Propón solo parches mínimos.

### Revisión de seguridad

> Revisa `js/firebase.js` y `firestore.rules`: que no se guarde la contraseña,
> que cada `uid` solo vea lo suyo y que no haya dependencias innecesarias. Si
> algo no lo pide el enunciado, di que se descarte.

## 3. Modificaciones relevantes

| Sugerencia | Decisión | Motivo |
|---|---|---|
| Generar los formularios con React | Descartado | El enunciado usa HTML/CSS/JS nativos. |
| Instalar `firebaseui` | Descartado | Añade dependencia y no respeta el diseño. |
| Extraer primero los tokens a `design.md` | Aceptado | Es la referencia visual exigida. |
| Usar un rojo nuevo para errores | Modificado | Se reutiliza el terracota de la galería. |
| `outline: none` en los campos | Descartado | Quita el foco visible. |
| Quitar `required` del HTML | Modificado | Se conserva y se añade `novalidate`. |
| Validaciones de contraseña muy estrictas | Modificado | Solo longitud mínima de 8. |
| Guardar accesos en una colección global | Descartado | Mejor anidados bajo `users/{uid}`. |
| Spinner animado en el botón | Modificado | Basta con “Enviando…” y `disabled`. |
| Estilos inline en el perfil | Descartado | El perfil no se pide en el enunciado. |
| API key en un `.env` de cliente | Descartado | En una web estática no se puede ocultar. |
