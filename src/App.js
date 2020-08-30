import React, { useState, useEffect } from "react";
import api from "./services/api"

import "./styles.css";

function App() {

  useEffect(() => {
    api.get("/repositories").then(({ data }) => {
      setRepositories(data)
    })
  }, [])

  const [repositories, setRepositories] = useState([])

  async function handleAddRepository() {
    api.post("/repositories", {
      title: `ReactJS Project ${Math.floor(Math.random() * 1000000)}`,
      url: "https://github.com/VenserXIII",
      techs: ["NodeJS", "ReactJS", "Axios"]
    }).then(({ data }) => {
      setRepositories([...repositories, data])
    })
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    const repositoryIndex = repositories.findIndex(i => i.id === id)
    setRepositories(repositories.filter(i => i.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(i => (
          <li key={i.id}>{i.title} <button onClick={() => handleRemoveRepository(i.id)}>Remover</button></li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
