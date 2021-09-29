import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Layouts/Header";
import Footer from "./components/Layouts/Footer";
import SideBar from "./components/SideBar";
import Blog from "./components/Blog/Blog";
import BlogDetail from "./components/Blog/BlogDetail";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <div className="container">
            <div className="row">
              <SideBar />
              <Switch>
                <Route path="/blog/list" exact component={Blog} />
                <Route path="/blog/detail/:id" component={BlogDetail} />
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
