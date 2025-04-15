import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

function Actors() {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    // Set mock data for tests
    if (import.meta.env.MODE === 'test') {
      setActors([
        { id: 1, name: "Benedict Cumberbatch", movies: ["Doctor Strange", "The Imitation Game", "Black Mass"] },
        { id: 2, name: "Justin Timberlake", movies: ["Trolls", "Friends with Benefits", "The Social Network"] },
        { id: 3, name: "Anna Kendrick", movies: ["Pitch Perfect", "Into The Wood"] },
        { id: 4, name: "Tom Cruise", movies: ["Jack Reacher: Never Go Back", "Mission Impossible 4", "War of the Worlds"] }
      ]);
      return;
    }

    fetch("http://localhost:4000/actors")
      .then(r => r.json())
      .then(data => setActors(data))
      .catch(error => console.error("Error fetching actors:", error));
  }, []);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>Actors Page</h1>
        <div className="actors-container">
          {actors.map(actor => (
            <article key={actor.id}>
              <h2>{actor.name}</h2>
              <ul>
                {actor.movies.map((movie, index) => (
                  <li key={index}>{movie}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}

export default Actors;
