const fs = require('fs').promises;
const inquirer = require('inquirer');

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
];

inquirer.prompt(questions).then((answers) => {
  // Create the SVG string based on the user's input
  const svgString = `
    <svg width="300" height="200">
      <rect x="0" y="0" width="300" height="200" fill="${answers.shapeColor}" />
      <text x="150" y="100" fill="${answers.textColor}" font-size="100" text-anchor="middle">${answers.text}</text>
    </svg>
  `;

  // Write the SVG string to a file
  fs.writeFile('logo.svg', svgString)
    .then(() => {
      console.log('Generated logo.svg');
    })
    .catch((err) => {
      console.error(err);
    });
});
