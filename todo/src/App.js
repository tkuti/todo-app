import './App.scss';
import Dashboard from './components/Dashboard'
import React, { useState, useEffect } from 'react'
import { FiFilePlus } from 'react-icons/fi';

const useLocalStorage = (key, defaultValue) => {
  const initial = JSON.parse(localStorage.getItem(key)) || defaultValue;
  const [value, setValue] = useState(initial);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};


function App() {

  const [state, setState] = useLocalStorage("data", [
    { id: 1, name: "Type your dashboard title", cards: [] }
  ]);

  const [theme, setTheme] = React.useState("Dark");

  const setDashboardName = (e, id) => {
    setState(state.map(object =>
      object.id === id
        ? { ...object, name: e.target.value }
        : object)
    );
  }

  const createNewDashboard = () => {
    setState([
      ...state,
      { id: Date.now(), name: "Type your dashboard title", cards: [] },
    ]);

  }

  const deleteDashboard = (id) => {
    setState(state.filter(object => object.id !== id));
  }

  const createCard = (id) => {
    setState(state.map(object =>
      object.id === id
        ? { ...object, cards: [...object.cards, { idCard: Date.now(), title: "New card", description: "" }] }
        : object)
    );
  }

  const editCard = (e, id, idCard, type) => {
    setState(
      state.map(object =>
        object.id === id
          ? {
            ...object, cards: object.cards.map(
              card => card.idCard === idCard
                ? { ...card, [type]: e.target.value }
                : card
            )
          }
          : object
      )
    )
  }

  const deleteCard = (id, idCard) => {
    setState(
      state.map(object =>
        object.id === id
          ? {
            ...object, cards: object.cards.filter(
              card => card.idCard !== idCard
            )
          }
          : object
      )
    )
  }

  const createDroppedCard = (id, tempCard) => {
    setState(prevState => {
      return prevState.map(object =>
        object.id == id
          ? { ...object, cards: [...object.cards, { ...tempCard }] }
          : object)
        ;
    })
  }

  const copyCard = (id, idCard) => {
    let tempCard = state.filter(dashboard => dashboard.id == id)[0].cards.filter(card => card.idCard == idCard)[0];
    tempCard = { ...tempCard, idCard: Date.now() };
    setState(state.map(object =>
      object.id == id
        ? { ...object, cards: [...object.cards, { ...tempCard }] }
        : object)
    )
  }

  const drag = (ev, id, idCard) => {
    ev.dataTransfer.setData("text", `${id}, ${idCard}`);
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drop(ev, id) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text").split(",");
    let tempCard = state.filter(dashboard => dashboard.id == data[0])[0].cards.filter(card => card.idCard == data[1])[0];
    deleteCard(parseInt(data[0]), parseInt(data[1]));
    createDroppedCard(id, tempCard);
  }

  function switchTheme(e) {
    if (e.target.checked) {
      document.querySelector("body").setAttribute('data-theme', 'light');
      setTheme("Light");
    }
    else {
      document.querySelector("body").setAttribute('data-theme', 'dark');
      setTheme("Dark");
    }
  }

  return (
    <>
      <div id="theme">
        <span>{theme} Mode</span>
        <div class="theme-switch-wrapper">
          <label class="theme-switch" for="checkbox">
            <input type="checkbox" id="checkbox" onChange={switchTheme} />
            <div class="slider round"></div>
          </label>
        </div>
      </div>
      <div id="content">
        {state.map(obj =>
          <Dashboard
            datas={obj}
            setChanges={setDashboardName}
            id={obj.id}
            key={obj.id}
            deleteDashboard={deleteDashboard}
            createCard={createCard}
            editCard={editCard}
            deleteCard={deleteCard}
            drag={drag}
            allowDrop={allowDrop}
            drop={drop}
            copyCard={copyCard}
          />)}
        <div id="iconContainerNewDash"
          onClick={() => { createNewDashboard() }}>
          <FiFilePlus title="New dashboard" />
        </div>
      </div>
    </>

  );
}

export default App;
