import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cell from './Cell';
import { Button, Row, Col } from "react-bootstrap/";

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: this.initBoardData(
        this.props.rows,
        this.props.cols,
        this.props.mines
      ),
      mineCount: this.props.mines,
    };
  }

  initBoardData(rows, cols, mines) {
    let data = this.createEmptyArray(rows, cols);
    data = this.plantMines(data, rows, cols, mines);
    data = this.getNeighbours(data, rows, cols);
    return data;
  }
  plantMines(data, rows, cols, mines) {
    let randomx,
      randomy,
      minesPlanted = 0;

    while (minesPlanted < mines) {
      randomx = this.getRandomNumber(cols);
      randomy = this.getRandomNumber(rows);
      if (!data[randomx][randomy].isMine) {
        data[randomx][randomy].isMine = true;
        minesPlanted++;
      }
    }

    return data;
  }

  getNeighbours(data, rows, cols) {
    let updatedData = data;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (data[i][j].isMine !== true) {
          let mine = 0;
          const area = this.traverseBoard(data[i][j].x, data[i][j].y, data);
          area.map((value) => {
            if (value.isMine) {
              mine++;
            }
          });
          if (mine === 0) {
            updatedData[i][j].isEmpty = true;
          }
          updatedData[i][j].neighbour = mine;
        }
      }
    }

    return updatedData;
  }

  traverseBoard(x, y, data) {
    const el = [];

    //up
    if (x > 0) {
      el.push(data[x - 1][y]);
    }

    //down
    if (x < this.props.rows - 1) {
      el.push(data[x + 1][y]);
    }

    //left
    if (y > 0) {
      el.push(data[x][y - 1]);
    }

    //right
    if (y < this.props.cols - 1) {
      el.push(data[x][y + 1]);
    }

    // top left
    if (x > 0 && y > 0) {
      el.push(data[x - 1][y - 1]);
    }

    // top right
    if (x > 0 && y < this.props.cols - 1) {
      el.push(data[x - 1][y + 1]);
    }

    // bottom right
    if (x < this.props.rows - 1 && y < this.props.cols - 1) {
      el.push(data[x + 1][y + 1]);
    }

    // bottom left
    if (x < this.props.rows - 1 && y > 0) {
      el.push(data[x + 1][y - 1]);
    }

    return el;
  }

  createEmptyArray(cols, rows) {
    let data = [];

    for (let i = 0; i < rows; i++) {
      data.push([]);
      for (let j = 0; j < cols; j++) {
        data[i][j] = {
          x: i,
          y: j,
          isMine: false,
          neighbour: 0,
          isRevealed: true,
          isEmpty: false,
          isFlagged: false,
        };
      }
    }
    return data;
  }
  revealBoard() {
    let updatedData = this.state.boardData;
    updatedData.map((datarow) => {
      datarow.map((dataitem) => {
        dataitem.isRevealed = true;
      });
    });
    this.setState({
      boardData: updatedData,
    });
  }

  /* reveal logic for empty cell */
  revealEmpty(x, y, data) {
    let area = this.traverseBoard(x, y, data);
    area.map((value) => {
      if (
        !value.isFlagged &&
        !value.isRevealed &&
        (value.isEmpty || !value.isMine)
      ) {
        data[value.x][value.y].isRevealed = true;
        if (value.isEmpty) {
          this.revealEmpty(value.x, value.y, data);
        }
      }
    });
    return data;
  }
  make2Darray(rows,cols){
      let array= new Array(cols);
      for(let i=0;i<array.length;i++){
          array[i]= new Array(rows);
      }
      return array
  }
   // get random number given a dimension
   getRandomNumber(dimension) {
    // return Math.floor(Math.random() * dimension);
    return Math.floor((Math.random() * 1000) + 1) % dimension;
  }

  render() {

    let array = this.make2Darray(this.props.rows,this.props.cols);
    let grid = this.state.board;
    for (let i = 0; i < this.props.cols; i++) {
      for (let j = 0; j < this.props.rows; j++) {
        array[i][j] = (
         <Cell data={grid[i][j]}/>
        );
      }
    }
    let mapper = array.map((row) => {
      let mapper2 = row.map((cell) => {
        return cell;
      });
      return (
        <Row style={style} className="justify-content-center">
          {mapper2}
        </Row>
      );
    });

    return <div className="game">{mapper}</div>;
  }
}
const border = {
  border: "2px solid black",
  borderRadius: 0,
  width: "50px",
  height: "50px",
};
const style = { paddingRight: 0, paddingLeft: 0 };
export default Board;


