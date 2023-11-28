import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import useCreateDate from './useCreateDate';

const EditTarea = ({ tareas, setTareas }) => {
  const { id } = useParams();
  const tarea = tareas.find((item) => item.id === id);
  const [title, setTitle] = useState(tarea.title);
  const [details, setDetails] = useState(tarea.details);
  const date = useCreateDate();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle(tarea.title);
    setDetails(tarea.details);
  }, [tarea]);

  const handleForm = async (e) => {
    e.preventDefault();

    if (title && details) {
      try {
        const tareaRef = doc(db, 'tareas', id);
        await updateDoc(tareaRef, {
          title,
          details,
          date,
        });

        const newtarea = { id, title, details, date };
        const newtareas = tareas.map((item) => (item.id === id ? newtarea : item));

        setTareas(newtareas);
      } catch (error) {
        console.error('Error al actualizar la tarea:', error.message);
      }
    }

    navigate('/');
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
      try {
        await deleteDoc(doc(db, 'tareas', id));

        const newtareas = tareas.filter((item) => item.id !== id);
        setTareas(newtareas);

        navigate('/');
      } catch (error) {
        console.error('Error al eliminar la tarea:', error.message);
      }
    }
  };

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
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <textarea
          rows="28"
          placeholder="Detalles de la tarea..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></textarea>
      </form>
    </section>
  );
};

export default EditTarea;
