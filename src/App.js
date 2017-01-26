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
    const squares = Array(64).fill(null);
    squares[27] = squares[36] = 'X';
    squares[28] = squares[35] = 'O';
    this.state = {
      squares: squares,
      xIsNext: true,
      stepNumber: 0,
    };
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (this.state.stepNumber === 60 || squares[i])
      return;

    var toWololo = this.wololo(i);
    // alert(toWololo);
    if (toWololo.lenth === 0)
      return;
    var current = this.state.xIsNext ? 'X' : 'O';
    toWololo.forEach(function(square){
      console.log(square);
      squares[square] = current;
    });
    squares[i] = current;

    // this.wololo(i, squares);

    this.setState({
      squares: squares,
      stepNumber: this.state.stepNumber+1,
      xIsNext: !this.state.xIsNext,
    });
  }
  wololo(i){
    // const squares = this.state.squares.slice();
    var toWololo = Array(0);
    for (var x = -1; x < 2; x++){
      for (var y = -1; y < 2; y++){
        if (x !== 0 || y !== 0){
          // squares = this.wololoLine(i, x, y);, squares);
          toWololo.push(this.wololoLine(i, x, y));
        }
      }
    }
    return toWololo;
    // return squares;
  }
  wololoLine(i, xStep, yStep){//, squares){
    const squares = this.state.squares.slice();
    var toWololo = Array(0);
    var found = false;
    var curr = this.state.xIsNext ? 'X' : 'O';
    var x = getX(i) + xStep, y = getY(i) + yStep;
    while (!found && x >= 0 && x < 8 && y >= 0 && y < 8){
      if (!squares[getId(x,y)]){
        // alert('returning empty array cause null')
        return Array(0);
      }
      else if (squares[getId(x,y)] === curr){
        alert('found at  [' + xStep + ', ' + yStep + '] at [' + x +', ' + y + ']')
        found = true;
      }
      else{
        alert('adding square [' + x +', ' + y + ']');
        toWololo.push(getId(x,y));
        x += xStep;
        y += yStep;
      }
    }
    if(found){
      alert('returning array');
      return toWololo;
      // x -= xStep;
      // y -= yStep;
      // while (x !== getX(i) && y !== getY(i)){
      //     alert('wololoed for [' + (-xStep) + ', ' + (-yStep) + '] at [' + x +', ' + y + ']')
      //     squares[getId(x, y)] = curr;
      //     x -= xStep;
      //     y -= yStep;
      // }
    }
      alert('returning empty array cause not found')
      return Array(0);
    // this.setState({ squares: squares });
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
