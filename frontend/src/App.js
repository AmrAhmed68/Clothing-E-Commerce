import "./App.css";
import ProductList from "./components/ProductList/ProductList";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Categories from "./components/Categories/Categories";
import Details from "./components/DetailsPage/Details";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUP from "./components/SignUP/SignUP";
import Profile from "./components/User/Profile";
import Cart from "./components/Cart/Cart";
import Favourite from "./components/Favourite/Favourite";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUP />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/category/:id" element={<Categories />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;