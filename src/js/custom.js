let map;

const beefImage = new InteractiveImg('interactive-img-beef', 'svg/beef.svg');
const pigImage = new InteractiveImg('interactive-img-pig', 'svg/pig.svg');
const chickenImage = new InteractiveImg('interactive-img-chicken', 'svg/chicken.svg');

const vegetablesImage = new InteractiveImg('interactive-img-vegetables', 'svg/vegetables.svg');
const cerealsImage = new InteractiveImg('interactive-img-cereals', 'svg/cereals.svg');
const beansImage = new InteractiveImg('interactive-img-beans', 'svg/beans.svg');

$(() => {
  $.getJSON('data/countries.geo.json')
    .done((data) => {
      map = new WorldMap('map', data);
    });

  $.getJSON('data/beef.json')
    .done((data) => {
      const description = new ImgDescription(data);
      beefImage.addDescription(description);
      beefImage.enableInteraction();
      beefImage.enableSound('https://upload.wikimedia.org/wikipedia/commons/4/48/Mudchute_cow_1.ogg');
    });

  $.getJSON('data/pig.json')
    .done((data) => {
      const description = new ImgDescription(data);
      pigImage.addDescription(description);
      pigImage.enableInteraction();
      pigImage.enableSound('https://upload.wikimedia.org/wikipedia/commons/4/4a/Mudchute_pig_2.ogg');
    });

  $.getJSON('data/chicken.json')
    .done((data) => {
      const description = new ImgDescription(data);
      chickenImage.addDescription(description);
      chickenImage.enableInteraction();
    });

  $.getJSON('data/vegetables.json')
    .done((data) => {
      const description = new ImgDescription(data);
      vegetablesImage.addDescription(description);
      vegetablesImage.enableInteraction();
    });

  $.getJSON('data/cereals.json')
    .done((data) => {
      const description = new ImgDescription(data);
      cerealsImage.addDescription(description);
      cerealsImage.enableInteraction();
    });

  $.getJSON('data/beans.json')
    .done((data) => {
      const description = new ImgDescription(data);
      beansImage.addDescription(description);
      beansImage.enableInteraction();
    });
});

function refreshMap() {
  map.refresh();
}