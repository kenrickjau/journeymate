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
  const url =
    "https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels?geoId=294229&checkIn=2023-05-06&checkOut=2023-05-13&pageNumber=1&currencyCode=USD";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "601afdb3b9mshea955cc6a34ebf6p19949bjsn3c028dde0242",
      "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
    },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      const hotelList = data.data.data;

      // Iterate over the hotel data and create a table row for each hotel
      const rows = hotelList.map((hotel) => {
        return `
          <tr>
            <td>${hotel.title}</td>
            <td>${hotel.secondaryInfo}</td>
            <td>${hotel.bubbleRating.rating}</td>
          </tr>
        `;
      });

      // Populate the table body with the rows
      const hotelListElement = document.querySelector("#hotel-list");
      hotelListElement.innerHTML = rows.join("");
    })
    .catch((error) => {
      console.error(error);
    });
}
