let map;
let foodStyle;
let planetsStyle;

$(() => {
  $.getJSON('data/countries.geo.json')
    .done((data) => {
      map = new WorldMap('map', data);
    });

  $.when(
    $.getJSON('data/food-style.json', (data) => {
      foodStyle = data;
    }),
    $.getJSON('data/planets-style.json', (data) => {
      planetsStyle = data;
    }),
  ).then(() => {
    $.getJSON('data/beef.json')
      .done((data) => {
        const image = new InteractiveImg('interactive-img-beef', data, foodStyle);
        image.enableFullInteractivity();
      });

    $.getJSON('data/pig.json')
      .done((data) => {
        const image = new InteractiveImg('interactive-img-pig', data, foodStyle);
        image.enableFullInteractivity();
      });

    $.getJSON('data/chicken.json')
      .done((data) => {
        const image = new InteractiveImg('interactive-img-chicken', data, foodStyle);
        image.enableFullInteractivity();
      });

    $.getJSON('data/beans.json')
      .done((data) => {
        const image = new InteractiveImg('interactive-img-beans', data, foodStyle);
        image.enableFullInteractivity();
      });

    $.getJSON('data/cereals.json')
      .done((data) => {
        const image = new InteractiveImg('interactive-img-cereals', data, foodStyle);
        image.enableFullInteractivity();
      });

    $.getJSON('data/vegetables.json')
      .done((data) => {
        const image = new InteractiveImg('interactive-img-vegetables', data, foodStyle);
        image.enableFullInteractivity();
      });

    $.getJSON('data/one-hamburger-meat.json')
      .done((data) => {
        const image = new InteractiveImg('interactive-img-one-hamburger-meat', data, planetsStyle);
        image.enableFullInteractivity();
      });
  
    $.getJSON('data/one-hamburger-vegetarian.json')
      .done((data) => {
        const image = new InteractiveImg('interactive-img-one-hamburger-vegetarian', data, planetsStyle);
        image.enableFullInteractivity();
      });
  
    $.getJSON('data/all-hamburgers-meat.json')
      .done((data) => {
        const image = new InteractiveImg('interactive-img-all-hamburgers-meat', data, planetsStyle);
        image.enableFullInteractivity();
      });
  
    $.getJSON('data/all-hamburgers-vegetarian.json')
      .done((data) => {
        const image = new InteractiveImg('interactive-img-all-hamburgers-vegetarian', data, planetsStyle);
        image.enableFullInteractivity();
      });
  });
});

function refreshMap() {
  map.refresh();
}
