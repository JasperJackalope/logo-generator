const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const { createSVG } = require('./svg'); // assume this module exports a function that generates an SVG file based on the input

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
    validate: function(color) {
      return /^#([0-9A-Fa-f]{3}){1,2}$/.test(color);
    },
    filter: function(color) {
      return color.startsWith('#') ? color : '#' + color;
    }
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
    validate: function(color) {
      return /^#([0-9A-Fa-f]{3}){1,2}$/.test(color);
    },
    filter: function(color) {
      return color.startsWith('#') ? color : '#' + color;
    }
  }
];

inquirer.prompt(questions).then(function(answers) {
  // Generate the SVG file
  const svg = createSVG(answers.text, answers.textColor, answers.shape.toLowerCase(), answers.shapeColor);

  // Save the SVG file
  const fileName = 'logo.svg';
  const filePath = path.join(__dirname, fileName);
  fs.writeFileSync(filePath, svg);

  console.log(`Generated ${fileName}`);

  // Exit the program
  process.exit();
}).catch(function(error) {
  console.error(error);
  process.exit(1);
});
