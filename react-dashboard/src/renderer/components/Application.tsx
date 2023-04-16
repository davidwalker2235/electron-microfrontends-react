import React, { useState } from 'react';
import './Application.scss';
// @ts-ignore
const Micro = React.lazy(() => import('microfr/Application'))

const Application: React.FC = () => {
  const [darkTheme, setDarkTheme] = useState(true);

  return (
    <div id='erwt'>
      <div className='header'>
        <div className='main-heading'>
          <h1 className='themed'>Omron - Robot Dashboard PoC</h1>
        </div>
      </div>
      <React.Suspense>
        <Micro className={{}}/>
      </React.Suspense>
    </div>
  );
};

export default Application;
