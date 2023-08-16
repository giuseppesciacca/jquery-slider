const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
]

let actualIndex = 0;
let startAutoPlay = null;

/* jQ */
$(document).ready(function () {
    const mainImage = $('#main_image');
    const title = $('.card-body>h5');
    const description = $('.card-body>p');
    const prevBtn = $('#prev');
    const nextBtn = $('#next');

    /* popolo la homepage */

    //popolo la prima immagine
    getFirstEl(images, mainImage, title, description)
    //popolo i thumbnails
    populatingThumbnails(images)

    //fai partire in automatico il play all'avvio
    changeImgOnTimer()

    /* eventi ai click */

    //sul click del thumb cambia la main img + i dettagli
    onClickThumbnailChangeMainImg(images, mainImage, title, description)
    //click on Prev or Next
    clickEvent(nextBtn, prevBtn, images, mainImage, title, description)

    //start or stop autoplay
    eventAutoPlay(nextBtn, prevBtn)
});

/* *** FUNCTIONS *** */

/**
 * 
 * @param {Array} array 
 * @param {object} imgEl 
 * @param {object} titleEl 
 * @param {object} textEl 
 */
function getFirstEl(array, imgEl, titleEl, textEl) {
    imgEl.attr({
        "src": 'assets/' + array[0].image,
        "alt": array[0].title,
        "data-id": 0
    });
    titleEl.text(array[0].title);
    textEl.text(array[0].text);
}

/**
 * 
 * @param {Array} array 
 */
function populatingThumbnails(array) {
    //prendo il container dove andranno le img thumbanils
    const thumbnails = $('.thumbnails div')

    array.forEach((element, index) => {
        const imagePath = element.image;
        thumbnails.append(`<img src="assets/${imagePath}" alt="${element.title}" data-id="${index}" class="${index === actualIndex ? 'active_thumb' : ''} " loading="lazy">`);
    });
}

/**
 * 
 * @param {Array} array 
 * @param {object} imgEl 
 * @param {object} titleEl 
 * @param {object} textEl 
 */
function onClickThumbnailChangeMainImg(array, imgEl, titleEl, textEl) {
    //prendo le thumbnails
    const thumbnailsImgs = $('.thumbnails > div > img');

    //gestisco il click sulla singola thumb
    thumbnailsImgs.on('click', function (e) {
        e.preventDefault();
        clearInterval(startAutoPlay);
        startAutoPlay = null;

        //get position in array from data attribute
        actualIndex = $(this).data().id;

        //aggiunge la classe nella thumb selezionata
        $(this).addClass('active_thumb').siblings().removeClass('active_thumb');

        //change main img + texts
        imgEl.attr({
            "src": 'assets/' + array[actualIndex].image,
            "alt": array[actualIndex].title,
        });

        titleEl.text(array[actualIndex].title);
        textEl.text(array[actualIndex].text);
    });
}

/**
 * 
 * @param {Object} buttonEl 
 * @param {Array} array 
 * @param {object} imgEl 
 * @param {object} titleEl 
 * @param {object} textEl 
 */
function changeImgByBtn(buttonEl, array, imgEl, titleEl, textEl) {

    buttonEl.on('click', function (e) {
        e.preventDefault();

        if (buttonEl.attr('id') === 'next') {
            incrementIndex(array)

        } else if (buttonEl.attr('id') === 'prev') {
            decrementIndex(array)
        }

        //prende la thumb che ha il data-id della posizione attuale nell'array
        const actualImgThumb = $(`img[data-id="${actualIndex}"]`);
        //ci aggiungo la classe active_thumb e la rimuovo da quelli accanto
        actualImgThumb.addClass('active_thumb').siblings().removeClass('active_thumb');

        //change main img + texts
        imgEl.attr({
            "src": 'assets/' + array[actualIndex].image,
            "alt": array[actualIndex].title
        });
        titleEl.text(array[actualIndex].title);
        textEl.text(array[actualIndex].text);
    });
}

/**
 * 
 * @param {Object} nextBtn 
 * @param {Object} prevBtn 
 * @param {Array} images 
 * @param {object} mainImage 
 * @param {object} title 
 * @param {object} description 
 */
function clickEvent(nextBtn, prevBtn, images, mainImage, title, description) {
    changeImgByBtn(nextBtn, images, mainImage, title, description)
    changeImgByBtn(prevBtn, images, mainImage, title, description)
}

/**
 * increment actualIndex +1
 */
function incrementIndex(array) {
    actualIndex++;

    if (actualIndex === array.length) {
        actualIndex = 0;
    }
}

/**
 * decrement actualIndex -1
 */
function decrementIndex(array) {
    actualIndex--;

    if (actualIndex < 0) {
        actualIndex = array.length - 1;
    }
}

/**
 * simulate click on next btn
 */
function autoClickOnNext() {
    const nextBtn = $('#next');
    nextBtn.click();
}

/**
 * start set interval and change img
 */
function changeImgOnTimer() {
    if (!startAutoPlay) {
        startAutoPlay = setInterval(autoClickOnNext, 1500);
    }
}

/**
 * 
 * @param {object} nextBtn 
 * @param {object} prevBtn 
 */
function eventAutoPlay(nextBtn, prevBtn) {
    const containerImg = $('.image');
    const thumbsImg = $('.thumbnails').find('img');

    thumbsImg.on("mouseleave", function () {
        changeImgOnTimer();
    });

    containerImg.on("mouseleave", function () {
        changeImgOnTimer();
    });

    containerImg.on("mouseenter", function () {
        clearInterval(startAutoPlay);
        startAutoPlay = null;
    });

    nextBtn.on("mouseenter", function () {
        clearInterval(startAutoPlay);
        startAutoPlay = null;
    });

    nextBtn.on("mouseleave", function () {
        changeImgOnTimer();
    });

    prevBtn.on("mouseenter", function () {
        clearInterval(startAutoPlay);
        startAutoPlay = null;
    });

    prevBtn.on("mouseleave", function () {
        changeImgOnTimer();
    });
}