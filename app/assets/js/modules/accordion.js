export default class Accordion {
    constructor() {
        this.controller();
    }
    controller() {
        $('.js-accordion-item').children('span').on('click', function() {
            $(this).siblings('ul').stop().slideToggle('fast');
            $(this).parent().siblings('.js-accordion-item').children('ul').stop().slideUp('fast');
        })
    }
}
