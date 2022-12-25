import gsap from 'gsap';
import MotionPathPlugin from 'gsap/MotionPathPlugin';


gsap.registerPlugin(MotionPathPlugin);

export default class MotionPath {
    constructor() {
        this.init();
    }
    init() {
        this.motionInit();
        $(window).resize(() => {
            const W = window.innerWidth;
            if(W < 375){
                this.killMotion();
                this.motionInit();
            }
        })
    }
    motionInit(){
        gsap.to("#dot-run-2", {
            duration: 15,
            repeat : -1,
            repeatDelay: 3,
            yoyo: true,
            ease: "power1.inOut",
            motionPath: {
                path: "#pathDashLine2",
                align: "#pathDashLine2",
                autoRotate: true,
                alignOrigin: [0.5, 0.5]
            },
        });
        /////////
        gsap.to("#dot-run-1", {
            duration: 17,
            repeat : -1,
            repeatDelay: 2,
            yoyo: true,
            ease: "power1.inOut",
            motionPath: {
                path: "#pathDashLine1",
                align: "#pathDashLine1",
                autoRotate: true,
                alignOrigin: [1, 1]
            },
        })
    }
    killMotion(){
        gsap.killTweensOf("#dot-run-1");
        gsap.killTweensOf("#dot-run-2");
    }   
}