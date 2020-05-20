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

let cards_data = new Card();

const loadCardsData = () => {
    if(cards_data.cards.length > 0) {
        cards_data.cards.forEach(card=>{
            let encrypted_data = "**** **** **** " + card.card_no.substr(12);
            //debugger;
            const html = `
            <li class="card__item" data-cardid="${card.card_no}">
                <span class="card_num">${encrypted_data}</span>
                <button class="card__delete">
                delete
                </button>
            </li>
            `;
            document.querySelector('.cards_list').insertAdjacentHTML('beforeend', html);
        });
    }
}

window.addEventListener('load', loadCardsData);

const deleteElement = (id) => {
    const element = document.querySelector(`[data-cardid="${id}"]`);
    //debugger;
    element.parentElement.removeChild(element);
}

document.querySelector('.cards_list').addEventListener('click', ()=> {
    const card = event.target.closest('.card__item');
    if(event.target.matches('.card__delete, .card__delete *')) {
        const id = card.dataset.cardid;
        cards_data.deleteCard(id);
        deleteElement(id);
    }
})