// src/pages/PokedexView.tsx
import React, { useContext, useEffect, useState, useRef } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { MenuPokedexContext, EPokedexScreen } from "../contexts/MenuPokedexContext";
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

  // 1) Carga la lista
  useEffect(() => {
    if (screen === EPokedexScreen.POKEDEX) {
      PokeService.getAllPokemons().then(setPokemons);
    }
  }, [screen]);

  // 2) Mantén visible el seleccionado al navegar
  useEffect(() => {
    if (screen === EPokedexScreen.POKEDEX && gridRef.current) {
      const items = Array.from(gridRef.current.children) as HTMLElement[];
      const el = items[pokemonOption];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [pokemonOption, screen]);

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
                    onClick={() => {
                      // navegar a la ruta de detalle
                      history.push(`/pokemon/${p.id}`);
                    }}
                  >
                    <img src={p.image} alt={p.name} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Cross />
      </IonContent>
    </IonPage>
  );
};

export default PokedexView;
