const results = document.getElementById("results");
const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const apiKey = 'c4f86ece00bc8aa272652ac9065af12d'; // Replace 'YOUR_API_KEY' with your actual API key

function clear() {
    const resultDiv = document.getElementById('results');
    resultDiv.innerHTML = '';
    const input = document.getElementById('conditionInput');
    input.value = '';
}

function search() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('results');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let resultsData = [];
            let flag = false;
            if (input.includes('countr')) {
                resultsData = data.countries;
                flag = true;
            } else if (input.includes('temple')) {
                resultsData = data.temples;
                flag = false;
            } else if (input.includes('beach')) {
                resultsData = data.beaches;
                flag = false;
            } else {
                resultsData = [];
                flag = false;
            }

            if (resultsData.length > 1) {
                for (let i = 0; i < resultsData.length; i++) {
                    if (flag) {
                        let cities = resultsData[i].cities;
                        for (let j = 0; j < cities.length; j++) {
                            const apiKey = 'c4f86ece00bc8aa272652ac9065af12d'; // Replace 'YOUR_API_KEY' with your actual API key
                            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cities[j].name}&APPID=${apiKey}&units=metric`;

                            fetch(apiUrl)
                                .then(response => response.json())
                                .then(data => {
                                    const utcOffset = data.timezone;
                                    function getIANATimezone(utcOffsetSeconds) {
                                        const utcOffsetHours = Math.abs(utcOffsetSeconds / 3600);
                                        const sign = (utcOffsetSeconds < 0) ? '+' : '-';
                                        return `Etc/GMT${sign}${utcOffsetHours}`;
                                    }

                                    function formatLocalTime(utcOffsetSeconds) {
                                        const timeZone = getIANATimezone(utcOffsetSeconds);
                                        return new Date().toLocaleTimeString('en-US', { timeZone });
                                    }
                                    let localTime = formatLocalTime(utcOffset);
                                    resultDiv.innerHTML += `<img src="${cities[j].imageUrl}" alt="hjh">`;
                                    resultDiv.innerHTML += `<div class="result-div"><h2>${cities[j].name}</h2><p>${cities[j].description}</p><p> Current time: ${localTime}</p> <button>VISIT</button></div>`;

                                });
                        }
                    } else {
                        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${resultsData[i].name}&APPID=${apiKey}&units=metric`;
                        fetch(apiUrl)
                            .then(response => response.json())
                            .then(data => {
                                if (data.cod != "404") {
                                    const utcOffset = data.timezone;
                                    function getIANATimezone(utcOffsetSeconds) {
                                        const utcOffsetHours = Math.abs(utcOffsetSeconds / 3600);
                                        const sign = (utcOffsetSeconds < 0) ? '+' : '-';
                                        return `Etc/GMT${sign}${utcOffsetHours}`;
                                    }

                                    function formatLocalTime(utcOffsetSeconds) {
                                        const timeZone = getIANATimezone(utcOffsetSeconds);
                                        return new Date().toLocaleTimeString('en-US', { timeZone });
                                    }
                                    let localTime = formatLocalTime(utcOffset);
                                    resultDiv.innerHTML += `<img src="${resultsData[i].imageUrl}" alt="hjh">`;
                                    resultDiv.innerHTML += `<div class="result-div"><h2>${resultsData[i].name}</h2><p>${resultsData[i].description}</p><p> Current time: ${localTime}</p><button>VISIT</button></div>`;
                                } else {
                                    resultDiv.innerHTML += `<img src="${resultsData[i].imageUrl}" alt="hjh">`;
                                    resultDiv.innerHTML += `<div class="result-div"><h2>${resultsData[i].name}</h2><p>${resultsData[i].description}</p><button>VISIT</button></div>`;
                                }
                            });

                    }
                }
            } else {
                resultDiv.innerHTML = '<div class="result-div"><h2>Results not found.</h2></div>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

btnSearch.addEventListener('click', search);
btnClear.addEventListener('click', clear);