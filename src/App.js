import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Board from './Components/Board';

import "./App.css";
import {BrowserRouter,Route,Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Help from './Components/Help';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      height: 8,
      width: 8,
      mines: 4,
      flags:3
    };
  }
  

  restart=()=>{
    this.setState({ show: false });
    window.location.reload(false);
  };


  render() {
    const { height, width, mines,flags } = this.state;

    const help =()=>(<Help />);
    const board=()=>(<Board rows={height} cols={width} mines={mines} flags={flags} />)
    return (
      <div className="game" style={{paddingTop:'60px'}}>
          
          
          <BrowserRouter>
          <Route exact={true} path='/'component={board}/>
          <Route path='/Help'component={help}/>
         
          <div style={buttonGroup}>
            <Link to='/Help'><Button variant='primary' style={button} >Help</Button></Link>
            <Button variant='danger'onClick={this.restart} >Restart</Button>
          </div>
              
           
          </BrowserRouter>
         
          
      </div>
     
    );
  }
 
}

const buttonGroup={
  textAlign:'center',
  marginTop:'50px'
  
}
const button={
  marginRight:'20px'
}
export default App;
