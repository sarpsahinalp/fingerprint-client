const chart = document.getElementById("regressionData")

let accuracy = 0.0
let f1Score = 0.0
let precision = 0.0
let recall = 0.0
async function fetchRegressionData() {
    const response = await fetch('https://fingerprint-server-czzzoqqzqa-ey.a.run.app/api/regression-data/659a06088f4c9270212e092b')
    const datas = await response.json();

    const data = {
        labels: [                
            'Precision',
            'Recall',
            'F1-score',
            'Accuracy',            
        ],
        datasets: [{
            label: 'Regression Results',
            data: [datas.precision, datas.recall, datas.f1Score, datas.accuracy],                backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(75, 192, 192)',
                'rgb(255, 205, 86)',
                'rgb(201, 203, 207)',
                'rgb(54, 162, 235)'                ]
        }]
    };
        
    const config = {
        type: 'polarArea',
        data: data,
        options: {}
    };
        
    new Chart(chart, config)

}

fetchRegressionData().then(r => console.log(r))