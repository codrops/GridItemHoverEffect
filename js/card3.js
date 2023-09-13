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

export class Card3 {
    
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
            filter: 'grayscale(90%)'
        }, 'start')
        .to(this.DOM.img, {
            ease: 'power4',
            duration: 0.6,
            scaleY: 1
        }, 'start')
        .to(this.DOM.img, {
            duration: 1.5,
            scaleX: 1
        }, 'start')
        .fromTo(this.cardBoxElements, {
            opacity: 0,
            scale: 0,
            rotation: -10
        }, {
            opacity: 1,
            scale: 1,
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
            scale: 1.3,
            filter: 'grayscale(0%)'
        }, 'start')
        .to(this.cardBoxElements, {
            scale: 0,
            opacity: 0,
            rotation: -10
        }, 'start');
    }
}