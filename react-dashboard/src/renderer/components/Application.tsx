import React, {useEffect, useState} from 'react';
import { Rnd } from "react-rnd";
import './Application.scss';
// @ts-ignore
const Micro = React.lazy(() => import('microfr/Application'))
const Microtwo = React.lazy(() => import('microfrtwo/Applicationtwo'))

const Application: React.FC = () => {
  const [darkTheme, setDarkTheme] = useState(true);
    const style = {
        display: "flex",
        justifyContent: "center",
        border: "solid 1px black",
        background: "#f0f0f0",
        alignItems: "stretch",
    };

    useEffect(() => {
        if (darkTheme) {
            localStorage.setItem('dark-mode', '1');
            document.body.classList.add('dark-mode');
        } else {
            localStorage.setItem('dark-mode', '0');
            document.body.classList.remove('dark-mode');
        }
    }, [darkTheme]);

  return (
    <div id='erwt'>
      <div className='header'>
        <div className='main-heading'>
          <h1 className='themed'>Omron - Robot Dashboard PoC</h1>
        </div>
      </div>
      <div style={{height: 'inherit'}}>
        <Rnd
          bounds="parent"
          style={style}
          default={{
              x: 0,
              y: 0,
              width: 500,
              height: 500
          }}
        >
          <div style={{overflow: 'auto', 'alignItems': 'stretch', display: 'flex'}}>
            <React.Suspense>
                <Micro className={{}}/>
            </React.Suspense>
          </div>
        </Rnd>
        <Rnd
          bounds="parent"
          style={style}
          default={{
              x: 600,
              y: 0,
              width: 500,
              height: 500
          }}
        >
          <div style={{overflow: 'auto', 'alignItems': 'stretch', display: 'flex'}}>
            <React.Suspense>
                <Microtwo className={{}}/>
            </React.Suspense>
          </div>
        </Rnd>
      </div>
    </div>
  );
};

export default Application;
