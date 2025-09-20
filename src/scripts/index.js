//Плавный скролл
ScrollSmoother.create({
    smooth: .5,
    effects: true,
    smoothTouch: 0.1,
})

//Появление даты свадьбы
gsap.to(".header__text-date", {
    duration: 2,
    scrambleText: {
        chars: "1234567890",
        text: "10.10.2025",
        speed: .8,
        rightToLeft: true
    },
    delay: .5
})

//Имена гостей
const currentURL = decodeURIComponent(window.location.href);

let currentGuests = currentURL.slice(currentURL.indexOf('?') + 1);
currentGuests = currentGuests.replaceAll(/\_/g, ' ');
let inviteGuests = ''

if (currentGuests.split(' ').length <= 3) {
    inviteGuests = `Уважаемый(ая), ${currentGuests}`;
} else {
    inviteGuests = `Уважаемые, ${currentGuests}`;
}
document.getElementById("guests").textContent = inviteGuests;

//Отправка на почту
const form = document.getElementById("form");
const button = document.querySelector(".main__fieldset-button")
const text = document.querySelector(".main__fieldset__end-text");

let sendEmail = (event) => {
    event.preventDefault()

    button.classList.add("hide")
    text.classList.remove("hide");
    

    let selectedCheckboxes = [...document.querySelectorAll("input[type=checkbox]:checked")].map((checkbox => checkbox.value));
    let templateParams = {
    name: currentGuests,
    ivents: selectedCheckboxes
    }

    emailjs.send('service_fb6d4rk', 'template_uyrf5x4', templateParams, "zfaXs9olQNZuWy2Pp").then((response) => {
    console.log("Success", response.status, response.text)
    }),
    (error) => {
        console.log("Failed...", error)
    };
}

form.addEventListener("submit", sendEmail);

//Карта
function initMap() {
    let map = new ymaps.Map("map", {
        center: [51.653192, 39.325268],
        zoom: 10
    });

    const marriageReg = new ymaps.Placemark([51.644267, 39.413110], {
        balloonContentHeader: "Дворец бракосочетания",
        balloonContentBody: "село Новая Усмань, ул. Ленина, 278",
    }, {
        iconLayout: "default#image",
        iconImageHref: "./assets/mark.svg",
        iconImageSize: [40, 40],

        iconShape: {
            type: 'Circle',
            coordinates: [0, 0],
            radius: 20
        },
    });

    const church = new ymaps.Placemark([51.642192, 39.412414], {
        balloonContentHeader: "Храм",
        balloonContentBody: "село Новая Усмань, ул. 20 лет ВЛКСМ, 3А"
    }, {
        iconLayout: "default#image",
        iconImageHref: "./assets/mark.svg",
        iconImageSize: [40, 40],

        iconShape: {
        type: 'Circle',
        coordinates: [0, 0],
        radius: 20
        },
    });

    const cafe = new ymaps.Placemark([51.659310, 39.241858], {
        balloonContentHeader: "Кафе \"Паруса\"",
        balloonContentBody: "Воронеж, Монастырщенка"
    }, {
        iconLayout: "default#image",
        iconImageHref: "./assets/mark.svg",
        iconImageSize: [40, 40],

        iconShape: {
        type: 'Circle',
        coordinates: [0, 0],
        radius: 30
        },
    });

    map.controls.remove('geolocationControl');
    map.controls.remove('searchControl');
    map.controls.remove('trafficControl');
    map.controls.remove('typeSelector');
    map.controls.remove('fullscreenControl');
    map.controls.remove('zoomControl');
    map.controls.remove('rulerControl');
    //map.behaviors.disable(['scrollZoom']);

    map.geoObjects.add(marriageReg);
    map.geoObjects.add(church);
    map.geoObjects.add(cafe);

    marriageReg.balloon.open();
};
ymaps.ready(initMap)