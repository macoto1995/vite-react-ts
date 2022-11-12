import { useMemo } from "react"
import useSWR, {Fetcher} from "swr"

type PokemonListResponse = {
  count: number
  next: string
  results: {
    name: string
    url: string
  }[]
}

const fetcher: Fetcher<PokemonListResponse, string> = (...args) => fetch(...args).then(res => res.json())

const usePokemonList = () => {
  const { data, error } = useSWR<PokemonListResponse>('https://pokeapi.co/api/v2/pokemon?limit=200&offset=0', fetcher)
  const pokemons = useMemo(() => data?.results.map(pokemon => {
      const id = pokemon.url.split('/').at(-2)
      const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      const url = `/pokemon/${id}`
      return({...pokemon, id, url, imgSrc })
    }), [data]
  )
  return {
    pokemons,
    isLoading: !error && !data,
    isError: !!error
  }
}

export const PokemonIndexPage = () => {
  const { pokemons, isLoading, isError } = usePokemonList()
  if(isLoading) return <>'...loading'</>
  if(isError) return <>'Oh no'</>
  
  return (
    <>
      <header>
        <h1>
          Vite x React
        </h1>
      </header>
      { pokemons && 
        pokemons.map(pokemon => (
          <div key={pokemon.id}>
            <h4>{pokemon.name}</h4> 
            <a href={pokemon.url}>{pokemon.name}</a>
            <img alt={pokemon.name} src={pokemon.imgSrc} />
          </div>
        ))
      }  
    </>
  )}