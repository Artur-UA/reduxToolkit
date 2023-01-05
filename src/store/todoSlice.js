import { createSlice } from "@reduxjs/toolkit";

const todoSLice = createSlice({
    name: 'todos', 
    initialState: { 
        todos: []
    },
    reducers: {
        newTodo(state,action){
            console.log(state);
            console.log(action);

            state.todos.push({ //имутабельность не важна 
                id: new Date().toISOString(),
                text: action.text,
                success: false
            });
        },
        deleteTodo(state,action){},
        changeSuccess(state,action){}
    }
})

export const {newTodo, deleteTodo, changeSuccess} = todoSLice; 

export default todoSLice.reducer; //будет создан автоматически 