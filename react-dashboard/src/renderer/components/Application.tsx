import React, { useEffect, useState } from 'react';
import './Application.scss';
// @ts-ignore
const Micro = React.lazy(() => import('microfr/Application'))
const Test = React.lazy(() => import('./Test'))

const Application: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const [darkTheme, setDarkTheme] = useState(true);
  const [versions, setVersions] = useState<Record<string, string>>({});

  /**
   * On component mount
   */
  useEffect(() => {
    const useDarkTheme = parseInt(localStorage.getItem('dark-mode'));
    if (isNaN(useDarkTheme)) {
      setDarkTheme(true);
    } else if (useDarkTheme == 1) {
      setDarkTheme(true);
    } else if (useDarkTheme == 0) {
      setDarkTheme(false);
    }

    // Apply verisons
    const app = document.getElementById('app');
    const versions = JSON.parse(app.getAttribute('data-versions'));
    setVersions(versions);
  }, []);

  /**
   * On Dark theme change
   */
  useEffect(() => {
    if (darkTheme) {
      localStorage.setItem('dark-mode', '1');
      document.body.classList.add('dark-mode');
    } else {
      localStorage.setItem('dark-mode', '0');
      document.body.classList.remove('dark-mode');
    }
  }, [darkTheme]);

  /**
   * Toggle Theme
   */
  function toggleTheme() {
    setDarkTheme(!darkTheme);
  }

  useEffect(() => {
    (async () => {
      try{
      const test = await fetch('https://cat-fact.herokuapp.com/facts');
      console.log(JSON.stringify(Test));
    }catch(e){
      console.log('error: :', e)
    }
      })()
  }, [])
  return (
    <div id='erwt'>
      <div className='header'>
        <div className='main-heading'>
          <h1 className='themed'>ERWT - Electron Boilerplate</h1>
        </div>
      </div>
      <React.Suspense>
        <Micro />
      </React.Suspense>
    </div>
  );
};

export default Application;
