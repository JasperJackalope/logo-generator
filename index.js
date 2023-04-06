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
    message: 'Please enter the text color:'
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
    message: 'Please enter the shape color:',
  }
];

inquirer.prompt(questions).then(async (answers) => {
  const { text, textColor, shape, shapeColor } = answers;

  // Generate the SVG code based on the user input
  const svg = `
    <svg width="300" height="200">
      <rect x="0" y="0" width="300" height="200" fill="${shapeColor}"/>
      <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" fill="${textColor}">${text}</text>
      ${shape === 'Circle' ? '<circle cx="150" cy="100" r="50" fill="none" stroke-width="10" stroke="#ffffff"/>' : ''}
      ${shape === 'Triangle' ? '<polygon points="150,30 50,170 250,170" fill="none" stroke-width="10" stroke="#ffffff"/>' : ''}
      ${shape === 'Square' ? '<rect x="50" y="50" width="200" height="100" fill="none" stroke-width="10" stroke="#ffffff"/>' : ''}
    </svg>
  `;

  // Save the SVG code to a file
  await fs.writeFile('logo.svg', svg);

  console.log('Generated logo.svg');
});
