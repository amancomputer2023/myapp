import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Products from "./components/pages/Products";
import LoginPage from "./components/pages/LoginPage";
import LogoutPage from "./components/pages/LogoutPage";
import Register from "./components/pages/Register";
import Profile from "./components/pages/Profile";
import Footer from "./components/Footer";
import PageNotFound from "./components/PageNotFound";
import "./App.css";
import ProductDetail from "./components/pages/Product/ProductDetail";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  return (
    <Router>
      <MainApp user={user} setUser={setUser} />
    </Router>
  );
}

function MainApp({ user, setUser }) {
  const location = useLocation();

  useEffect(() => {}, [user]);

  return (
    <div className="App">
      <Header user={user} />
      <main>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products/*" element={<Products />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/logout" element={<LogoutPage setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/user/*"
            element={
              <ProtectedRoute user={user}>
                <Profile user={user} />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function ProtectedRoute({ user, children }) {
  const location = useLocation();

  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default App;
