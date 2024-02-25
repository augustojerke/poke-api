import { useEffect, useState } from "react"
import axios from "axios";

interface PokemonInfo {
   name: string;
   height: number | null
   weight: number | null
   image: string,
}

interface DialogProps {
   id: number
}

export default function DialogBody(props: DialogProps){

   const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo>({
      name: "",
      height: null,
      weight: null,
      image: ""
   })

   useEffect(() => {
      getPokeInfo();
   }, [])

   async function getPokeInfo(){
      const pokeInfo = await axios.get('https://pokeapi.co/api/v2/pokemon/' + props.id);

      setPokemonInfo({
         name: pokeInfo.data.name,
         weight: pokeInfo.data.weight,
         height: pokeInfo.data.height,
         image: pokeInfo.data.sprites.other.home.front_default
      })
   }

   return(
      <div>
         <img className=" size-40 mx-auto" src={pokemonInfo.image} alt={"Imagem " + pokemonInfo.image} />
         <h1>Nome: {pokemonInfo.name}</h1>
         <h1>Altura: {pokemonInfo.height}</h1>
         <h1>Peso: {pokemonInfo.weight}</h1>
      </div>
   )
}