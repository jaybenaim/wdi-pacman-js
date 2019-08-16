// Setup initial game stats
let score = 0;
let lives = 2;
let powerPellets = 4; 
let dots = 240; 
let ghostsEaten = 0; 
// Define your ghosts here

// replace this comment with your four ghosts setup as objects
const inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};
const blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};
const pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};
const clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

const ghosts = [inky, blinky, pinky, clyde]

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(() => {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log(`Score: ${score}   Dots: ${dots}  Lives: ${lives} \n Power-Pellets: ${powerPellets} Ghosts Eaten: ${ghostsEaten}`);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  if (dots > 10) 
    console.log('(d) Eat 10 Dots');
  if (dots > 100)
    console.log('(s) Eat 100 Dots');
  if (dots > 0) 
    console.log('(a) Eat All The Dots!!');
  if (powerPellets >= 1) { 
    console.log('(p) Eat Power-Pellet');
  }
  ghosts.forEach(function(ghost) { 
    if (ghost.edible == false) { 
      ghost.edible = '(inedible)'
    } else if (ghost.edible == true) { 
      ghost.edible = '(edible)'
    }
  })
  console.log('(1) Eat Inky ' + inky.edible); 
  console.log('(2) Eat Blinky ' +  blinky.edible); 
  console.log('(3) Eat Pinky ' + pinky.edible); 
  console.log('(4) Eat Clyde ' + clyde.edible); 
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot(dotAmount) {
  console.log('\nChomp!');
  score += 10;
  if (dotAmount == 10) { 
    dots -= 10; 
  } else if (dotAmount == 100) { 
    dots -= 100; 
  } else if (dotAmount == 'all') { 
    dots = 0; 
  } 
  if (dots < 0){ 
    dots = 0; 
  } else if (dots == 0){ 
    lives += 1; 
  }
}

var eatGhost = (ghost) => { 
    if (ghost.edible === false) { 
        if (lives > 0) { 
            lives -= 1; 
            console.log(`\nYou got eaten by ${ghost.name} the ${ghost.colour} ghost. `)
        } else { 
            process.exit(); 
        }
    } 
    if (ghostsEaten == 0){ 
      score += 200;
    } else if (ghostsEaten == 1){ 
      score += 400; 
    } else if (ghostsEaten == 2){ 
      score += 800; 
    } else if (ghostsEaten == 3){
      score += 1600; 
    }
    ghost.edible = false 
    ghostsEaten += 1
    lives += 1 
    console.log(`\nYou ate ${ghost.name}`); 
    }

var eatPowerPellet = () => { 
    score += 50; 
    if (powerPellets >= 1) { 
      powerPellets -= 1;
    } 
    ghosts.forEach(function(ghost){ 
        ghost.edible = true; 
      }); 
}

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot(10);
      break;
    case 's': 
      eatDot(100); 
      break;
    case 'a': 
      eatDot('all'); 
      break; 
    case '1': 
      eatGhost(inky); 
      break; 
    case '2': 
      eatGhost(blinky); 
      break; 
    case '3': 
      eatGhost(pinky); 
      break; 
    case '4': 
      eatGhost(clyde); 
      break;
    case 'p': 
      if (powerPellets == 0) { 
        console.log("\n No Power-Pellets left!")
      } else if (powerPellets >= 1) { 
        eatPowerPellet(); 
      } 
      break; 
    default:
      console.log('\nInvalid Command!');
  }
}  


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', (key) => {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', () => {
  console.log('\n\nGame Over!\n');
});