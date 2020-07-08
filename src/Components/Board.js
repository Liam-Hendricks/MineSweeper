import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cell from "./Cell";
import { Row, Container, Card } from "react-bootstrap/";
import Model from "./Model";
class Board extends React.Component {

  constructor(props) {
    
    super(props);
    //getting the props
    const { rows, cols, mines, flags } = this.props;
    //creating and setting board array by passing in prop values
    this.state = {
      board: this.initBoardData(rows, cols, mines, flags),
      mineCount: mines,
      gameEnd: false,
    };
    //binding the handleCellclick to this
    this.handleCellClick = this.handleCellClick.bind(this);
  }

  //calling requied functions to set the  2D board array
  initBoardData(rows, cols, mines, flags) {
    //creating empty 2D array first
    let data = this.createEmptyArray(rows, cols);
    //adding mines to 2D array 
    data = this.plantMines(data, rows, cols, mines);
    //adding flags to 2D array
    data = this.plantFlags(data, rows, cols, flags);
    //setting the numbers in the 2D array indicating how many bombs are near
    data = this.getNeighbours(data, rows, cols);
    return data;
  }

  //function for creating 2D array and creating the cell object
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
          isRevealed: false,
          isEmpty: false,
          isFlagged: false,
        };
      }
    }
    return data;
  }

  //function for making a certain amount of random cell objects a mine/bomb
  plantMines(data, rows, cols, mines) {
    let randomx,
      randomy,
      minesPlanted = 0;
    //continuouly loop through 2D array setting isMine boolean
    while (minesPlanted < mines) {
      //generating random x ,y coordinates 
      randomx = this.getRandomNumber(cols);
      randomy = this.getRandomNumber(rows);
      //if the cell is not a mine already then make it set isMine to true
      if (!data[randomx][randomy].isMine) {
        data[randomx][randomy].isMine = true;
        minesPlanted++;
      }
    }
    //return the new 2D array with mines/bombs
    return data;
  }

  // get random number given a dimension
  getRandomNumber(dimension) {
    // return Math.floor(Math.random() * dimension);
    return Math.floor(Math.random() * 1000 + 1) % dimension;
  }

  //function for making a certain amount of random cell objects a flag
  plantFlags(data, rows, cols, flags) {
    let randomx,
      randomy,
      flagsPlanted = 0;
    //continuouly loop through 2D array setting cell object isMine boolean 
    while (flagsPlanted < flags) {
      //generating random x ,y coordinates 
      randomx = this.getRandomNumber2(cols);
      randomy = this.getRandomNumber2(rows);
      //if the cell is not already a flag or a mine/bomb the set isFlagged to true
      if (!data[randomx][randomy].isMine && !data[randomx][randomy].isFlagged) {
        data[randomx][randomy].isFlagged = true;
        //console.log(`flag at row:${randomx+1} col:${randomy+1}`)
        flagsPlanted++;
      }
    }
    return data;
  }

  // get random number given a dimension
  getRandomNumber2(dimension) {
    // return Math.floor(Math.random() * dimension);
    return Math.floor(Math.random() * 1000 + 2) % dimension;
  }

  //this function sets neighbor value of the cell indicating the amount of mines near it
  getNeighbours(data, rows, cols) {
    let updatedData = data;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (data[i][j].isMine !== true) {
          let mine = 0;
          const area = this.traverseBoard(data[i][j].x, data[i][j].y, data);
          //counting how many cell objects have isMine set to true
          area.forEach((value) => {
            if (value.isMine) {
              mine++;
            }
          });
          //if no mines are near set isEmpty flag
          if (mine === 0) {
            updatedData[i][j].isEmpty = true;
          }
          //else set the neighbour value
          updatedData[i][j].neighbour = mine;
        }
      }
    }

    return updatedData;
  }

  //traversing around current cell and returing array containing cell objects
  traverseBoard(x, y, data) {
    let {rows,cols} =this.props;
    const el = [];

    //up
    if (x > 0) {
      el.push(data[x - 1][y]);
    }

    //down
    if (x < rows - 1) {
      el.push(data[x + 1][y]);
    }

    //left
    if (y > 0) {
      el.push(data[x][y - 1]);
    }

    //right
    if (y < cols - 1) {
      el.push(data[x][y + 1]);
    }

    // top left
    if (x > 0 && y > 0) {
      el.push(data[x - 1][y - 1]);
    }

    // top right
    if (x > 0 && y < cols - 1) {
      el.push(data[x - 1][y + 1]);
    }

    // bottom right
    if (x < rows - 1 && y < cols - 1) {
      el.push(data[x + 1][y + 1]);
    }

    // bottom left
    if (x < rows - 1 && y > 0) {
      el.push(data[x + 1][y - 1]);
    }

    return el;
  }
  
  //this eventhandler is responsible for updating the 2D array data when a cell is clicked on.
  handleCellClick(x, y) {

    let updatedData = this.state.board;
    let {mines}=this.props;
    // if cell is not revealed and is a flag then set isRevealed to True
    if (!this.state.board[x][y].isRevealed && this.state.board[x][y].isFlagged ) {
      updatedData[x][y].isRevealed = true;
      this.setState({
        board: updatedData,
      });
    }
    // check if mine. game over if true
    if (this.state.board[x][y].isMine) {
      this.setState({ gameStatus: "You Lost.", gameEnd: true });
      this.revealBoard();
    }
    
    updatedData[x][y].isRevealed = true;

    if (updatedData[x][y].isEmpty) {
      updatedData = this.revealEmpty(x, y, updatedData);
    }

    if (this.getHidden(updatedData).length === mines) {
      this.setState({ mineCount: 0, gameStatus: "You Win.", gameEnd: true });
      this.revealBoard();
      //alert("You Win");
    }

    this.setState({
      board: updatedData,
      mineCount: mines - this.getFlags(updatedData).length,
    });
  }

  // get Hidden cells
  getHidden(data) {
    let mineArray = [];

    data.forEach((datarow) => {
      datarow.forEach((dataitem) => {
        if (!dataitem.isRevealed) {
          mineArray.push(dataitem);
        }
      });
    });

    return mineArray;
  }
   
  //function for revealing board when you win
  revealBoard() {
    let updatedData = this.state.board;
    updatedData.forEach((datarow) => {
      datarow.forEach((dataitem) => {
        dataitem.isRevealed = true;
      });
    });
    this.setState({
      board: updatedData,
    });
  }
  
  //function for returning array of cells that are mines
  getFlags(data) {
    let mineArray = [];
    data.forEach((datarow) => {
      datarow.forEach((dataitem) => {
        if (dataitem.isFlagged) {
          mineArray.push(dataitem);
        }
      });
    });
    return mineArray;
  }

  /* reveal logic for empty cell */
  revealEmpty(x, y, data) {
    //get cells around current one
    let area = this.traverseBoard(x, y, data);
    //looping through cells around current
    area.forEach((value) => {
        //if cell is not a flag , is not revealed yet and is empty or not a mine.
        //then set the cell to be revealed.
      if (!value.isFlagged && !value.isRevealed && (value.isEmpty || !value.isMine)) {
        data[value.x][value.y].isRevealed = true;
        if (value.isEmpty) {
          this.revealEmpty(value.x, value.y, data);
        }
      }
    });

    return data;
  }

  //function for creating empty 2D array
  make2Darray(rows, cols) {
    let array = new Array(cols);
    for (let i = 0; i < array.length; i++) {
      array[i] = new Array(rows);
    }
    return array;
  }

  //function for mapping the board
  createBoard() {
    const { rows, cols } = this.props;
    let array = this.make2Darray(rows, cols);
    let grid = this.state.board;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        array[i][j] = (
          <Cell
            data={grid[i][j]}
            key={grid[i][j].x * rows + grid[i][j].y}
            keypress={this.handleCellClick}
          />
        );
      }
    }
    let mapper = array.map((row, index1) => {
      let mapper2 = row.map((cell) => {return cell;});
      return (
        <Row style={style} className="justify-content-center" key={index1}>
          {mapper2}
        </Row>
      );
    });
    return mapper;
  }

  render() {
    let {mines,flags} =this.props;
    let {gameEnd,gameStatus}=this.state;
    return (
      <Container style={container}>

        <div className="game">

          <div className="message" style={gameEnd ? main : { display: " none" }}>
            {gameEnd ? <Model message={gameStatus} /> :  "" }
          </div>

          <Row   className="justify-content-center"  style={{ paddingBottom: "20px" }} >
            <Card bg="info" text="white">
              <Card.Body>
                <Card.Title>
                  <h3> There are {mines} 💣 and {flags} 🚩</h3>
                </Card.Title>
              </Card.Body>
            </Card>
          </Row>

          {this.createBoard()}

        </div>

      </Container>
    );
  }
}


export default Board;
//inline css constants
const style = { paddingRight: 0, paddingLeft: 0 };
const main = {
  position: "fixed",
  zIndex: "2",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.6)",
};
const container = {
  paddingTop: "100px",
  marginLeft: "auto",
  marginRight: "auto",
};
