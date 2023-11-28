import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { addDoc, collection } from 'firebase/firestore';
import { db, currentUser } from '../Firebase/firebase'; 
import useCreateDate from './useCreateDate';
import './CreateEdit.css';

const CreateTarea = ({ setTareas }) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const date = useCreateDate();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title && details) {
      try {
        const tareaRef = await addDoc(collection(db, 'tareas'), {
          userId: currentUser.uid,
          title,
          details,
          date,
        });

        const tarea = { id: tareaRef.id, title, details, date };
        setTareas((prevTareas) => [tarea, ...prevTareas]);

        navigate('/');
      } catch (error) {
        console.error('Error al crear la tarea:', error.message);
      }
    }
  };

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

export default CreateTarea;

