let base_url = "http://numbersapi.com"
let fav_number = 12

// 1
async function favorite_number() {
    let fact = await axios.get(`${base_url}/${fav_number}?json`);
    console.log(fact)
}
favorite_number();

// 2
let fav_numbers = [12, 16, 62, 66]
async function favorite_numbers() {
    let facts = await axios.get(`${base_url}/${fav_numbers}?json`)
    fav_numbers.forEach(number => {
        $("body").append(`<p>${facts.data[number]}</p>`)
    })
}
favorite_numbers();

// 3
let fourPromises = [];
for (let i = 0; i < 4; i++) {
    fourPromises.push(
        axios.get(`${base_url}/${fav_number}?json`)
    );
}

async function fourFacts() {
    let promises = await Promise.all(fourPromises);
    promises.forEach(p => {
        $("body").append(`<p>${p.data.text}</p>`)
    })
};
fourFacts();