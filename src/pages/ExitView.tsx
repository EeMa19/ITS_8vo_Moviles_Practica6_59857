import React from "react";
import { IonPage, IonContent, IonButton } from "@ionic/react";
import { useContext } from "react";
import {
  MenuPokedexContext,
  EPokedexScreen,
  EPokedexMenuOption
} from "../contexts/MenuPokedexContext";

const ExitView: React.FC = () => {
  const { setScreen, setMenuOption } = useContext(MenuPokedexContext);

  return (
    <IonPage>
      <IonContent className="ion-padding ion-text-center">
        <h1>¡Hasta luego!</h1>
        <IonButton
          expand="full"
          onClick={() => {
            setMenuOption(EPokedexMenuOption.POKEDEX);
            setScreen(EPokedexScreen.MENU);
          }}
        >
          Volver al Menú
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ExitView;
