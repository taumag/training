
if (document.readyState !== 'complete')  window.addEventListener('load', loadMap);

function loadMap() {
   ymaps.ready(init2);
}

function init1() {
   var myMap = new ymaps.Map('map-yandex', {
      center: [55.751574, 37.573856],
      zoom: 9
   }, {
      searchControlProvider: 'yandex#search'
   }),

      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
         '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
         hintContent: 'Собственный значок метки',
         balloonContent: 'Это красивая метка'
      }, {
         // Опции.
         // Необходимо указать данный тип макета.
         iconLayout: 'default#image',
         // Своё изображение иконки метки.
            iconImageHref: '/img/map_placemark.png',
         // Размеры метки.
         iconImageSize: [30, 42],
         // Смещение левого верхнего угла иконки относительно
         // её "ножки" (точки привязки).
         iconImageOffset: [-5, -38]
      }),

      myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
         hintContent: 'Собственный значок метки с контентом',
         balloonContent: 'А эта — новогодняя',
         iconContent: '12'
      }, {
         // Опции.
         // Необходимо указать данный тип макета.
         iconLayout: 'default#imageWithContent',
         // Своё изображение иконки метки.
            iconImageHref: '/img/map_placemark.png',
         // Размеры метки.
         iconImageSize: [48, 48],
         // Смещение левого верхнего угла иконки относительно
         // её "ножки" (точки привязки).
         iconImageOffset: [-24, -24],
         // Смещение слоя с содержимым относительно слоя с картинкой.
         iconContentOffset: [15, 15],
         // Макет содержимого.
         iconContentLayout: MyIconContentLayout
      });

   myMap.geoObjects
      .add(myPlacemark)
      .add(myPlacemarkWithContent);

}

function init2() {
   var myMap = new ymaps.Map("map-yandex", {
      center: [55.76, 37.64],
      zoom: 3,
      // скрываем элементы управления
      controls: []
      // убираем поведение карты (перемещение, масштабирование и т.д.)
      // behaviors: []
   });

   // Добавляем фон.
   // var pane = new ymaps.pane.StaticPane(myMap, {
   //    zIndex: 100, css: {
   //       width: '100%', height: '100%', backgroundColor: '#1f1f1f'
   //    }
   // });
   // myMap.panes.append('greyBackground', pane);

      // Создаем геообъект с типом геометрии "Точка".
      myGeoObject = new ymaps.GeoObject({
         // Описание геометрии.
         geometry: {
            type: "Point",
            coordinates: [55.8, 37.8]
         },
         // Свойства.
         properties: {
            // Контент метки.
            iconContent: 'Метка',
            balloonContent: 'Меня можно перемещать'
         }
      }, {
         // Опции.
         // Иконка метки будет растягиваться под размер ее содержимого.
         preset: 'twirl#redStretchyIcon',
         // Метку можно перемещать.
         draggable: true
      });

      // Создаем метку с помощью вспомогательного класса.
      myPlacemark1 = new ymaps.Placemark([55.8, 37.6], {
         // Свойства.
         // Содержимое иконки, балуна и хинта.
         iconContent: '1',
         balloonContent: 'Балун',
         hintContent: 'Стандартный значок метки'
      }, {
         // Опции.
         // Стандартная фиолетовая иконка.
            preset: 'islands#yellowCircleDotIcon'
      });

      myPlacemark2 = new ymaps.Placemark([55.76, 37.56], {
         // Свойства.
         hintContent: 'Собственный значок метки'
      }, {
         // Опции.
            iconLayout: 'default#imageWithContent',
         // Своё изображение иконки метки.
            iconImageHref: './img/map_placemark.svg',
         // Размеры метки.
         iconImageSize: [24, 24],
         // Смещение левого верхнего угла иконки относительно
         // её "ножки" (точки привязки).
         iconImageOffset: [-3, -42]
      });

   // Добавляем все метки на карту.
   myMap.geoObjects
      .add(myPlacemark1)
      .add(myPlacemark2);
      // .add(myGeoObject);
}
