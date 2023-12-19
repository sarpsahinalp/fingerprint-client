const ctx = document.getElementById('botCount');

let botCount = 0;
let humanCount = 0;
async function getData() {
    const url = 'https://fingerprint-server-czzzoqqzqa-ey.a.run.app/api/fingerprints'
    const response = await fetch(url);
    const data = response.json();
    data.then(data => {
        console.log(data)
        botCount = data.filter(el => el.bot === "bad").length
        humanCount = data.length - botCount
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Bot Count', 'Human Count'],
                datasets: [{
                    label: '# of Visitors',
                    data: [botCount, humanCount],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        })
    })
}

getData().then(r => console.log(r))