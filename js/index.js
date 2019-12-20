document.addEventListener('DOMContentLoaded', function () {
    // const xdata = getDataFromCsv('altersverteilung.csv')
    // console.log(xdata);
    // const chart1 = Highcharts.chart('altersverteilung', {
    //     chart: {
    //         type: 'line'
    //     },
    //     title: {
    //         text: 'Altersverteilung'
    //     },
    //     xAxis: {
    //         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    //     },
    //     yAxis: {
    //         title: {
    //             text: 'Temperature (°C)'
    //         }
    //     },
    //     plotOptions: {
    //         line: {
    //             dataLabels: {
    //                 enabled: true
    //             },
    //             enableMouseTracking: false
    //         }
    //     },
    //     series: [{
    //         name: 'Tokyo',
    //         data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    //     }, {
    //         name: 'London',
    //         data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    //     }]
    // });
    drawChart('altersverteilung')
});

function drawChart(name) {
    const data = getDataFromCsv(name + '.csv')
    // console.log(data);
    
}

function parseData(data) {
    const keys = Object.keys(data[0])
    const parsedData = []

    data.forEach(row => {
        for (let index = 0; index < keys.length; index++) {
            if(parsedData.length <= index) {
                parsedData.push({
                    name: keys[index],
                    data: []
                })
            }
            parsedData[index].data.push(row[keys[index]])
        }   
    });
    return parsedData
}   

function getDataFromCsv(filename) {
    
    Papa.parse('../data/'+filename, {
        header: true,
        download: true,
        dynamicTyping: true,
        complete: function(results) {
            const data = results.data
            console.log(data);
            const xdata = parseData(data)
            console.log(xdata);
            const chart1 = Highcharts.chart('altersverteilung', {
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Altersverteilung'
                },
                xAxis: {
                    categories: xdata[0].data
                    // categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
                },
                yAxis: {
                    title: {
                        text: 'Temperature (°C)'
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                series: [xdata[1]]
            });
            // data = results.data;
        }
    });
    // https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server
    // python -m http.server


    // $.ajaxPrefilter( 'script', function( options ) {
    //     options.crossDomain = true;
    // });
    
    // Papa.parse('../data/altersverteilung.csv', {
    //     complete: function(results) {
    //         console.log("Finished:", results.data);
    //     }
    // });

    // $.ajax({
    //     type: "GET",
    //     url: "./data/altersverteilung.csv",
    //     dataType: "script",
    //     success: function(data) {
    //         alert("worked");
    //         console.log(Papa.parse(data))
    //     },
    //     error: function (request, status, error) {
    
    //         alert(error);
    //     }
    //  });
}