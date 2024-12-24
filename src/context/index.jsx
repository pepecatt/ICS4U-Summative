import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Map } from 'immutable';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // user stuff
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [genreList, setGenreList] = useState(Map());
  const [currentGenre, setCurrentGenre] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
        const sessionCart = localStorage.getItem(user.uid);
        if (sessionCart) {
          setCart(Map(JSON.parse(sessionCart)));
        }
      }
      setLoading(false);
    });
  }, [])

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <StoreContext.Provider value={{
      email, setEmail,
      password, setPassword,
      user, setUser,
      firstName, setFirstName,
      lastName, setLastName,
      genreList, setGenreList,
      currentGenre, setCurrentGenre,
      loggedIn, setLoggedIn,
      cart, setCart,
      cartOpen, setCartOpen,
      settingsOpen, setSettingsOpen,
      genres, setGenres,
      loading, setLoading
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStoreContext = () => {
  return useContext(StoreContext);
}