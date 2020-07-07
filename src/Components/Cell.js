import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col } from "react-bootstrap/";
export default class Cell extends React.Component {
  getValue() {
    const { data } = this.props;

    if (!data.isRevealed) {
      return this.props.data.isFlagged ? "🚩" : null;
    }
    if (data.isMine) {
      return "💣";
    }
    if (data.neighbour === 0) {
      return null;
    }
    return data.neighbour;
  }

  render() {
    const { data } = this.props;
    let className =
      "cell" +
      (data.isRevealed ? "" : " hidden") +
      (data.isMine ? " is-mine" : "") +
      (data.isFlagged ? " is-flag" : "");

    return (
        <Col md="auto" style={style}>
        <Button variant="secondary" style={border} className={className}>
          {this.getValue()}
        </Button>{" "}
        </Col>
    );
  }
}

const cellItemShape = {
    isRevealed: PropTypes.bool,
    isMine: PropTypes.bool,
    isFlagged: PropTypes.bool
}

Cell.propTypes = {
  value: PropTypes.objectOf(PropTypes.shape(cellItemShape)),
  onClick: PropTypes.func,
  cMenu: PropTypes.func
}

const border = {
    border: "2px solid black",
    borderRadius: 0,
    width: "50px",
    height: "50px",
  };
const style = { paddingRight: 0, paddingLeft: 0 };
