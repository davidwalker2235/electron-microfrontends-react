import React, {useEffect, useState} from 'react';
import context from './context/context';
import './Applicationtwo.scss';
import PieChart from "@src/components/pieChart";

const Applicationtwo = () => {
  const [freeDiskSpace, setFreeDiskSpace] = useState({total: 0, used: 0})
  useEffect(() => {
    const fetch = async (key: string) => {
      const value: any = await handleAction(key);
      if (!!value && value?.length > 0) {
        setFreeDiskSpace({total: value[0]._blocks, used: value[0]._used})
      }
    }
    fetch('get_disk_space');
  }, [])

  const handleAction = (action?: string, value?: string | number) => {
    const c: Record<string, CallableFunction> = context;
    if (action) {
      if (typeof c[action] === 'function') {
        return c[action](value);
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
            <PieChart info={freeDiskSpace}/>
          </div>
        </div>
        <div style={{display: "flex", justifyContent: "center", paddingTop: "10px"}}>
          <button onClick={() => handleAction('open_path', '/Users')}>open path</button>
        </div>
      </div>
    </div>
  );
};

export default Applicationtwo;
