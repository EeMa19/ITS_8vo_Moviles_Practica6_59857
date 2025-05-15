// src/pages/PokedexView.tsx
import React, { useContext, useEffect, useState, useRef } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { useHistory } from "react-router-dom";
import {
  MenuPokedexContext,
  EPokedexScreen,
} from "../contexts/MenuPokedexContext";
import { PokeService } from "../services/PokeService";
import { Pokemon } from "../interfaces/Pokemon";
import { Cross } from "../components/Buttons/Cross";

import "../theme/variables.css";
import "./PokedexView.css";

const PokedexView: React.FC = () => {
  const {
    screen,
    pokemonOption,
    setPokemonOption,
  } = useContext(MenuPokedexContext);

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const history = useHistory();

  // 1️⃣ Carga la lista de Pokémon al entrar
  useEffect(() => {
    if (screen === EPokedexScreen.POKEDEX) {
      PokeService.getAllPokemons().then(setPokemons);
    }
  }, [screen]);

  // 2️⃣ Mantén visible el seleccionado al navegar
  useEffect(() => {
    if (screen === EPokedexScreen.POKEDEX && gridRef.current) {
      const items = Array.from(gridRef.current.children) as HTMLElement[];
      const el = items[pokemonOption];
      el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [pokemonOption, screen]);

  // 3️⃣ Confirma la selección con el BigBlueButton
  const handleConfirm = () => {
    if (screen === EPokedexScreen.POKEDEX) {
      const selected = pokemons[pokemonOption];
      if (selected) {
        history.push(`/pokemon/${selected.id}`);
      }
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="pokedex-content">
        <div className="screen-container">
          {screen === EPokedexScreen.POKEDEX && (
            <div className="grid-wrapper">
              <div className="grid" ref={gridRef}>
                {pokemons.map((p, i) => (
                  <div
                    key={p.id}
                    className={`pokemon-slot ${
                      i === pokemonOption ? "selected" : ""
                    }`}
                    onClick={() => setPokemonOption(i)}
                  >
                    <img src={p.image} alt={p.name} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Big Blue Button: confirma Pokémon seleccionado */}
        <div
          id="bigbluebutton"
          className="gameboy-button"
          onClick={handleConfirm}
        />

        {/* Cruceta para mover la selección */}
        <Cross />
      </IonContent>
    </IonPage>
  );
};

export default PokedexView;
