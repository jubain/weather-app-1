window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDeg = document.querySelector('.temperature-degree');
    let temperatureDesc = document.querySelector('.temperature-description');
    let locationTimezone = document.querySelector('.location-timezone');
    let user_icon = document.querySelector('#icon');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            /* const api = `http://api.openweathermap.org/data/2.5/weather?lat=${long}&lon=${lat}&appid=73f4b993a6e76b5fade816c8b35b9930 `; */
            const api = `http://api.openweathermap.org/data/2.5/weather?q=london&appid=73f4b993a6e76b5fade816c8b35b9930 `;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data.main);
                    //pull every thing from main 
                    const temp = data.main.temp;
                    const desc = data.weather[0].description;
                    const humidity = data.main.humidity;
                    const icon = data.weather[0].icon;

                    //set Dom Elements from the API
                    const celcius = temp - 273.15;

                    temperatureDeg.textContent = celcius.toFixed(2);
                    temperatureDesc.textContent = desc;
                    locationTimezone.textContent = "Humidity " + humidity;
                    user_icon.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);



                    //change temp c to f vice versa
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "C") {
                            temperatureSpan.textContent = "F"
                            temperatureDeg.textContent = temp;
                        } else {
                            temperatureSpan.textContent = "C"
                            temperatureDeg.textContent = celcius.toFixed(2);
                        }
                    })
                }).catch((error) => {
                    console.log(error);
                })
        });

    }
    /* const api = `http://api.openweathermap.org/data/2.5/weather?q=London&appid=d411b8b60b07c93c9a4b262fbcdd9d75
    `; */


});