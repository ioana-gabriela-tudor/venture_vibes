const results = document.getElementById("results");
const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');

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
            switch (input) {
                case 'country':
                    resultsData = data.countries;
                    flag = true;
                    break;
                case 'temple':
                    resultsData = data.temples;
                    flag = false;
                    break;
                case 'beach':
                    resultsData = data.beaches;
                    flag = false;
                    break;
                default:
                    resultsData = [];
                    flag = false;
            }
            console.log(resultsData);
            if (resultsData.length > 1) {

                for (let i = 0; i < resultsData.length; i++) {
                    if (flag) {
                        let cities = resultsData[i].cities;
                        for (let j = 0; j < cities.length; j++) {
                            resultDiv.innerHTML += `<img src="${cities[j].imageUrl}" alt="hjh">`;
                            resultDiv.innerHTML += `<div class="result-div"><h2>${cities[j].name}</h2><p>${cities[j].description}</p><button>Visit</button></div>`;
                        }
                    } else {

                    }

                }
                // const symptoms = condition.symptoms.join(', ');
                // const prevention = condition.prevention.join(', ');
                // const treatment = condition.treatment;

                // resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
                // resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="hjh">`;

                // resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
                // resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
                // resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
            } else {
                resultDiv.innerHTML = 'Results not found.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

btnSearch.addEventListener('click', search);
btnClear.addEventListener('click', clear);