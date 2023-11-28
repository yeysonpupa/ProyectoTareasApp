import React from 'react'
import { Link } from 'react-router-dom'

const TareaItem = ({ tarea }) => {
  return (
    <Link to={`/edit-tarea/${tarea.id}`} className="tarea">
        <h4>
            {tarea.title.length > 50 ? (tarea.title.substr(0, 50)) + '...' : tarea.title}
        </h4>
        <p>
            {tarea.date}
        </p>
    </Link>
  )
}

export default TareaItem