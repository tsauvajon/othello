import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class Board extends Component {
  renderSquare(i) {
    return <Square key={'square'+i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }
  renderRow(r) {
    var row = [];
    for (var i = 0; i < 8; i++) {
      row.push(this.renderSquare(r*8+i));
    }
    return (
       <div key={'row'+r}>
        {row}
       </div>
    );
  }
  renderRows() {
    var rows = [];
    for (var i = 0; i < 8; i++) {
      rows.push(this.renderRow(i));
    }
    return (
      <div>
        {rows}
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.renderRows()}
      </div>
    );
  }
}

class Game extends Component {
  constructor() {
    super();
    this.state = {
      squares: Array(64).fill(null),
      xIsNext: true,
      stepNumber: 0,
    };
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (this.state.stepNumber === 64 || squares[i])
      return;

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    // this.convert(i, squares);

    this.setState({
      squares: squares,
      stepNumber: this.state.stepNumber+1,
      xIsNext: !this.state.xIsNext,
    });
  }
  convert(i){
    // const squares = this.state.squares.slice();
    for (var x = -1; x < 2; x++){
      for (var y = -1; y < 2; y++){
        if (x !== 0 || y !== 0){
          // squares = this.convertLine(i, x, y);, squares);
          this.convertLine(i, x, y);
        }
      }
    }
    // return squares;
  }
  convertLine(i, xStep, yStep){//, squares){
    const squares = this.state.squares.slice();
    var found = false;
    var curr = this.state.xIsNext ? 'X' : 'O';
    var x = getX(i) + xStep, y = getY(i) + yStep;
    while (!found && x >= 0 && x < 8 && y >= 0 && y < 8){
      if (!squares[getId(x,y)]){
        return;
      }
      else if (squares[getId(x,y)] === curr){
        alert('found at  [' + xStep + ', ' + yStep + '] at [' + x +', ' + y + ']')
        found = true;
      }
      else{
        x += xStep;
        y += yStep;
      }
    }
    if(found){
      x -= xStep;
      y -= yStep;
      while (x !== getX(i) && y !== getY(i)){
          alert('converted for [' + (-xStep) + ', ' + (-yStep) + '] at [' + x +', ' + y + ']')
          squares[getId(x, y)] = curr;
          x -= xStep;
          y -= yStep;
      }
    }
    this.setState({ squares: squares });
  }
  render() {
    const squares = this.state.squares;

    let status;
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div className="game" key='game'>
        <div className="game-board" key='game-board'>
          <Board squares={squares} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
        </div>
      </div>
    );
  }
}

// ========================================

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

function getX(i){
  return i%8;
}

function getY(i){
  return parseInt(i/8);
}

// function getCoord(i){
//   return { x: getX(i), y: getY(i)};
// }

function getId(x, y){
  return y*8+x;
}

export default Game;
