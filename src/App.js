import React from 'react';
import './App.css';
import { Scatter } from 'react-chartjs-2';
import trajectoires from './trajectoires.json';
import colors from './colors.json';
import _ from 'lodash';
import Tab from './Tab';

const datas = {"datasets" : []};

trajectoires.forEach((element,index) => {
  const points = _.orderBy(element.points, ['time']);
  
  let x = 0;
  let y = 0;
  let oldx = 0;
  let oldy = 0;
  let distance = 0;
  let travelTime = 0;
  let speed = 0;
  let data = [];

  for(let i = 0; i < points.length; i++){
    x = x + Math.abs(points[i].x - oldx);
    y = y + Math.abs(points[i].y - oldy);
    oldx = points[i].x;
    oldy = points[i].y;
    data.push(points[i])
  }

  travelTime = points[points.length-1].time - points[0].time;
  distance = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
  speed = distance / travelTime;
  datas.datasets.push({
    label: element.id,
    fill: false,
    showLine: true,
    borderColor: colors[index],
    data: data,
    speed: speed,
    travelTime: travelTime,
    distance: distance
  })
});

const options = {
   tooltips: {
      callbacks: {
         label: function(tooltipItem, data) {
            let time = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].time;
            return 'time: ' + time + ', coordonates: (' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
         }
      }
   }
}

function App() {
  return (
    <div className="App">
      <div className="container">
        <Scatter data={datas} options={options} />
        <Tab data={datas.datasets} />
      </div>
    </div>
  );
}

export default App;
