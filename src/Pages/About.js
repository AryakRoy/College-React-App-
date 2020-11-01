import React from 'react'
import "../Pages-css/About.css"
import Avatar from '@material-ui/core/Avatar';
import {useStyles} from "../util.js"
import reactPerson from "../Images/react-person.png"
import student from "../Images/student.png"
import onlineClass from "../Images/online-class.png"
function About() {
    const classes = useStyles();
    const today = new Date();
    const year = today.getFullYear();
    return (
        <div className="about-container">
            <header className="about-header">
                <h1>Online College Management Application</h1>
                <p>This is a online college database management system made by Aryak Roy, Arani Ray and Gaurav Goverdhan for the course CSE2004 Database management and systems. The project consists of a Frontend Application built using React JS and a backend server that has been built using NodeJS and ExpressJS and uses a MySQL database.</p>
            </header>
            <main className="about-main">
                <section className="about-main-section">
                    <article className="about-main-article">
                        <img className="about-main-img" src={reactPerson} alt="React Person"/>
                    </article>
                    <article className="about-main-article">
                        <p>The reason for choosing ReactJS for building the project was becuase of the fact that it is the most widely used JSX Library for the development of Progressive Web Application and it has benefits such as Component based Design, faster rendering and component reusability and the biggest factor being that it is an open source project by Facebook thus it has a Robust commmunity.</p>
                    </article>
                </section>
                <section className="about-main-section">
                    <article className="about-main-article">
                        <p>This provides a better way for students and faculty members to access and change their data which is in turn synchronized with the college or university database. Especially for students to access data such as a class number or a time table schedule is made fairly simple using just a web aoo which can be accessed at any time</p>
                    </article>
                    <article className="about-main-article">
                        <img className="about-main-img" src={student} alt="React Person"/>
                    </article>
                </section>
                <section className="about-main-section">
                    <article className="about-main-article">
                        <img className="about-main-img" src={onlineClass} alt="React Person"/>
                    </article>
                    <article className="about-main-article">
                        <p>In times like these where the entire world is looking for better ways to spread education through an online medium, this is a first step towards the innovation of spreading knowledge to the most remote part of the worl through technology</p>
                    </article>
                </section>
            </main>
            <footer className="about-footer">
                <h3>Developers</h3>
                <section className="about-footer-section">
                    <div className="developer-card">
                        <Avatar className={classes.avataricon2} />
                        <div className="developer-details">
                            <h4>Aryak Roy</h4>
                            <p>Backend Developer</p>
                        </div>
                    </div>
                    <div className="developer-card"> 
                        <Avatar className={classes.avataricon2} />
                        <div className="developer-details">
                            <h4>Arani Ray</h4>
                            <p>Frontend Developer</p>
                        </div>
                    </div>
                    <div className="developer-card">
                        <Avatar className={classes.avataricon2} />
                        <div className="developer-details">
                            <h4>Gaurav Goverdhan</h4>
                            <p>Database Designer</p>
                        </div>
                    </div>
                </section>
                <p>&#169; {year}</p>
            </footer>
        </div>
    )
}

export default About
