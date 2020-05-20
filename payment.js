class Card {
    constructor() {
        const cards = localStorage.getItem('cards');
        if(cards) {
            this.cards = JSON.parse(cards);
        } else {
            this.cards = [];
        }

    }

    addCard(card_no, cvv, date) {
        const card = {
            card_no,
            cvv,
            date
        };

        this.cards.push(card);
        this.persistData();
        return card;
    }

    deleteCard(id) {
        const index = this.cards.findIndex(el=> el.id===id);
        this.cards.splice(index,1);
        this.persistData();
    }


    persistData() {
        localStorage.setItem('cards', JSON.stringify(this.cards));
    }

    recoverData() {
        const cards = localStorage.getItem('cards');
        if(cards) {
            this.cards = JSON.parse(cards);
        }
    }
}
let card = new Card();







let cardNumberEntered = (event) => {
    let card_num_value = document.querySelector("#card_number").value;
    if(event.clipboardData) {
        card_num_value = event.clipboardData.getData("text/plain");
    }
    if(card_num_value.length>=15) {
        let visa_regex = new RegExp(/^4[0-9]{12}(?:[0-9]{3})?$/);
        let master_regex = new RegExp(/^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/);
        let maestro_regex = new RegExp(/^(5018|5020|5038|5893|6304|6759|6761|6762|6763)[0-9]{8,15}$/);
        if(visa_regex.test(card_num_value)) {
            document.querySelector('#card_type').setAttribute('src',"./images/visa.jpg");
            document.querySelector('#cvv').removeAttribute("disabled");
        } else if(master_regex.test(card_num_value)) {
            document.querySelector('#card_type').setAttribute('src',"./images/master.png");
            document.querySelector('#cvv').removeAttribute("disabled");
        } else if(maestro_regex.test(card_num_value)) {
            document.querySelector('#card_type').setAttribute('src',"./images/maestro.png");
            document.querySelector('#cvv').removeAttribute("disabled");
        } else {
            document.querySelector('#card_type').setAttribute('src',"./images/blank.png");
            document.querySelector('#cvv').removeAttribute("disabled");
        }
    } else {
        return
    }
}

//event handler for card-number field
// document.querySelector("#card_number").addEventListener('keypress', cardNumberEntered);
// document.querySelector("#card_number").addEventListener('paste', cardNumberEntered);
document.querySelector("#card_number").addEventListener('input', cardNumberEntered);


//event-handler for cvv field
document.querySelector("#cvv").addEventListener('input', (event)=>{
    let cvv_value = document.querySelector("#cvv").value;
    if(cvv_value.length>=3) {
        document.querySelector('#date').removeAttribute("disabled");
    } else {
        //validation code
        return;
    }
});


//event-handler for date field
document.querySelector("#date").addEventListener('input', (event)=>{
    let date_value = document.querySelector("#date").value;
    console.log(date_value);
    if(date_value.length<2) {
        return;
    } else {
        //validation code
        let date_regex = new RegExp(/(0[1-9]|10|11|12)\/20[2-9][0-9]$/);
        if(date_regex.test(date_value)) {
            document.querySelector('#date_message').textContent = "Valid Date";
            document.querySelector('#submit').removeAttribute('disabled');
        } else {
            document.querySelector('#date_message').textContent = "Invalid Date";
            document.querySelector('#submit').setAttribute('disabled', 'disabled');
        }
    }
});


document.querySelector('.form').addEventListener('submit', (event)=>{
    event.preventDefault();
    let card_no = document.querySelector('#card_number').value;
    let cvv = document.querySelector('#cvv').value;
    let date = document.querySelector('#date').value;
    card.addCard(card_no, cvv, date);
    document.querySelector('#message-1').textContent = "Card saved!";
    document.querySelector('.form').reset();
    document.querySelector('#date').setAttribute("disabled", "disabled");
    document.querySelector('#cvv').setAttribute("disabled", "disabled");
    console.log(localStorage.getItem('cards'));
});