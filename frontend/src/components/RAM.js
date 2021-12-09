import Chart from "../chart/Chart";
import { Area, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";

const RAM = ({ data, formatTime, ...props }) => {

  const [usedMem, setUsedMem] = useState(0);
  const [ram, setRam] = useState([
    { name: '', ramUsage: 20.21 }, { name: '', ramUsage: 25.36 }, { name: '', ramUsage: 26.52 }, { name: '', ramUsage: 26.10 }, { name: '', ramUsage: 26.14 }, 
    { name: '', ramUsage: 25.21 }, { name: '', ramUsage: 28.90 }, { name: '', ramUsage: 28.12 }, { name: '', ramUsage: 36.44 }, { name: '', ramUsage: 26.10 }, 
    { name: '', ramUsage: 26.22 }, { name: '', ramUsage: 20.40 }, { name: '', ramUsage: 16.44 }, { name: '', ramUsage: 16.88 }, { name: '', ramUsage: 26.77 }
  ]);

  useEffect(() => {
    if(data) {
      const date = new Date();
      const time = date.getSeconds() % 5 === 0 ? `${formatTime(date.getHours())}:${formatTime(date.getMinutes())}:${formatTime(date.getSeconds())}` : '';
      const { usedMem, percentMem } = data;
      setUsedMem(usedMem);
      setRam(ram => [...ram.slice(1), {
        name: time,
        ramUsage: percentMem,
      }]);
    }
  }, [data, formatTime]);

  return (
    <div className='chart'>
      <div className='chart-header'>
        <div className='chart-title'>
          RAM
        </div>
        <div className='chart-general-details'>
          <div className='chart-general-detail'>
            <div className='detail-value'>
              {props.totalMem}
              &nbsp;Gb
            </div>
            <div className='detail-info'>
              Total Memory
            </div>
          </div>
          <div className='chart-general-detail'>
            <div className='detail-value'>
              {usedMem}
              &nbsp;Gb
            </div>
            <div className='detail-info'>
              Usage Memory 
            </div>
          </div>
        </div>
      </div>
      <Chart data={ram} width={props.width * 35 / 100 - 60} height={props.height * 60 / 100 - 200}>
        <XAxis dataKey="name" label={{ value: 'Time', style: { fontSize: '15' }, position: 'insideBottomRight', dy: 10, offset: 0 }} />
        <YAxis type='number' domain={[0, 100]} label={{ value: 'RAM usage (%)', angle: -90, position: 'insideLeft', dx: 5, style: {textAnchor: 'middle'} }} />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="ramUsage"
          fill="#5ed087"
          stroke="#5ed087"
          activeDot={{ r: 5 }}
          isAnimationActive={false}
        />
      </Chart>
    </div>
  );
}

export default RAM;