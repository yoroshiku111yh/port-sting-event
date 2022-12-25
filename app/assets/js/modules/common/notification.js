export default class Notification {
    constructor() {
        this.notificationGlobal = '#notification_global';
        this.action();
    }
    open(notificationID) {
        //console.log(notificationID);

        $(".notification").removeClass("is-opened")
        $(notificationID).addClass("is-opened");

        setTimeout( (e) => {
            $(notificationID).removeClass("is-opened")
        },4000)

    }

    close(notificationID) {

        $(notificationID).removeClass("is-opened");;

    }

    action() {
        //Close btn popup
        $(document).on('click', '.js-notification-close', (e) => {
            let _this = e.currentTarget;
            var notificationID = "#" + $(_this).parents(".popup").attr("id");
            this.close(notificationID);
            e.preventDefault();
        })


        //Open btn popup
        $(document).on('click', '.js-notification-open', (e) => {
            let _this = e.currentTarget;
            var notificationID = $(_this).attr("href") ? $(_this).attr("href") : $(_this).attr("data-target");
            this.open(notificationID);

            //preventDefault
            e.preventDefault();
        })
    }
    openMessage(status, content) {
        if ( $(this.notificationGlobal).length > 0 ) {
            if ( status === 'success' ) {
                $(this.notificationGlobal).addClass('-success').removeClass('-danger')
            } else if ( status === 'danger' ) {
                $(this.notificationGlobal).addClass('-danger').removeClass('-success')
            }
            $(this.notificationGlobal).find('.notification__content').html(content);
            this.open(this.notificationGlobal);
        }
    }
}
