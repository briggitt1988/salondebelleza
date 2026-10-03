# SHINORA

Landing page estática y responsive para el salón de belleza SHINORA.

## Contenido

- Portada con navegación, llamada a la acción y diseño adaptable a móvil y escritorio.
- Servicios, galería de imágenes, preguntas frecuentes y animaciones.
- Temperatura e icono del clima actual en el encabezado, según la ubicación del visitante.
- Formulario para recordar el nombre del visitante en su navegador.
- Formulario para solicitar una cita por WhatsApp.

## Abrir el sitio

Abre `index.html` en un navegador. Para que la geolocalización funcione, sirve la página desde `localhost` o mediante HTTPS. El navegador solicitará permiso para acceder a la ubicación; si se deniega o falla la consulta del clima, el header conserva una temperatura predeterminada de 24°.

## API: geolocalización y clima

- El sitio usa la API de geolocalización del navegador para detectar la ubicación actual del visitante.
- Con esa ubicación, consulta la API de OpenWeatherMap para obtener la temperatura actual y el ícono asociado.
- En el header solo se muestra la temperatura y el ícono del clima; no se muestra descripción textual ni otra información meteorológica.
- Mientras se obtiene la ubicación y como respaldo si no está disponible, se muestra 24° con un ícono predeterminado. Ese valor es referencial, no una lectura meteorológica actual.
- La clave de OpenWeatherMap se configura en `weather-config.js`, archivo que puede mantenerse local y no compartirse en Git.
- Para que la solicitud funcione correctamente, la página debe servirse desde `localhost` o mediante HTTPS.

### Ejemplo de uso

1. El navegador solicita permiso para acceder a la ubicación.
2. Si se acepta, se obtiene latitud y longitud.
3. Se consulta OpenWeatherMap con esos datos.
4. Se renderiza solo la temperatura actual y el icono climático en el encabezado.

Como el sitio es estático, la clave queda visible en el cliente; para producción se recomienda usar un backend intermedio para protegerla.

## Registro local

El formulario solicita únicamente el nombre y consentimiento expreso. Lo guarda en `localStorage` de este navegador para mostrar un saludo al regresar. No se envía a un servidor ni se usa para comunicaciones. El botón **Borrar mis datos guardados** elimina el dato; también se puede borrar desde la configuración del navegador. Los datos no se comparten entre dispositivos o navegadores.

## Reservar una cita

La sección **Reserva tu cita** solicita nombre, servicio, fecha y hora preferidas; el detalle es opcional. Al continuar, abre WhatsApp con la solicitud prellenada para el número `+58 424 000 0000` (el número local `04240000000` convertido al formato internacional requerido por `wa.me`). El visitante debe enviar el mensaje en WhatsApp y SHINORA debe confirmar disponibilidad: la página no crea ni confirma citas automáticamente.

## Ajuste de tipografía

Se corrigió la legibilidad de la landing page para evitar fuentes demasiado finas o poco claras. La tipografía se reforzó para mantener un aspecto elegante y premium sin perder claridad.

### Cambios aplicados

- Se reemplazó la fuente principal por una alternativa más robusta y legible: `Roboto` de Google Fonts.
- Se aumentó el peso visual en los títulos y mensajes de bienvenida para evitar texturas demasiado delgadas.
- Se ajustó el interlineado y la altura de línea para mejorar la lectura en desktop y móvil.
- Se mantuvo una combinación con `DM Sans` para el cuerpo y la navegación, equilibrando elegancia y claridad.
- Se activó el suavizado anti-aliasing para mejorar la experiencia visual en navegadores modernos.

### Resultado esperado

- Encabezados y saludos más cómodos de leer.
- Mejor legibilidad del texto principal y de mensajes tipo “ya estás en casa”.
- Estética premium con una lectura más nítida y menos forzada.

## Correcciones adicionales aplicadas

### Clima y geolocalización

Se reinstaló la carga de `weather-config.js` para que la clave de OpenWeatherMap se registre correctamente en la página. La lógica del clima solicita permiso de geolocalización si la clave existe y el navegador lo permite. Para que esto funcione, la página debe abrirse desde `localhost` o HTTPS.

### Favicon y validación HTML

Se sustituyó el favicon inline problemático por un archivo real `favicon.svg` para evitar errores de validación por `href` inválido. Esto elimina la advertencia de HTML sobre caracteres no válidos en la URL del icono.

### Enlace del logo al inicio

Se ajustó el comportamiento del logo y el botón “Volver arriba” para que lleven al inicio de la página sin ocultar el anuncio superior. Se añadió un punto de ancla real y un desplazamiento compensado para respetar la cabecera.

## Accesibilidad, buenas prácticas y SEO

La página incluye idioma español, título y descripción, estructura semántica, enlace para saltar al contenido, etiquetas de formulario, validación del navegador, estados anunciados para tecnologías de asistencia, foco visible y soporte para movimiento reducido. Los textos pequeños tienen al menos 12 px y los pares de texto/fondo de contenido se ajustan para superar 4.5:1; las leyendas sobre imágenes tienen una base oscura opaca.

El objetivo es mantener al menos 95 en Accessibility, Best Practices y SEO. **Es un objetivo, no una puntuación certificada**: Lighthouse no está instalado en el entorno de desarrollo y no se ha medido una auditoría numérica. Para comprobarlo, sirve el sitio en `localhost` o HTTPS, abre Chrome DevTools → Lighthouse, selecciona esas tres categorías y ejecuta la auditoría en escritorio y móvil. Corrige los hallazgos que informe Lighthouse antes de publicar; la puntuación puede variar según el navegador, red y entorno.