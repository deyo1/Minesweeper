import './Cell.css';


function Cell({ isMine, isOpen, isMarked, numOfMines }) {
    let output = "";
    if(isMarked) {
        output = "X";
    }
    let className = "cell";
    let color;
    let backgroundColor;
    if (isOpen) {
        className = "openCell";
        if(isMine && !isMarked) {
            output = "*";
            backgroundColor = "red";
        }
        else if (numOfMines > 0) {
            output = numOfMines;
            switch(numOfMines) {
                case 1:
                    color = "blue";
                    break;
                case 2:
                    color = "green";
                    break;
                case 3:
                    color = "red";
                    break;
                case 4:
                    color = "purple";
                    break;
                case 5:
                    color = "brown";
                    break;
                case 6:
                    color = "darkRed";
                    break;
                case 7:
                    color = "dimGrey";
                    break;
                case 8:
                    color = "black";
                    break;
                default:
                    break;
            }
        }
    }
    return (
        
        <div style={{color: color, backgroundColor: backgroundColor}} className={className}>{output}</div>
    );
}

export default Cell;