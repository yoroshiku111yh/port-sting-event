export default class Popup {
    constructor() {
        this.action();
        myApp['openPopup'] = this.openPopup.bind(this);
        myApp['closePopup'] = this.closePopup.bind(this);
    }
    openPopup(popupID) {
        //console.log(popupID);

        $(".popup").removeClass("is-opened")
        $(popupID).addClass("is-opened");

        // add padding on desktop
        var viewport = $(window).width();
        var viewportInner = window.innerWidth;

        // lock scroll
        $("html, body").addClass("popup-active").css({
            "overflow": "hidden"
        })

        // Change URL
        if ($(popupID).attr("data-url")) {
            var url = $(popupID).data('url');
            window.history.pushState({
                urlPath: ''
            }, "", url);
        }

        //IOS bug
        var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
        if (iOS == true) {
            var currentTopY = $(window).scrollTop();
            $("body").addClass("body-fixed").attr('last-posY', currentTopY);
            $("body").css('top', -currentTopY);
        }



    }

    closePopup(popupID) {

        $(popupID).removeClass("is-opened");;

        $("html, body").removeClass("popup-active").css({
            "overflow": ""
        })

        // Remove URL
        if ($(popupID).attr("data-url")) {
            var url = $(popupID).data('url');
            window.history.pushState({
                urlPath: ''
            }, "", ' ');
        }

        //if ( device.ios()) {
        var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
        if (iOS == true) {
            var currentTopY = $('body').attr('last-posY');
            $("body").removeClass("body-fixed").removeAttr('style');
            $(window).scrollTop(currentTopY);
        }

    }

    action() {
        //Close btn popup
        $(document).on('click', '.popup__close, .js-popup-close', (e) => {
            let _this = e.currentTarget;
            var popupID = "#" + $(_this).parents(".popup").attr("id");
            this.closePopup(popupID);
            e.preventDefault();
        })


        $(".popup").click((e) => {
            let _this = e.currentTarget;
            if ($(e.target).closest('.popup__container').length === 0) {

                var popupID = '#' + $(e.target).closest('.popup').attr("id");
                this.closePopup(popupID);
            }
        });

        //Open btn popup
        $(document).on('click', '.js-popup-open', (e) => {
            let _this = e.currentTarget;
            var popupID = $(_this).attr("href") ? $(_this).attr("href") : $(_this).attr("data-target");
            this.openPopup(popupID);

            //preventDefault
            e.preventDefault();
        })
    }
    openPopupMessage(title, content, textCloseBtn = "ĐÓNG") {
        const popup = $('#popup_message');
        if ( popup.length > 0 ) {
            popup.find('header h4').html(title);
            popup.find('.popup__content > div').html(content);
            popup.find('footer .button-big').html(textCloseBtn);
            this.openPopup('#popup_message');
        }
    }
}
