// src/pages/PokemonDetailPage.tsx
import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonSpinner,
} from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import { PokeService } from "../services/PokeService";
import { Pokemon } from "../interfaces/Pokemon";

import "../theme/variables.css";
import "./PokemonDetailPage.css";

const PokemonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PokeService.getPokemonById(parseInt(id, 10))
      .then((p) => setPokemon(p))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <IonPage>
        <IonContent className="ion-text-center ion-padding">
          <IonSpinner name="crescent" />
        </IonContent>
      </IonPage>
    );
  }

  if (!pokemon) {
    return (
      <IonPage>
        <IonContent className="ion-text-center ion-padding">
          <p>Pokémon no encontrado.</p>
          <IonButton onClick={() => history.goBack()}>Volver</IonButton>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{pokemon.name.toUpperCase()}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="detail-page-content">
        <div className="detail-card-full">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="detail-image"
          />
          <h2>{pokemon.name}</h2>
          <p>{pokemon.description}</p>
          <IonButton expand="block" onClick={() => history.goBack()}>
            Volver
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PokemonDetailPage;
