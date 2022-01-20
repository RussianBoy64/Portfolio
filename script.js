const burgerBtn = document.querySelector('.burger')
const closeBtn = document.querySelector('.closeBtn')
const header = document.querySelector('.header__top')
const menuBtns = document.querySelectorAll('.menu__item')
const body = document.querySelector('body')


burgerBtn.addEventListener('click', () => {
  header.classList.toggle('mobile')
  body.classList.toggle('scroll-hidden')
})

closeBtn.addEventListener('click', () => {
  header.classList.toggle('mobile')
  body.classList.toggle('scroll-hidden')
})

for (const menuBtn of menuBtns) {
  menuBtn.addEventListener('click', () => {
    header.classList.remove('mobile')
    body.classList.remove('scroll-hidden')
  })
}


//скрываем бургер-меню при увеличени ширины экрана свыше 769px
window.addEventListener('resize', () => {
  if (window.innerWidth > 769) {
    header.classList.remove('mobile')
  }
})

