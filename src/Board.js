import Cell from "./Cell";


function Board({ board, onClick, onContextMenu }) {

    let height = board.length;
    let width = board[0].length;


    const getNeighbours = (x, y) => {
        let neighbours = [];
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (i === 0 && j === 0) continue;
                if (x + i >= 0 && x + i < height && y + j >= 0 && y + j < width) {
                    neighbours.push([x + i, y + j]);
                }
            }
        }
        return neighbours;
    }

    const numberOfMines = (x, y) => {
        let count = 0;
        let neighbours = getNeighbours(x, y);
        for (let n of neighbours) {
            if (board[n[0]][n[1]].isMine) {
                count++;
            }
        }

        return count;
    }

    const _open = (x, y) => {
        if (board[x][y].isMarked) return;
        if (board[x][y].isMine) {
            for (let i = 0; i < height; i++) {
                for (let j = 0; j < width; j++) {
                    let cell = board[i][j];
                   if(!cell.isMarked || (cell.isMarked && !cell.isMine)) board[i][j].isOpen = true;
                }
            }
            return;
        }
        board[x][y].isOpen = true;
        if (numberOfMines(x, y) === 0) {
            let neighbours = getNeighbours(x, y);
            for (let n of neighbours) {
                if (!board[n[0]][n[1]].isOpen) {
                    _open(n[0], n[1]);
                }
            }
        }
    }


    return (<table style={{ margin: "auto" }}>
        <tbody>
            {board.map((row, i) => (
                <tr key={i}>
                    {row.map((cell, j) => (
                        <td key={j} onClick={() => {
                            onClick();
                             _open(i, j);
                            }
                        } onContextMenu={(event) => {
                            event.preventDefault();
                           if(!cell.isOpen) cell.isMarked = !cell.isMarked;
                            onContextMenu();
                        }}><Cell isMine={cell.isMine} isOpen={cell.isOpen} isMarked={cell.isMarked} numOfMines={numberOfMines(i, j)} /></td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>);
}

export default Board;