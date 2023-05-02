document
  .getElementById("fetch-holidays-btn")
  .addEventListener("click", fetchHolidays);

function fetchHolidays() {
  const countrySelect = document.getElementById("country-select");
  const countryCode = countrySelect.value;
  fetch(
    `https://date.nager.at/api/v3/PublicHolidays/${new Date().getFullYear()}/${countryCode}`
  )
    .then((response) => response.json())
    .then((holidays) => {
      const holidayList = document.getElementById("holiday-list");
      holidayList.innerHTML = "";
      holidays.forEach((holiday) => {
        const holidayItem = document.createElement("div");
        holidayItem.textContent = `${holiday.name} - ${holiday.date}`;
        holidayList.appendChild(holidayItem);
      });
    })
    .catch((error) => console.error(error));
}

function getWeather() {
  const apiKey = "b22c6d0d385ca34642d56a0b5969866f"; // Replace with your API key
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    document.getElementById("destination").value +
    "&appid=" +
    apiKey;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = data.weather[0].description;
      const temperature = Math.round(data.main.temp - 273.15);
      const weatherResult = `Current weather in ${data.name}: ${weather}. Temperature: ${temperature} °C.`;
      document.getElementById("weather").innerHTML = weatherResult;
    })
    .catch((error) => console.error(error));
}

function getAccommodation() {
  const AIRBNB_API_KEY = 'your-airbnb-api-key-here';
  const location = document.querySelector('#destination').value;

  fetch(`https://api.airbnb.com/v2/search_results?client_id=${AIRBNB_API_KEY}&location=${location}`)
    .then(response => response.json())
    .then(data => {
      const rentals = data.search_results;
      const rentalResult = `Accommodation rentals in ${location}: <ul>`;
      rentals.forEach(rental => {
        rentalResult += `<li>${rental.listing.name}: ${rental.pricing_quote.price_without_guest_fees} per night.</li>`;
      });
      rentalResult += '</ul>';
      document.getElementById("accommodation").innerHTML = rentalResult;
    })
    .catch(error => console.error(error));
}