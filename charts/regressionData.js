const chart = document.getElementById("regressionData")

const response = await fetch('https://fingerprint-server-czzzoqqzqa-ey.a.run.app/api/regression-data/659a06088f4c9270212e092b')
const datas = response.json();

console.log(datas)

const data = {
    labels: [
        'Precision',
        'Recall',
        'F1-score',
        'Accuracy',
        'Pseudo R-squ.'
    ],
    datasets: [{
        label: 'Regression Results',
        data: [0.57, 0.45, 0.29, 0.4, 0.5688],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
            'rgb(201, 203, 207)',
            'rgb(54, 162, 235)'
        ]
    }]
};

const config = {
    type: 'polarArea',
    data: data,
    options: {}
};

new Chart(chart, config)