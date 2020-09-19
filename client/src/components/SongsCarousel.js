import React from 'react';
import Carousel from 'react-elastic-carousel';
import { Link } from 'react-router-dom';

function SongsCarousel({ songs }) {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 400, itemsToShow: 2 },
    { width: 600, itemsToShow: 3 },
    { width: 800, itemsToShow: 4 },
    { width: 1000, itemsToShow: 5 },
    { width: 1200, itemsToShow: 6 },
  ];

  return (
    <div className="top-songs-carousel">
      <h1 style={{ marginLeft: '60px' }}>Top Songs</h1>
      <Carousel breakPoints={breakPoints}>
        {songs.map((song) => (
          <div className="carousel-song-card" key={song.id}>
            <iframe
              title={song.id}
              src={song.youtube_link.replace('watch?v=', 'embed/').split('&list')[0]}
              width="200"
              height="200"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
              className="embeded-song-link"
            />
            <h4>
              <Link to={`/song/${song.id}`}>{song.title}</Link>
            </h4>
            <div className="carousel-song-artist">
              <Link to={`/artist/${song.artist_id}`}>{song.artist_name}</Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default SongsCarousel;