// src/App.tsx
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS de Ionic */
import "@ionic/react/css/core.css";
/* CSS básicos de Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
/* Opcionales (descomenta si las necesitas) */
// import "@ionic/react/css/display.css";
// import "@ionic/react/css/flex-utils.css";
// import "@ionic/react/css/float-elements.css";
// import "@ionic/react/css/padding.css";
// import "@ionic/react/css/text-alignment.css";
// import "@ionic/react/css/text-transformation.css";

/* Variables de tema */
import "./theme/variables.css";

/* Contexto y componentes de tu práctica */
import { MenuPokedexProvider } from "./contexts/MenuPokedexProvider";
import Pokedex                from "./components/Pokedex";

import { PokedexMenu }        from "./components/Menu/PokedexMenu";
import PokedexView            from "./pages/PokedexView";
import PokemonDetailPage      from "./pages/PokemonDetailPage";
import PackView               from "./pages/PackView";
import ExitView               from "./pages/ExitView";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <MenuPokedexProvider>
        <IonRouterOutlet>
          {/** 1) Menú principal */}
          <Route
            exact
            path="/home"
            render={() => (
              <Pokedex>
                <PokedexMenu />
              </Pokedex>
            )}
          />

          {/** 2) Lista de Pokémon */}
          <Route
            exact
            path="/pokedex"
            render={() => (
              <Pokedex>
                <PokedexView />
              </Pokedex>
            )}
          />

          {/** 3) Detalle individual */}
          <Route
            exact
            path="/pokemon/:id"
            render={() => (
              <Pokedex>
                <PokemonDetailPage />
              </Pokedex>
            )}
          />

          {/** 4) Pack de objetos */}
          <Route
            exact
            path="/pack"
            render={() => (
              <Pokedex>
                <PackView />
              </Pokedex>
            )}
          />

          {/** 5) Pantalla de salida */}
          <Route
            exact
            path="/exit"
            render={() => (
              <Pokedex>
                <ExitView />
              </Pokedex>
            )}
          />

          {/** 6) Redirige “/” a /home */}
          <Route exact path="/" render={() => <Redirect to="/home" />} />
        </IonRouterOutlet>
      </MenuPokedexProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
