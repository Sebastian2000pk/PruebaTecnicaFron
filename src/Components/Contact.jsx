import React from 'react';


const Contact = ({element, deleteContact, editContact}) => {


  return (
    <tr className="table_body">
      <td className="table_cel">{element.Nombre}</td>
      <td className="table_cel">{element.Entidad}</td>
      <td className="table_cel">{element.Email}</td>
      <td><button className="button_edit"
        onClick={() => editContact(element)}>
          Editar
        </button></td>
      <td>
        <input type="submit" value="X"
          className="delete_button"
          onClick={() => deleteContact(element.Id)} />
      </td>
    </tr>
  );
};


export default Contact;
