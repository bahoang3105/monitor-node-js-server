import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import si from 'systeminformation';
import osu from 'node-os-utils';
import os from 'os';
import net from 'net'

const app = express();

app.use(bodyParser.json());

app.use(cors());

// function timeout 
const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// template info
const getTemp = async () => {
  try {
    const temp = await si.cpuTemperature();
    const tempMax = temp.max;
    const tempAverage = temp.main;
    return { tempMax, tempAverage };
  } catch(e) {
    console.error(e);
  }
}


// disks i/o stat
const getDisksIO = async () => {
  try {
    const disksIO = await si.disksIO();
    return disksIO;
  } catch(e) {
    console.log(e);
  }
}


// RAM stat
const getRAM = async () => {
  try {
    const mem = await osu.mem.info();
    const usedMem = Math.round(mem.usedMemMb / 1024 * 100) / 100;
    const percentMem = 100 - mem.freeMemPercentage;
    return { usedMem, percentMem };
  } catch(e) {
    console.error(e);
  }
}

// CPU stat
const getCPU = async () => {
  try {
    const percentCPU = await osu.cpu.usage(100);
    return percentCPU;
  } catch(e) {
    console.error(e);
  }
}

// network stat
const getNetwork = async () => {
  try {
    const network = await si.networkStats('*');
    return network;
  } catch(e) {
    console.error(e);
  }
}

app.get('/', async (req, res) => {
  const [temp, ram, percentCPU, network, disksIO] = await Promise.all([getTemp(), getRAM(), getCPU(), getNetwork(), getDisksIO()]);
  return res.status(200).json({ usedMem: ram.usedMem, percentMem: ram.percentMem, tempMax: temp.tempMax, tempAverage: temp.tempAverage, percentCPU, network, disksIO });
});

app.get('/staticInfo', async (req, res) => {

  // total mem
  const totalMem = Math.round(os.totalmem / 1024 / 1024 / 1024 * 100) / 100 ;

  // number of CPU
  const numCPU = os.cpus().length;

  return res.status(200).json({ totalMem, numCPU });

})

const PORT = process.env.PORT || 3003;

app.listen(PORT, console.log(`Server started on ${PORT}`));