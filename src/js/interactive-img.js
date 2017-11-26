class InteractiveImg {
  constructor(svgContainerId, svgFile) {
    this.svgContainer = d3.select(`#${svgContainerId}`);

    this.svgImage = this.svgContainer.append('svg:image')
      .attr('xling:href', svgFile)
      .attr('x', '0px')
      .attr('y', '25%')
      .attr('width', '100%')
      .attr('height', '100px');
  }

  addDescription(description) {
    this.description = description;

    const title = this.description.getFormatedTitle();
    const summary = this.description.getFormatedSummary();

    this.title = this.svgContainer.append('text')
      .attr('x', title.x)
      .attr('y', title.y)
      .attr('text-anchor', 'middle')
      .attr('font-family', title.fontFamily)
      .attr('font-weight', title.fontWeight)
      .attr('font-size', title.fontSize)
      .text(title.text);

    this.summary = this.svgContainer.append('text')
      .attr('x', summary.x)
      .attr('y', summary.y)
      .attr('alignment-baseline', 'central')
      .attr('font-family', summary.fontFamily)
      .attr('font-weight', summary.fontWeight)
      .attr('font-size', summary.fontSize)
      .attr('style', 'opacity:1');

    let lineNumber = 0;

    summary.text.forEach((line) => {
      this.summary.append('tspan')
        .attr('x', summary.x)
        .attr('y', summary.y)
        .attr('dx', 0)
        .attr('dy', `${(summary.fontSize * lineNumber)}`)
        .attr('font-family', summary.fontFamily)
        .attr('font-weight', summary.fontWeight)
        .attr('font-size', summary.fontSize)
        .text(line[0]);

      this.summary.append('tspan')
        .attr('x', summary.x)
        .attr('y', summary.y)
        .attr('dx', summary.dx)
        .attr('dy', `${(summary.fontSize * lineNumber)}`)
        .attr('font-family', summary.fontFamily)
        .attr('font-weight', summary.fontWeight)
        .attr('font-size', summary.fontSize)
        .text(line[1]);

      lineNumber += 1;
    });

    this.svgImage.attr('width', '40%');
  }

  enableInteraction() {
    const details = this.description.getFormatedDetails();

    this.details = this.svgContainer.append('text')
      .attr('x', details.x)
      .attr('y', details.y)
      .attr('font-family', details.fontFamily)
      .attr('font-weight', details.fontWeight)
      .attr('font-size', details.fontSize)
      .attr('style', 'opacity:0');

    let lineNumber = 0;

    details.text.forEach((line) => {
      this.details.append('tspan')
        .attr('x', details.x)
        .attr('y', details.y)
        .attr('dx', 0)
        .attr('dy', `${(details.fontSize * lineNumber)}`)
        .attr('font-family', details.fontFamily)
        .attr('font-weight', details.fontWeight)
        .attr('font-size', details.fontSize)
        .text(line[0]);

      this.details.append('tspan')
        .attr('x', details.x)
        .attr('y', details.y)
        .attr('dx', details.dx)
        .attr('dy', `${(details.fontSize * lineNumber)}`)
        .attr('font-family', details.fontFamily)
        .attr('font-weight', details.fontWeight)
        .attr('font-size', details.fontSize)
        .text(line[1]);

      lineNumber += 1;
    });

    this.svgImage
      .on('mouseover', this.mouseover.bind(this))
      .on('mouseout', this.mouseout.bind(this))
  }

  enableSound(soundFile) {
    this.svgImage
      .on('click', this.click.bind(this));

    this.sound = new Audio(soundFile);
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
