const mySwiper = new Swiper('.news__swiper-container', {
   slidesPerView: 3,
   updateOnWindowResize: true
   // ,spaceBetween: 130
   , slidesOffsetBefore: 318
   // , centeredSlides: true
})


if (document.readyState !== 'complete') window.addEventListener('load', ()=> {

   //          LINKs
   document.querySelectorAll('.link').forEach(el => {
      el.addEventListener('click', linkClickHandler)
   });
   function linkClickHandler(e) {
      //:scope - чтобы искать от parentNode
      let active = e.currentTarget.parentNode.querySelector(':scope > .link_active');
      
      active.classList.toggle('link_active');
      e.currentTarget.classList.toggle('link_active');
   }
});

