import React from 'react';
import ReactPlayer from 'react-player';

function EmbedYoutube({ link, title }) {

  return (
    <ReactPlayer
    url={link}
    controls
    light
    width={'200px'}
    height={'200px'}
    playing
    />
  )
}

export default EmbedYoutube;
