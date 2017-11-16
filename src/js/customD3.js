const div = d3.select('body').append('div')
.attr('class', 'tooltip')
.style('opacity', 0.2);

function mouseover() {
div.transition()
  .duration(500)
  .style('opacity', 0.9);
}
function mouseout() {
div.transition()
  .duration(500)
  .style('opacity',0.2);
}

const texteCow = 'Je suis le texte de la vache youpiiii';
const texteBeef = 'Je suis le texte de la vache youpiiii';
const textePig = 'Je suis le texte de la vache youpiiii';

function mousemove() {
div
    .html(`<span>${texteCow}</span>`)
    .style('left', `${d3.event.pageX - 34}px`)
    .style('top', `${d3.event.pageY - 12}px`);
}
function mousemove2() {
div
   // .html(`<span>${texteBeef}</span>`)
   .html(`<span>Lalalal</span>`)
   .style('left', `${d3.event.pageX - 34}px`)
   .style('top', `${d3.event.pageY - 12}px`);
}
function mousemove3() {
div
    // .html(`<span>${texteBeef}</span>`)
    .html(`<span>hihihihi</span>`)
    .style('left', `${d3.event.pageX - 34}px`)
    .style('top', `${d3.event.pageY - 12}px`);
}

class ImgInteractive {
    constructor(idElement, imageSrc, move, msg) {
      this.idElement = idElement;
      this.imageSrc = imageSrc;
      
      this.svgImg = d3.select(idElement).append('svg')
      .attr({
        width: 200,
        height: 200,
        border: '1px solid #ccc',
      });
      
      this.svgImg.append('svg:image')
      .attr('width', 200)
      .attr('height', 200)
      .attr('xlink:href', imageSrc)
      .on('mouseover', mouseover)
      .on('mousemove', move)
      .on('mouseout', mouseout);
    }    
  }
  
  const image = new ImgInteractive('#tableInteractive', 'img/tableIconeVache.jpg', mousemove);
  const image2 = new ImgInteractive('#tableInteractive', 'img/tableIconeCochon.jpg',mousemove2);
  const image3 = new ImgInteractive('#tableInteractive', 'img/tableIconePoulet.png',mousemove3);
