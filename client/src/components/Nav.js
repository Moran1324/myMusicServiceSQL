import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <div className='nav-bar' style={{ backgroundColor: 'rgb(13, 78, 0)', color: 'red', padding: '0.8em' }}>
      <span style={{ backgroundColor: 'rgb(13, 78, 0)', color: 'gray', fontSize: '1.5em' }} >MyMusicService </span>
      <NavLink exact to="/" style={{ backgroundColor: 'rgb(13, 78, 0)', color: 'red' }} activeStyle={{ backgroundColor: 'grey' }}>Home </NavLink>
      <NavLink to="/artist" style={{ backgroundColor: 'rgb(13, 78, 0)', color: 'red' }} activeStyle={{ backgroundColor: 'grey' }}>Artists </NavLink>
      <NavLink to="/album" style={{ backgroundColor: 'rgb(13, 78, 0)', color: 'red' }} activeStyle={{ backgroundColor: 'grey' }}>Albums </NavLink>
      <NavLink to="/song" style={{ backgroundColor: 'rgb(13, 78, 0)', color: 'red' }} activeStyle={{ backgroundColor: 'grey' }}>Songs </NavLink>
      <NavLink to="/playlist" style={{ backgroundColor: 'rgb(13, 78, 0)', color: 'red' }} activeStyle={{ backgroundColor: 'grey' }}>Playlists </NavLink>
      {/* add search input and component */}
    </div>
  );
}

export default Nav;
