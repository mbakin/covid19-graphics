import React, {useState, useEffect} from 'react';
import Chart from 'react-apexcharts'
import { fetchDailyData } from "./api";

const AreaChart = ({country}) => {
  const [dailyData, setDailyData] = useState([]);

  // As countries change, useEffect here will work
  useEffect(() =>{
    const fetchCountryDailyData = async () => {
      const data = await fetchDailyData(country)
      setDailyData(data);
    };
    fetchCountryDailyData();
  }, [country]);

  return (
    <div id="chart">
      <Chart
      options={{
        chart: {
          height: 50,
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories:
            dailyData.map((item)=> item.Date),
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy'
          },
        },}
      }

      series={[
        {
          name: 'Confirmed',
          data: dailyData.map((item) => item.Confirmed)
        }, {
          name: 'Recovered',
          data: dailyData.map((item) => item.Recovered)
        }, {
        name: 'Deaths',
        data: dailyData.map((item) => item.Deaths)
      },
      ]}
      style={{
      marginTop: 150}
      }
      height={350}
      />
    </div>
  );
};

export default AreaChart;
