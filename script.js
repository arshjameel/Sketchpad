let grid = document.querySelector('.gridBox');
let squares = document.querySelectorAll('.cells');
let settings = document.querySelector('.settings');
let allButtons = document.querySelectorAll('button');

const color = document.querySelector(".color");
const rainbow = document.querySelector('.rainbow');
const mosaic = document.querySelector('.mosaic');
const eraser = document.querySelector(".eraser");
const clear = document.querySelector('.clear');
const size = document.querySelector(".size");
const toggleGrid = document.querySelector('.toggleGrid');

let colorFlag = 0;
let rainbowFlag = 0;
let mosaicFlag = 0;
let eraserFlag = 0;
let gridFlag = 0;
let gridSize = 16; // initial grid size

// resets text color and background color of buttons in settings panel
function initColorButtons() {
    color.style.color = `#231710`;
    color.style.backgroundColor = `#b68121`;
    rainbow.style.color = `#231710`;
    rainbow.style.backgroundColor = `#b68121`;
    eraser.style.color = `#231710`;
    eraser.style.backgroundColor = `#b68121`;
};

// default mode: sets color to black
function handleColor() {
    initColorButtons(); // resets all button colors before toggling the desired button only
    color.style.color = `#b68121`;
    color.style.backgroundColor = `#231710`;
    squares.forEach((square) => {
        square.addEventListener('mouseenter', () => {
            square.style.backgroundColor = `#231710`;
            if (mosaicFlag === 0) { // sets max opacity if mosaic effect is disabled
                square.style.opacity = 1;
            }
        });
    });
};

// every cell is given a random color to give a "rainbow" pattern
function handleRainbow() {
    initColorButtons(); // resets all button colors before toggling the desired button only
    rainbow.style.color = `#b68121`;
    rainbow.style.backgroundColor = `#231710`;
    // rgb values are generated by generating random numbers for the red, blue, and green values
    squares.forEach((square) => {
        var o = Math.round, r = Math.random, s = 255;
        let randomColor = 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
        square.addEventListener('mouseenter', () => {
            // randomly generated color value is assigned as the cell background color
            square.style.backgroundColor = randomColor;
            if (mosaicFlag === 0) { // sets max opacity if mosaic effect is disabled
                square.style.opacity = 1;
            }
        });
    });
};

// toggles application of mosaic effect on the grid
function handlemosaic() {
    if (mosaicFlag === 0) {
        squares.forEach((square) => {
            square.dataset.opacity = 0;
            square.addEventListener('mouseenter', applyMosaic); // event listener to enable mosaic effect
        });
        mosaic.style.color = `#b68121`;
        mosaic.style.backgroundColor = `#231710`;
        mosaicFlag = 1;
    } else if (mosaicFlag === 1) {
        squares.forEach((square) => {
            square.removeEventListener('mouseenter', applyMosaic); // disables the mosaic effect
        });
        mosaic.style.color = `#231710`;
        mosaic.style.backgroundColor = `#b68121`;
        mosaicFlag = 0;
    };
};

// opacity of each new cell is increased incrementally as the cell is revisted
function applyMosaic(event) {
    const square = event.target;
    let currentOpacity = parseFloat(square.dataset.opacity);
    if (currentOpacity < 1) {
        currentOpacity += 0.1;
        square.dataset.opacity = currentOpacity;
    }
    square.style.opacity = currentOpacity;
};

// toggles application of eraser effect on the grid
function handleEraser() {
    if (eraserFlag === 0) {
        squares.forEach((square) => {
            square.dataset.opacity = 0;
            square.addEventListener('mouseenter', applyEraser); // event listener to enable mosaic effect
        });
        eraser.style.color = `#b68121`;
        eraser.style.backgroundColor = `#231710`;
        eraserFlag = 1;
    } else if (eraserFlag === 1) {
        squares.forEach((square) => {
            square.removeEventListener('mouseenter', applyEraser); // disables the mosaic effect
        });
        eraser.style.color = `#231710`;
        eraser.style.backgroundColor = `#b68121`;
        eraserFlag = 0;
    }
};

// sets color of each cell to white to give the illusion of "erasing"
function applyEraser(event) {
    const square = event.target;
    square.style.backgroundColor = '#bca193';
};

// sets color of all cells in the grid to white to give the illusion of "clearing" the grid
function handleClear() {
    squares.forEach((square) => {
        square.style.backgroundColor = '#bca193'; // sets cell color to white
        square.style.opacity = 1; // resets opacity to maximum value
    });
    handleColor();
};

// gets new grid size and deletes current grid
function handleGridSize() {
    let new_size = parseInt(prompt('Enter size N for an NxN sized grid:'));
    // cancels the change request if grid size value was unchanged or not a number
    if (new_size === gridSize || isNaN(new_size)) {
        return;
    }
    if (new_size <= 0 || new_size > 100) {
        alert('Size must be between 1 to 100 (inclusive)')
        return;
    }
    gridSize = new_size;
    while (grid.firstChild) { // removes all cells in the grid
        grid.removeChild(grid.firstChild);
    }
    setGrid(gridSize); // calls function that generates new grid
};

// creates a new grid based on whatever grid size value was passed as a parameter
function setGrid(gridSize) {
    // create an NxN grid where N is the grid size value passed as a parameter
    for (let i = 0; i < (gridSize ** 2); i++) {
        let new_square = document.createElement("div");
        new_square.className = 'cells';
        grid.appendChild(new_square);
    };
    let squareSize = 100 / gridSize;
    squares = document.querySelectorAll('.cells');
    // modify cell size as required to ensure all cells fit inside the fixed size grid container
    squares.forEach((square) => {
        square.style.width = `${squareSize}%`;
        square.style.height = `${squareSize}%`;
    });
    initAllButtons();
    handleColor();
};

// allows user to toggle the display of grid boxes
function handleGridDisplay() {
    // a flag has been used to toggle between the two grid displays 
    if (gridFlag === 0) {
        squares.forEach((square) => {
            square.style.border = '1px solid black';
        });
        toggleGrid.style.color = `#b68121`;
        toggleGrid.style.backgroundColor = `#231710`;
        gridFlag = 1;
    } else if (gridFlag === 1) {
        squares.forEach((square) => {
            square.style.border = 'none';
        });
        toggleGrid.style.color = `#231710`;
        toggleGrid.style.backgroundColor = `#b68121`;
        gridFlag = 0;
    };
};

// handles the css styling of each button in the settings panel
function initAllButtons() {
    allButtons.forEach((button) => {
        button.style.width = `150px`;
        button.style.height = `50px`;
        button.style.fontWeight = `bold`;
        button.style.fontSize = `18px`;
        button.style.border = `4px solid #231710`;
        button.style.color = `#231710`;
        button.style.backgroundColor = `#b68121`;
    });
};

// event listeners for all buttons in the settings panel
size.addEventListener('click', handleGridSize);
color.addEventListener('click', handleColor);
eraser.addEventListener('click', handleEraser);
clear.addEventListener('click', handleClear);
rainbow.addEventListener('click', handleRainbow);
mosaic.addEventListener('click', handlemosaic);
toggleGrid.addEventListener('click', handleGridDisplay);

// create a grid with a predefined number of cells
setGrid(gridSize);
// initialize text and background colors of all buttons
initAllButtons();