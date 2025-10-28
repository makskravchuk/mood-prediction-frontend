import React from "react";

function InputComponent({text, setText, onAnalyze, onClear, disabled}) {
    return (
        <div className="input-component border rounded-4 p-3 d-flex gap-2 flex-column align-self-start">
            <textarea
              id="text-input"
              rows="20"
              value={text}
              placeholder="Введіть ваш текст для аналізу 📝"
              onChange={(e) => setText(e.target.value)}
            />
            <div className="input-controls d-flex">
                <button
                    id="clean-btn"
                    className="button btn btn-danger d-flex align-items-center justify-content-between gap-1 p-2 align-self-end"
                    onClick={onClear}
                >
                    <span>Очистити</span>
                    <i className="bi bi-x-circle fs-6"></i>
                </button>
                <button
                    disabled={disabled}
                    id="launch-btn"
                    className="button btn btn-primary d-flex align-items-center justify-content-between gap-1 p-2 align-self-end ms-auto"
                    onClick={onAnalyze}
                >
                    <span>Здійснити аналіз</span>
                    <i className="bi bi-arrow-up-circle fs-6"></i>
                </button>
            </div>
        </div>
    );
}

export default InputComponent;
