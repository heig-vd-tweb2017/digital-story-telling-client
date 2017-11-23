/*
class WorldMap {

	constructor(divId, data) {

		WorldMapClass = self();

		WorldMapClass.map = L.map('map').setView([0, 0], 1);
		WorldMapClass.info = L.control();
		WorldMapClass.legend = L.control({position: 'bottomright'});
		WorldMapClass.geojson;
		
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibHVkZWxhZm8iLCJhIjoiY2phMHNvdnpuOGRkNDJ3cHl2bDBuNGh1dCJ9.aGZh7bD5d-A9JrsfhZZeDA', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery &copy; <a href="http://mapbox.com">Mapbox</a>, ' +
				'Food supply data &copy; <a href="http://www.fao.org/faostat/en/#data/CL">FAO</a>',
			id: 'mapbox.light'
		}).addTo(WorldMapClass.map);

		WorldMapClass.info.onAdd = function (map) {
			this._div = L.DomUtil.create('div', 'info');
			this.update();
			return this._div;
		};

		WorldMapClass.info.update = function (country) {

			const year = document.getElementById('year-input').value;			

			let content = `<h4>Consommation de viande en ${year}</h4>`;
			
			if (country) {
				content += '<b>' + country.name + '</b><br>';

				if (country.years) {
					content += '';
				}
				else {
					content += 'Aucune donnée pour ce pays n\'est disponible';
				}
			}
			else {
				content += 'Passez la souris sur un pays';
			}

			this._div.innerHTML = content;
		};

		WorldMapClass.legend.onAdd = function (map) {
			
			var div = L.DomUtil.create('div', 'info legend'),
				grades = [0, 34, 68, 102, 136, 170, 204, 238, 272],
				labels = ['<b>Tonnes consommées</b>'],
				from, to;

			for (var i = 0; i < grades.length; i++) {
				from = grades[i];
				to = grades[i + 1];

				labels.push(
					'<i style="background:' + WorldMapClass._getColor(from) + '"></i> ' +
					from + ' Mio' + (to ? ' - ' + to + ' Mio' : '+')
				);
			}

			div.innerHTML = labels.join('<br>');
			return div;
		};

		WorldMapClass.info.addTo(WorldMapClass.map);
		WorldMapClass.legend.addTo(WorldMapClass.map);

		WorldMapClass.geojson = L.geoJson(data, {
			style: WorldMapClass._style,
			onEachFeature: WorldMapClass._onEachFeature
		}).addTo(map);
	}

	_getColor(consumption) {
		return consumption < 34 ? '#fff7ec' :
			consumption < 68 ? '#fee8c8' :
			consumption < 102 ? '#fdd49e' :
			consumption < 136 ? '#fdbb84' :
			consumption < 170 ? '#fc8d59' :
			consumption < 204 ? '#ef6548' :
			consumption < 238 ? '#d7301f' :
			consumption < 272 ? '#b30000' :
			'#7f0000';
	}

	_style(feature) {

		const year = document.getElementById('year-input').value;

		let tonnes = 0;

		if (feature.properties.years != null) {

			const years = feature.properties.years;

			if (years[`_${year}`] != null) {
				tonnes = feature.properties.years[`_${year}`].tonnes.total;
			}
		}

		const color = WorldMapClass._getColor(tonnes / 100000);

		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
			fillColor: color
		};
	}

	_highlightFeature(e) {
		const layer = e.target;

		layer.setStyle({
			weight: 5,
			color: '#666',
			dashArray: '',
			fillOpacity: 0.7
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

		info.update(layer.feature.properties);
	}

	_resetHighlight(e) {
		geojson.resetStyle(e.target);
		info.update();
	}

	_zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

	_onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
	}
}
*/


const map = L.map('map').setView([0, 0], 1);
const info = L.control();
const legend = L.control({position: 'bottomright'});
const tiles = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibHVkZWxhZm8iLCJhIjoiY2phMHNvdnpuOGRkNDJ3cHl2bDBuNGh1dCJ9.aGZh7bD5d-A9JrsfhZZeDA', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery &copy; <a href="http://mapbox.com">Mapbox</a>, ' +
		'Food supply data &copy; <a href="http://www.fao.org/faostat/en/#data/CL">FAO</a>',
	id: 'mapbox.light'
});

let countriesData;
let geoJson;

$(() => {

	$.getJSON('countries.geo.json')
	.done((data) => {
		countriesData = data;

		setData(data);
	});
	
});

info.onAdd = (map) => {
	info._div = L.DomUtil.create('div', 'info');
	info.update();
	return info._div;
};

info.update = (country) => {

	const year = document.getElementById('year-input').value;			

	let content = `<h4>Consommation de nourriture - ${year}</h4>`;
	
	if (country) {
		content += '<b>' + country.name + '</b><br>';

		if (country.years) {
			content += '';
		}
		else {
			content += 'Aucune donnée pour ce pays n\'est disponible';
		}
	}
	else {
		content += 'Passez la souris sur un pays pour avoir plus d\'informatios';
	}

	info._div.innerHTML = content;
};

legend.onAdd = (map) => {
	
	const div = L.DomUtil.create('div', 'info legend');
	const grades = [0, 34, 68, 102, 136, 170, 204, 238, 272];
	const labels = ['<b>Tonnes consommées</b>'];

	let from, to;

	for (let i = 0; i < grades.length; i++) {
		from = grades[i];
		to = grades[i + 1];

		labels.push(
			'<i style="background:' + getColor(from) + '"></i> ' +
			from + ' Mio' + (to ? ' - ' + to + ' Mio' : '+')
		);
	}

	div.innerHTML = labels.join('<br>');
	return div;
};

tiles.addTo(map);
info.addTo(map);
legend.addTo(map);

function setData(data) {
	geoJson = L.geoJson(data, {
		style: style,
		onEachFeature: onEachFeature
	}).addTo(map);
}

function refresh() {

	info.update();

	map.removeLayer(geoJson);
	
	geoJson = L.geoJson(countriesData, {
		style: style,
		onEachFeature: onEachFeature
	}).addTo(map);
}

function getColor(consumption) {
	return consumption < 34 ? '#fff7ec' :
		consumption < 68 ? '#fee8c8' :
		consumption < 102 ? '#fdd49e' :
		consumption < 136 ? '#fdbb84' :
		consumption < 170 ? '#fc8d59' :
		consumption < 204 ? '#ef6548' :
		consumption < 238 ? '#d7301f' :
		consumption < 272 ? '#b30000' :
		'#7f0000';
}

function style(feature) {

	const year = document.getElementById('year-input').value;

	let tonnes = 0;

	if (feature.properties.years != null) {

		const years = feature.properties.years;

		if (years[`_${year}`] != null) {
			tonnes = feature.properties.years[`_${year}`].tonnes.total;
		}
	}

	return {
		weight: 2,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.7,
		fillColor: getColor(tonnes / 100000)
	};
}

function highlightFeature(e) {
	const layer = e.target;

	layer.setStyle({
		weight: 5,
		color: '#666',
		dashArray: '',
		fillOpacity: 0.7
	});

	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		layer.bringToFront();
	}

	info.update(layer.feature.properties);
}

function resetHighlight(e) {
	geoJson.resetStyle(e.target);
	info.update();
}

function zoomToFeature(e) {
	map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight,
		click: zoomToFeature
	});
}