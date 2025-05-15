// src/App.tsx
import React from "react";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

/* Core CSS required for Ionic components */
import "@ionic/react/css/core.css";
/* Basic CSS */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
/* Optional CSS utils */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */
import "./theme/variables.css";

import { MenuPokedexProvider } from "./contexts/MenuPokedexProvider";
import Pokedex from "./components/Pokedex";
import { PokedexMenu } from "./components/Menu/PokedexMenu";
import PokedexView from "./pages/PokedexView";
import PackView from "./pages/PackView";
import ExitView from "./pages/ExitView";
import PokemonDetailPage from "./pages/PokemonDetailPage";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <MenuPokedexProvider>
          <Pokedex>
            <Route exact path="/home" component={PokedexMenu} />
            <Route exact path="/pokemon/:id" component={PokemonDetailPage} />
            <Route exact path="/pokedex" component={PokedexView} />
            <Route exact path="/pack" component={PackView} />
            <Route exact path="/exit" component={ExitView} />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
          </Pokedex>
        </MenuPokedexProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
