import { createContext , useContext } from "react";

export const todoContext = createContext({
    todos : [
        {
            id : 1,
            todo : "",
            isCompleted : false
        }
    ],
    addTodo : (todo) => {},
    updateTodo : (id, newTodo) => {},
    deleteTodo : (id) => {},
    toggleTodo : (id) => {},
    
})

export const TodoContextProvider = todoContext.Provider

export const useTodo = () => {
    return useContext(todoContext)
}