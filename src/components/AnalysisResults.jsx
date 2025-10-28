import React, { useEffect } from "react";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {useRef} from "react";

Chart.register(...registerables, ChartDataLabels);

function AnalysisResults({data}) {
    const moodRef = useRef(null);
    const emotionRef = useRef(null);
    const moodDistribution = data.mood_distribution
    const emotionsFrequency = data.emotions_frequency



    useEffect(() => {
        const ctx1 = moodRef.current;
        const ctx2 = emotionRef.current;
        Chart.getChart(ctx1)?.destroy();
        Chart.getChart(ctx2)?.destroy();

        const moodChart = new Chart(ctx1, {
            type: "pie",
            data: {
                labels: moodDistribution.map(mood => `${mood.uk_name} ${mood.emoji}`),
                datasets: [{
                    data: moodDistribution.map(mood => mood.percentage),
                    backgroundColor: moodDistribution.map(mood => mood.color),
                    borderWidth: 2,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: "right", labels: { font: { size: 14 } } },
                    title: { display: true, text: "Відсотковий розподіл настроїв", font: { size: 18 }, color: "black"},
                    tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.parsed}%` } },
                    datalabels: { color: "#fff", formatter: value => `${value}%`, font: {size: 10}}
                }
            }
        });

        const emotionChart = new Chart(ctx2, {
            type: "bar",
            data: {
                 labels: emotionsFrequency.map(emotion => `${emotion.uk_name} ${emotion.emoji}`),
                datasets: [{
                    data: emotionsFrequency.map(emotion => emotion.percentage),
                    backgroundColor:  emotionsFrequency.map(emotion => emotion.color),
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    title: { display: true, text: "Відносний частотний розподіл емоцій", font: { size: 18 }, color: "black" },
                    datalabels: { color: "#fff", anchor: "end", align: "start", formatter: v => `${v}%`, font: { size: 10 } }
                },
                scales: {
                    x: { ticks: { font: { size: 13 } }, title: { display: true, text: "Емоції", font: { size: 14 } } },
                    y: { beginAtZero: true, title: { display: true, text: "Кількість у %", font: { size: 14 }} }
                }
            }
        });
        return () => {
            moodChart.destroy();
            emotionChart.destroy();
        };
    }, [data]);

    return (
        <div className="analysis-results d-flex flex-column gap-3">
            <div className="text-result border rounded-4 p-3 bg-light">
                <div className="text-center mb-4">
                    <h5 className="fw-bold">🔎 Результати аналізу 🔎</h5>
                </div>

                <div className="mb-3">
                    <p className="mb-1">
                        <strong>Полярність тексту:</strong>
                        <span id="polarity" className="top-state fw-semibold"
                              style={{color: data.polarity.color}}
                        >
                            {data.polarity.uk_name.toLowerCase()}
                        </span>
                        <i className="bi bi-plus-slash-minus text-primary me-2 float-end"></i>
                    </p>
                    <p className="mb-0">
                        <strong>Домінуючий настрій:</strong>
                        <span id="dominant-mood" className="top-state fw-semibold"
                            style={{color: data.dominant_mood.color}}
                        >
                            {data.dominant_mood.uk_name.toLowerCase()} {data.dominant_mood.emoji}
                        </span>
                        <i className="bi bi-trophy-fill text-primary me-2 float-end"></i>
                    </p>
                </div>

                <hr/>

                <div className="mt-3">
                    <h6 className="fw-bold mb-3 text-dark">
                        Відсотковий розподіл настроїв
                        <i className="bi bi-pie-chart-fill text-primary me-2 float-end"></i>
                    </h6>
                    <ul className="list-group list-group-flush" id="moods-list">
                        {moodDistribution.map((mood, i) => (
                            <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                <span>{mood.emoji} {mood.uk_name}</span>
                                <div className="flex-grow-1 mx-2 bg-light rounded-3"
                                     style={{height: "8px", position: "relative"}}>
                                    <div
                                        style={{
                                            width: `${mood.percentage}%`,
                                            height: "100%",
                                            backgroundColor: mood.color,
                                            borderRadius: "3px"
                                        }}></div>
                                </div>
                                <span className="fw-semibold" style={{color: mood.color}}>{mood.percentage}%</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <hr/>

                <div className="mt-3">
                    <h6 className="fw-bold mb-3 text-dark">
                        Відносний частотний розподіл емоцій<i
                        className="bi bi-bar-chart-line-fill text-primary me-2 float-end"></i>
                    </h6>
                    <ul className="list-group list-group-flush" id="emotions-list">
                        {emotionsFrequency.map((emotion, i) => (
                            <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                <span>{emotion.emoji} {emotion.uk_name}</span>
                                <span
                                    className="badge rounded-pill"
                                    style={{backgroundColor: emotion.color}}
                                >{emotion.percentage}%</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="mood-diagram border rounded-4 p-3 bg-light">
                <canvas id="MoodDiagram" ref={moodRef}></canvas>
            </div>
            <div className="emotion-diagram border rounded-4 p-3 bg-light">
                <canvas id="EmotionDiagram" ref={emotionRef}></canvas>
            </div>
        </div>
    );
}

export default AnalysisResults;
