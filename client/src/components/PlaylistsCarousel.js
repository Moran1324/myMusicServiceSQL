import React from 'react';
import Carousel from 'react-elastic-carousel';
import { Link } from 'react-router-dom';

function AlbumsCarousel({ playlists }) {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 400, itemsToShow: 2 },
    { width: 600, itemsToShow: 3 },
    { width: 800, itemsToShow: 4 },
    { width: 1000, itemsToShow: 5 },
    { width: 1200, itemsToShow: 6 },
  ];
  return (
    <div className="top-playlists-carousel">
      <h1 style={{ marginLeft: '60px' }}>Top Playlists</h1>
      <Carousel breakPoints={breakPoints}>
        {playlists.map((playlist) => (
          <div className="carousel-playlist-card" key={playlist.id}>
            <Link to={`/playlist/${playlist.id}`}>
              <img src={`${playlist.coverImg}`} alt="Playlist" className="carousel-playlist-img" />
              <h4 className="carousel-playlist-name">{playlist.name}</h4>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default AlbumsCarousel;
