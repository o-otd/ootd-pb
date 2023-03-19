export const lookTabSwiper = new Swiper(".lookTab-swiper", {
	slidesPerView: 'auto',
	spaceBetween: 32,
});

export const lookListSwiper = new Swiper(".lookList-swiper", {
	thumbs: {
		swiper: lookTabSwiper,
	},
});