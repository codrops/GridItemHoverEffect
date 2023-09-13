import { getMouseEnterDirection } from './utils.js'

let lastMouseX = null;
let lastMouseY = null;

document.addEventListener('mousemove', (e) => {
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
});

class CardBox {
    
    DOM = {
        el: null,
        number: null,
        numberChars: null,
        tags: null,
        category: null,
        categoryChars: null,
    };

    constructor(DOM_el) {
        this.DOM.el = DOM_el;
        this.DOM.number = this.DOM.el.querySelector('.card__box-number');
        this.DOM.tags = this.DOM.el.querySelector('.card__box-tags');
        this.DOM.category = this.DOM.el.querySelector('.card__box-category');

        if ( this.DOM.number ) {
            this.DOM.number.dataset.splitting = '';
        }
        if ( this.DOM.category ) {
            this.DOM.category.dataset.splitting = '';
        }
        Splitting();
        if ( this.DOM.number )
        this.DOM.numberChars = this.DOM.number.querySelectorAll('.char');
        if ( this.DOM.category )
        this.DOM.categoryChars = this.DOM.category.querySelectorAll('.char');
    }
    
}

export class Card2 {
    
    DOM = {
        el: null,
        img: null,
        boxes: null
    };
    cardBoxesArr = [];

    constructor(DOM_el) {
        this.DOM.el = DOM_el;
        this.DOM.img = this.DOM.el.querySelector('.card__img');
        this.boxes = [...this.DOM.el.querySelectorAll('.card__box')];
        // Initialize CardBox instances
        this.boxes.forEach(boxEl => this.cardBoxesArr.push(new CardBox(boxEl)));
        
        this.initEvents();
    }

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
    
    initEvents() {
        const mouseenterFn = event => this.enter(event);
        const mouseLeaveFn = event => this.leave(event);
        this.DOM.el.addEventListener('mouseenter', mouseenterFn);
        this.DOM.el.addEventListener('mouseleave', mouseLeaveFn);
    }

    enter(event) {
        const direction = getMouseEnterDirection(event.target, lastMouseX, lastMouseY);
        event.target.dataset.direction = direction;

        if ( this.leaveTimeline ) {
            this.leaveTimeline.kill();
        }
        
        this.enterTimeline = gsap
        .timeline({
            defaults: {
                duration: 0.7,
                ease: 'expo'
            }
        })
        .addLabel('start', 0)
        .fromTo(this.DOM.img, {
            filter: 'grayscale(0%)',
        }, {
            //scale: 1,
            xPercent: () => {
                if ( direction === 'left' ) {
                    return -10;
                }
                else if ( direction === 'right' ) {
                    return 10;
                }
                else return 0;
            },
            yPercent: () => {
                if ( direction === 'top' ) {
                    return -10;
                }
                else if ( direction === 'bottom' ) {
                    return 10;
                }
                else return 0;
            },
            filter: 'grayscale(40%)'
        }, 'start')
        .fromTo(this.cardBoxElements, {
            opacity: 0,
            xPercent: () => {
                if ( direction === 'left' ) {
                    return -20;
                }
                else if ( direction === 'right' ) {
                    return 20;
                }
                else return 0;
            },
            yPercent: () => {
                if ( direction === 'top' ) {
                    return -20;
                }
                else if ( direction === 'bottom' ) {
                    return 20;
                }
                else return 0;
            },
            rotation: -10
        }, {
            opacity: 1,
            xPercent: 0,
            yPercent: 0,
            rotation: 0,
            stagger: 0.08
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

    leave(event) {
        const direction = event.target.dataset.direction;
        
        if ( this.enterTimeline ) {
            this.enterTimeline.kill();
        }
        this.leaveTimeline = gsap
        .timeline({
            defaults: {
                duration: 0.8,
                ease: 'expo'
            } 
        })
        .addLabel('start', 0)
        .to(this.DOM.img, {
            //scale: 1.3,
            xPercent: 0,
            yPercent: 0,
            filter: 'grayscale(0%)'
        }, 'start')
        .to(this.cardBoxElements, {
            //scale: 0,
            opacity: 0,
            
            xPercent: () => {
                if ( direction === 'left' ) {
                    return -20;
                }
                else if ( direction === 'right' ) {
                    return 20;
                }
                else return 0;
            },
            yPercent: () => {
                if ( direction === 'top' ) {
                    return -20;
                }
                else if ( direction === 'bottom' ) {
                    return 20;
                }
                else return 0;
            },
            rotation: -10
        }, 'start');
    }
}