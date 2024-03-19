function scroltrig() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
scroltrig();

let ul = document.querySelector(".nav-links");
let icon = document.querySelector("#menu-icon");
icon.addEventListener("click", () => {
  ul.classList.toggle("show");
  console.log(ul);
});

function cursorAnimation() {
  document.addEventListener("mousemove", (dets) => {
    gsap.to("#cursor", {
      left: dets.x - 50,
      top: dets.y - 30,
    });
  });
}
cursorAnimation();

function photoIcon() {
  let picIcon = document.querySelector(".pic-container");
  let playBtn = document.querySelector("#play");

  picIcon.addEventListener("mouseenter", () => {
    gsap.to(playBtn, {
      opacity: 1,
      scale: 1,
    });
  });
  picIcon.addEventListener("mouseleave", () => {
    gsap.to(playBtn, {
      opacity: 0,
      scale: 0,
    });
  });
  picIcon.addEventListener("mousemove", (dets) => {
    gsap.to(playBtn, {
      left: dets.x - 60,
      top: dets.y + 30,
    });
  });
}
photoIcon();

function loadingAnimation() {
  gsap.from("#page1 h1", {
    y: 50,
    opacity: 0,
    delay: 0.5,
    duration: 0.8,
    stagger: 0.2,
  });
  gsap.from("#page1 .pic", {
    opacity: 0,
    delay: 1,
    duration: 0.3,
    scale: 0.7,
  });
}
loadingAnimation();

let tl = gsap.timeline();

tl.to("#page2 .product",{
  y: -300,
  duration: 0.6,
  scrollTrigger: {
    trigger: "#page2",
    start: "top 20%",
    end: "top 50%",
    scrub: true

  }
})