
export default class NotePopup {
    constructor(){
        this.btnClose = '.js-note-parent';
        this.parent = '.js-note-parent';
        this.init();
    }
    init(){
        $(this.btnClose).click((e) => {
            const _this = e.currentTarget;
            const parent = $(_this).closest(this.parent);
            $(parent).removeClass("active");
        })
    }
}