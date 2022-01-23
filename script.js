// Бургер мен
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

// Общий слайдер для экспертов, постов и партнеров

const sliders = document.querySelectorAll('.slider')

for (const slider of sliders) {

  const sliderParent = slider.closest('article') //находим родятеля слайдера, чтобы повесить на него слушателя по клику т.к. кнопки находятся вне блока слайдера
  const prevBtn = sliderParent.querySelector('button:first-child') //находим кнопку "назад"
  const nextBtn = sliderParent.querySelector('button:last-child') //находим кнопку "вперед"
  let firstSlide = 0  // сохраняем в атрибуте индекс текущего первого видимого слайда
  let sliderLength = slider.querySelectorAll('[class*="__card"]').length //сохраняем общее колличество слайдов
  let sliderElementWidth = slider.querySelector('[class*="__card"]').clientWidth // находим ширину элемента слайдера
  let sliderPosition = 0 //начальная позиция слайдера

  //вычисляем на какую величину нужно сдвинуть слайдер в зависимости от ширины слайдера и колличства его элементов
  function position() {
    return firstSlide * (slider.scrollWidth / sliderLength)
  }
  
  sliderParent.addEventListener('click', (event) => {
    if (event.target == prevBtn) {
      //условие чтобы слайдер не сдвигался дальше левого края
      if (sliderPosition < 0) {
        firstSlide ++ //сдвигаем первый слайд на 1 вправо
        sliderPosition = position() 
      }
    }

    if (event.target == nextBtn) {
      //условие чтобы слайдер не сдвигался дальше правого края
      if (Math.abs(position()) < (sliderLength - 1) * sliderElementWidth - slider.clientWidth) {
        firstSlide -- //сдвигаем первый слайд на 1 влево
        sliderPosition = position()
      }
    }

    slider.style.transform = `translateX(${sliderPosition}px)` //меняем положение слайдера
  })

  //при ресайзе сбрасываем слайдер
  window.addEventListener('resize', () => {
    if (window.innerWidth < 769) {
      firstSlide = 0
      sliderPosition = 0
      slider.style.transform = `translateX(${sliderPosition}px)`
    }
  })
}




