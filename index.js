// try {
//   const parsedText = JSON.parse('{"name":"Tomasz""}');
//   console.log(parsedText);
// } catch (error) {
//   console.log("Dane są błedne:", error);
// }

// const sayHello = (name) => {
//   if (typeof name == "undefined") {
//     throw new Error("Funkcja musi otrzymać imie!");
//   }
//   return `Hello ${name}`;
// };

// console.log(111);

// const url = "https://randomfox.ca/";
// fetch(`${url}floof/`, {
//   method: "GET",
// }).then((response) => response.json().then((data) => console.log(data)));

// axios
//   .post(`'http://51.75.120.145:3000/todo'`, { data: "cos" })
//   .then((response) => console.log(response));

const container = document.querySelector(".container");
const search = document.querySelector(".search button");
const weatherCon = document.querySelector(".weather");
const weatherDetail = document.querySelector(".weather-details");
const errorDiv = document.querySelector(".error");
const error404 = document.querySelector(".error_404");
const errorInput = document.querySelector(".error_input");

search.addEventListener("click", () => {
  const APIKey = "822455dad6e6856599ef428eb5a5d9d5";
  const city = document.querySelector(".search input").value;
  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

  if (city === "") {
    error404.style.display = "none";
    container.style.height = "200px";
    weatherCon.style.display = "none";
    weatherDetail.style.display = "none";
    errorDiv.style.display = "block";
    errorInput.style.display = "block";
    errorDiv.classList.add("fade-in");
    return;
  }

  axios
    .get(APIUrl)
    .then((data) => {
      console.log(data);
      error404.style.display = "none";
      errorDiv.style.display = "none";
      errorInput.style.display = "block";
      errorDiv.classList.remove("fade-in");

      const image = document.querySelector(".weather img");
      const temp = document.querySelector(".weather .temperature");
      const description = document.querySelector(".weather .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (data.data.weather[0].main) {
        case "Clear":
          image.src = "./assets/day.svg";
          break;
        case "Rain":
          image.src = "./assets/rain.svg";
          break;
        case "Snow":
          image.src = "./assets/snow.svg";
          break;
        case "Clouds":
          image.src = "./assets/cloudy.svg";
          break;
        case "Haze":
          image.src = "./assets/thunder.svg";
          break;
        default:
          image.src = "";
      }

      temp.innerHTML = `${parseInt(data.data.main.temp)} °C`;
      description.innerHTML = `${data.data.weather[0].description}`;
      humidity.innerHTML = `${parseInt(data.data.main.humidity)} %`;
      wind.innerHTML = `${parseInt(data.data.wind.speed)} km/h`;

      weatherCon.style.display = "";
      weatherDetail.style.display = "";
      weatherCon.classList.add("fade-in");
      weatherDetail.classList.add("fade-in");
      container.style.height = "600px";
    })
    .catch((error) => {
      console.log(error);
      errorInput.style.display = "none";
      container.style.height = "405px";
      weatherCon.style.display = "none";
      weatherDetail.style.display = "none";
      errorDiv.style.display = "block";
      error404.style.display = "block";
      errorDiv.classList.add("fade-in");
    });
});
