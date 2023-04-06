const fs = require('fs').promises;
const inquirer = require('inquirer');
const { Circle, Triangle, Square } = require('./lib/shapes.js');
const { SVG } = require('./lib/svg.js');

const questions = [
  {
    type: 'input',
    name: 'text',
    message: 'Please enter up to three characters for the logo:',
    validate: function (text) {
      return text.length <= 3;
    },
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Please enter the text color:',
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Please select the shape for the logo:',
    choices: ['Circle', 'Triangle', 'Square'],
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Please enter the shape color:',
  },
];

inquirer
  .prompt(questions)
  .then((answers) => {
    const { text, textColor, shape, shapeColor } = answers;

    const svg = new SVG();

    switch (shape) {
      case 'Circle':
        const circle = new Circle();
        circle.setColor(shapeColor);
        svg.finalShape = circle.render();
        break;
      case 'Triangle':
        const triangle = new Triangle();
        triangle.setColor(shapeColor);
        svg.finalShape = triangle.render();
        break;
      case 'Square':
        const square = new Square();
        square.setColor(shapeColor);
        svg.finalShape = square.render();
        break;
    }

    svg.setText(text, textColor);

    const logo = svg.render();

    return fs.writeFile('logo.svg', logo);
  })
  .then(() => {
    console.log('Logo created successfully!');
  })
  .catch((err) => {
    console.error('Error creating logo:', err);
  });
