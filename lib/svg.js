class SVG {
    constructor() {
      this.finalText = "";
      this.finalShape = "";
    }
    
    render() {
      return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">${this.finalShape}${this.finalText}</svg>`;
    }
    
    setText(text, fill) {
      if (text.length > 3) {
        throw new Error("Text must not exceed 3 characters.");
      }
      this.finalText = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${fill}">${text}</text>`;
    }
    
    setShape() {
      this.finalShape = `<rect x="90" y="40" width="120" height="120" fill="dodgerblue" />`;
    }
  }
  
  module.exports = { SVG };