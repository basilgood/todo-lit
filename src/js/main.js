import { component, useEffect, useState } from 'haunted';
import { html } from 'lit-html';
import '../styles/main.css';

const TodoList = (host) => {
  const [todos, setTodos] = useState([]);
  const [done, setDone] = useState('');
  const todoItem = {
    text: '',
    done: false,
    active: false,
    total: 0,
  };
  const list = todos.map(
    (todo, index) =>
      html` <input
          type="checkbox"
          id="done"
          @change=${() => {
            const checkbox = host.shadowRoot.querySelector('#done');
            setDone(() => (checkbox.checked ? 'done' : ''));
          }}
        />
        <li class=${done + ' todo-item'}>
          ${todo}
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
        value=${todos}
        autofocus
      />
      <button
        class="todo-button"
        @click=${() => {
          const input = host.shadowRoot.querySelector('.todo-input');
          setTodos([input.value].concat(todos));
        }}
      >
        Add todo
      </button>
      <ul class="todo-list">
        ${list}
      </ul>
      <div class="todo-bar">
        <ul class="todo-filter">
          <li>items</li>
          <li>Active</li>
          <li>Completed</li>
        </ul>
      </div>
    </div>
  `;
};

customElements.define('todo-list', component(TodoList));
