// src/services/PokeService.ts
import axios from "axios";
import { Pokemon } from "../interfaces/Pokemon";
import { Item }    from "../interfaces/Item";

const API = "https://pokeapi.co/api/v2";

export class PokeService {
  static async getAllPokemons(limit = 151): Promise<Pokemon[]> {
    const { data } = await axios.get(`${API}/pokemon?limit=${limit}`);
    const results = data.results as { name: string; url: string }[];

    return Promise.all(
      results.map(async (r) => {
        const det = await axios.get(r.url);
        const sp  = await axios.get(det.data.species.url);
        return {
          id: det.data.id,
          name: det.data.name,
          image: det.data.sprites.front_default,
          description: sp.data.flavor_text_entries
            .find((e: any) => e.language.name === "en")
            ?.flavor_text.replace(/\n|\f/g, " ") ?? "",
        };
      })
    );
  }

  static async getAllItems(limit = 50): Promise<Item[]> {
    const { data } = await axios.get(`${API}/item?limit=${limit}`);
    const results = data.results as { name: string; url: string }[];

    return Promise.all(
      results.map(async (r) => {
        const det = await axios.get(r.url);
        return {
          id: det.data.id,
          name: det.data.name,
          image: det.data.sprites.default,
          effect: det.data.effect_entries
            .find((e: any) => e.language.name === "en")
            ?.short_effect ?? "",
        };
      })
    );
  }

  /** Nuevo método: obtiene un Pokémon por su ID */
  static async getPokemonById(id: number): Promise<Pokemon> {
    const det = await axios.get(`${API}/pokemon/${id}`);
    const sp  = await axios.get(det.data.species.url);
    return {
      id: det.data.id,
      name: det.data.name,
      image: det.data.sprites.front_default,
      description: sp.data.flavor_text_entries
        .find((e: any) => e.language.name === "en")
        ?.flavor_text.replace(/\n|\f/g, " ") ?? "",
    };
  }
}
