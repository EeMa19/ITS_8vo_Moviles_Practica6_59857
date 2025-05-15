// src/components/Buttons/Cross.tsx
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
    setScreen,
    setSelectedPokemon,
  } = useContext(MenuPokedexContext);

  const cols = 6;      // columnas de tu grid de Pokémon
  const total = 151;   // total de Pokémon listados

  /** Navegar dentro del menú principal */
  const navMenu = (dir: "up" | "down" | "left" | "right") => {
    let next = menuOption;
    if (dir === "up" || dir === "left") {
      next =
        menuOption - 1 < 1
          ? EPokedexMenuOption.EXIT
          : (menuOption - 1 as EPokedexMenuOption);
    }
    if (dir === "down" || dir === "right") {
      next =
        menuOption + 1 > 3
          ? EPokedexMenuOption.POKEDEX
          : (menuOption + 1 as EPokedexMenuOption);
    }
    setMenuOption(next);
  };

  /** Navegar dentro de la lista de Pokémon */
  const navPokedex = (dir: "up" | "down" | "left" | "right") => {
    let idx = pokemonOption;
    if (dir === "up") idx = (idx - cols + total) % total;
    if (dir === "down") idx = (idx + cols) % total;
    if (dir === "left") idx = (idx - 1 + total) % total;
    if (dir === "right") idx = (idx + 1) % total;
    setPokemonOption(idx);
  };

  /** Maneja flecha, decidiendo según pantalla */
  const onDirection = (dir: "up" | "down" | "left" | "right") => {
    if (screen === EPokedexScreen.MENU) navMenu(dir);
    else if (screen === EPokedexScreen.POKEDEX) navPokedex(dir);
  };

  /** Confirmar selección (ENTER o botón central) */
  const confirm = () => {
    if (screen === EPokedexScreen.MENU) {
      // Cambia de pantalla según opción del menú
      setScreen(menuOption as unknown as EPokedexScreen);
    } else if (screen === EPokedexScreen.POKEDEX) {
      // Mostrar detalle de Pokémon
      setSelectedPokemon(null); // se establecerá dentro de la página detail
      setScreen(EPokedexScreen.DETAIL);
    }
  };

  /** Volver atrás (Backspace) */
  const goBack = () => {
    if (screen === EPokedexScreen.DETAIL) {
      setScreen(EPokedexScreen.POKEDEX);
    }
  };

  /** Escucha teclado igual que antes */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          return onDirection("up");
        case "ArrowDown":
          return onDirection("down");
        case "ArrowLeft":
          return onDirection("left");
        case "ArrowRight":
          return onDirection("right");
        case "Enter":
          return confirm();
        case "Backspace":
          return goBack();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [screen, menuOption, pokemonOption]);

  return (
    <div id="cross">
      <div
        id="leftcross"
        className="gameboy-button"
        onClick={() => onDirection("left")}
      />
      <div
        id="topcross"
        className="gameboy-button"
        onClick={() => onDirection("up")}
      />
      <div
        id="rightcross"
        className="gameboy-button"
        onClick={() => onDirection("right")}
      />
      <div
        id="botcross"
        className="gameboy-button"
        onClick={() => onDirection("down")}
      />
      {/* Botón central para “Enter” */}
      <div id="midcross" className="gameboy-button" onClick={confirm} />
    </div>
  );
};
