import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import './App.css';
import Albums from './components/Albums';
import Artists from './components/Artists';
import Home from './components/Home';
import Nav from './components/Nav';
import Playlists from './components/Playlists';
import SingleAlbum from './components/SingleAlbum';
import SingleArtist from './components/SingleArtist';
import SinglePlaylist from './components/SinglePlaylist';
import SingleSong from './components/SingleSong';
import Songs from './components/Songs';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/song">
            <Songs />
          </Route>
          <Route exact path="/song/:id">
            <SingleSong />
          </Route>
          <Route exact path="/artist">
            <Artists />
          </Route>
          <Route exact path="/artist/:id">
            <SingleArtist />
          </Route>
          <Route exact path="/album">
            <Albums />
          </Route>
          <Route exact path="/album/:id">
            <SingleAlbum />
          </Route>
          <Route exact path="/playlist">
            <Playlists />
          </Route>
          <Route exact path="/playlist/:id">
            <SinglePlaylist />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
