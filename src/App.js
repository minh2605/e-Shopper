import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Layouts/Header";
import Footer from "./components/Layouts/Footer";
import SideBar from "./components/SideBar";
import Blog from "./components/Blog/Blog";
import BlogDetail from "./components/Blog/BlogDetail";
import NotFound from "./components/NotFound";
import Login from "./components/Login/";
import Home from "./components/Home";
import Rating from "./components/Blog/Rating";

function App() {
  // const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));
  // const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <div className="container">
            <div className="row">
              <SideBar />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/blog/list" exact component={Blog} />
                <Route path="/blog/detail/:id" component={BlogDetail} />
                <Route path="/login" component={Login} />
                <Route default component={NotFound} />
              </Switch>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
