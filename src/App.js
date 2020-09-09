import React, { useState, useEffect } from "react";
import api from 'services/api'
import "./styles.css";

function App() {

  const [repositories, setRepo] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => setRepo(response.data))
  }, [])

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: 'Teste',
      url: 'http://localhost:3333',
      techs: ['ReactJS','NodeJS']
    })

    const repo = response.data;

    setRepo([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    const response = await api.delete(`repositories/${id}`)
    if (response.statusText === 400) {
      alert("Deu ruim a exclusão");
    }
    else {
      const index = repositories.findIndex(project => project.id === id)
      repositories.splice(index, 1);
    }
    setRepo([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repo => 
          <li key={repo.id}>{repo.title}
          
          <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
