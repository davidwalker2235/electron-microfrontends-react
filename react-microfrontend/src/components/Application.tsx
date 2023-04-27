import React from 'react';
import './Application.scss';
import context from './context/context';

const Application: React.FC = () => {
  function handleAction(action?: string, value?: string | number) {
    const c: Record<string, CallableFunction> = context;
    if (action) {
      if (typeof c[action] === 'function') {
        c[action](value);
      } else {
        console.log(`action [${action}] is not available in titlebar context`);
      }
    }
  }
  
  return (
    <div id='mfOne'>
      <div className='header'>
        <div className='main-heading'>
          <h1 className='themed'>Microfrontend one</h1>
        </div>
        <div className='main-teaser'>
          <div>
            Holiwi
            <br />
            If you think the project is useful enough, just spread the word
            around!
          </div>
          <button onClick={() => handleAction('open_path', '/Users')}>open path</button>
        </div>
      </div>
    </div>
  );
};

export default Application;
