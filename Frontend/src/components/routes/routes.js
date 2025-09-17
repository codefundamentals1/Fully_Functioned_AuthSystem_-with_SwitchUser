import Dashboard from "../Home/Dashboard";
import TicTacToe from '../TictacToe/TicTacToe'
import Todo from '../Todo/Todo'
import Form from '../Form/Form'
const routes = [
     {
        path: "tictactoe",
        element : TicTacToe,
        name : "tictactoe"
    },
     {
        path: "todo",
        element : Todo,
        name : "Todo"
    },
     {
        path: "form",
        element : Form,
        name : "Form"
    },
]

export { routes}