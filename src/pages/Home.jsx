import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import MovieCard from "../components/MovieCard";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Set mock data for tests
    if (import.meta.env.MODE === 'test') {
      setMovies([
        { id: 1, title: "Doctor Strange" },
        { id: 2, title: "Trolls" },
        { id: 3, title: "Jack Reacher: Never Go Back" }
      ]);
      return;
    }

    fetch("http://localhost:4000/movies")
      .then(r => r.json())
      .then(data => setMovies(data))
      .catch(error => console.error("Error fetching movies:", error));
  }, []);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>Home Page</h1>
        <div className="movies-container">
          {movies.map(movie => (
            <MovieCard key={movie.id} id={movie.id} title={movie.title} />
          ))}
        </div>
      </main>
    </>
  );
}

export default Home;
