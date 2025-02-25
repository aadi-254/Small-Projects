//
gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
 //****************************** */


function cursoreffect(){
    let cursor = document.getElementById('cursor');
let page1content= document.querySelector('#page1-content');

page1content.addEventListener('mousemove',function(d){
    gsap.to(cursor,{
        x:d.x,
        y:d.y
    })
})

page1content.addEventListener("mouseenter",function(){
    gsap.to(cursor,{
        scale:1,
        opacity:1
    })
})

page1content.addEventListener("mouseleave",function(){
    gsap.to(cursor,{
        opacity:0,
        scale:0
    })
})
}
cursoreffect();


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.animated-text').forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('animate');
                }, index * 300); // Adds delay for each text (staggered effect)
            });
        } else {
            // Reset animation when leaving the section
            document.querySelectorAll('.animated-text').forEach((el) => {
                el.classList.remove('animate');
            });
        }
    });
}, { threshold: 0.5 });

observer.observe(document.querySelector("#page2"));

document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        }
    });
});


/***********************[  slider code  ]*************** */
let index = 0;
    const slides = document.querySelectorAll('.slide');
    const slider = document.querySelector('.slider');

    function showSlide(i) {
        if (i >= slides.length) index = 0;
        if (i < 0) index = slides.length - 1;
        slider.style.transform = `translateX(${-index * 33}%)`;
    }

    function nextSlide() {
        index++;
        showSlide(index);
    }

    function prevSlide() {
        index--;
        showSlide(index);
    }

    setInterval(nextSlide, 3000);