import React, { useEffect } from 'react';
import './Application.scss';

const Application: React.FC = () => {
  
  return (
    <div id='mfOne'>
      <div className='header'>
        <div className='main-heading'>
          <h1 className='themed'>Microfrontend one</h1>
        </div>
        <div className='main-teaser'>
          <div>
            Robust boilerplate for Desktop Applications with Electron and
            ReactJS. Hot Reloading is used in this project for fast development
            experience.
            <br />
            If you think the project is useful enough, just spread the word
            around!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;
