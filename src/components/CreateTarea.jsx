import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { v4 as uuid } from 'uuid';
import useCreateDate from './useCreateDate';
import './CreateEdit.css';

const CreateTarea = ({setTareas}) => {
  const[title, setTitle] = useState ('');
  const[details, setDetails] = useState ('');
  const date = useCreateDate();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(title && details) {
      const tarea = {id: uuid(), title, details, date}

      setTareas(prevtareas => [tarea, ...prevtareas])

      navigate('/');
    }
  }

  return (
    <section>
      <header className="create-tarea__header">
        <Link to="/" className="btn">
          <IoIosArrowBack />
        </Link>
        <button className="btn lg primary" onClick={handleSubmit}>
          Guardar
        </button>
      </header>

      <form className="create-tarea__form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} autoFocus/>
        <textarea rows="28" placeholder="Detalles de la tarea..." value={details} onChange={(e) => setDetails(e.target.value)}></textarea>
      </form>
    </section>
  )
}

export default CreateTarea;