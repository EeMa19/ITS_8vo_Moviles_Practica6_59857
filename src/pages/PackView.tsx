import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonToast,
} from "@ionic/react";
import { PokeService } from "../services/PokeService";
import { Item } from "../interfaces/Item";
import "./PackView.css";

const PackView: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    PokeService.getAllItems(50)
      .then(setItems)
      .catch((e) => {
        setError("Error al cargar objetos");
        console.error(e);
      });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pack de Objetos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {items.map((it) => (
          <IonCard key={it.id}>
            <img src={it.image} alt={it.name} width={80} height={80} />
            <IonCardHeader>
              <IonCardTitle>{it.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{it.effect}</IonCardContent>
          </IonCard>
        ))}
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

export default PackView;
