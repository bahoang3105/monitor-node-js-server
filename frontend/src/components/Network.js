import Chart from '../chart/Chart';
import { Legend, Line, Tooltip, XAxis, YAxis } from 'recharts';
import { AiFillCaretRight, AiFillCaretLeft } from 'react-icons/ai';
import { useEffect, useState } from 'react';

const Network = ({ data, formatTime, ...props }) => {

  const [selectedIFace, setSetlectedIFace] = useState(0);
  const [netstat, setNetstat] = useState([]);
  const [iFaces, setIFaces] = useState([]);

  const handleUnit = (mem) => {
    let unit = 0;
    while(mem > 103) {
      mem = mem / 1024;
      unit += 1;
    }
    if(unit === 0) unit = 'B';
    else if(unit === 1) unit = 'KB';
    else if(unit === 2) unit = 'MB';
    else if(unit === 3) unit = 'GB';
    return [Math.round(mem * 100) / 100, unit];
  }
  
  useEffect(() => {
    if(data) {
      const date = new Date();
      const time = date.getSeconds() % 5 === 0 ? `${formatTime(date.getHours())}:${formatTime(date.getMinutes())}:${formatTime(date.getSeconds())}` : '';
      const { network } = data;
      if(netstat.length === 0) {
        setIFaces(network.map(net => net.iface))
      }
      if(netstat.length === 0 || netstat.length < iFaces.length * 15) {
        setNetstat(netstat => [
          ...netstat,
          ...network.map(net => ({ ...net, name: time })),
        ]);
      } else {
        setNetstat(netstat => [
          ...netstat.slice(iFaces.length),
          ...network.map(net => ({ ...net, name: time })),
        ]);
      }
    }
  }, [data, formatTime, netstat.length, iFaces.length]);
 
  return (
    <div className='chart'>
      <div 
        className={`select-network${selectedIFace === 0 ? ' not-allowed-cursor' : ''}`} 
        id='turn-left-network'
        onClick={() => {if(selectedIFace > 0) setSetlectedIFace(selectedIFace - 1)}}
      >
        <AiFillCaretLeft style={{ marginTop: props.height * 0.2 }} />
      </div>
      <div 
        className={`select-network${selectedIFace === iFaces.length - 1 ? ' not-allowed-cursor' : ''}`} 
        id='turn-right-network'
        onClick={() => { if(selectedIFace < iFaces.length - 1) setSetlectedIFace(selectedIFace + 1)}}
      >
        <AiFillCaretRight style={{ marginTop: props.height * 0.2 }} />
      </div>
      <div className='chart-header' id='cpu-chart'>
        <div className='chart-title'>
          Network{iFaces[selectedIFace] ? <span>: <span style={{ color: 'red' }}>{iFaces[selectedIFace]}</span></span> : ''}
        </div>
        <div className='chart-general-details'>
          <div className='chart-general-detail'>
            <div className='detail-value'>
              {handleUnit(data?.network[selectedIFace].rx_bytes)[0]}
              &nbsp;{handleUnit(data?.network[selectedIFace].rx_bytes)[1]}
            </div>
            <div className='detail-info'>
              Total Receive
            </div>
          </div>
          <div className='chart-general-detail'>
            <div className='detail-value'>
              {handleUnit(data?.network[selectedIFace].tx_bytes)[0]}
              &nbsp;{handleUnit(data?.network[selectedIFace].tx_bytes)[1]}
            </div>
            <div className='detail-info'>
              Total Send
            </div>
          </div>
        </div>
      </div>
      <Chart data={netstat.filter(net => net.iface === iFaces[selectedIFace])} width={props.width * 35 / 100 - 60} height={props.height * 40 / 100 - 100 }>
        <XAxis dataKey="name" label={{ value: 'Time', style: { fontSize: '15' }, position: 'insideBottomRight', offset: 0, dy: 10 }} />
        <YAxis label={{ value: '(KB/s)', angle: -90, position: 'insideLeft', style: {textAnchor: 'middle'}, dx: 15 }}/>
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          dataKey='rx_sec'
          stroke='#5ed087'
          activeDot={{ r: 5 }}
          isAnimationActive={false}
        />
        <Line
          type='monotone'
          dataKey='tx_sec'
          stroke='#7e35ab'
          activeDot={{ r: 5 }}
          isAnimationActive={false}
        />
      </Chart>
    </div>
  );
}

export default Network;