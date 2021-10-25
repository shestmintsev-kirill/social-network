import { Route } from 'react-router';
import './App.css';
import Dialogs from './components/Dialogs/Dialogs';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Profile from './components/Profile/Profile';

const App = (props) => {
  return (
    <div className="app-wrapper">
      <Header />
      <NavBar />
      <div className="app-wrapper-content">
        <Route exact path="/dialogs">
          <Dialogs state={props.state.messagesPage} />
        </Route>
        {/* <Route path="/profile" component={Profile} /> */}
        <Route exact path="/profile">
          <Profile state={props.state.profilePage} addPost={props.addPost}/>
        </Route>
        {/* <Route exact path="/dialogs" render={ () => <Dialogs /> } /> */}
      </div>
    </div>
  );
}

export default App;
