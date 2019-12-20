document.addEventListener('DOMContentLoaded', function () {
    // drawChart('altersverteilung', 'line', 'Altersverteilung der Tatverdächtigen')
    drawChart('abb1_StraftatenUndTatverdächtige - Tabellenblatt1', 'column', 'Altersverteilung der Tatverdächtigen')
});
// tab5_StraftatenNachKriminalitätsfeldUndDeliktsbereich - Tabellenblatt1

function drawChart(name, type, title) {
    getDataFromCsv(name + '.csv').then(function(data) {
        console.log(data);
        const placeToInsert = document.getElementById('chart-row')
        const htmlToInsert = `<div id="${name}" style="width:100%; height:400px;"></div>`
        placeToInsert.insertAdjacentHTML('beforeend', htmlToInsert)
        Highcharts.chart(name, {
            chart: {
                type: type
            },
            title: {
                text: title
            },
            xAxis: {
                categories: data.categories
            },
            yAxis: {
                title: {
                    text: ''
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
            series: data.series
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

    // the category (name === '' for multidimensional csv files) has to be at index 1
    for (let index = 0; index < parsedData.length; index++) {
        if(parsedData[index].name === '') {
            const cats = parsedData[index]
            parsedData.splice(index, 1)
            parsedData.unshift(cats)
        }
    }

    const categories = parsedData[0].data
    parsedData.splice(0, 1)

    const finalData = {
        categories: categories,
        series: parsedData
    }

    return finalData
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

window.onload = function() {
    $('.counter-count').each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration: 1500,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
}