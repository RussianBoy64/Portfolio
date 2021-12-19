const burger = document.querySelector('.burger-menu')
const burgerItems = document.querySelectorAll('.burger-menu__item')
const menu = document.querySelector('.menu')

burger.addEventListener('click', () => {
  for (let i = 0; i < burgerItems.length; i++) {
    if (i === 0) {
      burgerItems[i].classList.toggle('burger-menu__item-select')
    }
    if (i === 1) {
      burgerItems[i].classList.toggle('burger-menu__item-select')
    }
    if (i === 2) {
      burgerItems[i].classList.toggle('burger-menu__item-select')
    }
  }
  menu.classList.toggle('menu_active')
  console.log(window.innerWidth)
})

//сворачиваем бургер меню, если окно просмотра больше 850px
window.addEventListener('resize', () => {
  if (window.innerWidth > 850) {
    for (let i = 0; i < burgerItems.length; i++) {
      if (i === 0) {
        burgerItems[i].classList.remove('burger-menu__item-select')
      }
      if (i === 1) {
        burgerItems[i].classList.remove('burger-menu__item-select')
      }
      if (i === 2) {
        burgerItems[i].classList.remove('burger-menu__item-select')
      }
    }
    menu.classList.remove('menu_active')
  }
})

