import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);
  
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    console.log(id);
    const response = await api.delete(`repositories/${id}`);
     
    const repoIndex = repositories.findIndex(repo => repo.id === id);
  
    if (repoIndex < 0) {
      return response.status(400).json( {error: 'Repository not found.'});
  }
  console.log(repoIndex);
  repositories.splice(repoIndex, 1);


    setRepositories([...repositories]);    
  }

  return (
    <div>
      <ul data-testid="repository-list">
         {repositories.map(repo => 
          <li key={repo.id}>{repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
