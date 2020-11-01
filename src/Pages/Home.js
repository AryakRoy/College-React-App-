import React from 'react'
import "../Pages-css/Home.css"
import studying from "../Images/studying.png"
function Home() {
    
    return (
        <div className="home-container">
            <div className="home__text">
                <h1>Online College Management Application</h1>
                <p>A better way to start your college life using a highly User-Friendly Progressive Web Application</p>
            </div>
            <div className="home__image">
                <img src={studying} alt="Studying" className="home-image"/>
            </div>
        </div>
    )
}

export default Home
