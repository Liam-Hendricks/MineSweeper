import React from "react";
import { Button, Col } from "react-bootstrap/";
export default class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  //function for setting the cell image based on its object props
  getValue() {
    const { data } = this.props;

    if (!data.isRevealed) {
      return null;
    }
    if (data.isRevealed) {
      if (data.isFlagged) {
        return "🚩";
      }
      if (data.isMine) {
        return "💣";
      }
      if (data.neighbour === 0) {
        return null;
      }
      return data.neighbour;
    }
  }
 // this event handler inherits the event handler passed via props
  handleClick() {
    const { data,keypress } = this.props;
    
    keypress(data.x, data.y);
  }
  render() {
    const { data } = this.props;
    //creating the class name
    let className =
      "cell" +
      (data.isRevealed ? "" : " hidden") +
      (data.isMine ? " is-mine" : "") +
      (data.isFlagged ? " is-flag" : "");

    return (
      <Col md="auto" style={style}>
        <Button
          variant={data.isRevealed ? "light" : "secondary"}
          style={border}
          key={`cell-${data.x}-${data.y}`}
          className={className}
          onClick={this.handleClick}
        >
          {this.getValue()}
        </Button>{" "}
      </Col>
    );
  }
}



const border = {
  border: "2px solid black",
  borderRadius: 0,
  width: "50px",
  height: "50px",
};
const style = { paddingRight: 0, paddingLeft: 0 };
