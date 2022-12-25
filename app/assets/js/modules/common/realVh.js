export default class RealVh {
    constructor() {
        this.heightBody();
        window.addEventListener('resize', () => {
          this.heightBody();
        });
    }
    heightBody(){
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

}
