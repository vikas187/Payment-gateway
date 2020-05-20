export default class Card {
    constructor() {
        const cards = localStorage.getItem('cards');
        if(cards) {
            this.cards = JSON.parse(cards);
        } else {
            this.cards = [];
        }
    }

    addCard(id, card_no, cvv, date) {
        const card = {
            id,
            card,
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