/**
 * Class that represents a box inside a card.
 */
class CardBox {
    
    // Define properties related to the DOM elements and their styles.
    DOM = {
        el: null,                 // The main container of the box
        number: null,             // The number inside the box
        numberChars: null,        // Individual characters of the number (after using Splitting.js)
        tags: null,               // The tags associated with this box
        category: null,           // The category of the box
        categoryChars: null,      // Individual characters of the category (after using Splitting.js)
    };

    /**
     * Constructor: Initializes the properties with the actual DOM elements.
     * @param {HTMLElement} DOM_el - The main container of the box.
     */
    constructor(DOM_el) {
        // Associate the provided element with the main container
        this.DOM.el = DOM_el;
        // Fetch various child elements
        this.DOM.number = this.DOM.el.querySelector('.card__box-number');
        this.DOM.tags = this.DOM.el.querySelector('.card__box-tags');
        this.DOM.category = this.DOM.el.querySelector('.card__box-category');

        // Prepare the number and category elements for splitting using Splitting.js
        if ( this.DOM.number ) {
            this.DOM.number.dataset.splitting = '';
        }
        if ( this.DOM.category ) {
            this.DOM.category.dataset.splitting = '';
        }

        // Use Splitting.js to split the text content into individual characters for animation/effects.
        Splitting();

        // Store references to the individual characters after the split.
        if (this.DOM.number) {
            this.DOM.numberChars = this.DOM.number.querySelectorAll('.char');
        }
        if (this.DOM.category) {
            this.DOM.categoryChars = this.DOM.category.querySelectorAll('.char');
        }
    }
    
}

/**
 * Class representing Card1.
 */
export class Card1 {
    
    // Define properties related to the DOM elements and their styles.
    DOM = {
        el: null,        // Main card element
        img: null,       // Image within the card
        boxes: null      // Array of card boxes within the card
    };
    cardBoxesArr = [];   // Array to hold instances of CardBox associated with this card.

    /**
     * Constructor: Initializes properties with actual DOM elements and sets up event listeners.
     * @param {HTMLElement} DOM_el - The main card element.
     */
    constructor(DOM_el) {
        this.DOM.el = DOM_el;
        this.DOM.img = this.DOM.el.querySelector('.card__img');
        this.boxes = [...this.DOM.el.querySelectorAll('.card__box')];
        
        // For each box element, create a new CardBox instance and add it to cardBoxesArr.
        this.boxes.forEach(boxEl => this.cardBoxesArr.push(new CardBox(boxEl)));
        
        // Setup event listeners for the card.
        this.initEvents();
    }

    /**
     * Getters to retrieve specific parts of card boxes in an array format.
     */
    get cardBoxElements() {
        return this.cardBoxesArr.map(box => box.DOM.el);
    }
    get cardBoxNumberChars() {
        return this.cardBoxesArr.map(box => box.DOM.numberChars);
    }
    get cardBoxCategoryChars() {
        return this.cardBoxesArr.map(box => box.DOM.categoryChars)
        .filter(chars => chars !== null);
    }
    
    /**
     * Initialize the event listeners for the card.
     */
    initEvents() {
        // Attach event listeners for mouse enter and leave events.
        this.DOM.el.addEventListener('mouseenter', event => this.enter(event));
        this.DOM.el.addEventListener('mouseleave', event => this.leave(event));
    }

    /**
     * Action to perform when mouse enters the card. Creates animations using gsap.
     */
    enter() {
        if ( this.leaveTimeline ) {
            this.leaveTimeline.kill();
        }
        
        // Define the animations to play on mouse enter using gsap.
        this.enterTimeline = gsap
        .timeline({
            defaults: {
                duration: 0.5,
                ease: 'expo'
            }
        })
        .addLabel('start', 0)
        // Various animations for different elements are defined below:
        .fromTo(this.DOM.img, {
            filter: 'saturate(100%) brightness(100%)',
        }, {
            scale: 0.85,
            filter: 'saturate(200%) brightness(70%)'
        }, 'start')
        .fromTo(this.cardBoxElements, {
            opacity: 0,
            xPercent: (_, target) => {
                if (target.classList.contains('card__box--a')) {
                    return -100;
                }
                else if (target.classList.contains('card__box--b')) {
                    return 100;
                }
                else if (target.classList.contains('card__box--c')) {
                    return -100;
                }
                else if (target.classList.contains('card__box--d')) {
                    return 100;
                }
                return 0;
            },
            yPercent: (_, target) => {
                if (target.classList.contains('card__box--a')) {
                    return -100;
                }
                else if (target.classList.contains('card__box--b')) {
                    return -100;
                }
                else if (target.classList.contains('card__box--c')) {
                    return 100;
                }
                else if (target.classList.contains('card__box--d')) {
                    return 100;
                }
                return 0;
            }
        }, {
            opacity: 1,
            xPercent: 0,
            yPercent: 0,
        }, 'start')
        .fromTo(this.cardBoxNumberChars, {
            opacity: 0,
        }, {
            duration: 0.3,
            opacity: 1,
            stagger: 0.1,
        }, 'start+=.2')
        .fromTo(this.cardBoxCategoryChars, {
            opacity: 0
        }, {
            duration: 0.1,
            opacity: 1,
            stagger: {
                from: 'random',
                each: 0.05
            },
        }, 'start+=.2')
    }

    /**
     * Action to perform when mouse leaves the card. Creates animations using gsap.
     */
    leave() {
        if ( this.enterTimeline ) {
            this.enterTimeline.kill();
        }

        // Define the animations to play on mouse leave using gsap.
        this.leaveTimeline = gsap
        .timeline({
            defaults: {
                duration: 0.8,
                ease: 'expo'
            } 
        })
        .addLabel('start', 0)
        // Various animations for different elements are defined below:
        .to(this.DOM.img, {
            scale: 1,
            filter: 'saturate(100%) brightness(100%)'
        }, 'start')
        .to(this.cardBoxElements, {
            opacity: 0,
            xPercent: (_, target) => {
                if (target.classList.contains('card__box--a')) {
                    return -100;
                }
                else if (target.classList.contains('card__box--b')) {
                    return 100;
                }
                else if (target.classList.contains('card__box--c')) {
                    return -100;
                }
                else if (target.classList.contains('card__box--d')) {
                    return 100;
                }
                return 0;
            },
            yPercent: (_, target) => {
                if (target.classList.contains('card__box--a')) {
                    return -100;
                }
                else if (target.classList.contains('card__box--b')) {
                    return -100;
                }
                else if (target.classList.contains('card__box--c')) {
                    return 100;
                }
                else if (target.classList.contains('card__box--d')) {
                    return 100;
                }
                return 0;
            }
        }, 'start');
    }
}