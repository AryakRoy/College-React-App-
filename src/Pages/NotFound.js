import React from 'react'
import "../Pages-css/NotFound.css"
import notFound from "../Images/not-found.png"
function NotFound() {
    return (
        <div className="not-found-container">
            <div className="not-found-div">
                <img src={notFound} alt="Not Found" className="not-found-image"/>
                <h1>Not Found</h1>
            </div>
        </div>
    )
}
export default NotFound
