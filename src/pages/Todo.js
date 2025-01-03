import React, { useEffect , useState } from 'react'
import TodoInput from '../components/TodoInput'
import TodoCard from '../components/TodoCard'
import { TodoContextProvider } from '../context/todo'

function Todo() {
    const [todos , setTodos] = useState([])

    const addTodo = (todo) => {
        setTodos((prev) => [{
                                id : Date.now(),
                                todo,
                                isCompleted : false
                            },
                            ...prev])
    }

    const updateTodo = (id, newTodo) => {
        setTodos((prev)=>(
            prev.map(
                (todo)=>(todo.id === id ? {...todo , todo:newTodo} : todo)
            )
        ))
    }

    const deleteTodo = (id) => {
        setTodos((prev)=>(
            prev.filter(
                (todo)=>(todo.id !== id)
            )
        ))
    }

    const toggleTodo = (id) => {
        setTodos((prev)=>(
            prev.map(
                (todo)=>(todo.id === id ? {...todo , isCompleted : !todo.isCompleted} : todo)
            )
        ))
    }

    useEffect(()=>{
        const todos = JSON.parse(localStorage.getItem("todos"))
        if(todos && todos.length > 0) setTodos(todos) 

    },[])
    
    useEffect(()=>{
        localStorage.setItem("todos",JSON.stringify(todos))
        // if(todos && todos.length > 0) setTodos(todos) 

    },[todos])



    return (
        <TodoContextProvider value={{todos , addTodo , updateTodo , deleteTodo , toggleTodo }}>
            <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoInput /> 
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                    {
                        todos.map(todo => (
                            <div 
                                key={todo.id}
                                className='w-full'
                            >
                                <TodoCard todo={todo}/>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        </TodoContextProvider>
    );
}

export default Todo;

