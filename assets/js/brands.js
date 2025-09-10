const swiper = new Swiper('.swiper-container', {
    slidesPerView: 2,
    spaceBetween: 80,
    direction: 'horizontal',
    navigation: {
        nextEl: '.scroll-right',
        prevEl: '.scroll-left',
    },
});