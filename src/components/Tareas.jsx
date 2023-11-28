import React, { useState, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import { MdClose } from 'react-icons/md';
import { BsPlusLg } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { auth } from '../Firebase/firebase'; 
import TareaItem from './TareaItem';
import './Tareas.css';

const Tareas = ({ tareas }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [text, setText] = useState('');
  const [filteredtareas, setFilteredtareas] = useState(tareas);

  const handleSearch = () => {
    setFilteredtareas(tareas.filter(tarea => tarea.title.toLowerCase().includes(text.toLowerCase())));
  };

  useEffect(handleSearch, [text]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <section>
      <header className="tareas__header">
        <div className="header-left">
          {!showSearch && <img src="LogoTareas.png" alt="LogoHazYa" className="logo" />}
          {!showSearch && <h2>Tus Tareas</h2>}
        </div>
        <div className="header-right">
          {showSearch && (
            <input
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                handleSearch();
              }}
              autoFocus
              placeholder="Buscar..."
            />
          )}
          <button className="btn" onClick={() => setShowSearch((prevState) => !prevState)}>
            {showSearch ? <MdClose /> : <CiSearch />}
          </button>
          <button className="btn" onClick={handleSignOut}>
            Salir
          </button>
        </div>
      </header>
      <div className="tareas__container">
        {filteredtareas.length === 0 && <p className="empty__tareas">No se encontraron tareas...</p>}
        {filteredtareas.map((tarea) => (
          <TareaItem key={tarea.id} tarea={tarea} />
        ))}
      </div>
      <Link className="btn add__btn" to="/create-tarea">
        <BsPlusLg />
      </Link>
    </section>
  );
};

export default Tareas;
