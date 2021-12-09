import Chart from "../chart/Chart";
import { Area, Legend, Tooltip, XAxis, YAxis } from "recharts";

const DisksIO = (props) => {
  const disksIO = props.data?.disksIO;
  const { tIO, rIO, wIO } = disksIO ? disksIO : [0, 0, 0];
  const percentRead = Math.round(rIO / tIO * 1000) / 10 || 0;
  const percentWrite = 100 - percentRead;

  return (
    <div className='chart'>
      <div className='chart-header' id='cpu-chart'>
        <div className='chart-title'>
          DisksIO
        </div>
        {/* <div className='chart-general-details'>
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
        </div> */}
      </div>
      <div className='disks-io-charts'>
        <div>
          <div className="chart-child-title">
            On All Mounted Drives
          </div>
          <div className="all-drives-chart">
            <div className="all-drives-cahrt-title">
              Read IOs
            </div>
            <div className="bar-percent-chart">
              <div style={{ backgroundColor: '#3fd142', color: '#444444', width: `${percentRead}%`}}>{percentRead.toString()}%</div>
            </div>
          </div>
          <div className="all-drives-chart">
            <div className="all-drives-cahrt-title">
              Write IOs
            </div>
            <div className="bar-percent-chart">
              <div style={{ backgroundColor: '#ff9734', color: '#444444', width: `${percentWrite}%`}}>{percentWrite.toString()}%</div>
            </div>
          </div>
          <div className="text-center">
            <div className="stat-all-drives" style={{ color: '#5257a3' }}>{tIO}</div>
            <div style={{ color: '#75737e' }}>Total IOs</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: '50% 50%'}}>
            <div className="text-center">
              <div className="stat-all-drives" style={{ color: '#3fd142'}}>{rIO}</div>
              <div style={{ color: '#75737e' }}>Read IOs</div>
            </div>
            <div className="text-center">
              <div className="stat-all-drives" style={{ color: '#ff9734' }}>{wIO}</div>
              <div style={{ color: '#75737e' }}>Write IOs</div>
            </div>
          </div>
        </div>
        <Chart data={props.data} width={props.width * 20 / 100 - 30} height={props.height * 40 / 100 - 100 }>
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
        <div>ds</div>
      </div>
    </div>
  );
}

export default DisksIO;