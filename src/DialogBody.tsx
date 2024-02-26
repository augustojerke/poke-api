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
         <div>
            <div>
               <div className="flex justify-start items-center gap-1 mt-2">
                  <label className=" text-black"><b>Nome:</b></label>
                  <p>{pokemonInfo.name}</p>
               </div>
               <div className="flex justify-start items-center gap-1 mt-2">
                  <label className=" text-black"><b>Peso:</b></label>
                  <p>{pokemonInfo.weight}</p>
               </div>
               <div className="flex justify-start items-center gap-1 mt-2">
                  <label className=" text-black"><b>Altura: </b></label>
                  <p>{pokemonInfo.height}</p>
               </div>
            </div>            
         </div>
      </div>
   )
}