import axios from 'axios';

const API_BASE = "http://127.0.0.1:8000/api/emotional_state/predict/";

export async function sendTextForAnalysis(text) {
    const response = await axios.post(API_BASE, {text});
    console.log(response);
    return response.data.task_id;
}

async function getTaskResult(task_id) {
    const response = await axios.get(`${API_BASE}${task_id}`)
    return response.data;
}

export async function pollTaskResult(taskId, intervalMs = 2000) {
    return new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
            try {
                const { status, result } = await getTaskResult(taskId);
                if (status === 'SUCCESS'){
                    clearInterval(interval);
                    resolve(result);
                }
                else if (status === 'FAILURE' || status === 'REVOKED'){
                    clearInterval(interval);
                    reject(new Error("An error occurred during the analysis"));
                }
            }
            catch (err) {
                clearInterval(interval);
                reject(err);
            }
        }, intervalMs);
    });
}