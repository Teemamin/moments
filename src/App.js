import styles from "./App.module.css";
import NavBar from './components/NavBar';
import Container from "react-bootstrap/Container";
import "./api/axiosDefaults";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import SignUpForm from "./pages/auth/SignUpForm";

function App() {
  return (
    <div className={styles.App}>
      <NavBar/>
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={()=><h2>Home page </h2>}/>
          <Route exact path="/signin" render={()=><h2>Sigin</h2>}/>
          <Route exact path="/signup" render={()=><SignUpForm/>}/>
          <Route render={() => <p>Page not found!</p>} />

        </Switch>
      </Container>
    </div>
  );
}

export default App;
