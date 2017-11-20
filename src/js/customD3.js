class ImgInteractive {
  constructor(idElement, imageSrc, id, tables) {
    this.idElement = idElement;
    this.imageSrc = imageSrc;

    this.div = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);


    this.svgImg = d3.select(idElement).append('svg')
      .attr({
        width: 200,
        height: 200,
        border: '1px solid #ccc',
      });

    this.svgImg.append('svg:image')
      .attr('width', 200)
      .attr('height', 200)
      .attr('xlink:href', this.imageSrc)
      .on('mouseover', this.mouseover.bind(this))
      .on('mousemove', () => {
        this.mousemove(id, tables);
      })
      .on('mouseout', this.mouseout.bind(this));
  }

  mousemove(id, tables) {
    this.div
      .html(`<span id=${id}> ${tables}</span>`)
      .style('left', `${d3.event.pageX + 50}px`)
      .style('top', `${d3.event.pageY - 200}px`);
  }
  mouseover() {
    this.div.transition()
      .duration(500)
      .style('opacity', 0.9);
  }
  mouseout() {
    this.div.transition()
      .duration(500)
      .style('opacity', 0);
  }
}

class Table {
  constructor(elementId, titleTable, titles, rows) {
    this.elementId = document.getElementById(elementId);
    this.table = '';
    this.addTable(titleTable, titles, rows);
  }

  addTable(titleTable, titles, rows) {
    this.table += '<table class="tableau zebre">';
    this.table += `<caption>${titleTable}</caption>`;
    this.table += '<colgroup><col /><col /> </colgroup>';
    this.table += '<thead>';
    this.table += '<tr>';

    // Title
    titles.forEach((title) => {
      this.table += `<th>${title}</th>`;
    });
    this.table += '</tr>';
    this.table += '</thead>';
    this.table += '<tbody>';

    // Body
    rows.forEach((row) => {
      this.table += '<tr>';
      row.forEach((cell) => {
        this.table += `<td>${cell}</td>`;
      });
      this.table += '</tr>';
    });

    this.table += '</tbody>';
    this.table += '</table>';
  }

  getTable() {
    return this.table;
  }
}

const nutrimentsTitle = ['Ressource', 'Qte / Kg'];
const consoTitle = ['Nutriments', 'Qte / Kg'];

const nutBeef = [
  ['Protéines', '10g'],
  ['Fer', '24g'],
  ['Calcium', '0.2g'],
  ['Vitamine B12', '3g'],
  ['Glucides', '46g'],
  ['Lipides', '20g'],
];
const consoBeef = [
  ['Eau', '15000 litres'],
  ['Surface', '24 hectares'],
  ['Indice', '0.4'],
];

const idBeef = 'idBeef';
const tableBeef = new Table(idBeef, 'Que consomme en ressource naturelle 1kg de viande rouge? ', consoTitle, consoBeef);
tableBeef.addTable('Quel apport en nutriment contient la viande rouge ?', nutrimentsTitle, nutBeef);
const result = tableBeef.getTable();

const image = new ImgInteractive('#tableInteractive', 'img/tableIconeVache.jpg', idBeef, result);
const image2 = new ImgInteractive('#tableInteractive', 'img/tableIconeCochon.jpg', idBeef, result);
const image3 = new ImgInteractive('#tableInteractive', 'img/tableIconePoulet.png', idBeef, result);
