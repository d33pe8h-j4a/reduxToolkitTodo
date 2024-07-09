import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleUpdate, updateTodo } from "../features/todo/todoSlice";

function AddTodo() {
    const dispatch = useDispatch();
    const { updateStatus, todo } = useSelector((state) => state.update);
    const [input, setInput] = useState("");

    // Update input when updateStatus or todo changes
    useEffect(() => {
        if (updateStatus && todo) {
            setInput(todo.text);
        }
    }, [updateStatus, todo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (updateStatus) {
            dispatch(updateTodo({ id: todo.id, text: input }));
        } else {
            dispatch(addTodo({ text: input }));
        }
        setInput("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-x-3 mt-12">
            <input
                type="text"
                className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Enter a Todo..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button
                type="submit"
                className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
                {updateStatus ? "Update" : "Add"} Todo
            </button>
        </form>
    );
}

export default AddTodo;
