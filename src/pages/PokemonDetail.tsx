// src/pages/PokemonDetail.tsx
import React, { useContext } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from "@ionic/react";
import {
  MenuPokedexContext,
  EPokedexScreen,
} from "../contexts/MenuPokedexContext";

const PokemonDetail: React.FC = () => {
  const { selectedPokemon, setScreen } = useContext(MenuPokedexContext);

  if (!selectedPokemon) {
    // por si acaso alguien llega aquí sin Pokémon seleccionado
    return <p>No hay Pokémon seleccionado.</p>;
  }

  return (
    <IonCard>
      <img
        src={selectedPokemon.image}
        alt={selectedPokemon.name}
        style={{ width: 120, height: 120, display: "block", margin: "0 auto" }}
      />
      <IonCardHeader>
        <IonCardTitle>{selectedPokemon.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>{selectedPokemon.description}</p>
        <IonButton
          expand="block"
          onClick={() => setScreen(EPokedexScreen.POKEDEX)}
        >
          Volver
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default PokemonDetail;
