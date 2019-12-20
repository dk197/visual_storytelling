document.addEventListener('DOMContentLoaded', function () {
    drawChart('altersverteilung', 'line', 'Altersverteilung der Tatverdächtigen')
});

function drawChart(name, type, title) {
    getDataFromCsv(name + '.csv').then(function(data) {
        console.log(data);
        Highcharts.chart('altersverteilung', {
            chart: {
                type: type
            },
            title: {
                text: title
            },
            xAxis: {
                categories: data[0].data
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
                    enableMouseTracking: true
                }
            },
            series: [data[1]]
        });
    })   
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
    return new Promise((resolve, reject) => {
        Papa.parse('../data/'+filename, {
            header: true,
            download: true,
            dynamicTyping: true,
            complete: function(results) {
                const data = results.data
                const xdata = parseData(data)
                resolve(xdata)
            }
        });
    })
    
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