import React, { Component } from "react";
import { Row, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Image from "../images/Image.png";

export default class Help extends Component {
  constructor(props) {
    super(props);
    this.state = { show: true };
  }

 

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    const showHideClassName = this.state.show
      ? "Card display-block"
      : " Card display-none";
    return (
      <Card className={showHideClassName} style={style} bg="light">
        <Card.Body>
          <Row className="justify-content-center">
            <Card.Title>
              <h1>MineSweeper</h1>
            </Card.Title>
            <Card.Text>
              <p>
                The object of minesweeper is to uncover as many flags without
                touching a mine.
              </p>
              <p>
                When you click on a block it may have a number,bomb,flag
                or blank.
              </p>
              <h3>Flag</h3>
              <ul>
                <li>
                  If the block has a flag
                  <span role="img" aria-label="flag">(🚩) </span>
                  it means there is one less flag to find.
                </li>
              </ul>
              <h3>Bomb</h3>
              <ul>
                <li>
                  If the block has a bomb
                  <span role="img" aria-label="bomb">(💣)</span>
                  its game over.
                </li>
              </ul>
              <h3>Number/Blank</h3>
              <ul>
                <li>
                  When a block has a number/blank this indicate how may bombs
                  surround it in a one block radius.
                </li>
                <img src={Image} alt="" />
                <li>
                  Use this knowledege to figure out which blocks are safe and which are not.
                </li>
                
              </ul>
            </Card.Text>
          </Row>
          <Row className="justify-content-center">
            <Link to="/">
              <Button onClick={this.hideModal} variant="danger">
                close
              </Button>
            </Link>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}
const style = {
  width: "550px",
  height: "auto",
  paddingBottom: "50px",
  paddingTop: "50px",
  marginLeft: "auto",
  marginRight: "auto",
  
};
