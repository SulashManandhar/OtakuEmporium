import Header from "./components/Header";
import Index from "./pages/Index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NewArrival from "./pages/NewArrival";
import Accessories from "./pages/Accessories";
import Apparels from "./pages/Apparels";
import Drinkware from "./pages/Drinkware";
import Footer from "./components/Footer";
import WishList from "./pages/WishList";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Register from "./components/Register";
import LogIn from "./components/LogIn";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Index}></Route>
          <Route path="/newArrival" component={NewArrival}></Route>
          <Route path="/apparels" component={Apparels}></Route>
          <Route path="/accessories" component={Accessories}></Route>
          <Route path="/drinkware" component={Drinkware}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/login" component={LogIn}></Route>
          <Route path="/cart" component={Cart}></Route>
          <Route path="/wishList" component={WishList}></Route>
        </Switch>
        <div className="footer-bar"></div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
