/* Global Variables */
const theURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=6e870cedc6d3cae76aabb8dbb5bbd25f&units=metric';
const btn = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
btn.addEventListener('click', handleGenerateBtnClick);
function handleGenerateBtnClick() {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById("feelings").value;
    if (!zipCode) {
        alert ('Please, enter a zip code');
        return;
    } else {
        getData(theURL, zipCode, apiKey)
        .then(function (data) {
            postData('/addData', {
                temp: data.main.temp,
                date: newDate,
                content: feelings,
            });
        }).then(updateUI);
    }
}

const getData = async (url, zip, api) => {
    const res = await fetch(url + zip + api);
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log("error", error);
    }
}

const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }); 
    try {
        const nData = await res.json();
        return nData;
    } catch(error) {
        console.log("error" , error);
    }
}

const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log(allData)
        document.getElementById('date').innerHTML = `Today is ${allData.date}.`;
        document.getElementById('temp').innerHTML = `The Temperature is ${allData.temp} degrees Celsius.`;
        document.getElementById('content').innerHTML = `I'm feeling ${allData.content}.`;
    } catch (error){
        console.log(error);
    }
}