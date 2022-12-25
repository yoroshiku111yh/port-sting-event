

export default class SectionPrizes{
    constructor(){
        this.init();
    }
    init(){
        const processBarAr = $(".js-process-bar");
        for(let i = 0 ; i < processBarAr.length ; i++){
            const item = processBarAr[i];
            const percent = item.dataset.percent;
            const parent = $(item).parent();
            const maxWidth = $(parent).innerWidth();
            let width = percent*maxWidth/100
            item.style.width = `${width}px`;
        }
    }
}