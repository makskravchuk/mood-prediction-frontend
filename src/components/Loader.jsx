

function Loader({isAnalyzing, setIsAnalyzing}){
    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
             style={{ zIndex: 1050 }}>
            <div className="text-center text-white">
                <div className="spinner-border text-light mb-3" style={{ width: "3rem", height: "3rem" }} role="status"></div>
                <p className="fs-5">Триває аналіз...</p>
            </div>
        </div>
    );
}

export default Loader;