
/**
 * Controller to the game state
 * 
 * @param {int} startingSize 
 */
function ColorGame(startingSize) {
    const boardingFactory = new BoardFactory();
    const gameState = {
        level: 0,
        board: boardingFactory.build(startingSize),
        size: startingSize,
        isOver: false,
    };

    /**
     * Move the game state to the next level of dificulty
     */
    function goToNextLevel() {
        const nextSize = gameState.size + 1;
        gameState.level = gameState.level + 1;
        gameState.board = boardingFactory.build(nextSize);
        gameState.size = nextSize;
    }

    /**
     * Change the game state according to the play (click) on a column. (Ideally this "isSelected" attribute should be read only)
     * @param {object} column 
     */
    this.playAt = function (column) {
        if (!gameState.isOver) {
            if (column.isSelected) {
                goToNextLevel();
            } else {
                gameState.isOver = true;
            }
        }
        return gameState;
    }

    /**
     * Returns a safe copy of the game state
     */
    this.getGameState = function () {
        return Object.assign({}, gameState);
    }
}

/**
 * Factory to create boards
 */
function BoardFactory() {
    const DEFAULT_LUMINOSITY = 40;
    const SELECTED_LUMINOSITY = 50;

    /**
     * Build a new board: Rows, columns with random style and selects one column as "the right one" changing its style.
     * @param {int} size 
     */
    this.build = function (size) {
        const hue = random(361);
        const saturation = random(101);
        const rows = generateRandomRows(size, generateStyle(hue, saturation, DEFAULT_LUMINOSITY));
        const selectedRow = rows[random(size)].columns[random(size)];

        selectedRow.style = generateStyle(hue, saturation, SELECTED_LUMINOSITY);
        selectedRow.isSelected = true;

        return { rows: rows };
    }

    /**
     * Generates the rows and columns for the level
     * @param {int} size the number of rows/columns
     * @param {object} style the style to be applied
     */
    function generateRandomRows(size, style) {
        const rows = [];

        for (var rowIndex = 0; rowIndex < size; rowIndex++) {
            rows[rowIndex] = { key: rowIndex, columns: [] };

            for (var columnIndex = 0; columnIndex < size; columnIndex++) {
                rows[rowIndex].columns[columnIndex] = {
                    key: rowIndex + "_" + columnIndex,
                    style: style
                }
            }
        }
        return rows;
    }

    /**
     * Generates a random style to be used in the cell using HSL.
     * 
     * @param {int} hue 
     * @param {int} saturation 
     * @param {int} luminosity 
     */
    function generateStyle(hue, saturation, luminosity) {
        return { 'background-color': 'hsl(' + hue + ', ' + saturation + '%, ' + luminosity + '%)' };
    }

    /**
     * Helper to generated a random number
     * @param {int} size 
     */
    function random(size) {
        return Math.floor(Math.random() * Math.floor(size));
    }
};

module.exports = ColorGame;