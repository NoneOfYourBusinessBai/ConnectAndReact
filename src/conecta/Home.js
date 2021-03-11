import React from "react";
const refreshPage = () => {
  window.location.reload();
}

function hasWin(x,y, color, boardState){
  return checkDir(x, y, 0, color, boardState) ||  checkDir(x, y, 2, color, boardState) ||  
  checkDir(x, y, 4, color, boardState)||  checkDir(x, y, 6, color, boardState);

 }

 
 function checkbounds(x, y) {
  if (x < 0) return false;
  if (x > 6) return false;
  if (y < 0) return false;
  if (y > 5) return false;
  return true;
}

function checkColor(x, y, color, boardState) {
  
  if (!checkbounds(x, y)) return false;
  return boardState[x][y] === color;
}




// 0 left  1 rigth 2 up  3 down  4 left up  5 rigth down 6 left down 7 rigth up
function checkDir(x, y, dir, color, boardState) {

  let i = 1;
  let c = 0;
  let tx = x;
  if (dir === 0) {
    while (checkColor(tx - i, y, color, boardState )) {
      c++;
      i++;
    }
    i = 1;
    tx = x;
    while (checkColor(tx + i, y, color, boardState )) {
      c++;
      i++;
    }
    console.log("Hori" + c);
    if (c >= 3) return true;

  }


   i = 1;
   c = 0;
   tx = y;
  if (dir === 2) {
    while (checkColor(x, tx - i, color, boardState)) {
      c++;
      i++;
    }
    i = 1;
    tx = y;
    while (checkColor(x, tx + i, color, boardState)) {
      c++;
      i++;
    }
    console.log("Vert" + c);
    if (c >= 3) return true;

  }


  i = 1;
  c = 0;
  tx = y;
 if (dir === 4) {
   while (checkColor(x-i, tx - i, color, boardState)) {
     c++;
     i++;
   }
   i = 1;
   tx = y;
   while (checkColor(x+i, tx + i, color, boardState)) {
     c++;
     i++;
   }
   console.log("Dia" + c);
   if (c >= 3) return true;

 }

 i = 1;
 c = 0;
 tx = y;
if (dir === 6) {
  while (checkColor(x-i, tx + i, color, boardState)) {
    c++;
    i++;
  }
  i = 1;
  tx = y;
  while (checkColor(x+i, tx - i, color, boardState)) {
    c++;
    i++;
  }
  console.log("Dia b" + c);
  if (c >= 3) return true;

}

 return false;


}

class Home extends React.Component {
  board = [...new Array(7)].map((_, i) => [...new Array(6)].map((_, i) => i));
  boardState = [...new Array(7)].map((_, i) => [...new Array(6)].map((_, i) => 'free'));

 
  clicksito(row, col) {
    if(this.state.acabado) return;
    
    const lastPosition = this.boardState[col].filter((circle) => circle === 'free').length - 1;

    if(lastPosition >= 0) {
      this.boardState[col][lastPosition] = this.state.currentPlayer ? 'pink' : 'purple';

      let x = col;
      let y = lastPosition;
      let color = this.state.currentPlayer ? 'pink' : 'purple';
      if (hasWin(x,y,color,this.boardState)) {
        this.setState({
          mensajito: 'Winner: ' + color,
          acabado: true
        });
      }

      this.setState({
        currentPlayer: !this.state.currentPlayer,
        board: [...this.board],
        boardState: [...this.boardState]
        
      });
    }
  }



  constructor(props) {
    super(props);
    this.state = {
      board: this.board,
      boardState: this.boardState,
      currentPlayer: true,
      mensajito: ' ',
      acabado: false

    };
  }
  render() {

    return (

      <div>
        <h1 className="title">Connect Pink 4</h1>
        <div id="block_container">
          <div id="bloc1">
            <button onClick={refreshPage}>Restart</button>
            <h4 className="result">{'Next player: ' + (this.state.currentPlayer ? 'pink' : 'purple')}</h4>
            <h4 className="result">{' ' + (this.state.mensajito)}</h4>
            
          </div>
          <div id="game-board">
            {this.state.board.map((rows, col) =>
              <div onClick={() => this.clicksito(rows, col)} className="column" id={`column-${col}`} data-x="0" key={col}>
                {rows.map((row) =>
                  <svg height="100" width="100" className={`row-${row}`} key={row}>
                    <circle cx="50" cy="50" r="25" className={this.state.boardState[col][row]} key={row} />
                  </svg>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default Home