import React from 'react';
import Carousel from 'react-elastic-carousel';
import { Link } from 'react-router-dom';

function ArtistsCarousel({ artists }) {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 400, itemsToShow: 2 },
    { width: 600, itemsToShow: 3 },
    { width: 800, itemsToShow: 4 },
    { width: 1000, itemsToShow: 5 },
    { width: 1200, itemsToShow: 6 },
  ];
  return (
    <div className="top-artists-carousel">
      <h1 style={{ marginLeft: '60px' }}>Top Artists</h1>
      <Carousel breakPoints={breakPoints}>
        {artists.map((artist) => (
          <div className="carousel-artist-card" key={artist.id}>
            <Link to={`/artist/${artist.id}`}>
              <img src={`${artist.coverImg}`} alt="Artist" className="carousel-artist-img" />
              <h4 className="carousel-artist-name">{artist.artistName}</h4>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ArtistsCarousel;
