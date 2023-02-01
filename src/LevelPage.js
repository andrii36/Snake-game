import React from "react";
import "./LevelPage.css";
import "./App.css"

const LevelPage = ({showGameComponent}) => {
    
    const handleClick = (e) => {
        showGameComponent(e.target.innerText);
    };

    return (
        <div className="game-area">
            <h3>Level</h3>
            <div className="button-group">
                <button className="button" onClick={handleClick}>Easy</button>
                <button className="button" onClick={handleClick}>Medium</button>
                <button className="button" onClick={handleClick}>Hard</button>
            </div>
        </div>
    );
};

export default LevelPage;