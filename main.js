const squares = document.querySelectorAll('.square');
const message = document.querySelector('.message');
const startButton = document.querySelector('.startbtn');
const restartButton = document.querySelector('.restartbtn');
const playerOne = document.querySelector('.playerone');
const playerTwo = document.querySelector('.playertwo');
const formGame = document.querySelector('.gameform');
const scoreMsg = document.querySelector('.scoremsg')


const Gameboard = (() => {
let option = ['', '', '', '', '', '', '', '', ''];


const cellClicked = () => {
squares.forEach((square) => square.addEventListener('click', Game.handleClick))
}
const update = (index, value) =>{
option[index] = value;
cellClicked()
}

const restart = () => {
    option = ['', '', '', '', '', '', '', '', ''];
    squares.forEach(square => square.textContent = '')   
    playerOne.value = ''
    playerTwo.value = ''
    message.innerHTML = ''

    
}

const getGameOptions = () => option;

return{
    cellClicked,
    update,
    restart,
    getGameOptions

}

})();

const creatPlayer = (name, marker) => {
    this.name = name;
    this.marker = marker
    return{
        name, 
        marker
    }
}


const Game = (() => {

let player;
let currentPlayer;
let running;
let score = 1;


const start = () => {
    player = [
        creatPlayer(playerOne.value, 'X'),
        creatPlayer(playerTwo.value, 'O')

    ]
    
    currentPlayer = 0;
    Gameboard.cellClicked();
    running = false;
   playerOne.value = ''
   playerTwo.value = ''
}

const handleClick = (event) => {
    if(running){
        return;
    }
   let index = event.target.id;
   if(Gameboard.getGameOptions()[index] !== '')return;
Gameboard.update(index, squares[index].textContent = player[currentPlayer].marker);
if(checkForWin(Gameboard.getGameOptions(), player[currentPlayer].marker)){
    if(score <= 0 ){
         scoreMsg.textContent =`Score: ${(score = 0)}`;
         }
     scoreMsg.textContent =  `Score: ${(score++)}`;
    index.disabled = true
    running = true;
    message.innerHTML = `${player[currentPlayer].name} won`;
} else if(checkForTie(Gameboard.getGameOptions())){
    if(score <= 0){
        score--;
         score = 0;
          scoreMsg.textContent = `Score: ${(score = score--)}`;
         }
     score--;
    index.disabled = true;
    running = true;
    message.innerHTML = 'Wow! It\'s draw';
} 
 currentPlayer = currentPlayer === 0 ? 1 : 0;
  }
   


  const checkForWin = (board) => {
    let winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for(let i = 0; i < winConditions.length; i++){
        let [a, b, c] = winConditions[i];
        if(board[a] && board[a]  === board[b] && board[a] === board[c]){
           
            running = true;
return true;
 }
}
    return false;
  }

const checkForTie = (board) => {
    return board.every(cell => cell !== '')
}

return{
    start,
handleClick,
checkForWin


}

})();
function handleError(event){
    event.preventDefault();
    if(playerOne.value === '' && playerTwo.value === ''){
         squares.disabled = true
        }
}
formGame.addEventListener('click', handleError);

restartButton.addEventListener('click', () =>{
    if(playerOne.value === '' && playerTwo.value === ''){
       squares.disabled = true;
        handleError(event)
        errorMsg.textContent = 'Please Name Field can\'t be empty and start again'
          } else{
            
      
          }
              Gameboard.restart()  
          
   });
   const errorMsg = document.querySelector('.errormsg');

startButton.addEventListener('click', () =>{
    if(playerOne.value === '' && playerTwo.value === ''){
      handleError(event)
        } else{
            errorMsg.textContent = ''
            Game.start()  
        }
 
});