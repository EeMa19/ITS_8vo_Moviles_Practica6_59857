import { createContext } from "react";
import { Pokemon } from "../interfaces/Pokemon";

export enum EPokedexMenuOption {
  POKEDEX = 1,
  PACK    = 2,
  EXIT    = 3,
}

export enum EPokedexScreen {
  MENU    = 0,
  POKEDEX = 1,
  PACK    = 2,
  EXIT    = 3,
  DETAIL  = 4,
}

export type TMenuPokedexContext = {
  screen: EPokedexScreen;
  menuOption: EPokedexMenuOption;
  pokemonOption: number;
  selectedPokemon: Pokemon | null;
  setScreen: (option: EPokedexScreen) => void;
  setMenuOption: (option: EPokedexMenuOption) => void;
  setPokemonOption: (index: number) => void;
  setSelectedPokemon: (p: Pokemon | null) => void;
};

export const MenuPokedexContext = createContext<TMenuPokedexContext>({
  screen: EPokedexScreen.MENU,
  menuOption: EPokedexMenuOption.POKEDEX,
  pokemonOption: 0,
  selectedPokemon: null,
  setScreen: () => {},
  setMenuOption: () => {},
  setPokemonOption: () => {},
  setSelectedPokemon: () => {},
});
