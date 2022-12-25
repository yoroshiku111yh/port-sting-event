
// import { TweenMax, Power1 } from "gsap";
import gsap from 'gsap';
import { } from 'gsap/gsap-core';
const TimelineLite = gsap.timeline;

const fixedPostionSliderItems = {
    "center": [{
        scale: 1,
        x: 23,
        y: 0,
        rotate: 0,
        zIndex: 5,
        opacity: 1,
        side : "center"
    }],
    "totalShowItems": 7,
    "right": [
        {
            zIndex: 4,
            scale: 0.57,
            x: 51,
            y: -29,
            rotate: 15,
            opacity: 1,
            side : "right-1"
        },
        {
            zIndex: 3,
            scale: 0.57,
            x: 57,
            y: -21,
            rotate: 30,
            opacity: 1,
            side : "right-2"
        },
        {
            zIndex: 2,
            scale: 0.57,
            x: 60,
            y: -15,
            rotate: 45,
            opacity: 0,
            side : "right-3"
        }
    ],
    "left": [
        {
            zIndex: 4,
            scale: 0.57,
            x: -3,
            y: -29,
            rotate: -15,
            opacity: 1,
            side : "left-1"
        },
        {
            zIndex: 3,
            scale: 0.57,
            x: -10,
            y: -21,
            rotate: -30,
            opacity: 1,
            side : "left-2"
        },
        {
            zIndex: 2,
            scale: 0.57,
            x: -15,
            y: -15,
            rotate: -45,
            opacity: 0,
            side : "left-3"
        }
    ]
};
const fixedPostionSliderItemsLess = {
    "center": [{
        scale: 1,
        x: 23,
        y: 0,
        rotate: 0,
        zIndex: 5,
        opacity: 1,
        side : "center"
    }],
    "totalShowItems": 5,
    "right": [
        {
            zIndex: 4,
            scale: 0.57,
            x: 51,
            y: -29,
            rotate: 15,
            opacity: 1,
            side : "right-1"
        },
        {
            zIndex: 3,
            scale: 0.57,
            x: 57,
            y: -21,
            rotate: 30,
            opacity: 0,
            side : "right-2"
        }
    ],
    "left": [
        {
            zIndex: 4,
            scale: 0.57,
            x: -3,
            y: -29,
            rotate: -15,
            opacity: 1,
            side : "left-1"
        },
        {
            zIndex: 3,
            scale: 0.57,
            x: -10,
            y: -21,
            rotate: -30,
            opacity: 0,
            side : "left-2"
        }
    ]
}
class SliderDome {
    constructor() {
        this.timelineLite = new TimelineLite();
        this.wrapper;
        this.indexActive = 0;
        this.velocity = 0;
        this.pointerDown = false;
        this.speed = 0.005;
        this.pointer = {
            x: 0,
            y: 0
        };
        this.itemClass = {
            "container": ".js-dome-item",
            "headline": ".js-dome-headline",
            "image": ".js-dome-image",
            "points": ".js-dome-points",
            "href": ".js-dome-href"
        };
        this.dotsClass = {
            "current": ".js-dome-dots-current",
            "total": ".js-dome-dots-total",
        }
        this.classContainerInner = ".js-dome-container";
        this.backupIndexActive = 0;

    }
    init() {
        this.fixedPositionItems = this.fixedPostionSliderItems;
        this.ar = this.getArItems();
        if(this.ar.length < 1){
            return;
        }
        this.isDragging = false;
        this.setActiveItems(0);
        $(this.getActiveItem()).addClass("guide-popup");
        const ar = this.getItemsShow(0);
        this.setPoistionItems(ar);
        this.eventTouch();
        this.setDots();
    }
    getArItems() {
        const { container } = this.itemClass;
        const ar = this.wrapper.find(container)
        return ar;
    }
    setPoistionItems(ar) {
        for (let i = 0; i < ar.length; i++) {
            const item = ar[i];
            const style = this.fixedPositionItems[item.side][item.styleIndex];
            this.setStyleItem(item.elm, style);
        }
    }
    setActiveItems(index = 0, isConfirmed = true) {
        const item = $(this.ar[index]);
        this.ar.removeClass("active");
        if(isConfirmed){
            this.indexActive = index;
        }
        item.addClass("active");
    }
    getActiveItem(){
        return this.ar[this.indexActive];
    }
    getItemsShow(indexActive = 0) {
        let countLeft = 0;
        let countRight = 0;
        let ar = [];
        let leftItems, rightItems;
        if (this.ar.length < this.fixedPostionSliderItems.totalShowItems) {
            this.fixedPositionItems = this.fixedPostionSliderItemsLess;
        }
        let total = this.ar.length < this.fixedPositionItems.totalShowItems ? this.ar.length : this.fixedPositionItems.totalShowItems;
        leftItems = Math.round((total - 1) / 2);
        rightItems = total - leftItems - 1;
        let indexLeft = indexActive - 1;
        let indexRight = indexActive + 1;
        while (countLeft !== leftItems) {
            if (indexLeft < 0) {
                indexLeft = this.ar.length - 1;
            }
            if (!this.ar[indexLeft]) {
                break;
            }
            const objLeft = {
                elm: this.ar[indexLeft],
                styleIndex: countLeft,
                side: "left"
            }
            ar.push(objLeft);
            countLeft++;
            indexLeft -= 1;
        }
        ar.push({
            elm: this.ar[indexActive],
            styleIndex: 0,
            side: "center"
        })
        while (countRight !== rightItems) {
            if (indexRight > this.ar.length - 1) {
                indexRight = 0;
            }
            if (!this.ar[indexRight]) {
                break;
            }
            const objRight = {
                elm: this.ar[indexRight],
                styleIndex: countRight,
                side: "right"
            }
            ar.push(objRight);
            countRight++;
            indexRight += 1;
        }
        return ar;
    }
    setStyleItem(item, style) {
        const _item = $(item);
        _item.css({
            transform: `translate3d(${style.x}%, ${style.y}%, 0.1px) rotate(${style.rotate}deg) scale(${style.scale}, ${style.scale})`,
            zIndex: style.zIndex,
            opacity: style.opacity
        });
        _item.attr("data-side", style.side || '');
    }
    setDots() {
        const currentDotElm = this.wrapper.find(this.dotsClass.current);
        const totalDotElm = this.wrapper.find(this.dotsClass.total);
        let current = this.indexActive + 1 < 10 ? `0${this.indexActive + 1}` : this.indexActive + 1;
        let total = this.ar.length + 1 < 10 ? `0${this.ar.length}` : this.ar.length;
        currentDotElm.html(current);
        totalDotElm.html(total);
    }
    setTimelineLiteCards(ar) {
        this.timelineLite.clear();
        for (let i = 0; i < ar.length; i++) {
            const item = ar[i];
            const elm = $(item.elm);
            const style = this.fixedPositionItems[item.side][item.styleIndex];
            this.timelineLite.to(
                elm,
                0.35,
                {
                    x: `${style.x}%`,
                    y: `${style.y}%`,
                    opacity: style.opacity,
                    scale: style.scale,
                    rotate: style.rotate,
                    zIndex: style.zIndex
                },
                "card-tween"
            )
        }
        this.timelineLite.progress(0);
        this.timelineLite.pause();
    }
    eventTouch() {
        const container = this.wrapper.find(this.classContainerInner)[0]
        if ("ontouchmove" in window) {
            container.addEventListener("touchstart", (e) => { this.handleMouseDown(e) });
            container.addEventListener("touchmove", (e) => { this.handleMouseMove(e) });
            container.addEventListener("touchend", (e) => { this.handleMouseUp(e) });
        }
        else {
            container.addEventListener("mousedown", (e) => { this.handleMouseDown(e) });
            container.addEventListener("mousemove", (e) => { this.handleMouseMove(e) });
            container.addEventListener("mouseup", (e) => { this.handleMouseUp(e) });
        }
    }
    handleMouseDown(e) {
        this.pointerDown = true;
        this.pointer.x = e.touches ? e.touches[0].clientX : e.clientX;
        this.turnOffGuideSwipe();
    }
    turnOffGuideSwipe(){    
        $(this.getActiveItem()).removeClass("guide-popup");
    }
    handleMouseMove(e) {
        if (!this.pointerDown) return;
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        let a = (x - this.pointer.x) * this.speed
        this.pointer.x = x;
        this.swipeMoving(a);
        this.isDragging = true;
        this.velocity += a;
        let min, max;
        if(this.side > 0){
            min = 0;
            max = 1;
        }
        if(this.side < 0){
            min = -1;
            max = 0;
        }
        this.velocity = this.velocity > max ? max : this.velocity;
        this.velocity = this.velocity < min ? min : this.velocity;
        this.timelineLite.progress(Math.abs(this.velocity));
    }
    handleMouseUp() {
        this.pointerDown = false;
        this.swipeDone();
        this.velocity = 0;
    }
    swipeMoving(a) {
        if(this.checkSwipingChangeSlide()){
            this.setActiveItems(this.indexActive, false);
        }
        else{
            this.setActiveItems(this.backupIndexActive, false);
        }
        if (this.isDragging) return;
        this.side = 0;
        if(a < 0){
            this.side = -1;
        }
        else if ( a > 0){
            this.side = 1;
        }
        this.backupIndexActive = this.indexActive;
        if (this.side < 0) {
            this.indexActive++;
            if (this.indexActive > this.ar.length - 1) {
                this.indexActive = 0;
            }
        }
        else if(this.side > 0){
            this.indexActive--;
            if (this.indexActive < 0) {
                this.indexActive = this.ar.length - 1;
            }
        }
        const ar = this.getItemsShow(this.indexActive);
        this.setTimelineLiteCards(ar);
    }
    swipeDone() {
        this.isDragging = false;
        let ar;
        if(this.velocity === 0) return;
        if(!this.checkSwipingChangeSlide()){
            this.timelineLite.reverse();
            this.indexActive = this.backupIndexActive;
        }
        else{
            this.timelineLite.play();
        }
        this.timelineLite.eventCallback("onComplete", () => {
            ar = this.getItemsShow(this.indexActive);
            this.setPoistionItems(ar);
            this.setActiveItems(this.indexActive);
            this.setDots();
        })
    }
    checkSwipingChangeSlide(){
        const progress = Math.abs(this.velocity);
        if(progress < 0.3){
            return false;
        }
        if(progress > 0.3){
            return true;
        }
        return false;
    }
}

export default class sliderDomeHome extends SliderDome {
    constructor() {
        super();
        this.wrapper = $('#dome-home-slider-1');
        this.fixedPostionSliderItems = fixedPostionSliderItems;
        this.fixedPostionSliderItemsLess = fixedPostionSliderItemsLess;
        this.speed = 0.01;
        this.init();
    }
}
