import React from 'react';
import { ComposedChart, CartesianGrid,  } from 'recharts';

const Chart = (props) => {
  return (
    <ComposedChart
      width={props.width}
      height={props.height}
      data={props.data}
      margin={{
        right: 30,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      {props.children}
    </ComposedChart>
  );
}

export default Chart;
