import Chart from "../chart/Chart";
import { Area, Legend, Line, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";

const CPU = ({ data, time, formatTime, numCPU, ...props }) => {

  const [maxTemp, setMaxTemp] = useState(37);
  const [cpu, setCpu] = useState([
    { name: '', temp: 30, cpuUsage: 1.61 }, { name: '', temp: 32, cpuUsage: 2.36 }, { name: '', temp: 35, cpuUsage: 0.12 }, { name: '', temp: 37, cpuUsage: 0.65 }, { name: '', temp: 30, cpuUsage: 8.52 }, 
    { name: '', temp: 31, cpuUsage: 2.85 }, { name: '', temp: 34, cpuUsage: 3.12 }, { name: '', temp: 37, cpuUsage: 8.32 }, { name: '', temp: 36, cpuUsage: 3.21 }, { name: '', temp: 31, cpuUsage: 0.16 }, 
    { name: '', temp: 30, cpuUsage: 3.44 }, { name: '', temp: 35, cpuUsage: 1.56 }, { name: '', temp: 35, cpuUsage: 6.23 }, { name: '', temp: 32, cpuUsage: 6.21 }, { name: '', temp: 37, cpuUsage: 0.96 }, 
    { name: '', temp: 35, cpuUsage: 2.54 }, { name: '', temp: 33, cpuUsage: 8.32 }, { name: '', temp: 37, cpuUsage: 8.32 }, { name: '', temp: 37, cpuUsage: 9.12 }, { name: '', temp: 32, cpuUsage: 8.52 }, 
  ]);

  useEffect(() => {
    if(data) {
      const date = new Date();
      const time = date.getSeconds() % 5 === 0 ? `${formatTime(date.getHours())}:${formatTime(date.getMinutes())}:${formatTime(date.getSeconds())}` : '';
      const { tempMax, tempAverage, percentCPU } = data;
      setCpu(cpu => [...cpu.slice(1), {
        name: time,
        temp: tempAverage,
        cpuUsage: percentCPU,
      }]);
      if(tempMax > maxTemp) {
        setMaxTemp(tempMax);
      }
    }
  }, [data, maxTemp, formatTime]);

  return (
    <div className='chart'>
      <div className='chart-header' id='cpu-chart'>
        <div className='chart-title'>
          CPU
        </div>
        <div className='chart-general-details'>
          <div className='chart-general-detail'>
            <div className='detail-value'>
              {numCPU}
            </div>
            <div className='detail-info'>
              Number of cores
            </div>
          </div>
          <div className='chart-general-detail'>
            <div className='detail-value'>
              {maxTemp}
              <span style={{ margin: '-8px 0 0 0'}}>&deg;</span>C
            </div>
            <div className='detail-info'>
              Highest CPU Temperature 
            </div>
          </div>
        </div>
      </div>
      <Chart data={cpu} width={props.width * 65 / 100 - 60} height={props.height * 60 / 100 - 200}>
        <XAxis dataKey="name" label={{ value: 'Time', style: { fontSize: '15' }, position: 'insideBottomRight', offset: 0, dy: 10 }} />
        <YAxis label={{ value: 'CPU usage (%)', angle: -90, position: 'insideLeft', dx: 5, style: {textAnchor: 'middle'} }}/>
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="cpuUsage"
          fill="#8884d8"
          stroke="#8884d8"
          activeDot={{ r: 5 }}
          isAnimationActive={false}
        />
        <Line type="monotone" dataKey="temp" stroke="orange" fontSize='10' isAnimationActive={false}/>
      </Chart>
    </div>
  );
}

export default CPU;