export default class ScrollTo {
    constructor() {
        this.init();
        this.scrollToTop();
        myApp['scrollTo'] = this.scrollTo.bind(this);
    }

    init() {
        const btn = $('.js-scroll-to');
        let target, offset;
        btn.on('click', (e)=> {
            const _this = $(e.currentTarget)
            target = _this.attr('data-href') ? _this.attr('data-href') : _this.attr('data-target');
            target = target.substring(target.indexOf('#'))
            offset = _this.attr('data-offset') ? _this.attr('data-offset') : 0;
            this.scrollTo(target, offset);
            e.preventDefault();
            return false;
        })
    }
    scrollTo(target, offset) {
        let _offset = 0;
        let _headerHeight = $('.header').outerHeight();
        if(offset) {
            _offset = parseInt(offset);
        }
        $("body,html").stop().animate({
            scrollTop: $(target).offset().top + _offset - _headerHeight
        }, 800);
    }
    scrollToTop() {
        const btn = $('.js-scroll-to-top');
        var window_H = window.innerHeight;
        var scrollTop = 0;
        $(window).on('scroll',(e)=>{
            scrollTop = $(window).scrollTop();
            if(scrollTop > window_H) {
                btn.addClass('is-shown');
            } else {
                btn.removeClass('is-shown');
            }
        })
        btn.on('click',(e)=> {
            $("body,html").stop().animate({
                scrollTop: 0
            }, 800);
        })
    }

}
