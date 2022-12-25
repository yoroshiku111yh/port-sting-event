export default class Header {
    constructor() {
        this.sticky();
        this.menu();
    }
    sticky() {
        let scrollTop = 0;
        window.addEventListener('scroll', (e) => {
            const header = $('header');
            scrollTop = $(window).scrollTop();
            if (scrollTop > 60) {
                header.addClass("sticky");
                $("#logo").css({"opacity" : 1});
            } else {
                header.removeClass("sticky");
                $("#logo").css({"opacity" : ""});
            }
        })
    }
    menu () {
        let button = $('.header__hbg-button');
        let dropdown = $('.header__dropdown');
        let header = $('.header ');

        if (window.location.hash === '#menu-open') {
            window.location.hash = '';
            button.addClass('active');
            dropdown.addClass('is-opened');
            header.addClass('active');
            // // iOS
            this.lockScreen()
        }

        button.on('click', (e) => {
            let btn = $(e.currentTarget);
            btn.toggleClass('active');
            dropdown.stop().toggleClass('is-opened');
            header.stop().toggleClass('active');
            // dropdown.stop().slideToggle();
            // // iOS
            if(btn.hasClass('active')) {
                this.lockScreen()
            } else {
                this.unlockScreen();
            }
        })

        // let expBtn = $('.main-menu__expand-button');
        // expBtn.on('click', function () {
        //     $(this).closest('li').toggleClass('open').siblings('li').removeClass('open').find('ul').slideUp().find('li').removeClass('open');
        //     $(this).siblings('ul').slideToggle();
        // })
    }

    lockScreen() {
        this.scrollTop = $(window).scrollTop();
        var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
        if (iOS == true) {
            setTimeout((e) => {

                $('html').css('overflow','hidden');
                $('main').css('background','#000');
                $('body').css({
                    'overflow':'hidden',
                    'position':'fixed',
                    'width': '100%',
                    "background" : "#000",
                    // 'transform': 'translateY('+-this.scrollTop+'px)'
                    'top': -this.scrollTop + 'px'
                });
            },300)
        } else {
            $('html, body').css({
                'overflow':'hidden'
            });
        }
    }
    unlockScreen() {
        $('html, body, main').removeAttr('style');

        $(window).scrollTop(this.scrollTop);
    }
}
