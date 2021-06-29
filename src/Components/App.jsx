import React, { useState } from "react";

import Input from './Input';
import Contact from "./Contact";

import '../styles/app.css';
import '../styles/table.css';


function App() {

  const { rows } = require('../data.json');
  const [data, setData] = useState(rows);
  const [name, setName] = useState("");
  const [entity, setEntity] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState(null);
  const [search, setSearch] = useState('');

  var tempData = {
    "Nombre": "",
    "Entidad": "",
    "Email": ""
  }

  const handleChange = (dat, element, setVal) => {
    setVal(dat);
    tempData[element] = dat;
  };


  const add = () => {
    if (id) {
      editContact();
    } else {
      var UID = "componente-" + Math.floor(Math.random() * 999999);
      setData(() => [...data, {
        "Id": UID,
        "Nombre": name,
        "Entidad": entity,
        "Email": email
      }]);
      setName("");
      setEntity("");
      setEmail("");
      setId();
    }
  };

  const deleteContact = (id) => {
    setData(() => data.filter(element => element.Id != id));
  };

  const editContact = () => {
    setData(() => data.map(element =>
      element.Id == id ? {
        "Id": id,
        "Nombre": name,
        "Entidad": entity,
        "Email": email
      } : element
    ));
    setName("");
    setEntity("");
    setEmail("");
    setId();
  };

  const handleClickEditContact = (element) => {
    setName(element.Nombre);
    setEntity(element.Entidad);
    setEmail(element.Email);
    setId(element.Id);
  };

  const getData = () => {
    if (!search) {
      return data;
    } else {
      return searchString();
    }
  };

  const searchString = () => {
    const text = search.toLowerCase();
    const newData = data.filter(element => {
      const newName = element.Nombre.toLowerCase();
      const newEntity = element.Entidad.toLowerCase();
      const newEmail = element.Email.toLowerCase();
      if (newName.indexOf(text) > -1) {
        return newName.indexOf(text) > -1;
      }
      if (newEntity.indexOf(text) > -1) {
        return newEntity.indexOf(text) > -1;
      }
      if (newEmail.indexOf(text) > -1) {
        return newEmail.indexOf(text) > -1;
      }
    });
    return newData;
  };


  return (
    <div className="App">

      <div className="newContact_container">
        <div className="newContact_card">
          <p className="newContact_title">Agregar nuevo contacto</p>
          <div className="newContact_for">
            <Input title="Nombre"
              type="text"
              val={name}
              setVal={setName}
              handleChange={handleChange} />
            <Input title="Entidad"
              type="text"
              val={entity}
              setVal={setEntity}
              handleChange={handleChange} />
            <Input title="Email"
              type="email"
              val={email}
              setVal={setEmail}
              handleChange={handleChange} />
            <button className="button button-add" onClick={add}>
              Agregar
            </button>
          </div>
        </div>
      </div>

      <div className="search">
        <p className="search_title">Filtrar</p>
        <div className="search_for">
          <input type="text"
            className="input_input search_input"
            placeholder="Buscar.."
            onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="table_container">
        <table className="table">
          <thead>
            <tr className="table_header">
              <th className="table_cel">Nombre</th>
              <th className="table_cel">Entidad</th>
              <th className="table_cel">Email</th>
            </tr>
          </thead>
          <tbody>
            {getData().map(element => {
              return (
                <Contact element={element}
                  key={element.Id}
                  deleteContact={deleteContact}
                  editContact={handleClickEditContact} />
              )
            })}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default App;
