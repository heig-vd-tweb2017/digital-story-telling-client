

const texteCow = 'Je suis le texte de la vache youpiiii';
const textePig = 'Je suis le texte de la cochonnnn youpiiii';
const textePoultry= 'Je suis le texte du pouleeeet youpiiii';

class ImgInteractive {
    constructor(idElement, imageSrc, msg) {
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
        this.mousemove(msg);
      })
      .on('mouseout',this.mouseout.bind(this));
    }    

    mousemove(msg) {
      this.div
        .html(`<span>${msg}</span>`)
        .style('left', `${d3.event.pageX - 34}px`)
        .style('top', `${d3.event.pageY - 12}px`);
    }
    mouseover() {
      this.div.transition()
        .duration(500)
        .style('opacity', 0.9);
    }
     mouseout() {
      this.div.transition()
        .duration(500)
        .style('opacity',0);
   }
 }
  
  const image = new ImgInteractive('#tableInteractive', 'img/tableIconeVache.jpg', texteCow);
  const image2 = new ImgInteractive('#tableInteractive', 'img/tableIconeCochon.jpg',textePig);
  const image3 = new ImgInteractive('#tableInteractive', 'img/tableIconePoulet.png',textePoultry);
