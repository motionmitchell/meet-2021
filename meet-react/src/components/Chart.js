import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { makeChartData } from '../redux/eventSlice';
import { useDispatch } from 'react-redux';
const Chart = () => {
    const dispatch = useDispatch();
    const [chartData, setChartData] = useState([]);
    const defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
        location: 'City'
    }
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(makeChartData()).then((data) => {
            console.log(data.payload)
            setChartData(data.payload);
            //alert(JSON.stringify(data.payload));
            setIsLoaded(true);
            // makeChartData();
        })


    }, [dispatch]);

    return (
        <div>
            {isLoaded ?
                <Bar
                    data={chartData}
                    options={{
                        title: {
                            display: defaultProps.displayTitle,
                            text: 'Events by city',
                            fontSize: 25
                        },
                        legend: {
                            display: defaultProps.displayLegend,
                            position: defaultProps.legendPosition
                        }
                    }}
                />
                : <div />
            }
        </div>
    );
};
export default Chart;