class SVG {
    constructor(width, height, text, textColor, shape, shapeColor) {
      this.width = width;
      this.height = height;
      this.text = text;
      this.textColor = textColor;
      this.shape = shape;
      this.shapeColor = shapeColor;
    }
  
    generate() {
      // Create the SVG markup using the user's input
      const svgMarkup = `
        <svg width="${this.width}" height="${this.height}">
          <rect x="0" y="0" width="${this.width}" height="${this.height}" fill="${this.shapeColor}"></rect>
          <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="100" fill="${this.textColor}">${this.text}</text>
        </svg>
      `;
  
      return svgMarkup;
    }
  }
  
  module.exports = SVG;
  