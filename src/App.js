import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Board from './Components/Board';
import {Container} from 'react-bootstrap';
import "./App.css";
class App extends React.Component {

 state = {
    height: 8,
    width: 8,
    mines: 10
  };

  render() {
    const { height, width, mines } = this.state;
    return (
      <div className="game">
        <Container style={style}>
          <Board rows={height} cols={width} mines={mines} />
        </Container>
      </div>
    );
  }
 
}
const style={
  paddingTop:'100px',
  marginLeft:'auto',
  marginRight:'auto',
}
export default App;
