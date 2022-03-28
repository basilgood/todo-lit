import { component, useState } from 'haunted';
import { html } from 'lit-html';
import './../styles/main.css';

const BasicGreeter = (host) => {
  const [value, setValue] = useState(['World', 'Earth']);
  return html`
    <p>Hello ${value.join(' and ')}</p>
    The Box:<input
      type="text"
      id="thebox"
      value=${''}
      size="10"
    />
    <button
      @click=${() => {
        const input = host.shadowRoot.querySelector('#thebox');
        // setValue(['Word', 'Earth', input.value]);
        setValue(['Word', 'Earth'].concat(input.value));
        // setValue((value) => value.concat(input.value));
      }}
    >
      Submit
    </button>
  `;
};

customElements.define('basic-greeter', component(BasicGreeter));

// ui interfata mea
// [ ] plimba cainele #urgent #caine
// [ ] managaie pisica #pisica
// [x] lungeste sarpele

// modelul pentru aceste date:
// [
//   {label: 'plimba cainele', tags: ['urgent', 'caine'], done: false},
//   {label: 'managaie pisica',  tags: ['pisica'], done :false},
//   {label: 'lungeste sarpele', tags: [], done: true}
// ]
// [
//   {label: 'plimba cainele', done: false},
//   {label: 'managaie pisica', done :false},
//   {label: 'lungeste sarpele', done: true},
//   {label: 'du gunoiul', done: false}
// ]
// [
//   {label: 'plimba cainele', done: false},
//   {label: 'managaie pisica', done :true},
//   {label: 'lungeste sarpele', done: true},
//   {label: 'du gunoiul', done: false}
// ]
// [
//   {label: 'plimba cainele', done: false},
//   {label: 'du gunoiul', done: false}
// ]
