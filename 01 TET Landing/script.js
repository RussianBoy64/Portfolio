const windowWidth = document.documentElement.clientWidth
const body = document.querySelector('body')
const whoSlider = document.querySelector('.who__contant')
const preferencesSlider = document.querySelector('.preferences__content')

// Бургер мен
const burgerBtn = document.querySelector('.burger')
const closeBtn = document.querySelector('.closeBtn')
const header = document.querySelector('.header__top')
const menuBtns = document.querySelectorAll('.menu__item')


burgerBtn.addEventListener('click', () => {
  header.classList.add('mobile')
  body.classList.add('scroll-hidden')
})

closeBtn.addEventListener('click', () => {
  header.classList.remove('mobile')
  body.classList.remove('scroll-hidden')
})

for (const menuBtn of menuBtns) {
  menuBtn.addEventListener('click', () => {
    header.classList.remove('mobile')
    body.classList.remove('scroll-hidden')
  })
}





// Общий слайдер для экспертов, постов и партнеров

const sliders = document.querySelectorAll('.slider')

for (const slider of sliders) {

  const sliderParent = slider.closest('article') //находим родятеля слайдера, чтобы повесить на него слушателя по клику т.к. кнопки находятся вне блока слайдера
  const prevBtn = sliderParent.querySelector('button:first-child') //находим кнопку "назад"
  const nextBtn = sliderParent.querySelector('button:last-child') //находим кнопку "вперед"
  let firstSlide = 0  // сохраняем в атрибуте индекс текущего первого видимого слайда
  let sliderLength = slider.querySelectorAll('[class*="__card"]').length //сохраняем общее колличество слайдов
  let sliderElementWidth = slider.querySelector('[class*="__card"]').offsetWidth // находим ширину элемента слайдера
  let sliderPosition = 0 //начальная позиция слайдера

  //вычисляем на какую величину нужно сдвинуть слайдер в зависимости от ширины слайдера и колличства его элементов
  function position() {
    return firstSlide * (slider.scrollWidth / sliderLength)
  }

  sliderParent.addEventListener('click', (event) => {
    if (event.target == prevBtn) {
      //условие чтобы слайдер не сдвигался дальше левого края
      if (sliderPosition < 0) {
        firstSlide++ //сдвигаем первый слайд на 1 вправо
      }
    }

    if (event.target == nextBtn) {
      //условие чтобы слайдер не сдвигался дальше правого края
      if (Math.abs(position()) < sliderLength * sliderElementWidth - slider.clientWidth) {
        firstSlide-- //сдвигаем первый слайд на 1 влево
      }
    }
    sliderPosition = position()

    slider.style.transform = `translateX(${sliderPosition}px)` //меняем положение слайдера
  })

  //скрываем бургер-меню при увеличени ширины экрана свыше 769px
  window.addEventListener('resize', () => {
    // при ресайзе сбрасываем слайдер
    if (window.innerWidth < 769) {
      firstSlide = 0
      sliderPosition = 0
      slider.style.transform = `translateX(${sliderPosition}px)`
    }
    if (window.innerWidth > 769) {
      header.classList.remove('mobile')
    }
  })

  //Тач слайдер
  let posStart = 0 // отслеживание позицию при таче
  let posSlider = 0 // ослеживаем текущую позицию слайдера
  let posEnd = 0 // отслеживание позицию при когда юзер убрал палец

  function sliderMove() {
    posSlider = sliderPosition - (posStart - posEnd) //сдвигаем слайдер на ширину скролла вправо или лево

    // чтобы слайдер не уходил влево дальше 1 слайда
    if (posSlider > 0) {
      firstSlide = 0
    }
    // чтобы слайдер не оставлял справа пустых мест под слайды
    else if (Math.abs(posSlider) > slider.scrollWidth - slider.clientWidth) {
      firstSlide = Math.round(slider.clientWidth / sliderElementWidth) - sliderLength
    }
    // чтобы к началу слайдера прилипало первый ближний слайд
    else {
      firstSlide = Math.round(posSlider / sliderElementWidth)
    }

    return posSlider
  }

  // при касании убираем анимацию и записываем позицию касания 
  const touchStart = (event) => {
    slider.style.transition = 'none'
    posStart = event.touches[0].clientX
  }

  // при движении передаем позицию пальца и двигаем слайдер
  const touchMove = (event) => {
    posEnd = event.touches[0].clientX
    slider.style.transform = `translateX(${sliderMove()}px`
  }

  // когда убираем палец добавляем анимацию и ставим слайдер на заданное место
  const touchEnd = (event) => {
    slider.style.transition = '.5s ease-in-out'
    sliderPosition = position()
    slider.style.transform = `translateX(${sliderPosition}px)`
  }

  //добавляем слушателей
  slider.addEventListener('touchstart', touchStart)
  slider.addEventListener('touchmove', touchMove)
  slider.addEventListener('touchend', touchEnd)

  window.addEventListener('resize', () => {
    // при ресайзе сбрасываем слайдер
    if (window.innerWidth < 769) {
      whoSlider.addEventListener('touchstart', touchStart)
      whoSlider.addEventListener('touchmove', touchMove)
      whoSlider.addEventListener('touchend', touchEnd)

      preferencesSlider.addEventListener('touchstart', touchStart)
      preferencesSlider.addEventListener('touchmove', touchMove)
      preferencesSlider.addEventListener('touchend', touchEnd)

    }
    if (window.innerWidth > 769) {
      whoSlider.style.transform = `translateX(0px)`
      whoSlider.removeEventListener('touchstart', touchStart)
      whoSlider.removeEventListener('touchmove', touchMove)
      whoSlider.removeEventListener('touchend', touchEnd)

      preferencesSlider.style.transform = `translateX(0px)`
      preferencesSlider.removeEventListener('touchstart', touchStart)
      preferencesSlider.removeEventListener('touchmove', touchMove)
      preferencesSlider.removeEventListener('touchend', touchEnd)
    }
  })
}

// модальное окно
const modalBtns = document.querySelectorAll('.callback')
const modalWindow = document.querySelector('.modal-window')
const closeBtnModal = document.querySelector('.closeBtn__modal')

for (const modalBtn of modalBtns) {
  modalBtn.addEventListener('click', () => {
    modalWindow.classList.add('active')
    body.classList.add('scroll-hidden')
  })
}

modalWindow.addEventListener('click', (event) => {
  if (event.target == closeBtnModal || event.target == modalWindow) {
    modalWindow.classList.remove('active')
    body.classList.remove('scroll-hidden')
    header.classList.remove('mobile')
  }
})







