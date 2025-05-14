import React, { useContext, useEffect } from "react";
import {
  EPokedexScreen,
  EPokedexMenuOption,
  MenuPokedexContext,
} from "../../contexts/MenuPokedexContext";

export const Cross: React.FC = () => {
  const {
    screen,
    menuOption,
    pokemonOption,
    setMenuOption,
    setPokemonOption,
    setSelectedPokemon,
    setScreen,
  } = useContext(MenuPokedexContext);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Navegar menú principal
      if (screen === EPokedexScreen.MENU) {
        let next = menuOption;
        if (e.key === "ArrowUp" || e.key === "ArrowLeft")
          next = (menuOption - 1 < 1
            ? EPokedexMenuOption.EXIT
            : (menuOption - 1 as EPokedexMenuOption)) as any;
        if (e.key === "ArrowDown" || e.key === "ArrowRight")
          next = (menuOption + 1 > 3
            ? EPokedexMenuOption.POKEDEX
            : (menuOption + 1 as EPokedexMenuOption)) as any;
        setMenuOption(next as EPokedexMenuOption);
      }

      // Navegar listado de Pokémon
      if (screen === EPokedexScreen.POKEDEX) {
        let idx = pokemonOption;
        const cols = 6; // 6 columnas en grid
        const total = 151; // número de pokémon
        if (e.key === "ArrowUp") idx = (idx - cols + total) % total;
        if (e.key === "ArrowDown") idx = (idx + cols) % total;
        if (e.key === "ArrowLeft") idx = (idx - 1 + total) % total;
        if (e.key === "ArrowRight") idx = (idx + 1) % total;
        setPokemonOption(idx);
      }

      // Confirmar selección en menú o en POKEDEX
      if (e.key === "Enter") {
        if (screen === EPokedexScreen.MENU) {
          // Ir a la ruta seleccionada
          setScreen(menuOption as unknown as EPokedexScreen);
        }
        if (screen === EPokedexScreen.POKEDEX) {
          // Mostrar modo detalle
          setSelectedPokemon(null); // se actualizará en la página
          setScreen(EPokedexScreen.DETAIL);
        }
      }

      // Volver atrás desde detalle
      if (e.key === "Backspace" && screen === EPokedexScreen.DETAIL) {
        setScreen(EPokedexScreen.POKEDEX);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [screen, menuOption, pokemonOption]);

  return (
    <div id="cross">
      <div id="leftcross" className="gameboy-button" />
      <div id="topcross" className="gameboy-button" />
      <div id="rightcross" className="gameboy-button" />
      <div id="downcross" className="gameboy-button" />
    </div>
  );
};
