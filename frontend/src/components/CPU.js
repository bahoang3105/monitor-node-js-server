import Chart from "../chart/Chart";
import { Area, Legend, Line, Tooltip, XAxis, YAxis } from "recharts";

const CPU = (props) => {
  return (
    <div className='chart'>
      <div className='chart-header' id='cpu-chart'>
        <div className='chart-title'>
          CPU
        </div>
        <div className='chart-general-details'>
          <div></div>
          <div></div>
          <div className='chart-general-detail'>
            <div className='detail-value'>
              {props.numCPU}
            </div>
            <div className='detail-info'>
              Number of cores
            </div>
          </div>
          <div className='chart-general-detail'>
            <div className='detail-value'>
              {props.maxTemp}
              <span style={{ margin: '-8px 0 0 0'}}>&deg;</span>C
            </div>
            <div className='detail-info'>
              Highest CPU Temperature 
            </div>
          </div>
        </div>
      </div>
      <Chart data={props.data} width={props.width * 65 / 100 - 60} height={props.height * 60 / 100 - 200}>
        <XAxis dataKey="name" label={{ value: 'Time', style: { fontSize: '15' }, position: 'insideBottomRight', offset: 0 }} />
        <YAxis label={{ value: 'CPU usage (%)', angle: -90, position: 'insideLeft', style: {textAnchor: 'middle'} }}/>
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