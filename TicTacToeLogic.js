let boxes=document.querySelectorAll(".box");
let rstBtn=document.querySelector("#rstBtn");

let turnX=true;
let count=0;

let main=document.querySelector(".main");
main.classList.add("hide");
let strtBtn=document.querySelector("#strtBtn");
let starting=document.querySelector(".starting");

let winnerContainer = document.querySelector(".winnerContainer");
winnerContainer.classList.add("hide");

let playAgain = document.querySelector("#playAgain");

playAgain.addEventListener("click", () => {
  winnerContainer.classList.add("hide");
  main.classList.remove("hide");
  turnX=true;
  count=0;
  enableBoxes();
});

let showGame= document.querySelector("#showGame");

showGame.addEventListener("click", () => {
  winnerContainer.classList.add("hide");
  main.classList.remove("hide");
});

strtBtn.addEventListener("click", () => {
  main.classList.remove("hide");
  starting.classList.add("hide");
});

let winPatterns= [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
  ];
  
const resetGame=() => {
  turnX=true;
  count=0;
  enableBoxes();
};

boxes.forEach((box)=>{
  box.addEventListener("click", () => {
    if (turnX) {
      box.innerText="X";
      turnX=false;
    }
    else {
      box.innerText="O";
      turnX=true;
    }
    box.disabled = true;
    count++;
    
    let isWinner = checkWinner();
    
    if(count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

let wish = document.querySelector("#wish");
let winnerName= document.querySelector("#winnerName");

const showMsg = (nameOfWinner) => {
  let msg;
  winnerContainer.classList.remove("hide");
  main.classList.add("hide");
  winnerName.innerText = nameOfWinner;
  if(nameOfWinner=== "It's a Draw") {
    wish.innerText= "You both played well";
  }
  else {
    wish.innerHTML= "🎉Congratulations!🎉";
  }
};

const gameDraw = () => {
  name="It's a Draw";
  disableBoxes();
  showMsg(name);
};

const disableBoxes= () => {
  for(let box of boxes){
    box.disabled=true;
  }
};

const enableBoxes= () => {
  for(let box of boxes){
    box.disabled=false;
    box.innerText="";
  }
};

let name;
const showWinner = (winner) => {
  disableBoxes();
  if(winner==="X"){
    name="Player 1 won";
  }
  else{
    name="Player 2 won";
  }
  showMsg(name);
};

const checkWinner = () => {
  for(let pattern of winPatterns) {
    let posVal1=boxes[pattern[0]].innerText;
    let posVal2=boxes[pattern[1]].innerText;
    let posVal3=boxes[pattern[2]].innerText;
    
    if(posVal1 != "" && posVal2 != "" && posVal3 != "") {
      if(posVal1===posVal2 && posVal2===posVal3) {
        showWinner(posVal1);
      }
    }
  }
};
rstBtn.addEventListener("click",resetGame );