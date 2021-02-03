import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  async function handleAddRepository() {
    // TODO
    api.post('repositories', {
      "title": "minhocaloca",
      "url": "https://açldkjfalçskjdf.com",
      "techs": ['um', 'dois'],
    }).then(response => {
      setProjects([...projects, response.data]);
    });
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);
    await api.get("repositories").then(response => {
      setProjects(projects.filter(repository => repository.id != id));
    });
  }

  useEffect(() => {
    api.get("repositories").then(response => {
      setProjects(response.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {
        projects.map(value => 
        <li key={value.id}>{value.title}
          <button onClick={() => {handleRemoveRepository(value.id)}}>
            Remover
          </button>
        </li>)
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
