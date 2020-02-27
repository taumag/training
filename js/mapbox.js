if (document.readyState !== 'complete') window.addEventListener('load', OnLoad);

function OnLoad() {
   mapboxgl.accessToken = 'pk.eyJ1Ijoia255YXpldmluYyIsImEiOiJjazczZ3ZqamswYnliM2VudjhtbzBsZW93In0.75DLLPt_GyViArLzf7iU9g';
   const map = new mapboxgl.Map({
      container: 'mapbox',
      style: 'mapbox://styles/mapbox/dark-v10'
   });

   let locator = new mapboxgl.GeolocateControl({
      positionOptions: {
         enableHighAccuracy: true
      },
      trackUserLocation: false,
      showUserLocation: false,
      fitBoundsOptions: { maxZoom: 13 }
   });
   // Add geolocate control to the map.
   // map.addControl(locator);

   const Points = [
      [-52, -4],
      [-79, 34],
      [-118, 38],
      [0.5, 48],
      [37, 30],
      [52, 56],
      [55, 59],
      [92, 57],
      [118, 62],
      [112, 65],
      [148, -22]
    ];

   // Далее идёт гигантский кусок кода, который лишь анимирует иконки на карте 0_о
   var size = 100;
   // implementation of CustomLayerInterface to draw a pulsing dot icon on the map
   // see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
   var pulsingDot = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),

      // get rendering context for the map canvas when layer is added to the map
      onAdd: function () {
         var canvas = document.createElement('canvas');
         canvas.width = this.width;
         canvas.height = this.height;
         this.context = canvas.getContext('2d');
      },

      // called once before every frame where the icon will be used
      render: function () {
         var duration = 1500;
         var t = (performance.now() % duration) / duration;

         var radius = (size / 2) * 0.3;
         var outerRadius = (size / 2) * 0.4 * t + radius;
         var context = this.context;

         // draw outer circle
         context.clearRect(0, 0, this.width, this.height);
         context.beginPath();
         context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
         );
         context.fillStyle = 'rgba(255, 206, 53,' + (0.8 - t) + ')';
         context.fill();

         // draw inner circle
         context.beginPath();
         context.arc(
            this.width / 2,
            this.height / 2,
            radius,
            0,
            Math.PI * 2
         );
         context.fillStyle = 'rgba(255, 203, 5, 0.6)';
         // context.strokeStyle = '#FFCB05';
         // context.lineWidth = 2 + 4 * (1 - t);
         context.fill();
         // context.stroke();

         // update this image's data with data from the canvas
         this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
         ).data;

         // continuously repaint the map, resulting in the smooth animation of the dot
         map.triggerRepaint();

         // return `true` to let the map know that the image was updated
         return true;
      }
   };

   // map.on('load', () => {
   //    // locator.trigger();

   // });

   map.on('load', function () {
      map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

      map.addSource('points', {
         'type': 'geojson',
         'data': {
            'type': 'FeatureCollection',
            'features': CreateFeaturesArray(Points)
         }

      });
      map.addLayer({
         'id': 'points',
         'type': 'symbol',
         'source': 'points',
         'layout': {
            'icon-image': 'pulsing-dot',
            "icon-allow-overlap": true
         }
      });
   });

   // Добавляем центрирование по клику
   // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
   map.on('click', 'points', function (e) {
      map.flyTo({ 
         center: e.features[0].geometry.coordinates,
         zoom: 5
      });
   });

   // прикручивем попап
   let popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
   });

   map.on('mouseenter', 'points', function (e) {
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = 'pointer';

      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.description;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup
         .setLngLat(coordinates)
         .setHTML(description)
         .addTo(map);
   });

   map.on('mouseleave', 'points', function () {
      map.getCanvas().style.cursor = '';
      popup.remove();
   });
}

/**
 * Создаёт массив объектов типа Feature с координатами
 * @param  {[ number, number]} data
 */
function CreateFeaturesArray(data) {
   const words = [
      "руду",
      "уголь",
      "золото",
      "подземный эль",
      "нефть",
      "хз что и хз зачем",
      "бурду",
      "печеньки :)",
      "анобтаниум",
      "алмазы",
      "ураниум",
   ];

   const template = (pos, i) => ({
      type: 'Feature',
      geometry: {
         type: 'Point',
         coordinates: pos
      },
      properties: {
         description:
            `<strong>Карьер №${i + 1}</strong><p>Тут добывают ${words[i]}.</p>`
      },
   });

   return data.map((val, i) => template(val, i));
}