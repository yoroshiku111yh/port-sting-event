
const Flickity = require('flickity');

export default class FlickitySlideInstant {
    constructor() {
        this.attrFind = "data-flickity";
        this.arCarousel = [];
        this.init();
    }
    init() {
        this.sliders = $(`[${this.attrFind}]`);
        for(let i = 0 ; i < this.sliders.length; i++){
            const wrapper = $(this.sliders[i]);
            let opt = wrapper.attr(this.attrFind).toString();

            opt = JSON.parse(opt);
            // const carousel = new Flickity(wrapper[0], opt);
            // this.arCarousel.push(carousel);
        }
    }
}