import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { BaseChart } from './BaseChart';

function App() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const unsub = window.electron.subscribeStatistics((stats) => console.log(stats));
        return unsub;
    }, []);

    return (
        <>
            <div className='chart1'>
                <BaseChart data={[{ value: 25 }, { value: 30 }, { value: 100 }]}></BaseChart>
            </div>
            <div>
                <a href='https://react.dev' target='_blank'>
                    <img src={reactLogo} className='logo react' alt='React logo' />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className='card'>
                <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
        </>
    );
}

export default App;
