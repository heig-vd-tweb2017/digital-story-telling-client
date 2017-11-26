class ImgDescription {
  constructor(data) {
    this.title = data.title;
    this.score = data.score;
    this.requirements = data.requirements;
    this.nutrients = data.nutrients;
    this.nutrientsUnit = data.nutrientsUnit;
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
    const text = [];

    const { requirements } = this;

    text.push(['Eau', `${requirements.water} ${requirements.waterUnit}`]);
    text.push(['Surface', `${requirements.surface} ${requirements.surfaceUnit}`]);
    text.push(['Score', this.score]);

    return {
      x: '45%',
      dx: 90,
      y: `${50 - ((text.length - 1) * 5)}%`,
      fontFamily: 'Montserrat',
      fontWeight: 'normal',
      fontSize: 12, // pts
      text,
    };
  }

  getFormatedDetails() {
    const text = [];

    const { nutrients } = this;
    const unit = this.nutrientsUnit;

    text.push(['Fer', `${nutrients.iron}${unit}`]);
    text.push(['Calcium', `${nutrients.calcium}${unit}`]);
    text.push(['Magnésium', `${nutrients.magnesium}${unit}`]);
    text.push(['Protéines', `${nutrients.protein}${unit}`]);
    text.push(['Lipides', `${nutrients.lipides}${unit}`]);
    text.push(['Glucides', `${nutrients.glucides}${unit}`]);
    text.push(['Vitamine B12', `${nutrients.b12}${unit}`]);
    text.push(['Fibres', `${nutrients.fiber}${unit}`]);

    return {
      x: '45%',
      dx: 90,
      y: `${100 - (text.length * 9)}%`,
      fontFamily: 'Montserrat',
      fontWeight: 'normal',
      fontSize: 12, // pts
      text,
    };
  }
}
