import React, { Component } from "react";
import { Row, Card, Button } from "react-bootstrap";

export default class Model extends Component {
  constructor(props) {
    super(props);
    this.state = { show: true };
  }

  //function for restarting game
    restart = () => {
    this.setState({ show: false });
    window.location.reload(false);
  };

  render() {
    //getting the win or loss message
    const { message } = this.props;

    const showHideClassName = this.state.show
      ? "Card display-block"
      : " Card display-none";

    //displaying card with end game message and restart button
    return (
      <Card className={showHideClassName} style={style} bg="dark" text="white">
        <Card.Body>
          <Row className="justify-content-center">
            <Card.Text>
              <h1>{message}</h1>
            </Card.Text>
          </Row>
          <Row className="justify-content-center">
            <Button onClick={this.restart} variant="danger">
              Restart
            </Button>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}
//inline css
const style = {
  position: "relative",

  width: "200px",
  paddingBottom: "50px",
  top:'35%',
  marginBottom:'auto',
  marginLeft:'auto',
  marginRight:'auto',

  
};
