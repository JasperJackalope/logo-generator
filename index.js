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
.then(answers => {;
    const markdown = generateMarkdown(answers);

    fs.writeFile('logo.svg', markdown, err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(' Logo generated successfully!');
    });
  })
  .catch(err => console.error(err));

const svg = SVG().size(300, 200);

// Draw the circle
const circle = svg.circle(100).fill('green').move(50, 50);

// Draw the text
const text = svg.text('SVG').fill('white').move(100, 75);

// Get the SVG markup
const svgMarkup = svg.svg();

// Write the SVG markup to a file
fs.writeFileSync('logo.svg', svgMarkup);

console.log('Generated logo.svg');
