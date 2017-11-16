const div = d3.select('body').append('div')
.attr('class', 'tooltip')
.style('opacity', 1e-6);

function mouseover() {
div.transition()
  .duration(500)
  .style('opacity', 1);
}
function mousemove() {
div
  .html("<span>Ici viendra le texte</span>")
  .style('left', `${d3.event.pageX - 34}px`)
  .style('top', `${d3.event.pageY - 12}px`);
}
function mouseout() {
div.transition()
  .duration(500)
  .style('opacity', 1e-6);
}

const svgImg = d3.select('#tableInteractive').append('svg')
.attr({
  width: 200,
  height: 200,
  border: '1px solid #ccc',
});

svgImg.append('svg:image')
.attr('width', 200)
.attr('height', 200)
.attr('xlink:href', 'img/tableIconeVache.jpg')
.on('mouseover', mouseover)
.on('mousemove', mousemove)
.on('mouseout', mouseout);
