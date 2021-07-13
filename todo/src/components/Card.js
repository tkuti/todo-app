import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import { BiEditAlt } from 'react-icons/bi';
import { BiSave } from 'react-icons/bi';
import { FaRegCopy } from 'react-icons/fa';

function Card({ datas, editCard, id, deleteCard, drag, copyCard }) {
  const [showDescription, setShowDescription] = useState(false);
  const [readOnly, setReadonly] = useState(true);

  return (
    <div id={id} className="cardContainer" draggable="true" onDragStart={(ev) => drag(ev, id, datas.idCard)}>

      <input type="text" value={datas.title}
        readOnly={readOnly}
        title="click for description"
        onClick={() => setShowDescription(!showDescription)}
        onChange={(e) => editCard(e, id, datas.idCard, "title")}
        autoFocus
      />

      <FaTrashAlt className="iconContainerTrash"
        title="delete"
        onClick={() => deleteCard(id, datas.idCard)} />

      <FaRegCopy className="iconContainerCopy"
        title="copy"
        onClick={() => copyCard(id, datas.idCard)} />

      {readOnly
        ? <BiEditAlt className="iconContainerEdit"
          title="edit"
          onClick={(e) => { setReadonly(false); 
            e.target.parentElement.firstElementChild.focus() }} />
        : <BiSave className="iconContainerEdit"
          title="save"
          onClick={(e) => { setReadonly(true); }} />
      }

      {(showDescription || !readOnly)
        && <textarea type="text" value={datas.description}
          id="description"
          placeholder="description"
          rows="5"
          onChange={(e) => editCard(e, id, datas.idCard, "description")}
          readOnly={readOnly} />}

    </div>
  );
}

export default Card;