import React from 'react';
import context from './context/context';
import './Applicationtwo.scss';

const Applicationtwo = () => {

  const handleAction = (action?: string, value?: string | number) => {
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
    <div id='mftwo'>
      <div className='mf-two-header'>
        <div className='mf-two-main-heading'>
          <h1 className='themed'>Microfrontend two</h1>
        </div>
        <div className='mf-two-main-teaser'>
          <div>
            <button onClick={() => handleAction('open_path', '/Users')}>open path</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applicationtwo;
