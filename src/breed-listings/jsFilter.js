const input = document.createElement('input');
//const target = document.querySelector('.entry-content');
const target = document.querySelector('post-tiles');


const tiles = target.children; // document.querySelectorAll('.post-tiles.cats > a');


const isMatchTokens = (tile, tokens) => {
    return tokens.every( token => tile.innerText.toLowerCase().includes(token) );
}

const listener = (e) => {
    const text = e.target.value;
    const tokens = text.toLowerCase().split(' ');
    tiles.forEach( tile => {
        if ( isMatchTokens(tile, tokens) ) {
            tile.classList.remove('hidden');
        } else {
            tile.classList.add('hidden');
        }
    })
}

if ( target ) {
    target.insertAdjacentElement('beforebegin', input);
    input.addEventListener('input', listener );
}
