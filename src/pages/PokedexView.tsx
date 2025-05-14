import React, { useContext, useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonToast,
} from "@ionic/react";
import { MenuPokedexContext, EPokedexScreen } from "../contexts/MenuPokedexContext";
import { PokeService } from "../services/PokeService";
import { Pokemon } from "../interfaces/Pokemon";
import { Cross } from "../components/Buttons/Cross";
import "./PokedexView.css";

const PokedexView: React.FC = () => {
  const {
    screen,
    pokemonOption,
    selectedPokemon,
    setSelectedPokemon,
    setPokemonOption,
    setScreen,
  } = useContext(MenuPokedexContext);

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    PokeService.getAllPokemons().then(setPokemons).catch((e) => {
      setError("Error al cargar Pokémon");
      console.error(e);
    });
  }, []);

  // Al entrar a pantalla detalle, apuntar selectedPokemon si no está
  useEffect(() => {
    if (screen === EPokedexScreen.DETAIL && !selectedPokemon) {
      setSelectedPokemon(pokemons[pokemonOption] || null);
    }
  }, [screen, pokemonOption, pokemons]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pokédex</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {screen === EPokedexScreen.POKEDEX && (
          <>
            <div className="grid">
              {pokemons.map((p, i) => (
                <div
                  key={p.id}
                  className={`pokemon-slot ${
                    i === pokemonOption ? "selected" : ""
                  }`}
                  onClick={() => setSelectedPokemon(p)}
                >
                  <img src={p.image} alt={p.name} />
                </div>
              ))}
            </div>
            <Cross />
          </>
        )}
        {screen === EPokedexScreen.DETAIL && selectedPokemon && (
          <div className="detail-card">
            <img
              src={selectedPokemon.image}
              alt={selectedPokemon.name}
              width={120}
              height={120}
            />
            <h2>{selectedPokemon.name}</h2>
            <p>{selectedPokemon.description}</p>
            <button onClick={() => setScreen(EPokedexScreen.POKEDEX)}>
              Volver
            </button>
          </div>
        )}
        <IonToast
          isOpen={!!error}
          message={error}
          duration={2000}
          onDidDismiss={() => setError(undefined)}
        />
      </IonContent>
    </IonPage>
  );
};

export default PokedexView;
