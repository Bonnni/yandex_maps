let data = JSON.parse(`{
	"map": [
            {"id":"1", "country": "russia", "city": "Красноярск",  "office" : "КРАСНОЯРСК", "name": "Лягушкин Иван Сергеевич",
			"email": "username@flagstudio.ru", "phone":"+7922222222", "coordinates": "[56.021574, 92.851197]"},
            {"id":"2", "country": "russia", "city": "Первоуральск", "office": "ПЕРВОУРАЛЬСК", "name": "Чижевский Вячеслав Максимович",
			"email": "user2fd@flagstudio.ru","phone":"+7982152312", "coordinates": "[51.900277, 59.940770]"},
            {"id":"3", "country": "russia", "city": "Красноярск",  "office" : "КРАСНОЯРСК 2", "name": "Максим Максимович Максимов",
			"email": "santa@flagstudio.ru", "phone":"+79999999", "coordinates": "[56.023124, 92.815664]"},
            {"id":"4", "country": "russia", "city": "Екатеринбург",  "office" : "Новый Екатеринбург", "name": "Максим Максимович Максимов",
			"email": "santa@flagstudio.ru", "phone":"+79999999", "coordinates": "[56.826773, 60.608905]"},
            {"id":"5", "country": "belorussia", "city": "Брест",  "office" : "Брестский клуб", "name": "Николаев Николай Николаевич",
			"email": "username@flagstudio.ru", "phone":"6922222222", "coordinates": "[52.110163, 23.644509]"},
            {"id":"6", "country": "belorussia", "city": "Брест", "office": "Башня Брест", "name": "Потапов Потам Потапович",
			"email": "user2fd@flagstudio.ru","phone":"5982152312", "coordinates": "[52.109740, 23.682618]"},
            {"id":"7", "country": "belorussia", "city": "Брест",  "office" : "Дом Брест", "name": "Никитов Никит Никитич",
			"email": "santa@flagstudio.ru", "phone":"5179999999", "coordinates": "[52.130874, 23.737893]"},
            {"id":"8", "country": "belorussia", "city": "Брест",  "office" : "ГЛАВНЫЙ БРЕСТ", "name": "Рустамов Рустам Рустамыч",
			"email": "santa@flagstudio.ru", "phone":"69999999", "coordinates": "[52.094729, 23.773599]"}
            
        ]
    }`);

let dataMap = data.map;
const dataLenght = Object.keys(dataMap).length;

let tabRussia = document.getElementById("tab__russia_js");
let tabBelorussia = document.getElementById("tab__belorussia_js");
let country = tabRussia.dataset.country;

tabRussia.onclick = function() {
    country = tabRussia.dataset.country;
    tabRussia.classList.remove('unactive');
    tabBelorussia.classList.add('unactive');
    createCloser();
    createSpoilers();
    mapConstruct();
};
tabBelorussia.onclick = function() {
    country = tabBelorussia.dataset.country;
    tabBelorussia.classList.remove('unactive');
    tabRussia.classList.add('unactive');
    createCloser();
    createSpoilers();
    mapConstruct();
};

function citiesCollection() {
    let cities = [];
    for (let i = 0; i < dataLenght; i++) {
        if (dataMap[i].country === country) {
            if (!cities.includes(dataMap[i].city)) {
                cities.push(dataMap[i].city);
            }
        }
    }
    return cities;
}

function createCloser() {
    let spoilers = document.getElementById('spoilers__elements_js');
    spoilers.innerHTML = "";
    let cities = citiesCollection();

    for (let i = 0; i < cities.length; i++) {
        let city = document.createElement("div");
        city.setAttribute('class', 'spoiler__element hidden');
        city.setAttribute('onclick', 'hideSpoiler(' + i + ')');
        city.setAttribute('data-id', i);
        city.innerHTML = `<div class="spoiler__closer">
            <div class="spoiler__city"><span>${cities[i]}</span></div>
            <div class="closer__check"></div>
        </div>
        <div class='spoiler__offices' data-map='${cities[i]}'></div>
    </div>`;
        spoilers.appendChild(city);
    }
}

function hideSpoiler(id) {
    let dataId = id;
    let element = document.querySelector(`.spoiler__element[data-id="${dataId}"]`);
    if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
    } else element.classList.add('hidden');
}

