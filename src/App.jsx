import { useState } from "react";
import { useEffect } from "react"
import Card from "./components/Card";
import Pagination from "./components/Pagination";
import LayoutCentral from "./components/layouts/LayoutCentral";
import "./index.css"

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();

  let timeout
  function myFunction() {
    timeout = setTimeout(setLoading(), 3000);
  }

  //inizio effect
  useEffect(() => {
    setLoading(true)

    //! Creo un controller per gestire le richieste all'API, all fine dell'effect nel return chiamo l'abort per eliminare possibili richieste rimaste in pending
    // const controller = new AbortController();
    // const signal = controller.signal;

    async function getPokemons() {
      const response = await fetch(currentPageUrl);
      const json = await response.json();
      setLoading(false);
      setNextPageUrl(json.next);
      setPrevPageUrl(json.previous);
      setPokemons(json.results);
    }
    getPokemons()

    //! Qui termino la richiesta
    // return () => controller.abort();
  }, [currentPageUrl])
  //fine effect

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  if (loading) {
    return <div className="container vh-100 d-flex justify-content-center align-items-center"><img src="src/assets/pokeball.png" className="pokeball" /></div>
  }

  return (
    <LayoutCentral>
      <header>
        <img src="src/assets/Pokedex_logo.png" alt="Logo Pokedex Pokemon" />
      </header>
      <div className="container-fluid">
        <div className="row justify-content-center align-items-start">
          {pokemons.map((pokemon) => (
            <Card key={pokemon.name}
              pokemon={pokemon}
            />
          ))}
        </div>
      </div>
      <Pagination
        goToPrevPage={goToPrevPage ? goToPrevPage : null}
        goToNextPage={goToNextPage ? goToNextPage : null}
      />
    </LayoutCentral>
  )
}

export default App
