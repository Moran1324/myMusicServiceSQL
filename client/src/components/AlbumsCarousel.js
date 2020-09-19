import React from 'react';
import Carousel from 'react-elastic-carousel';
import { Link } from 'react-router-dom';

function AlbumsCarousel({ albums }) {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 400, itemsToShow: 2 },
    { width: 600, itemsToShow: 3 },
    { width: 800, itemsToShow: 4 },
    { width: 1000, itemsToShow: 5 },
    { width: 1200, itemsToShow: 6 },
  ];
  return (
    <div className="top-albums-carousel">
      <h1 style={{ marginLeft: '60px' }}>Top Albums</h1>
      <Carousel breakPoints={breakPoints}>
        {albums.map((album) => (
          <div className="carousel-album-card" key={album.id}>
            <Link to={`/album/${album.id}`}>
              <img src={`${album.cover_img}`} alt="Album" className="carousel-album-img" />
              <h4 className="carousel-album-name">{album.album_name}</h4>
            </Link>
            <div className="carousel-album-artist">
              <Link to={`/artist/${album.artist_id}`}>{album.artist_name}</Link>
              {' - '}
              <span className="carousel-album-launch-year">{(new Date(album.launch_date).getFullYear())}</span>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default AlbumsCarousel;
