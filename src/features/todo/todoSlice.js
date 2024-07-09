import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [
        {
            id: 1,
            text: "Hello World",
        },
    ],
    update: {
        updateStatus: false,
        todo: {},
    },
};

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: nanoid(),
                text: action.payload.text,
            };
            state.todos.push(newTodo);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(
                (todo) => todo.id !== action.payload
            );
        },
        updateTodo: (state, action) => {
            state.todos = state.todos.map((todo) =>
                todo.id === action.payload.id
                    ? { ...todo, text: action.payload.text }
                    : todo
            );
            state.update.updateStatus = false;
            state.update.todo = {};
        },
        toggleUpdate: (state, action) => {
            state.update.updateStatus = !state.update.updateStatus;
            state.update.todo = action.payload;
        },
    },
});

export const { addTodo, removeTodo, updateTodo, toggleUpdate } =
    todoSlice.actions;

export default todoSlice.reducer;
