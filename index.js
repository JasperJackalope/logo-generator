const fs = require('fs');
const inquirer = require('inquirer');
const SVG = require('svg.js');

const questions = [
  {
    type: 'input',
    name: 'text',
    message: 'Please enter up to three characters for the logo:',
    validate: function(text) {
      return text.length <= 3;
    }
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Text Color - please enter the hexadecimal code:',
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Please select the shape for the logo:',
    choices: [
     'Circle',
     'Triangle',
     'Square'
    ]
  },
  {
   type: 'input',
   name: 'shapeColor',
   message: 'Shape Color - please enter the hexadecimal code:',
  }
]

inquirer.prompt(questions)
  .then(answers => {
    const { text, textColor, shape, shapeColor } = answers;

    const svg = SVG().size(300, 200);

    // Draw the shape
    let shapeElement;
    switch (shape) {
      case 'Circle':
        shapeElement = svg.circle(100).fill(shapeColor).move(50, 50);
        break;
      case 'Triangle':
        shapeElement = svg.polygon('0,100 50,0 100,100').fill(shapeColor).move(50, 50);
        break;
      case 'Square':
        shapeElement = svg.rect(100, 100).fill(shapeColor).move(50, 50);
        break;
    }

    // Draw the text
    const textElement = svg.text(text).fill(textColor).move(100, 75);

    // Get the SVG markup
    const svgMarkup = svg.svg();

    // Write the SVG markup to a file
    fs.writeFileSync('logo.svg', svgMarkup);

    console.log('Generated logo.svg');
  })
  .catch(err => console.error(err));
