import React, {useState, useEffect} from 'react';
import './Application.scss';
import context from './context/context';
import LineChart from "@src/components/lineChart";

const Application = () => {
  const [chartData, setChartData] = useState<number[]>([]);

  const addValue = (numero: number) => {
    const newValues: number[] = [...chartData];
    if (numero && newValues.length < 30) {
      newValues.push(numero);
    } else if (numero) {
      newValues.shift();
      newValues.push(numero);
    }

    setChartData(newValues);
  }

  useEffect(() => {
    const fetch = async (key: string) => {
      const value = await handleCpuData(key)
      addValue(value?.percentCPUUsage || 0);
    }
    setTimeout(() => {
      fetch('cpu_data')
    }, 500)
  }, [chartData])

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

  const handleCpuData = async (action?: string) => {
    const c: Record<string, CallableFunction> = context;
    if (action) {
      if (typeof c[action] === 'function') {
        return await c[action]();
      } else {
        console.log(`action [${action}] is not available in titlebar context`);
      }
    }
  }

  // @ts-ignore
  return (
    <div id='mfOne'>
      <div className='mf-one-header'>
        <div className='mf-one-main-heading'>
          <h1>Microfrontend one</h1>
        </div>
        <div className='mf-one-main-teaser'>
          <LineChart numbers={chartData}/>
        </div>
      </div>
    </div>
  );
};

export default Application;
