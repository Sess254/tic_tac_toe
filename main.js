const GameBoard = (() => {

    let board = Array(9).fill(null)

    const getBoard = () => board

    const setCell = (index, marker) => {
        if (index >= 0 && index < board.length && !board[index]) {
            board[index] = marker
            return true
        }
        return alert(`Cell is already occupied`)
    }

    const resetBoard = () => {
        board = Array(9).fill(null)
    }

    return {getBoard, setCell, resetBoard}

})()

const Player = (name, marker) => {
    return {name, marker}
}