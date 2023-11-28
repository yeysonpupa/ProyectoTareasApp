import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import useCreateDate from './useCreateDate';

const Edittarea = ({ tareas, settareas }) => {
  const {id} = useParams();
  const tarea = tareas.find((item) => item.id === id);
  const [title, setTitle] = useState(tarea.title);
  const [details, setDetails] = useState(tarea.details);
  const date = useCreateDate();
  const navigate = useNavigate();
  
  const handleForm = (e) => {
    e.preventDefault();

    if(title && details) {
      const newtarea = {...tarea, title, details, date}

      const newtareas = tareas.map((item) => {
        if(item.id === id) {
          item = newtarea;
        }
        return item;
      })

      settareas(newtareas);
    }

    navigate('/');
  }

  const handleDelete = () => {
    if(window.confirm('Are you sure you want to delete?')) {
      const newtareas = tareas.filter(item => item.id !== id);

      settareas(newtareas);
      navigate('/');
    }
  }

  return (
    <section>
      <header className="create-tarea__header">
        <Link to="/" className="btn">
          <IoIosArrowBack />
        </Link>
        <button className="btn lg primary" onClick={handleForm}>
          Guardar
        </button>
        <button className="btn danger" onClick={handleDelete}>
          <RiDeleteBin6Line />
        </button>
      </header>

      <form className="create-tarea__form" onSubmit={handleForm}>
        <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} autoFocus/>
        <textarea rows="28" placeholder="Detalles de la tarea..." value={details} onChange={(e) => setDetails(e.target.value)}></textarea>
      </form>
    </section>
  )
}

export default Edittarea