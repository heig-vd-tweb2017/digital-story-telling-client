let map;

$(() => {
  $.getJSON('countries.geo.json')
    .done((data) => {
      map = new WorldMap('map', data);
    });
});

function refreshMap() {
  map.refresh();
}
