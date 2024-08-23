const menuMobile = document.querySelector('[data-js="munu-mobile"]')
const menuDesktop = document.querySelector('[data-js="menu-desktop"]')
const slides = document.querySelectorAll('.wrapper-carousel')
const prevButton = document.querySelector('[data-js="prevBtn"]')
const nextButton = document.querySelector('[data-js="nextBtn"]')
const aboutUs = document.querySelector('[data-js="about-us"]')
const topButton = document.querySelector('[data-js="btn-top"]')
const elementsObserveds = document.querySelectorAll('[data-js="observed"]')
const form = document.querySelector('[data-js="form"]')
const errorForm = document.querySelector('[data-js="error"]')
const successForm = document.querySelector('[data-js="success"]')

// Button Top
topButton.addEventListener('click', () => scrollTo(0, 0))

// Menu
menuMobile.addEventListener('click', () =>
    menuDesktop.classList.toggle('visible'))

// Slides - Carousel
const lastSlideIndex = slides.length - 1
let currentSlideIndex = 0

const manipulateSlidesClasses = correctSlideIndex => {
    slides.forEach(slide => slide.classList.remove('carousel-visible'))
    slides[correctSlideIndex].classList.add('carousel-visible')
}

nextButton.addEventListener('click', () => {
    const correctSlideIndex = currentSlideIndex === lastSlideIndex
        ? currentSlideIndex = 0
        : ++currentSlideIndex

    manipulateSlidesClasses(correctSlideIndex)
})

prevButton.addEventListener('click', () => {
    const correctSlideIndex = currentSlideIndex === 0
        ? currentSlideIndex = lastSlideIndex
        : --currentSlideIndex

    manipulateSlidesClasses(correctSlideIndex)
})

// Policies
document.addEventListener('DOMContentLoaded', () => {
    const togglePolicyLinks = document.querySelectorAll('.toggle-policy')

    togglePolicyLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault()

            const targetId = link.getAttribute('data-target')
            const targetParagraph = document.getElementById(targetId)

            if (targetParagraph.classList.contains('policie-hide')) {
                targetParagraph.classList.remove('policie-hide')
                targetParagraph.classList.add('policie-visible')
            } else {
                targetParagraph.classList.remove('policie-visible')
                targetParagraph.classList.add('policie-hide')
            }
        })
    })
})

// Scroll Animation
const toggleVisibility = ({ isIntersecting, target }) => {
    if (isIntersecting) {
        target.classList.remove('section-hide')
        target.classList.add('section-show')
    } else {
        target.classList.remove('section-show')
        target.classList.add('section-hide')
    }
}

const observeEntries = entries => entries.forEach(toggleVisibility)
const observer = new IntersectionObserver(observeEntries)
elementsObserveds.forEach(elementObserved => observer.observe(elementObserved))

// Form Validations
const validateInputs = inputValue => inputValue === ''

const validateEmptyValues = inputValues => inputValues
    .map(inputValue => validateInputs(inputValue))
    .some(isEmpty => isEmpty)

const showMessage = (element, classAdd, classRemove) => {
    element.classList.add(classAdd)
    element.classList.remove(classRemove)
}

const hideMessage = (element, classAdd, classRemove) => {
    element.classList.add(classAdd)
    element.classList.remove(classRemove)
}

const handleValidateInputs = e => {
    e.preventDefault()

    const inputNameValue = e.target.name.value.trim()
    const inputEmailValue = e.target.email.value.trim()
    const inputSubjectValue = e.target.subject.value.trim()
    const inputMessageeValue = e.target.message.value.trim()

    const inputValues = [
        inputNameValue,
        inputEmailValue,
        inputSubjectValue,
        inputMessageeValue
    ]

    const isEmpty = validateEmptyValues(inputValues)

    if (isEmpty) {
        showMessage(errorForm, 'error-show', 'error-hide')
        hideMessage(successForm, 'success-hide', 'success-show')
    } else {
        showMessage(successForm, 'success-show', 'success-hide')
        hideMessage(errorForm, 'error-hide', 'error-show')
        e.target.reset()
    }
}

form.addEventListener('submit', handleValidateInputs)

// Slides logos
const copyLogosSlide = document.querySelector('[data-js="logos-slide"]')
const areaLogosSlide = document.querySelector('[data-js="area-logos-slide"]')
areaLogosSlide.appendChild(copyLogosSlide.cloneNode(true))