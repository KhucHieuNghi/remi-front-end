import React from 'react';
import YouTube, { Options } from 'react-youtube';

const opts:Options = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
    //   autoplay: 1,
    },
  };

export default () => (
    <YouTube
        videoId="NQrAunodwkI" // defaults -> null
        // id={string} // defaults -> null
        opts={opts}
        containerClassName="yout-container"
    />
    );
