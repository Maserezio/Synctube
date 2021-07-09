import React from "react";
import './SearchPanel.css';
const SearchPanel = () => {
    return (
        <div>
            <input className = "url-input" name="URL"></input>
            <button className ="add-button">Add</button>
        </div>
    );
};

export default SearchPanel;