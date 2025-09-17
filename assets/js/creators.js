const swiper = new Swiper('.swiper-container', {
    slidesPerView: 2,
    spaceBetween: 80,
    direction: 'horizontal',
    navigation: {
        nextEl: '.scroll-right',
        prevEl: '.scroll-left',
    },
});

function addParallaxEffect(element, intensity) {
    const initialTop = element.getBoundingClientRect().top + window.scrollY;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const offset = (scrollY - initialTop) * intensity;
        element.style.transform = `translateY(${offset}px)`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const parallaxElement = document.querySelector('#cr-hero-right img');
    addParallaxEffect(parallaxElement, 0.15);
});