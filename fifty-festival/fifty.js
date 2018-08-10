function makeMarquee() {
    const title = 'FIFTY Music Festival — November 10–12, Desert Valley'
    const marqueeText = new Array(50).fill(title).join(' – ')

    // 1. grab marquee span from html
    // 2. set repeating title as the content
    const marquee = document.querySelector('.marquee span')
    marquee.innerHTML = marqueeText
}

makeMarquee()

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// grabs all the circles from HTML
const circles = document.querySelectorAll('.circle')

// circles return an array so we don't need to loop through it
circles.forEach((circle, index) => {
    //   we get access to each one as circle now
    circle.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.2)' }, { transform: 'scale(1)' }], {
        //     increments each delay allowing a staggered animation, saves much time <3
        delay: 300 * index,
        duration: 3000,
        iterations: Infinity
    })
})

const squiggles = document.querySelectorAll('.squiggle')

// same as writing function... except with =>
squiggles.forEach((squiggle, index) => {
    const randomNumber = random(0, 45)
        //     create some randomness for our animation delay

    squiggle.animate(
        [
            { transform: 'rotate(0deg)' },
            //      { transform: 'rotate(${randomNumber}deg)' },
            //       template strings concatentation!!! ^
            { transform: 'rotate(' + randomNumber + 'deg)' },
            { transform: 'rotate(0deg)' }
        ], {
            //     increments each delay allowing a staggered animation, saves much time <3
            delay: 300 * index,
            duration: 3000,
            iterations: Infinity
        }
    )
})

// here we want to detect when our section enters the viewport, when it does we want to add a class of 'in viewport' and when it exits we want to remove it again
inView('.section')
    .on('enter', section => {
        // classList.add is the same as jQuery’s .addClass() method
        // but the vanilla javascript version
        section.classList.add('in-viewport')
    })
    .on('exit', section => {
        section.classList.remove('in-viewport')
    })

// here we set the class to add only once we have scrolled 0.2 of 
// our section into the viewport
inView.threshold(0.2)

// we want to select all of our sections & loop through them

const sections = document.querySelectorAll('.section')

sections.forEach((section, index) => {
    //   here we use querySelectorAll on our section rather than our entire document
    const artists = section.querySelectorAll('.lineup li')
    const shapes = section.querySelectorAll('.shape')

    artists.forEach((artist, index) => {
        const delay = index * 100
        artist.style.transitionDelay = delay + 'ms'
    })

    shapes.forEach((shape, index) => {
        //     we're setting our delay up to only start once all our artists have faded in using the length property.
        const delay = (artists.length + index) * 100
        shape.style.transitionDelay = delay + 'ms'
    })
})