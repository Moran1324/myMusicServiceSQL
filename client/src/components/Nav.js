import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <div style={{ backgroundColor: 'lightblue', color: 'red' }}>
      <span>MyMusicService </span>
      <NavLink exact to="/" activeStyle={{ backgroundColor: 'grey' }}>Home </NavLink>
      <NavLink to="/artist" activeStyle={{ backgroundColor: 'grey' }}>Artists </NavLink>
      <NavLink to="/album" activeStyle={{ backgroundColor: 'grey' }}>Albums </NavLink>
      <NavLink to="/song" activeStyle={{ backgroundColor: 'grey' }}>Songs </NavLink>
      <NavLink to="/playlist" activeStyle={{ backgroundColor: 'grey' }}>Playlists </NavLink>
      {/* add search input and component */}
    </div>
  );
}

export default Nav;
