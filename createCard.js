function createCard(data) {

    const card = 
    `

                <div id="followingCards" id='followingCards'>
                    <div class="profileTitle">
                        <p id="profileName">${data['username']}</p>
                    </div>
                </div>
                   
            `

    return card
}


const carddisplay = document.getElementById('followingContent')
cards = []
keys = []

let testMessage = {
    'username': 'username',
    'message': 'this is my message'
};

let newCard = createCard(testMessage);

carddisplay.innerHTML += (newCard);