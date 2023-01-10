import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadTodoList = createAsyncThunk(
    'todos/loadTodoList', // имя санки/редюсера
    async function (_, {rejectWithValue}) { // первий параметр это параметры из dispatch(но я ничего не передавал). второй есть выбор достыпных методов. rejectWithValue - для обрботки ошибки 

        try {
            const resp = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=7',)

            if (!resp.ok){
                throw new Error('Error in Server')
            }
            const data = await resp.json();
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
        
    }
)
const todoSLice = createSlice({
    name: 'todos', 
    initialState: { 
        todos: [],
        status: null,
        error: null
    },
    reducers: {
        addNewTodo(state,action) {
            state.todos.push({ //имутабельность не важна 
                id: new Date().toISOString(),
                text: action.payload.text,
                success: false
            });
        },
        deleteTodo(state,action){
            state.todos = state.todos.filter( todo => todo.id !== action.payload.id)
        },
        changeSuccess(state,action){
            const idTodo = state.todos.find( todo => todo.id === action.payload.id);
            idTodo.success = !idTodo.success
        }
    },
    extraReducers:{
        [loadTodoList.pending]: (state) => { // 3 состояния (pending, fulfilled, rejected)
            state.status = 'loading';
            state.error = null;
        },
        [loadTodoList.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.todos = action.payload;
        },
        [loadTodoList.rejected]: (state, action) => {
            state.status = 'reject';
            state.error = action.payload; 
        },
    }
})

export const {addNewTodo, deleteTodo, changeSuccess} = todoSLice.actions; //важно указать

export default todoSLice.reducer; //будет создан автоматически