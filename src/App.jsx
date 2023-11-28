import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, signOut } from './Firebase/firebase'; 
import CreateTarea from './components/CreateTarea';
import EditTarea from './components/EditTarea';
import Tareas from './components/Tareas';
import SignIn from './components/SignIn'; 
import SignUp from './components/SignUp'; 

const App = () => {
  const [user, setUser] = useState(null); 
  const [tareas, settareas] = useState(JSON.parse(localStorage.getItem('tareas')) || []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); 
    });

    return () => unsubscribe(); 
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('Usuario cerró sesión');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  return (
    <main id="app">
      <Router>
        <Routes>
          <Route path="/" element={user ? <Tareas tareas={tareas} /> : <SignIn />} />
          <Route path="/create-tarea" element={user ? <CreateTarea settareas={settareas} /> : <SignIn />} />
          <Route path="/edit-tarea/:id" element={user ? <EditTarea tareas={tareas} settareas={settareas} /> : <SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
