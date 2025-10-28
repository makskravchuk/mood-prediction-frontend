import {useEffect, useRef} from "react";

function Alert({error, setError}) {
    const alertRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {

            if (alertRef.current && !alertRef.current.contains(event.target)) {
                setError(null);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setError]);

    return (<div className="alert alert-danger ms-auto position-fixed top-50 start-50 d-flex translate-middle"
                 role="alert"
                 ref={alertRef}>
        <div className="text-center">{error}</div>
        <button
            type="button"
            className="btn-close"
            onClick={() => setError(null)}
            aria-label="Close"
        ></button>
    </div>);
}

export default Alert;