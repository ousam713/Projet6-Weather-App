const formField = document.querySelector(".formField");
const inputField = document.querySelector(".inputField");
const container = document.querySelector(".container");
// const city = document.querySelector(".city");
// const emoji = document.querySelector(".emoji");
// const temperature = document.querySelector(".temperature");
// const description = document.querySelector(".description"); 
const api = "bdf1e87cc0b36275b56013e45749c167";

formField.addEventListener("submit", async event => { 
    event.preventDefault();

    const city =  inputField.value

    if(city){
        try {
            const weatherData = await getData(city);
            outputData(weatherData);
        } catch (error) {
            console.error(error);
            outputError(error);
        }
    }else{
        outputError("Please enter a city ");
    }
});

async function getData(city) {
    const apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;

    const reponse = await fetch(apiLink);

    if(!reponse.ok){
        throw new Error("Couldn't fetch weather data")
    }

    return await reponse.json();
}

function outputData(data){
    const { name:city,
            main:{temp},
            weather:[{description, id}]} = data;

            console.log(data);
            container.textContent = "";
            container.style.display = "flex";

            const cityName = document.createElement("h1");
            const temperature = document.createElement("p");
            const emoji = document.createElement("p");
            const descriptionWeather = document.createElement("p");
            
            cityName.textContent = city;
                if (id>=200 && id<300)
                    emoji.textContent = "⛈️";
                else if (id>=300 && id<400)
                    emoji.textContent = "🌧️";
                else if (id>=500 && id<600)
                    emoji.textContent = "🌧️";
                else if (id>=600 && id<700)
                    emoji.textContent = "🌨️";
                else if (id>=700 && id<800)
                    emoji.textContent = "🌫️";
                else if (id === 800)
                    emoji.textContent = "☀️";
                else if (id>=801 && id<810)
                    emoji.textContent = "☁️";
                else
                    emoji.textContent = "⁉️";
            
            temperature.textContent = `${(temp-273.15).toFixed(1)} \u00B0C`;
            descriptionWeather.textContent = description;

            cityName.classList.add("h1Class");
            emoji.classList.add("emojiClass");
            temperature.classList.add("pClass");
            // description.classList.add("pClass");
            

            container.appendChild(cityName);
            container.appendChild(emoji);
            container.append(temperature);
            // container.appendChild(description);
}

// function getEmoji(id){
    
// }

function outputError(erRor){
    const pError = document.createElement("p");
    pError.textContent = erRor;

    container.textContent = "";
    container.style.display = "flex";
    container.appendChild(pError);
}