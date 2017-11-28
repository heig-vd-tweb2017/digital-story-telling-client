class ImgDescription {
  constructor(data) {
    this.title = data.title;
    this.summary = data.summary;
    this.details = data.details;
  }

  getFormatedTitle() {
    return {
      x: '50%',
      y: '15%',
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: 14, // pts
      text: this.title,
    };
  }

  getFormatedSummary() {
    return {
      x: '45%',
      dx: 90,
      y: `${50 - ((this.summary.length - 1) * 5)}%`,
      fontFamily: 'Montserrat',
      fontWeight: 'normal',
      fontSize: 12, // pts
      text: this.summary,
    };
  }

  getFormatedDetails() {
    return {
      x: '45%',
      dx: 90,
      y: `${100 - (this.details.length * 9)}%`,
      fontFamily: 'Montserrat',
      fontWeight: 'normal',
      fontSize: 12, // pts
      text: this.details,
    };
  }
}
