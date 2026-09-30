# SHINORA

Landing page estática y responsive para el salón de belleza SHINORA.

## Contenido

- Portada con navegación, llamada a la acción y diseño adaptable a móvil y escritorio.
- Servicios, galería de imágenes, preguntas frecuentes y animaciones.
- Temperatura e icono del clima actual en el encabezado, según la ubicación del visitante.
- Formulario para recordar el nombre del visitante en su navegador.
- Formulario para solicitar una cita por WhatsApp.

## Abrir el sitio

Abre `index.html` en un navegador. Para que la geolocalización funcione, sirve la página desde `localhost` o mediante HTTPS. El navegador solicitará permiso para acceder a la ubicación; si se deniega, el clima no se muestra.

## Clima local

La página usa la API de geolocalización del navegador y consulta la temperatura actual en OpenWeatherMap. En el encabezado solo se muestra la temperatura y su icono.

La clave se configura en `weather-config.js`, archivo excluido de Git. Para preparar una copia local, duplica `weather-config.example.js` como `weather-config.js` y agrega una clave válida de OpenWeatherMap.

Como el sitio es estático, una clave incluida en JavaScript se puede inspeccionar desde el navegador. Para producción, consulta OpenWeatherMap desde un servidor intermediario y restringe o rota la clave.

## Registro local

El formulario solicita únicamente el nombre y consentimiento expreso. Lo guarda en `localStorage` de este navegador para mostrar un saludo al regresar. No se envía a un servidor ni se usa para comunicaciones. El botón **Borrar mis datos guardados** elimina el dato; también se puede borrar desde la configuración del navegador. Los datos no se comparten entre dispositivos o navegadores.

## Reservar una cita

La sección **Reserva tu cita** solicita nombre, servicio, fecha y hora preferidas; el detalle es opcional. Al continuar, abre WhatsApp con la solicitud prellenada para el número `+58 424 000 0000` (el número local `04240000000` convertido al formato internacional requerido por `wa.me`). El visitante debe enviar el mensaje en WhatsApp y SHINORA debe confirmar disponibilidad: la página no crea ni confirma citas automáticamente.

## Accesibilidad, buenas prácticas y SEO

La página incluye idioma español, título y descripción, estructura semántica, enlace para saltar al contenido, etiquetas de formulario, validación del navegador, estados anunciados para tecnologías de asistencia, foco visible y soporte para movimiento reducido. Los tonos de texto secundario están ajustados para superar 4.5:1 de contraste en los fondos claros principales.

El objetivo es mantener al menos 95 en Accessibility, Best Practices y SEO. **Es un objetivo, no una puntuación certificada**: Lighthouse no está instalado en el entorno de desarrollo y no se ha medido una auditoría numérica. Para comprobarlo, sirve el sitio en `localhost` o HTTPS, abre Chrome DevTools → Lighthouse, selecciona esas tres categorías y ejecuta la auditoría en escritorio y móvil. Corrige los hallazgos que informe Lighthouse antes de publicar; la puntuación puede variar según el navegador, red y entorno.