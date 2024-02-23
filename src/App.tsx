import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Search } from "lucide-react"
import axios from "axios"
import { useEffect, useState } from "react"

interface Pokemons {
  name: string,
  mainImage: string
  id: number,
}

function App() {

  useEffect(() => {
    getPokemons();
  }, [])

  const [pokemons, setPokemons] = useState<Pokemons[]>([]);

  async function getPokemons() {
    try {
      const pokemonsList = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1350&offset=0");
      const pokemonsResults = pokemonsList.data.results;
  
      for (let i = 0; i < pokemonsList.data.count; i++) {
        const pokemonAtributtes = await axios.get(pokemonsResults[i].url);
  
        const newPokemon: Pokemons = {
          name: pokemonsResults[i].name,
          mainImage: pokemonAtributtes.data.sprites.front_default,
          id: pokemonAtributtes.data.id
        };  

        setPokemons((pokes) => [...pokes, newPokemon]);
      }

    } catch (error) {
      console.error("Erro ao obter a lista de Pokémons:", error);
    }
  }
  
  return (
    <main className="bg-slate-950">
      <div className="flex justify-start items-center p-10 space-x-4">
        <Input className="w-80 text-white bg-slate-900 border-slate-800" placeholder="Nome do Pokemon"/>
        <Button onClick={getPokemons} className="bg-slate-50 text-black hover:bg-slate-200">
          <Search className="mr-2" size={18}/>
          Buscar Pokémon
        </Button>        
      </div>
      <div className="grid justify-center items-center grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 px-5 ml-4">
          {pokemons?.map((poke, i) => (
              <div key={i} className="bg-slate-800 w-56 h-40 mx-2 my-2 border-4 border-slate-400 fl ex-col justify-center items-center
                                        text-center hover:border-green-700 rounded transition-transform transform-gpu hover:scale-105">
                <img className="mx-auto my-auto" src={poke.mainImage} alt={"Imagem " + poke.name} loading="lazy"/>
                <h3 className="text-xl text-white"><b>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</b></h3>
              </div>
          ))}
      </div>
    </main>
  ) 
}

export default App
