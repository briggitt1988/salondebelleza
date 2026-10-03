const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");
    siteNav.classList.remove("is-open");
  }
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelector("#year").textContent = new Date().getFullYear();

const visitorForm = document.querySelector("#visitor-form");
const visitorSaved = document.querySelector("#visitor-saved");
const visitorGreeting = document.querySelector("#visitor-greeting");
const visitorStatus = document.querySelector("#visitor-status");
const visitorStorageKey = "shinora.visitor.v2";

function showSavedVisitor(visitor) {
  visitorGreeting.textContent = `Hola, ${visitor.name}. Qué gusto verte de nuevo.`;
  visitorForm.hidden = true;
  visitorSaved.hidden = false;
}

try {
  localStorage.removeItem("shinora.visitor.v1");
  const savedVisitor = JSON.parse(localStorage.getItem(visitorStorageKey));
  if (savedVisitor && typeof savedVisitor.name === "string") {
    showSavedVisitor(savedVisitor);
  }
} catch {
  visitorStatus.textContent = "No fue posible leer los datos guardados en este navegador.";
}

visitorForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!visitorForm.reportValidity()) return;

  const visitor = { name: visitorForm.elements.name.value.trim() };

  if (!visitor.name) {
    visitorStatus.textContent = "Escribe tu nombre para continuar.";
    return;
  }

  try {
    localStorage.setItem(visitorStorageKey, JSON.stringify(visitor));
    visitorStatus.textContent = "";
    showSavedVisitor(visitor);
    visitorGreeting.focus();
  } catch {
    visitorStatus.textContent = "No se pudieron guardar tus datos. Revisa la configuración de almacenamiento del navegador.";
  }
});

document.querySelector("#forget-visitor").addEventListener("click", () => {
  try {
    localStorage.removeItem(visitorStorageKey);
    visitorSaved.hidden = true;
    visitorForm.hidden = false;
    visitorForm.reset();
    visitorStatus.textContent = "Tus datos guardados se eliminaron de este dispositivo.";
    visitorForm.elements.name.focus();
  } catch {
    visitorStatus.textContent = "No se pudieron eliminar los datos de este navegador.";
  }
});

const bookingForm = document.querySelector("#booking-form");
const bookingDate = document.querySelector("#booking-date");
const bookingStatus = document.querySelector("#booking-status");
const whatsappPhone = "584240000000";

const localToday = new Date();
localToday.setMinutes(localToday.getMinutes() - localToday.getTimezoneOffset());
bookingDate.min = localToday.toISOString().slice(0, 10);

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;

  const formData = new FormData(bookingForm);
  const message = [
    "Hola, SHINORA. Quisiera solicitar una cita.",
    `Nombre: ${formData.get("name").trim()}`,
    `Servicio: ${formData.get("service")}`,
    `Fecha preferida: ${formData.get("date")}`,
    `Hora preferida: ${formData.get("time")}`,
    formData.get("message").trim() ? `Detalle: ${formData.get("message").trim()}` : "",
  ].filter(Boolean).join("\n");
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
  const whatsappLink = document.createElement("a");

  whatsappLink.href = whatsappUrl;
  whatsappLink.target = "_blank";
  whatsappLink.rel = "noopener noreferrer";
  whatsappLink.click();
  bookingStatus.textContent = "WhatsApp se abrió con tu solicitud. Envíala para coordinar la cita.";
});

const weatherApiKey = window.SHINORA_WEATHER_API_KEY;
const weatherWidget = document.querySelector("#weather-widget");
const weatherIcon = document.querySelector("#weather-icon");
const weatherTemperature = document.querySelector("#weather-temperature");
const defaultWeather = { temperature: 24, icon: "01d" };

function showDefaultWeather() {
  if (!weatherWidget || !weatherIcon || !weatherTemperature) return;

  weatherIcon.src = `https://openweathermap.org/img/wn/${defaultWeather.icon}.png`;
  weatherIcon.alt = "Ícono de clima predeterminado";
  weatherTemperature.textContent = `${defaultWeather.temperature}°`;
  weatherWidget.setAttribute("aria-label", `Temperatura predeterminada: ${defaultWeather.temperature} grados Celsius`);
  weatherWidget.hidden = false;
}

function showLocalWeather(position) {
  if (!weatherApiKey || !weatherWidget || !weatherIcon || !weatherTemperature) return;

  const { latitude, longitude } = position.coords;
  const query = new URLSearchParams({
    lat: latitude,
    lon: longitude,
    appid: weatherApiKey,
    units: "metric",
    lang: "es",
  });

  fetch(`https://api.openweathermap.org/data/2.5/weather?${query}`)
    .then((response) => {
      if (!response.ok) throw new Error("No se pudo obtener el clima");
      return response.json();
    })
    .then((weather) => {
      const temperature = Math.round(weather.main.temp);
      const description = weather.weather[0].description;
      weatherIcon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;
      weatherIcon.alt = "Icono del clima";
      weatherTemperature.textContent = `${temperature}°`;
      weatherWidget.setAttribute("aria-label", `${temperature} grados, ${description}`);
      weatherWidget.hidden = false;
    })
    .catch((error) => {
      console.error("SHINORA: error al consultar OpenWeatherMap.", error);
      showDefaultWeather();
    });
}

showDefaultWeather();

if (weatherApiKey && "geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(showLocalWeather, (error) => {
    console.info("SHINORA: geolocalización no disponible o denegada.", error.code);
    showDefaultWeather();
  }, { enableHighAccuracy: false, maximumAge: 600000, timeout: 10000 });
}