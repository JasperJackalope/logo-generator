const fs = require('fs');
const inquirer = require('inquirer');
const SVG = require('svg.js');

inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters for the logo:',
      validate: function(text) {
        return text.length <= 3;
      }
    }
  ])
  .then(function(answers) {
    // Use the user's response to generate the SVG logo
  });

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
