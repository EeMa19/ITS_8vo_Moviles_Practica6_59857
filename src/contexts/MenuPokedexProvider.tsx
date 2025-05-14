import React, { ReactNode, useState } from "react";
import {
  EPokedexMenuOption,
  EPokedexScreen,
  MenuPokedexContext,
} from "./MenuPokedexContext";
import { Pokemon } from "../interfaces/Pokemon";

export const MenuPokedexProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [screen, setScreen] = useState<EPokedexScreen>(EPokedexScreen.MENU);
  const [menuOption, setMenuOption] = useState<EPokedexMenuOption>(
    EPokedexMenuOption.POKEDEX
  );
  const [pokemonOption, setPokemonOption] = useState<number>(0);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  return (
    <MenuPokedexContext.Provider
      value={{
        screen,
        menuOption,
        pokemonOption,
        selectedPokemon,
        setScreen,
        setMenuOption,
        setPokemonOption,
        setSelectedPokemon,
      }}
    >
      {children}
    </MenuPokedexContext.Provider>
  );
};
