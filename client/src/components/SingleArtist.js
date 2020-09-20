import React from 'react';
import { useParams } from 'react-router-dom';

function SingleArtist() {
  const id = useParams();
  console.log(id);
  return (
    <div>
      <h1>SingleArtist</h1>
    </div>
  );
}

export default SingleArtist;
