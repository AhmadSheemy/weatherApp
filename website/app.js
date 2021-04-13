/* Global Variables */
const theURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=6e870cedc6d3cae76aabb8dbb5bbd25f&units=metric';
const btn = document.getElementById('generate')

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
            })
        })
    }
}

const getData = async function (url, zip, api) {
    const res = await fetch(url + zip + api);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

const postData = async function (url = '', data = {}) {
    document.getElementById('date').innerHTML = data.date;
    document.getElementById('temp').innerHTML = data.temp;
    document.getElementById('content').innerHTML = data.content;
    await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    try {
        return;
    } catch(error) {
        console.log(error);
    }
}