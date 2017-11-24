class ImgInteractive {
  constructor(idElement) {
    this.idElement = idElement;
  }
  addImage(imageSrc, id, tables) {
    this.div = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    this.svgImg = d3.select(this.idElement).append('svg')
      .attr({
        width: 70,
        height: 70,
        border: '1px solid #ccc',
      });

    this.svgImg.append('svg:image')
      .attr('width', 60)
      .attr('height', 60)
      .attr('xlink:href', imageSrc)
      .on('mouseover', this.mouseover.bind(this))
      .on('mousemove', () => {
        this.mousemove(id, tables);
      })
      .on('mouseout', this.mouseout.bind(this));
  }

  getSvg() {
    return this.svgImg;
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
  constructor(elementId, titleTable, tableHeader, rows) {
    this.elementId = document.getElementById(elementId);
    this.tables = '';
    this.listTable = [];
    this.addTable(titleTable, tableHeader, rows);
  }

  addTable(titleTable, tableHeader, rows) {
    let table = '';
    table += '<table class="tableau zebre">';
    table += `<caption>${titleTable}</caption>`;
    table += '<colgroup><col /><col /> </colgroup>';
    table += '<thead>';
    table += '<tr>';
    // Title
    tableHeader.forEach((title) => {
      table += `<th>${title}</th>`;
    });
    table += '</tr>';
    table += '</thead>';
    table += '<tbody>';

    // Body
    rows.forEach((row) => {
      table += '<tr>';
      row.forEach((cell) => {
        table += `<td>${cell}</td>`;
      });
      table += '</tr>';
    });

    table += '</tbody>';
    table += '</table>';
    this.tables += table;
    this.listTable.push(table);
  }

  getTables() {
    return this.tables;
  }

  getTable(index) {
    return this.tables[index];
  }
}


const nutrimentsTitle = ['Ressource', 'Qte / Kg'];
const consoTitle = ['Nutriments', 'Qte / Kg'];

const nutBeef = [['Protéines', '10g'], ['Fer', '24g'], ['Calcium', '0.2g'], ['Vitamine B12', '3g'], ['Glucides', '46g'], ['Lipides', '20g']];
const consoBeef = [['Eau', '15000 litres'], ['Surface', '24 hectares'], ['Indice', '0.4']];
const idBeef = 'idBeef';
const tableBeef = new Table(idBeef, 'Que consomme en ressource naturelle 1kg de viande rouge? ', consoTitle, consoBeef);
tableBeef.addTable('Quel apport en nutriment contient la viande rouge ?', nutrimentsTitle, nutBeef);

const nutPig = [['Protéines', '0g'], ['Fer', '0g'], ['Calcium', '0g'], ['Vitamine B12', '0g'], ['Glucides', '0g'], ['Lipides', '0g']];
const consoPig = [['Eau', '0 litres'], ['Surface', '0 hectares'], ['Indice', '0']];
const idPig = 'idPig';
const tablePig = new Table(idPig, 'Que consomme en ressource naturelle 1kg de viande de porc? ', consoTitle, consoPig);
tablePig.addTable('Quel apport en nutriment contient la viande de porc ?', nutrimentsTitle, nutPig);

const nutChicken = [['Protéines', '0g'], ['Fer', '0g'], ['Calcium', '0g'], ['Vitamine B12', '0g'], ['Glucides', '0g'], ['Lipides', '0g']];
const consoChicken = [['Eau', '0 litres'], ['Surface', '0 hectares'], ['Indice', '0']];
const idChicken = 'idPig';
const tableChicken = new Table(idChicken, 'Que consomme en ressource naturelle 1kg de viande blanche? ', consoTitle, consoChicken);
tableChicken.addTable('Quel apport en nutriment contient la viande blanche ?', nutrimentsTitle, nutChicken);

const nutVegetables = [['Protéines', '0g'], ['Fer', '0g'], ['Calcium', '0g'], ['Vitamine B12', '0g'], ['Glucides', '0g'], ['Lipides', '0g']];
const consoVegetables = [['Eau', '0 litres'], ['Surface', '0 hectares'], ['Indice', '0']];
const idVegetables = 'idVegetables';
const tableVegetables = new Table(idVegetables, 'Que consomme en ressource naturelle 1kg de légumes? ', consoTitle, consoVegetables);
tableVegetables.addTable('Quel apport en nutriment contient les légumes ?', nutrimentsTitle, nutVegetables);

const nutBeans = [['Protéines', '0g'], ['Fer', '0g'], ['Calcium', '0g'], ['Vitamine B12', '0g'], ['Glucides', '0g'], ['Lipides', '0g']];
const consoBeans = [['Eau', '0 litres'], ['Surface', '0 hectares'], ['Indice', '0']];
const idBeans = 'idBeans';
const tableBeans = new Table(idBeans, 'Que consomme en ressource naturelle 1kg de légumineuses? ', consoTitle, consoBeans);
tableBeans.addTable('Quel apport en nutriment contient les légumineuses ?', nutrimentsTitle, nutBeans);

const nutCereals = [['Protéines', '0g'], ['Fer', '0g'], ['Calcium', '0g'], ['Vitamine B12', '0g'], ['Glucides', '0g'], ['Lipides', '0g']];
const consoCereals = [['Eau', '0 litres'], ['Surface', '0 hectares'], ['Indice', '0']];
const idCereals = 'idCereals';
const tableCereals = new Table(idCereals, 'Que consomme en ressource naturelle 1kg de céréales? ', consoTitle, consoCereals);
tableCereals.addTable('Quel apport en nutriment contient les céréales ?', nutrimentsTitle, nutCereals);


const imgTable = new ImgInteractive('#tableInteractive');
imgTable.addImage('svg/cow.svg', idBeef, tableBeef.getTables());
imgTable.addImage('svg/pig.svg', idPig, tablePig.getTables());
imgTable.addImage('svg/chicken.svg', idBeef, tableChicken.getTables());
imgTable.addImage('svg/vegetables.svg', idBeef, tableBeef.getTables());
imgTable.addImage('svg/beans.svg', idBeef, tableBeef.getTables());
imgTable.addImage('svg/cereals.svg', idBeef, tableBeef.getTables());
