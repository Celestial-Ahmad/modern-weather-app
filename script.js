async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const loader = document.getElementById("loader");
  const weatherCard = document.getElementById("weatherCard");
  const errorMessage = document.getElementById("errorMessage");
  const background = document.getElementById("background-animation");

  if (!city) {
    errorMessage.textContent = "Please enter a city name.";
    errorMessage.classList.remove("hidden");
    weatherCard.classList.add("hidden");
    return;
  }

  loader.classList.remove("hidden");
  weatherCard.classList.add("hidden");
  errorMessage.classList.add("hidden");

  try {
    const apiKey = "d3fbabab1c2502ee0dc29ad4025e6056";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`City not found (${response.status})`);
    }

    const data = await response.json();
    const weather = data.weather[0].main.toLowerCase();

    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temperature").textContent = `🌡 ${data.main.temp}°C`;
    document.getElementById("description").textContent = `🌥 ${data.weather[0].description}`;
    document.getElementById("weatherIcon").src =
      `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    setBackground(weather);
    weatherCard.classList.remove("hidden");
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove("hidden");
  } finally {
    loader.classList.add("hidden");
  }
}

function setBackground(weatherType) {
  const background = document.getElementById("background-animation");
  switch (weatherType) {
    case 'clear':
    case 'sunny':
      background.style.backgroundImage = "url('https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1600&q=80')";
      break;
    case 'clouds':
      background.style.backgroundImage = "url('https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1600&q=80')";
      break;
    case 'rain':
    case 'drizzle':
      background.style.backgroundImage = "url('https://images.unsplash.com/photo-1505205296326-2178af1b47bf?auto=format&fit=crop&w=1600&q=80')";
      break;
    case 'thunderstorm':
      background.style.backgroundImage = "url('https://images.unsplash.com/photo-1609344332625-dcafb3b92675?auto=format&fit=crop&w=1600&q=80')";
      break;
    case 'snow':
      background.style.backgroundImage = "url('https://images.unsplash.com/photo-1608889175117-5dd5a6b13884?auto=format&fit=crop&w=1600&q=80')";
      break;
    case 'mist':
    case 'fog':
      background.style.backgroundImage = "url('https://images.unsplash.com/photo-1600423115364-f7fa3a8c8963?auto=format&fit=crop&w=1600&q=80')";
      break;
    default:
      background.style.backgroundImage = "url('https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1600&q=80')";
  }
}
