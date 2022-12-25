
export default class Homebanner {
    constructor() {
        this.textureLogo = ".js-tex-sting";
        this.textureSlogan = ".js-tex-slogan";
        this.containLogoGlitchClass = '.js-glitch-logo';
        this.containSloganGlitchClass = '.js-glitch-slogan';
        this.init();
    }
    init() {
        this.glitchLogoSting();
        this.glitchSlogan();
    }
    glitchLogoSting() {
        const contain = $(this.containLogoGlitchClass);
        if(contain.length === 0) return;
        const texture = $(this.textureLogo)[0].dataset.src;
        contain.css({
            backgroundImage: `url(${texture})`
        });
        contain.html(`
                        <div class="channel r"></div>
                        <div class="channel g"></div>
                        <div class="channel b"></div>
                    `);
    }
    glitchSlogan() {
        const contain = $(this.containSloganGlitchClass);
        if(contain.length === 0) return;
        const texture = $(this.textureSlogan)[0].dataset.src;
        for(let i = 0; i< 6; i++){
            const div = document.createElement("div");
            div.classList.add("glitch-image-line");
            div.style.background = `url(${texture}) no-repeat`;
            contain[0].appendChild(div);
        }

    }
}