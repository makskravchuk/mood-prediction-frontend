import React from "react";

function Header() {
    return (
        <header>
        <nav className="navbar navbar-expand-lg">
            <div className="d-flex align-items-center me-3">
                <a href="#">
                    <img id="logo" className="pe-0" src="/site_logo.png" alt="MoodPrediction" />
                </a>
            </div>
            <div className="ms-auto me-3">
                <span>Developed by Maksym Kravchuk</span>
            </div>
        </nav>
        </header>
    );
}

export default Header;
