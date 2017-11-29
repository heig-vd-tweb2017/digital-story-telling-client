class InteractiveImg {
  constructor(svgContainerId, data, style) {
    this.svgContainer = d3.select(`#${svgContainerId}`);

    this.data = data;
    this.style = style;
  }

  enableFullInteractivity() {
    this.showImage();
    this.showTitle();
    this.showSummary();
    this.showDetails();
    //this.enableSound();
  }

  showImage() {
    this.svgImage = this.svgContainer.append('svg:image')
      .attr('xling:href', this.data.image)
      .attr('x', this.style.image.x)
      .attr('y', this.style.image.y)
      .attr('width', this.style.image.width)
      .attr('height', this.style.image.height);
  }

  showTitle() {
    this.title = this.svgContainer.append('text')
      .attr('x', this.style.title.x)
      .attr('y', this.style.title.y)
      .attr('text-anchor', 'middle')
      .attr('font-family', this.style.title.fontFamily)
      .attr('font-weight', this.style.title.fontWeight)
      .attr('font-size', this.style.title.fontSize)
      .text(this.data.title);
  }

  showSummary() {
    this.summary = this.svgContainer.append('text')
      .attr('x', this.style.content.x)
      .attr('y', this.style.content.y)
      .attr('alignment-baseline', 'central')
      .attr('font-family', this.style.content.fontFamily)
      .attr('font-weight', this.style.content.fontWeight)
      .attr('font-size', this.style.content.fontSize)
      .attr('style', 'opacity:1');

    this.renderTable(this.summary, this.data.summary);

    this.svgImage.attr('width', '40%');
  }

  showDetails() {
    this.details = this.svgContainer.append('text')
      .attr('x', this.style.content.x)
      .attr('y', this.style.content.y)
      .attr('font-family', this.style.content.fontFamily)
      .attr('font-weight', this.style.content.fontWeight)
      .attr('font-size', this.style.content.fontSize)
      .attr('style', 'opacity:0');

    this.renderTable(this.details, this.data.details);

    this.svgImage
      .on('mouseover', this.mouseover.bind(this))
      .on('mouseout', this.mouseout.bind(this));
  }

  enableSound() {
    this.svgImage
      .on('click', this.click.bind(this));

    this.sound = new Audio(this.data.sound);
  }

  renderTable(container, rows) {
    let lineNumber = 0;

    rows.forEach((item) => {
      container.append('tspan')
        .attr('x', this.style.content.x)
        .attr('y', this.style.content.y)
        .attr('dx', 0)
        .attr('dy', `${(this.style.content.fontSize * lineNumber)}`)
        .attr('font-family', this.style.content.fontFamily)
        .attr('font-weight', this.style.content.fontWeight)
        .attr('font-size', this.style.content.fontSize)
        .text(item.definition);

      container.append('tspan')
        .attr('x', this.style.content.x)
        .attr('y', this.style.content.y)
        .attr('dx', this.style.content.dx)
        .attr('dy', `${(this.style.content.fontSize * lineNumber)}`)
        .attr('font-family', this.style.content.fontFamily)
        .attr('font-weight', this.style.content.fontWeight)
        .attr('font-size', this.style.content.fontSize)
        .text(item.value);

      lineNumber += 1;
    });
  }

  mouseover() {
    this.summary.transition()
      .duration(500)
      .style('opacity', 0);
    this.details.transition()
      .duration(500)
      .style('opacity', 1);
  }

  mouseout() {
    this.summary.transition()
      .duration(500)
      .style('opacity', 1);
    this.details.transition()
      .duration(500)
      .style('opacity', 0);
  }

  click() {
    this.sound.play();
  }
}
