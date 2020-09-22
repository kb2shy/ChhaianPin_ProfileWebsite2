// const TypeWriter = function(txtElement, words, wait = 3000) {
//     this.txtElement = txtElement;
//     this.words = words;
//     this.txt = '';
//     this.wordIndex = 0;
//     this.wait = parseInt(wait, 10);
//     this.type();
//     this.isDeleting = false;
// }

class TypeWriter {
    constructor(txtElement, words, wait=3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = "";
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }
}

// Type Method
TypeWriter.prototype.type = function() {
    // Current index of word
    const current = this.wordIndex % this.words.length;

    // Get full text of current word
    const fulltxt = this.words[current];

    // Initial type Speed
    let typeSpeed = 300;
    
    // Check if deleting
    if (this.isDeleting) {
        // remove character
        typeSpeed /= 3;
        this.txt = fulltxt.substring(0, this.txt.length - 1);
    } else {
        // add character
        this.txt = fulltxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span id="txt">${this.txt}</span>`;

    // If word is complete
    if (!this.isDeleting && this.txt === fulltxt) {
        typeSpeed = this.wait;

        // set delete to true
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        // move to next word
        this.wordIndex++;

        // pause before start typing
        typeSpeed = 500;
    } 

    setTimeout(() => {
        this.type();
    }, typeSpeed)
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.getElementById('scroll-adjs');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}
