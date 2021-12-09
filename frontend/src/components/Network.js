import Chart from "../chart/Chart";
import { Area, Legend, Tooltip, XAxis, YAxis } from "recharts";

const Network = (props) => {
  return (
    <div className='chart'>
      <div className='chart-header' id='cpu-chart'>
        <div className='chart-title'>
          Network
        </div>
        <div className='chart-general-details'>
          <div></div>
          <div></div>
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
              {props.usedMem}
              &nbsp;Gb
            </div>
            <div className='detail-info'>
              Usage Memory 
            </div>
          </div>
        </div>
      </div>
      <Chart data={props.data} width={props.width * 35 / 100 - 60} height={props.height * 40 / 100 - 100 }>
        <XAxis dataKey="name" label={{ value: 'Time', style: { fontSize: '15' }, position: 'insideBottomRight', offset: 0 }} />
        <YAxis />
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

export default Network;