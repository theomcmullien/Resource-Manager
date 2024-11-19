import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { useStatistics } from './useStatistics';
import { Chart } from './Chart';

const DATA_POINTS = 10;

export default function App() {
    const staticData = useStaticData();
    const statistics = useStatistics(DATA_POINTS);
    const [activeView, setActiveView] = useState<View>('CPU');

    const cpuUsages = useMemo(() => statistics.map((stat) => stat.cpuUsage), [statistics]);
    const ramUsages = useMemo(() => statistics.map((stat) => stat.ramUsage), [statistics]);
    const storageUsages = useMemo(() => statistics.map((stat) => stat.storageUsage), [statistics]);

    const activeUsages = useMemo(() => {
        switch (activeView) {
            case 'CPU':
                return cpuUsages;
            case 'RAM':
                return ramUsages;
            case 'STORAGE':
                return storageUsages;
        }
    }, [activeView, cpuUsages, ramUsages, storageUsages]);

    useEffect(() => {
        return window.electron.subscribeChangeView((view) => setActiveView(view));
    }, []);

    return (
        <>
            <div className='main'>
                <div>
                    <SelectOption onClick={() => setActiveView('CPU')} view='CPU' title='CPU' subTitle={staticData?.cpuModel ?? ''} data={cpuUsages} />
                    <SelectOption onClick={() => setActiveView('RAM')} view='RAM' title='RAM' subTitle={(staticData?.totalMemoryGB.toString() ?? '') + ' GB'} data={ramUsages} />
                    <SelectOption onClick={() => setActiveView('STORAGE')} view='STORAGE' title='STORAGE' subTitle={(staticData?.totalStorage.toString() ?? '') + ' GB'} data={storageUsages} />
                </div>
                <div className='mainGrid'>
                    <Chart data={activeUsages} maxDataPoints={DATA_POINTS} selectedView={activeView} />
                </div>
            </div>
        </>
    );
}

function SelectOption(props: { title: string; subTitle: string; data: number[]; onClick: () => void; view: View }) {
    return (
        <button className='selectOption' onClick={props.onClick}>
            <div className='selectOptionTitle'>
                <div>{props.title}</div>
                <div>{props.subTitle}</div>
            </div>
            <div className='selectOptionChart'>
                <Chart data={props.data} maxDataPoints={DATA_POINTS} selectedView={props.view} />
            </div>
        </button>
    );
}

function useStaticData() {
    const [staticData, setStaticData] = useState<StaticData | null>(null);

    useEffect(() => {
        (async () => setStaticData(await window.electron.getStaticData()))();
    }, []);

    return staticData;
}
