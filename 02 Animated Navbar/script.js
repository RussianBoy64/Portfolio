const btn = document.querySelector('.hamburger')
const hamburgerBtn = document.querySelector('.hamburger__btn')
const menu = document.querySelector('.menu')


btn.addEventListener('click', () => {
	menu.classList.toggle('menu_active')
  hamburgerBtn.classList.toggle('hamburger__btn_active')
})