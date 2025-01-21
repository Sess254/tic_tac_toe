const GameBoard = (() => {

    let board = Array(9).fill(null)

    const getBoard = () => board

    const setCell = (index, marker) => {
        if (index >= 0 && index < board.length && !board[index]) {
            board[index] = marker
            return true
        }
        DisplayController.setMessage(`Invalid move,Cell is already occupied`)
    }

    const resetBoard = () => {
        board = Array(9).fill(null)
    }

    return {getBoard, setCell, resetBoard}

})()

const Player = (name, marker) => {
    return {name, marker}
}


const GameController = (() => {
    let players = []
    let currentPlayerIndex = 0
    let nextPlayerIndex
    let isGameover = false


    const initializeGame = (player1, player2) => {
        players = [
            Player(player1, "X"),
            Player(player2, "O")
        ]
        currentPlayerIndex = 0
        nextPlayerIndex = 1
        isGameover = false
        GameBoard.resetBoard()
    }

    const playTurn = (index) => {
        if (isGameover) return

        const currentPlayer = players[currentPlayerIndex]
        const nextPlayer = players[nextPlayerIndex]
        DisplayController.setMessage(`${nextPlayer.name}'s turn`)
        if (GameBoard.setCell(index, currentPlayer.marker)) {
            if(checkWinner()) {
                DisplayController.setMessage(`${currentPlayer.name} wins!`)
            } else if (isTie()) {
                DisplayController.setMessage(`Its a Tie!`)

            } else {
                currentPlayerIndex = 1 - currentPlayerIndex
                nextPlayerIndex = 1 - nextPlayerIndex
            }
        }
    

    }

    const checkWinner = () => {
        const board = GameBoard.getBoard()
        const winCombo = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8 ],
            [0, 4, 8], [2, 4, 6],
        ]

        return winCombo.some((pattern) => 
            pattern.every((index) => board[index] === players[currentPlayerIndex].marker)
        )
    }

    const isTie = () => {
        return GameBoard.getBoard().every((cell) => cell !== null)
    }


    return {initializeGame, playTurn}

})()


const DisplayController = (() => {
    const cells = document.querySelectorAll('.cell')
    const messageText = document.getElementById('message')
    const resetBtn = document.getElementById('reset')

    const renderBoard = () => {
        const board = GameBoard.getBoard()
        cells.forEach((cell, index) => {
            cell.textContent = board[index]
        })
    }

    const setMessage = message => {
        messageText.textContent = message
    } 


    const bindEvents = () => {
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                GameController.playTurn(index)
                renderBoard()
            })
        })


        resetBtn.addEventListener('click', () => {
            GameController.initializeGame('player1', 'player2')
            renderBoard()
            setMessage('Game Restarted')
        })
    }

    return {renderBoard, setMessage, bindEvents}
})()


document.addEventListener("DOMContentLoaded", () => {
    GameController.initializeGame("Player 1", "Player 2");
    DisplayController.renderBoard();
    DisplayController.bindEvents();
  });