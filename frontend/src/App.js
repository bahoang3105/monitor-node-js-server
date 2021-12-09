import { useEffect, useState } from "react";
import axios from 'axios';
import CPU from "./components/CPU";
import RAM from "./components/RAM";
import './app.css';
import { API_URL } from "./URL";
import DisksIO from "./components/DisksIO";
import Network from "./components/Network";

const App = () => {

  const [data, setData] = useState();
  const [totalMem, setTotalMem] = useState(0);
  const [numCPU, setNumCPU] = useState(0);
  const height = window.innerHeight;
  const width = window.innerWidth;

  const formatTime = (i) => {
    if(i < 10) {
      return "0" + i;
    }
    return i;
  }

  const getData = async () => {
    const { data } = await axios.get(API_URL);
    setData(data);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getData();
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
            data={data} 
            height={height} 
            width={width} 
            formatTime={formatTime}
            numCPU={numCPU}
          />
          <RAM
            data={data} 
            height={height} 
            width={width}
            formatTime={formatTime}
            totalMem={totalMem}
          />
        </div>
        <div className='main-content-row'>
          <DisksIO
            data={data} 
            height={height} 
            width={width}
          />
          <Network 
            data={data} 
            height={height} 
            width={width}
            formatTime={formatTime}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
