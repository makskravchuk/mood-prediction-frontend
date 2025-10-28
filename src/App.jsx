import Header from "./components/Header";
import InputComponent from "./components/InputComponent";
import AnalysisResults from "./components/AnalysisResults.jsx";
import Alert from "./components/Alert.jsx";
import Loader from "./components/Loader.jsx";
import {useState} from "react";
import {sendTextForAnalysis, pollTaskResult} from "./api/emotionService.js";

function App() {
    const [text, setText] = useState("");
    const [results, setResults] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [lastAnalyzedText, setLastAnalyzedText] = useState("");
    const [error, setError] = useState();



    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        setError(null);

        try {
            const taskId = await sendTextForAnalysis(text);
            const result = await pollTaskResult(taskId, 2000);
            setResults(result);
            setLastAnalyzedText(text);
        }
        catch (error) {
            console.log(error)
            setError("Під час аналізу виникла помилка😢");
        }
        finally {
            setIsAnalyzing(false);
        }
    };


    const handleClear = () => {
        setText("");
        setResults("");
    };

    const isAnalyzeDisabled = lastAnalyzedText === text || text === "";

    return (
        <>
            <Header/>
            {error && <Alert error={error} setError={setError} />}
            <main className="d-flex flex-column gap-3 flex-md-row mt-3">
                <InputComponent
                    text={text}
                    setText={setText}
                    onAnalyze={handleAnalyze}
                    onClear={handleClear}
                    disabled={isAnalyzeDisabled}
                />
                {results && <AnalysisResults data={results}/>}
            </main>
            {isAnalyzing && <Loader isAnalyzing={isAnalyzing} setIsAnalyzing={setIsAnalyzing}/>}
        </>
    )
}

export default App
