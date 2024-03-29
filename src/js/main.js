import { component, useEffect, useState } from 'haunted';
import { html } from 'lit-html';
import '../styles/main.css';

const TodoList = (host) => {
  const [todos, setTodos] = useState([]),
    [filter, setFilter] = useState(() => () => true);

  const list = todos.filter(filter).map(
    (todo, index) =>
      html`<input
          type="checkbox"
          id="done"
          ?checked=${todo.done}
          @change=${(event) => {
            setTodos((todos) =>
              todos.map((todo, i) =>
                i === index ? { ...todo, done: event.target.checked } : todo
              )
            );
          }}
        />
        <li class=${(todo.done ? 'done' : '') + ' todo-item'}>
          ${todo.text}
          <button
            @click=${() => {
              setTodos(todos.slice(0, index).concat(todos.slice(index + 1)));
            }}
          >
            x
          </button>
        </li>`
  );
  useEffect(() => {
    console.log(todos);
  }, [todos]);
  useEffect(() => {
    console.log(filter);
  }, [filter]);
  return html`
    <style>
      .todo {
        display: grid;
        align-content: space-evenly;
        justify-content: space-evenly;
      }
      .todo-input {
        background: rgba(0, 0, 0, 0.003);
        box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
        min-width: 550px;
      }
      .todo-list {
        list-style-type: none;
        padding: 0;
      }
      .todo-list li {
        display: flex;
        justify-content: space-between;
        background: #cccccc;
        border-bottom: 1px solid #ffffff;
      }
      .todo-filter li {
        display: inline;
      }
      .todo-filter li a {
        color: inherit;
        margin: 3px;
        padding: 3px 7px;
        text-decoration: none;
        border: 1px solid transparent;
        border-radius: 3px;
        border-color: rgba(175, 47, 47, 0.2);
      }
      .todo-bar {
        color: #777;
        padding: 10px 15px;
        height: 20px;
        text-align: center;
        border-top: 1px solid #e5e5e5;
      }
      #done {
        float: left;
        padding: 0 10px 0 0;
      }
      .done {
        color: red;
      }
    </style>
    <div class="todo">
      <h3>To Do List</h3>
      <input
        type="text"
        placeholder="Add a todo"
        class="todo-input"
        autofocus
      />
      <button
        class="todo-button"
        @click=${() => {
          const input = host.shadowRoot.querySelector('.todo-input');
          setTodos([{ text: input.value, done: false }].concat(todos));
        }}
      >
        Add todo
      </button>
      <ul class="todo-list">
        ${list}
      </ul>
      <div class="todo-bar">
        <button @click=${() => setFilter(() => () => true)}>All</button>
        <button @click=${() => setFilter(() => (todo) => todo.done === false)}>
          Active
        </button>
        <button @click=${() => setFilter(() => (todo) => todo.done === true)}>
          Completed
        </button>
      </div>
    </div>
  `;
};

customElements.define('todo-list', component(TodoList));
