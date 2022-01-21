// Packages
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "./shared/contexts/UserContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// Pages, Comp
import Landing from "./pages/landing/Landing";
import Header from "./components/Header";
import PlaceOrder from "./pages/client/PlaceOrder/PlaceOrder";
import Admin from "./pages/admin/Admin";
import TechStack from "./pages/tech/TechStack";
import Contact from "./pages/contact/Contact";
import Menu from "./pages/menu/Menu";
import ErrorPage from "./pages/error/ErrorPage";
import ChangeCredential from "./pages/client/ChangeCredential";
import ViewForm from "./pages/client/PlaceOrder/ViewForm";

function App() {
  const [showUser, setShowUser] = useState(0);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setShowUser(1);
      }
      if (user.email === "mckeenasma@admin.com") {
        setShowUser(2);
      }
      console.log(user);
    });
  }, []);

  return (
    <UserContext.Provider value={{ showUser, setShowUser }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/menu" element={<Menu />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/tech" element={<TechStack />} />

          <Route
            exact
            path="/changecredentials"
            element={showUser === 1 ? <ChangeCredential /> : <ErrorPage />}
          />
          <Route
            exact
            path="/placeorder"
            element={showUser === 1 ? <PlaceOrder /> : <ViewForm />}
          />
          <Route
            exact
            path="/admin"
            element={showUser === 1 ? <Admin /> : <ErrorPage />}
          />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
