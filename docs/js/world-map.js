class WorldMap {
  constructor(divId, data) {
    this.data = data;

    this.container = L.map(divId).setView([0, 0], 1);

    this.info = L.control();

    this.info.onAdd = () => {
      this.info.div = L.DomUtil.create('div', 'info');
      this.info.update();
      return this.info.div;
    };

    this.info.update = (country) => {
      const yearInput = document.getElementById('year-input').value;

      let content = `<h4>Consommation de viande - ${yearInput}</h4>`;

      if (country) {
        content += `<b>${country.name}</b><br>`;

        if (country.years) {

          const year = country.years[`_${yearInput}`];

          if (year != null) {
            const { kgPerPersonPerWeek, tonnes } = year;

            content += '<b>Kg par personne par semaine</b><br>';
            content += `Viande rouge: ${kgPerPersonPerWeek.redMeat.toFixed(2)} kg par personne par semaine<br>`;
            content += `Viande blanche: ${kgPerPersonPerWeek.whiteMeat.toFixed(2)} kg par personne par semaine<br>`;
            content += `Poisson: ${kgPerPersonPerWeek.waterMeat.toFixed(2)} kg par personne par semaine<br>`;
            content += `Total: ${kgPerPersonPerWeek.total.toFixed(2)} kg par personne par semaine<br>`;

            content += '<b>Tonnes par année</b><br>';
            content += `Viande rouge: ${tonnes.redMeat.toFixed(2)} tonnes<br>`;
            content += `Viande blanche: ${tonnes.whiteMeat.toFixed(2)} tonnes<br>`;
            content += `Poisson: ${tonnes.waterMeat.toFixed(2)} tonnes<br>`;
            content += `Total: ${tonnes.total.toFixed(2)} tonnes`;
          } else {
            content += 'Aucune donnée pour cette année n\'est disponible';
          }
        } else {
          content += 'Aucune donnée pour ce pays n\'est disponible';
        }
      } else {
        content += 'Passez la souris sur un pays pour avoir plus d\'informations';
      }

      this.info.div.innerHTML = content;
    };

    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');

      const grades = [0, 0.75, 1.5, 2.25, 3, 3.75, 4.5, 5.25, 6];
      const labels = ['<b>kg/pers/sem consommés</b>'];

      let from;
      let to;

      for (let i = 0; i < grades.length; i += 1) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(`<i style="background: ${this.getColorKgPerPersonPerWeek(from)}"></i> ${from} ${to ? ` - ${to} kg/pers/sem` : 'kg/pers/sem+'}`);
      }

      div.innerHTML = labels.join('<br>');

      return div;
    };

    const tiles = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibHVkZWxhZm8iLCJhIjoiY2phMHNvdnpuOGRkNDJ3cHl2bDBuNGh1dCJ9.aGZh7bD5d-A9JrsfhZZeDA', {
      maxZoom: 18,
      attribution: `Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, 
        <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, 
        Imagery &copy; <a href="http://mapbox.com">Mapbox</a>, 
        Food supply data &copy; <a href="http://www.fao.org/faostat/en/#data/CL">FAO</a> `,
      id: 'mapbox.light',
    });

    tiles.addTo(this.container);
    legend.addTo(this.container);

    this.info.addTo(this.container);

    this.refresh();
  }

  refresh() {
    this.info.update();

    if (this.geoJson != null) {
      this.container.removeLayer(this.geoJson);
    }

    this.geoJson = L.geoJson(this.data, {
      style: this.style.bind(this),
      onEachFeature: this.onEachFeature.bind(this),
    });

    this.geoJson.addTo(this.container);
  }

  getColorKgPerPersonPerWeek(consumption) {
    let color;

    if (consumption > 6) {
      color = '#7f0000';
    } else if (consumption > 5.25) {
      color = '#b30000';
    } else if (consumption > 4.5) {
      color = '#d7301f';
    } else if (consumption > 3.75) {
      color = '#ef6548';
    } else if (consumption > 3) {
      color = '#fc8d59';
    } else if (consumption > 2.25) {
      color = '#fdbb84';
    } else if (consumption > 1.5) {
      color = '#fdd49e';
    } else if (consumption > 0.75) {
      color = '#fee8c8';
    } else {
      color = '#fff7ec';
    }

    return color;
  }

  style(feature) {
    const yearInput = document.getElementById('year-input').value;

    let kg = 0;
    let tonnes = 0;

    if (feature.properties.years != null) {
      const { years } = feature.properties;

      if (years[`_${yearInput}`] != null) {
        kg = feature.properties.years[`_${yearInput}`].kgPerPersonPerWeek.total;
        tonnes = feature.properties.years[`_${yearInput}`].tonnes.total;
      }
    }

    return {
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
      fillColor: this.getColorKgPerPersonPerWeek(kg),
    };
  }

  highlightFeature(e) {
    const layer = e.target;

    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7,
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }

    this.info.update(layer.feature.properties);
  }

  resetHighlight(e) {
    this.geoJson.resetStyle(e.target);
    this.info.update();
  }

  zoomToFeature(e) {
    this.container.fitBounds(e.target.getBounds());
  }

  onEachFeature(feature, layer) {
    layer.on({
      mouseover: this.highlightFeature.bind(this),
      mouseout: this.resetHighlight.bind(this),
      click: this.zoomToFeature.bind(this),
    });
  }
}
