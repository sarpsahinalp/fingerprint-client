const chart = document.getElementById("regressionData")

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