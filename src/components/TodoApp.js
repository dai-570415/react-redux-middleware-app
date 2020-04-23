import React from 'react';
import { Link } from 'react-router-dom';

const TodoApp = ({ task, tasks, inputTask, addTask }) => {
    return (
        <div>
            <nav>
                <Link to="./" className="link">Home</Link> &gt; Todo
            </nav>
            <main>
                <input
                    type="text"
                    placeholder="Please Input"
                    onChange={(e) => inputTask(e.target.value)}
                />
                <input
                    type="button"
                    value="add"
                    onClick={ () => addTask(task) }
                />
                <ul>
                    {tasks.map((item, i) => {
                        return <li key={i}>{item}</li>;
                    })}
                </ul>
            </main>
        </div>
    );
}

export default TodoApp;