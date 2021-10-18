import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Dialogs from './components/Dialogs/Dialogs';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Profile from './components/Profile/Profile';

const App = (props) => {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <NavBar />
        <div className="app-wrapper-content">
          <Route exact path="/dialogs">
            <Dialogs messages={props.state.messagesPage.messages} dialogs={props.state.profilePage.dialogs}/>
          </Route>
          {/* <Route path="/profile" component={Profile} /> */}
          <Route exact path="/profile">
            <Profile posts={props.state.profilePage.posts}/>
          </Route>
          {/* <Route exact path="/dialogs" render={ () => <Dialogs /> } /> */}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
