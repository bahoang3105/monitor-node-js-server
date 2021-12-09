import { useEffect, useState } from "react";
import axios from 'axios';
import CPU from "./components/CPU";
import RAM from "./components/RAM";
import './app.css';
import { API_URL } from "./URL";
import DisksIO from "./components/DisksIO";
import Network from "./components/Network";

const App = () => {

  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
  const [totalMem, setTotalMem] = useState(0);
  const [numCPU, setNumCPU] = useState(0);
  const [usedMem, setUsedMem] = useState(0);

  const [cpu, setCpu] = useState([
    { name: '', temp: 30, cpuUsage: 1.61 }, { name: '', temp: 32, cpuUsage: 2.36 }, { name: '', temp: 35, cpuUsage: 0.12 }, { name: '', temp: 37, cpuUsage: 0.65 }, { name: '', temp: 30, cpuUsage: 8.52 }, 
    { name: '', temp: 31, cpuUsage: 2.85 }, { name: '', temp: 34, cpuUsage: 3.12 }, { name: '', temp: 37, cpuUsage: 8.32 }, { name: '', temp: 36, cpuUsage: 3.21 }, { name: '', temp: 31, cpuUsage: 0.16 }, 
    { name: '', temp: 30, cpuUsage: 3.44 }, { name: '', temp: 35, cpuUsage: 1.56 }, { name: '', temp: 35, cpuUsage: 6.23 }, { name: '', temp: 32, cpuUsage: 6.21 }, { name: '', temp: 37, cpuUsage: 0.96 }, 
    { name: '', temp: 35, cpuUsage: 2.54 }, { name: '', temp: 33, cpuUsage: 8.32 }, { name: '', temp: 37, cpuUsage: 8.32 }, { name: '', temp: 37, cpuUsage: 9.12 }, { name: '', temp: 32, cpuUsage: 8.52 }, 
  ]);

  const [maxTemp, setMaxTemp] = useState(37);
  const [ram, setRam] = useState([
    { name: '', ramUsage: 20.21 }, { name: '', ramUsage: 25.36 }, { name: '', ramUsage: 26.52 }, { name: '', ramUsage: 26.10 }, { name: '', ramUsage: 26.14 }, 
    { name: '', ramUsage: 25.21 }, { name: '', ramUsage: 28.90 }, { name: '', ramUsage: 28.12 }, { name: '', ramUsage: 36.44 }, { name: '', ramUsage: 26.10 }, 
    { name: '', ramUsage: 26.22 }, { name: '', ramUsage: 20.40 }, { name: '', ramUsage: 16.44 }, { name: '', ramUsage: 16.88 }, { name: '', ramUsage: 26.77 }
  ]);

  const [network, setNetwork] = useState([]);

  const formatTime = (i) => {
    if(i < 10) {
      return "0" + i;
    }
    return i;
  }

  const reportWindowSide = () => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }

  const handleReceiveNetwork = (netstat) => {
    if(network.length === 0) {
      let init;
      for(let i = 0; i < netstat.length; i++) {
        init[i].name = netstat[i].iface;
        init[i].data = [{
          'Rx/s': Math.round(netstat[i].rx_sec * 8 / 1024 * 10) / 10,
          'Tx/s': Math.round(netstat[i].tx_sec * 8 / 1024 * 10) / 10,
        }];
      }
      setNetwork(init);
    } else {
      console.log(network);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', reportWindowSide);
  }, []);

  const getData = async (time) => {
    const { data } = await axios.get(API_URL);
    const { usedMem, percentMem, tempMax, tempAverage, percentCPU, network } = data;
    setCpu(cpu => [...cpu.slice(1), {
      name: time.getSeconds() % 5 === 0 ? `${formatTime(time.getHours())}:${formatTime(time.getMinutes())}:${formatTime(time.getSeconds())}` : '',
      temp: tempAverage,
      cpuUsage: percentCPU,
    }]);
    setUsedMem(usedMem);
    setRam(ram => [...ram.slice(1), {
      name: time.getSeconds() % 5 === 0 ? `${formatTime(time.getHours())}:${formatTime(time.getMinutes())}:${formatTime(time.getSeconds())}` : '',
      ramUsage: percentMem,
    }]);
    if(tempMax > maxTemp) {
      setMaxTemp(tempMax);
    }
    handleReceiveNetwork(network);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date();
      getData(time);
    }, 1000);
    return () => {
      clearInterval(interval)
    };
  });

  useEffect(() => {
    axios.get(API_URL + 'staticInfo').then((staticData) => {
      setNumCPU(staticData.data.numCPU);
      setTotalMem(staticData.data.totalMem);
    });
  }, []);

  return (
    <div className="App">
      <div className='main-content'>
        <div className='main-content-row'>
          <CPU
              data={cpu} 
              height={height} 
              width={width} 
              numCPU={numCPU} 
              maxTemp={maxTemp} 
            />
            <RAM
              data={ram} 
              height={height} 
              width={width}
              totalMem={totalMem}
              usedMem={usedMem}
            />
        </div>
        <div className='main-content-row'>
          <DisksIO
            data={cpu} 
            height={height} 
            width={width} 
            numCPU={numCPU} 
            maxTemp={maxTemp} 
          />
          <Network 
            data={network} 
            height={height} 
            width={width} 
            numCPU={numCPU} 
            maxTemp={maxTemp}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
