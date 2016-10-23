## Sample JS Project Proposal: Sewer Nightmare a PipeDream Clone

[LIVE SITE](https://jnico810.github.io/sewernightmare/)

### Background

Using a variety of pipe pieces presented randomly in a queue, the player must construct a path from the start piece for the onrushing sewer slime, or "flooz" (the 1991 Windows version's help files refer to it as "goo"), which begins flowing after a time delay from the start of the round. Pieces may not be rotated; they must be placed as presented in the queue. The player can replace a previously laid piece by clicking on it, as long as the flooz has not yet reached it; however, doing so causes a short time delay before the next piece can be laid. The flooz is required to pass through a given number of pipe pieces in order for the player to continue to the next round. Some rounds also include an end piece, which must be the end of the pipeline the player has constructed, in addition to fulfilling the minimum pipe length requirement.


### Functionality & MVP  

With this clone of Pipe Dream users will be able to:

- [ ] Start, pause, and reset the game
- [ ] Select spaces to place pipe segments
- [ ] Race against the clock to fufill the number of pipes required
- [ ] Play puzzle mode or arcade mode

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production README

### Wireframes

This app will consist of a single screen with game board, game controls, and nav links to the Github, my LinkedIn,
and the About modal.  Game controls will include Start, Stop, and Reset buttons as well as buttons to choose which mode. On the top, there will be a clickable, pop up menu with options for these modes.

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jQuery` for overall structure and game logic,
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

`board.js`: this script will handle the logic for creating and updating the necessary `Easel.js` elements and rendering them to the DOM as well as an array of `tile`s.

`game.js`: this script will handle the game logic behind the scenes. `tile.js` will hold information about the `type` of tile and the `direction` of the green sludge.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above.  Learn the basics of `Easel.js`.  Goals for the day:

- Get a green bundle with `webpack`
- Learn enough `Easel.js` to render an object to the `Canvas` element

**Day 2**: First, build out the `Tile` object to connect to the `Board` object.  Then, use `board.js` to render the square grid, with ideally all 6 tile types. Build the ability to generate random tiles.

- Complete the `title.js` module
- Render a square grid to the `Canvas` using `Easel.js`
- Generate random `tiles` that show up on the side of the board
- Display the amount of pipes required to complete the level on top

**Day 3**: Place tiles on click of the board. Clicking on a tile that already has a pipe, should replace the pipe.After a delay time, generate the sludge to flow through the connected titles. If the sludge hits an edge, generate a green circle.

- Export an `game` object with logic for generating the sludge and placing tiles on click


### Bonus features

There are many directions this game could eventually go.  Some anticipated updates are:

- [ ] Add high score using backend
- [ ] Add harder modes
