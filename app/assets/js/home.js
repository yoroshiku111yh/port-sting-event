const arModules = [
    './modules/sliderDome.js',
    './modules/flickitySlideInstant.js',
    './modules/notePopup.js',
    './modules/homeBanner.js',
    './modules/sectionPrizes.js',
    './modules/motionPath.js'
]

document.addEventListener("DOMContentLoaded", function (event) {
    for (let i = 0; i < arModules.length; i++) {
        window.myApp["homeModule"] = new (require(`${arModules[i]}`).default)();
    }
})
