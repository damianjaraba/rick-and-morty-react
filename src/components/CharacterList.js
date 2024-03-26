import { useEffect, useState } from "react";
import React from "react";
import Character from "./Character";

function NavPage(props) {
  return (
    <header className="d-flex justify-content-between">
      <button 
        className="btn btn-outline-primary"
        onClick={() => props.setPage(props.page - 1)}
      >
        Page: {props.page}
      </button>
      <button
        className="btn btn-outline-primary"
        onClick={() => props.setPage(props.page + 1)}
      >
        Page: {props.page + 1}
      </button>
    </header>
  );
}

function CharacterList() {
  const [character, setCharacter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchDate() {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      const data = await response.json();
      setLoading(false);
      setCharacter(data.results);
    }
    fetchDate();
  }, [page]);

  return (
    <div className="container">
      <NavPage page={page} setPage={setPage} />

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="row">
          {character.map((character) => {
            return (
              <div className="col-md-4" key={character.id}>
                <Character character={character} />
              </div>
            );
          })}
        </div>
      )}
      <NavPage />
    </div>
  );
}

export default CharacterList;
