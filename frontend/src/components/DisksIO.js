const DisksIO = (props) => {

  const disksIO = props.data?.disksIO;

  const { tIO, rIO, wIO, tIO_sec, rIO_sec, wIO_sec, rWaitPercent, wWaitPercent, tWaitPercent } = disksIO ? disksIO : [];
  const percentRead = Math.round(rIO / tIO * 1000) / 10 || 0;
  const percentWrite = 100 - percentRead;
  const rIOSec = rIO_sec || 0;
  const wIOSec = wIO_sec || 0;
  const tIOSec = tIO_sec || 0;
  const rWait = Math.round(rWaitPercent*100) / 100 || 0;
  const wWait = Math.round(wWaitPercent*100) / 100 || 0;
  const tWait = Math.round(tWaitPercent*100) / 100 || 0;


  return (
    <div className='chart'>
      <div className='chart-header' id='cpu-chart' style={{ marginBottom: 22 }}>
        <div className='chart-title'>
          DisksIO
        </div>
      </div>
      <div className='disks-io-charts'>
        <div>
          <div className="chart-child-title">
            On All Mounted Drives
          </div>
          <div className="all-drives-chart">
            <div className="all-drives-chart-title">
              Read
            </div>
            <div className="bar-percent-chart">
              <div style={{ backgroundColor: '#3fd142', color: '#444444', width: `${percentRead}%`, height: '100%'}}>{percentRead.toString()}%</div>
            </div>
          </div>
          <div className="all-drives-chart">
            <div className="all-drives-chart-title">
              Write
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
        <div>
          <div className="chart-child-title" style={{ marginLeft: 30 }}>
            IO per second
          </div>
          <div className="all-drives-chart">
            <div className="all-drives-chart-title">
              Read
            </div>
            <div className='bar-chart'>
              <div style={{ backgroundColor: '#3fd142', color: '#444444', width: `${rIOSec*10 > 100 ? 100 : rIOSec*10}%`, minWidth: '10px', height: '100%', transition: '1s' }}></div>
              <div>{rIOSec.toString()}</div>
            </div>
          </div>
          <div className="all-drives-chart">
            <div className="all-drives-chart-title">
              Write
            </div>
            <div className='bar-chart'>
              <div style={{ backgroundColor: '#ff9734', color: '#444444', width: `${wIOSec*10 > 100 ? 100 : wIOSec*10}%`, minWidth: '10px', transition: '1s' }}></div>
              <div>{wIOSec.toString()}</div>
            </div>
          </div>
          <div className="all-drives-chart">
            <div className="all-drives-chart-title">
              Total
            </div>
            <div className='bar-chart'>
              <div style={{ backgroundColor: '#ff78ae', color: '#444444', width: `${tIOSec*10 > 100 ? 100 : tIOSec*10}%`, minWidth: '10px', height: '100%', transition: '1s' }}></div>
              <div>{tIOSec.toString()}</div>
            </div>
          </div>
          <div className="chart-child-title" style={{ marginLeft: 30, marginTop: 30 }}>
            Wait Percent
          </div>
          <div className="all-drives-chart">
            <div className="all-drives-chart-title">
              Read
            </div>
            <div className='bar-chart'>
              <div style={{ backgroundColor: '#3fd142', color: '#444444', width: `${rWait*10 > 100 ? 100 : rWait*30}%`, minWidth: '10px', height: '100%', transition: '1s' }}></div>
              <div>{rWait.toString()}%</div>
            </div>
          </div>
          <div className="all-drives-chart">
            <div className="all-drives-chart-title">
              Write
            </div>
            <div className='bar-chart'>
              <div style={{ backgroundColor: '#ff9734', color: '#444444', width: `${wWait*10 > 100 ? 100 : wWait*30}%`, minWidth: '10px', transition: '1s' }}></div>
              <div>{wWait.toString()}%</div>
            </div>
          </div>
          <div className="all-drives-chart">
            <div className="all-drives-chart-title">
              Total
            </div>
            <div className='bar-chart'>
              <div style={{ backgroundColor: '#ff78ae', color: '#444444', width: `${tWait*10 > 100 ? 100 : tWait*30}%`, minWidth: '10px', height: '100%', transition: '1s' }}></div>
              <div>{tWait.toString()}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisksIO;