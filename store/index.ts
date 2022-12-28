import { useMemo } from "react";
import {
  createStore,
  action,
  persist,
  Action,
  Store,
  createTypedHooks,
} from "easy-peasy";

interface MenuBar {
  isMenuOpen: boolean;
  closeMenu: Action<MenuBar>;
  openMenu: Action<MenuBar>;
}
interface SearchBar {
  query: string;
  isMenuOpen: boolean;
  closeMenu: Action<SearchBar>;
  openMenu: Action<SearchBar>;
}

// export type DockItem =
//   | "Messages"
//   | "Music"
//   | "Finder"
//   | "Settings"
//   | "Note"
//   | "Reminders";

interface DockBar {
  active: string;
  closeMenu: Action<DockBar>;
  openMenu: Action<DockBar>;
}

export interface StoreModel {
  menuBar: MenuBar;
  searchBar: SearchBar;
  dockBar: DockBar;
}

interface InitialState {
  menuBar: {
    isMenuOpen: boolean;
  };
  searchBar: {
    query: string;
    isMenuOpen: boolean;
  };
  dockBar: {
    active: string;
  };
}

let store: Store | undefined;
const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

const initialState: InitialState = {
  menuBar: {
    isMenuOpen: false,
  },
  searchBar: {
    isMenuOpen: false,
    query: "command + f",
  },
  dockBar: {
    active: "Finder",
  },
};

const menuBarModel: MenuBar = {
  ...initialState.menuBar,
  closeMenu: action((state) => {
    if (state.isMenuOpen) {
      state.isMenuOpen = false;
    }
  }),
  openMenu: action((state) => {
    if (!state.isMenuOpen) {
      state.isMenuOpen = true;
    }
  }),
};

const searchBarModel: SearchBar = {
  ...initialState.searchBar,
  closeMenu: action((state) => {
    if (state.isMenuOpen) {
      state.isMenuOpen = false;
    }
  }),
  openMenu: action((state) => {
    if (!state.isMenuOpen) {
      state.isMenuOpen = true;
    }
  }),
};

const dockBarModel: DockBar = {
  ...initialState.dockBar,
  closeMenu: action((state) => {
    if (state.active) {
      state.active = "Finder";
    }
  }),
  openMenu: action((state) => {
    if (state.active) {
    }
  }),
};

const storeModel: StoreModel = {
  menuBar: menuBarModel,
  searchBar: searchBarModel,
  dockBar: dockBarModel,
};

function initStore(preloadedState = initialState) {
  return createStore<StoreModel, InitialState>(
    persist(storeModel, { allow: [] }),
    {
      initialState: preloadedState,
    }
  );
}

export const initializeStore = (preloadedState: InitialState) => {
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }

  if (typeof window === "undefined") return _store;
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: InitialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
