// src/pages/DetailScreen.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import axios from 'axios';
import './DetailScreen.css';

interface PokemonDetail {
  id: number;
  name: string;
  sprite: string;
  flavor_text: string;
}

export const DetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const [pokeRes, speciesRes] = await Promise.all([
          axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
          axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        ]);

        const rawText = speciesRes.data.flavor_text_entries
          .find((e: any) => e.language.name === 'en')
          ?.flavor_text.replace(/\n|\f/g, ' ') || 'No description';
        const flavor = rawText.length > 200 ? rawText.slice(0,197) + '...' : rawText;

        setPokemon({
          id: +id,
          name: pokeRes.data.name,
          sprite: pokeRes.data.sprites.front_default,
          flavor_text: flavor
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading || !pokemon) {
    return (
      <IonPage>
        <IonHeader><IonToolbar><IonTitle>Detalle</IonTitle></IonToolbar></IonHeader>
        <IonContent className="ion-padding">Cargando detalle…</IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" onClick={() => window.history.back()}>Atrás</IonButton>
          <IonTitle>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding detail-screen">
        <img src={pokemon.sprite} alt={pokemon.name} className="pokemon-image" />
        <p>{pokemon.flavor_text}</p>
      </IonContent>
    </IonPage>
  );
};
