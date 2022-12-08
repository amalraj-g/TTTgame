const cells=document.querySelectorAll(".cell");
const playStatus=document.querySelector("#game--status");
const btnRestart=document.querySelector("#restart");
let imageX="<img src='images/x.png'>";
let imageO="<img src='images/o.png'>";

const win=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

let state=["","","","","","","","",""];
let currentPlayer=imageX;
let player="X";
let runningCdn=false;
const winningMessage = () => `Player ${player} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const PlayerTurn = () => `It's ${player}'s turn`;
init();

function init(){
  cells.forEach(cell=>cell.addEventListener("click",cellClick));
  btnRestart.addEventListener("click",restartGame);
  playStatus.textContent=PlayerTurn();
  runningCdn=true;
}

function cellClick(){
  const index=this.dataset.index;
  if(state[index]!="" || ! runningCdn){
    return;
  }
  updateBox(this,index);
  checkWinner();
}

function updateBox(cell,index){
    state[index]=player;
    cell.innerHTML=currentPlayer;
}

function changePlayer(){
    player=(player==="X") ? "O" :"X";
    currentPlayer=(currentPlayer===imageX) ? imageO :imageX;
    playStatus.textContent=PlayerTurn();
}

function checkWinner(){
  let isWon=false;
  for(let i=0;i<win.length;i++){
    const condition=win[i];
    const box1=state[condition[0]]; 
    const box2=state[condition[1]]; 
    const box3=state[condition[2]]; 
    if(box1==="" || box2==="" || box3===""){
      continue;
    }
    if(box1===box2 && box2===box3){
      isWon=true;
      cells[condition[0]].classList.add("win");
      cells[condition[1]].classList.add("win");
      cells[condition[2]].classList.add("win");
    }
  }

  if(isWon){
    playStatus.textContent = winningMessage();
    runningCdn=false;
  }else if(!state.includes("")){
    playStatus.textContent= drawMessage();
    runningCdn=false;
  }else{
    changePlayer();
  }

}

function restartGame(){
    state=["","","","","","","","",""];
    currentPlayer=imageX;
    player="X";
    runningCdn=true;
    playStatus.textContent=PlayerTurn();

    cells.forEach(cell=>{
        cell.innerHTML="";
        cell.classList.remove("win");
  });
}