function createSpoilers() {
    for (let i = 0; i < dataLenght; i++) {
        if (dataMap[i].country === country) {
            let element = document.createElement("div");
            element.setAttribute("class", "spoiler__body");
            element.innerHTML = `<div class="spoiler__office">
                                            <span>${dataMap[i].office}</span>
                                        </div>
                                        <div class="spoiler__name">
                                            <span>${dataMap[i].name}</span>
                                        </div>
                                        <div class="spoiler__phones">
                                            <div class="spoiler__phone">
                                                <span>${dataMap[i].phone}</span>
                                            </div>
                                            <div class="spoiler__phone">
                                                <span>${dataMap[i].phone}</span>
                                            </div>
                                        </div>
                                        <div class="spoiler__email">
                                            <span>${dataMap[i].email}</span>
                                        </div>
                                    </div>`;
            document.querySelector(`.spoiler__offices[data-map="${dataMap[i].city}"]`).appendChild(element);
        }
    }
}

function getCityId(city) {

    for (let i = 0; i < citiesCollection().length; i++) {
        if (citiesCollection()[i] === city) return i;
    }
}

ymaps.ready(function() {
    init();
});

function init() {
    let map = new ymaps.Map("map", {
        center: [55.8, 37.8],
        zoom: 4,
        controls: [],
    });
    let clusterer = new ymaps.Clusterer({
        clusterIconLayout: ymaps.templateLayoutFactory.createClass('<div class="cluster"><a>{{ properties.geoObjects.length }}  </a></div>'),
        clusterIconShape: {
            type: 'Rectangle',
            coordinates: [
                [0, 0],
                [39, 39]
            ]
        },
    });

    constructPointYandexApi(map, clusterer);
    map
        .setBounds(map.geoObjects.getBounds(), { checkZoomRange: true })
        .then(function() {
            if (map.getZoom() > 15) map.setZoom(15);
        });
}

function mapConstruct() {
    document.getElementById("map").remove();
    let map = document.createElement("div");
    map.setAttribute("id", "map");
    document.querySelector(".yandex-map__map").appendChild(map);
    init();
}

function constructPointYandexApi(map, clusterer) {
    let pointerStyle = ymaps.templateLayoutFactory.createClass(
        '<div class="pointer"></div>'
    );
    let pointerStyleHover = ymaps.templateLayoutFactory.createClass(
        '<div class="pointer-hover"></div>'
    );
    let ballon = ymaps.templateLayoutFactory.createClass(
        `<div class='ballon'data-map={{properties.map}}>
        <a href="#" class='close'>x</a>
            <div class='ballon-body'>
            <hr><div data-city={{properties.city}} id='city-id' class="ballon__office" class='p-2 mx-4' style='color: #ff9e00;'><strong>Офис {{properties.office}}</strong></div>
            <div class='p-2 mx-4'>{{properties.name}}</div>
            <div class='p-2 mx-4'>{{properties.phone}}</div>
            <div class='p-2 mx-4' style='color:#61c3ed;'>{{properties.email}}</div>
            </div>
            <div class='triangle'></div>
        </div>`, {
            build: function() {
                this.constructor.superclass.build.call(this);

                this._$element = $('.ballon', this.getParentElement());

                this.applyElementOffset();

                this._$element.find('.close')
                    .on('click', $.proxy(this.onCloseClick, this));
            },

            clear: function() {
                this._$element.find('.close')
                    .off('click');

                this.constructor.superclass.clear.call(this);
            },

            onSublayoutSizeChange: function() {
                MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                if (!this._isElement(this._$element)) {
                    return;
                }

                this.applyElementOffset();

                this.events.fire('shapechange');
            },

            applyElementOffset: function() {
                this._$element.css({
                    left: -42,
                    top: -204,
                });
            },


            onCloseClick: function(e) {
                e.preventDefault();
                this.events.fire('userclose');
            },
        });



    for (let i = 0; i < dataLenght; i++) {
        if (country === dataMap[i].country) {
            let geo = [];
            geo = JSON.parse(dataMap[i].coordinates);
            element = new ymaps.Placemark(
                [geo[0], geo[1]], {
                    city: dataMap[i].city,
                    office: dataMap[i].office,
                    name: dataMap[i].name,
                    phone: dataMap[i].phone,
                    email: dataMap[i].email,
                }, {
                    balloonShadow: false,
                    balloonLayout: ballon,
                    iconLayout: pointerStyle,
                    balloonPanelMaxMapArea: 0,
                    hideIconOnBalloonOpen: false,
                    iconShape: {
                        type: 'Circle',
                        coordinates: [0, 0],
                        radius: 30
                    }
                },
            );

            element.events
                .add('click', function(e) {
                    hideSpoiler(getCityId(dataMap[i].city));
                    e.get('target').options.set('iconLayout', pointerStyleHover);
                })


            clusterer.add(element);
            map.geoObjects.add(clusterer);
        }
    }
}