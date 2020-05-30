const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamArray = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const renderList = () =>{
    //if the output dir doesn't exist then use mkdirsync to create output dir
    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamArray), )
}

const teamMembs = () => {
  inquirer
    .prompt([
      {
        name: "nextEmployee",
        type: "list",
        message: "Choose the type of employee",
        choices: ["Engineer", "Intern", "Exit List"]
      }
    ])
    .then(answers => {
      switch (answers.nextEmployee) {
        case "Engineer":
          engineerQuestions();
          break;
        case "Intern":
          internQuestions();
          break;
        default:
            renderList()
          break;
      }
    });
};
//named arrow function
const managerQuestions = () => {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Enter the Manager's name"
      },
      {
        name: "id",
        type: "input",
        message: "Enter the Manager's ID"
      },
      {
        name: "email",
        type: "input",
        message: "Enter the Manager's email"
      },
      {
        name: "officeNum",
        type: "input",
        message: "Enter the Manager's office number"
      }
    ])
    //deconstruct
    .then(({ name, id, email, officeNum }) => {
      const newManager = new Manager(name, id, email, officeNum);
      teamArray.push(newManager);
      teamMembs();
    });
};

function engineerQuestions() {
  inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "Enter the Engineer's name"
    },
    {
      name: "id",
      type: "input",
      message: "Enter the Engineer's ID"
    },
    {
      name: "email",
      type: "input",
      message: "Enter the Engineer's email"
    },
    {
      name: "github",
      type: "input",
      message: "Enter the Engineer's github"
    }
  ])
  .then(({ name, id, email, github}) => {
    const newEngineer = new Engineer(name, id, email, github);
    teamArray.push(newEngineer);
    teamMembs();
  });
}

function internQuestions() {
  inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "Enter the Itern's name"
    },
    {
      name: "id",
      type: "input",
      message: "Enter the Intern's ID"
    },
    {
      name: "email",
      type: "input",
      message: "Enter the Intern's email"
    },
    {
      name: "school",
      type: "input",
      message: "Enter the Intern's school"
    }
  ])
  .then(({ name, id, email, school }) => {
    const newIntern = new Intern(name, id, email, school);
    teamArray.push(newIntern);
    teamMembs();
  });
}

managerQuestions()





/////////////////////////////////////////////////////////////////////////////////////
///Directions
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
