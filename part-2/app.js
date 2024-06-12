let base_url = "https://deckofcardsapi.com/api/deck"

// 1
async function drawCard() {
    let data = await axios.get(`${base_url}/new/draw`);
    let card = data.data.cards[0]
    console.log(`${card.value} of ${card.suit}`);
}
drawCard();

// 2
async function drawMultipleCards() {
    // Cards array to store both cards
    let cards = [];
    let card1 = await axios.get(`${base_url}/new/draw`);

    // Add first card into cards array
    cards.push(card1.data.cards[0]);

    // Once first promise is resolved, get deck ID from the data
    let deckID = card1.data.deck_id;
    let card2 = await axios.get((`${base_url}/${deckID}/draw`))
    
    // Add second card into cards array
    cards.push(card2.data.cards[0]);

    cards.forEach(card => console.log(`${card.value} of ${card.suit}`));
}
drawMultipleCards();

// 3
async function createDeck() {
    // Set up variables
    let button = $('button');
    let deckID = null;

    // Create new deck and retrieve deck ID
    let data = await axios.get(`${base_url}/new/shuffle`);
    deckID = data.data.deck_id;
    console.log('Deck created!');

    button.on('click', async function () {
        let data = await axios.get(`${base_url}/${deckID}/draw`);
        let card = data.data.cards[0];
        $('body').append(`<p>${card.value} of ${card.suit} (${data.data.remaining} cards remaining!)</p>`);
    });
}

createDeck();
