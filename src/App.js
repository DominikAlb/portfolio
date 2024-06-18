import React, { useState } from 'react';
import styled from 'styled-components';
import '98.css';
import Draggable from 'react-draggable';
import { format } from 'date-fns';

const Desktop = styled.div`
  background: #008080;
  width: 100vw;
  height: 100vh;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  font-family: 'Tahoma', sans-serif;
  position: relative;
`;

const Taskbar = styled.div`
  background: #c0c0c0;
  height: 40px;
  width: 100vw;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  border-top: 2px solid #fff;
  border-bottom: 2px solid #000;
  box-shadow: inset 1px 1px 0px #000;
`;

const TaskbarLeft = styled.div`
  display: flex;
  align-items: center;
`;

const TaskbarRight = styled.div`
  display: flex;
  align-items: center;
`;

const StartButton = styled.button`
  font-family: 'Tahoma', sans-serif;
`;

const Clock = styled.div`
  font-family: 'Tahoma', sans-serif;
`;

const WindowContent = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const Icon = styled.div`
  width: 80px;
  text-align: center;
  margin: 10px;
  cursor: pointer;
`;

const IconLabel = styled.div`
  font-size: 12px;
  margin-top: 5px;
`;

const App = () => {
  const [windows, setWindows] = useState([]);
  const [time, setTime] = useState(format(new Date(), 'HH:mm'));

  const openWindow = (title, content) => {
    setWindows([...windows, { title, content }]);
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(format(new Date(), 'HH:mm'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Desktop>
      <svg style={{display:"none"}} version="2.0">
        <defs>
          <symbol id="windows-icon-16" viewBox="0 0 16 14" fill="none"><path fill="red" d="M3 6H2v2h4V6H4v1H3V6Z"/><path fill="#00F" d="M3 9H2v2h4V9H4v1H3V9Z"/><path fill="#000" d="M0 2h1v2H0z"/><path fill="red" d="M0 5h1v2H0z"/><path fill="#00F" d="M0 8h1v2H0z"/><path fill="#000" d="M0 11h1v2H0zM2 5V3h1v1h1V3h2V2h1V1h2V0h4v1h2v1h1v12h-1v-1h-2v-1H9v1H7v1H2v-2h1v1h1v-1h2V5H2Z"/><path fill="red" d="M8 3v3h1V5h1V2H9v1H8Z"/><path fill="#00F" d="M8 8v3h1v-1h1V7H9v1H8Z"/><path fill="#0F0" d="M13 2h-1v3h1v1h1V3h-1V2Z"/><path fill="#FF0" d="M13 7h-1v3h1v1h1V8h-1V7Z"/></symbol>
          <symbol id="default-window-icon-16" viewBox="0 0 16 16" fill="none"><path fill="gray" d="M0 1h16v1H0zM2 5h12v1H2zM0 13h15v1H0zM0 2h1v11H0zM14 2h1v11h-1z"/><path fill="silver" d="M1 2h13v1H1zM1 3h1v10H1z"/><path fill="#000" d="M0 14h16v1H0zM16 2h-1v12h1z"/><path fill="#0000BF" d="M2 3h12v2H2z"/><path fill="#000" d="M8 4h6v1H8z"/><path fill="#fff" d="M8 4h1v1H8zM10 4h1v1h-1zM12 4h1v1h-1zM2 6h12v7H2z"/></symbol>
          <symbol id="default-window-icon-32" viewBox="0 0 32 32" fill="none"><path fill="#000" d="M0 30h32v1H0zM31 2h1v28h-1z"/><path fill="gray" d="M0 2h31v1H0zM2 9h27v1H2zM2 10h1v18H2zM0 29h31v1H0zM0 3h1v26H0zM30 3h1v26h-1z"/><path fill="silver" d="M2 3h28v1H2zM2 8h28v1H2zM2 28h28v1H2zM1 3h1v26H1z"/><path fill="silver" d="M29 8h1v20h-1z"/><path fill="#0000BF" d="M2 4h28v4H2z"/><path fill="#000" d="M21 5h9v3h-9z"/><path fill="silver" d="M21 5h2v2h-2zM24 5h2v2h-2zM27 5h2v2h-2z"/><path fill="#fff" d="M3 10h26v18H3z"/></symbol>
          <symbol id="minimize-icon" viewBox="0 0 12 10" fill="none"><path fill="#000" d="M2 6h6v2H2z"/></symbol>
          <symbol id="maximize-icon" viewBox="0 0 12 10" fill="none"><path fill="#000" fill-rule="evenodd" d="M10 0H1v9h9V0ZM9 2H2v6h7V2Z" clip-rule="evenodd"/></symbol>
          <symbol id="restore-icon" viewBox="0 0 12 10" fill="none"><path fill="#000" fill-rule="evenodd" d="M2 3v6h6V6h2V0H4v3H2Zm3 0V2h4v3H8V3H5ZM3 8V5h4v3H3Z" clip-rule="evenodd"/></symbol>
          <symbol id="close-icon" viewBox="0 0 12 10" fill="none"><path d="M2 2V1H4V2H5V3H7V2H8V1H10V2H9V3H8V4H7V5H8V6H9V7H10V8H8V7H7V6H5V7H4V8H2V7H3V6H4V5H5V4H4V3H3V2H2Z" fill="black"/></symbol>
          <symbol id="programs-icon" viewBox="0 0 24 24" fill="none"><path fill="#D9D9D9" d="M6 8h17v15H6z"/><path fill="#87888F" d="M0 2v13h1V3h17V2h-7V1h-1V0H2v1H1v1H0Z"/><path fill="#fff" d="M1 2v13h1V4h16V3h-7V2h-1V1H2v1H1Z"/><path fill="#FF0" d="M3 1h7v1H3z"/><path fill="#C0C7C8" d="M1 2h10v1H1zM2 4h16v11H2z"/><path fill="#FF0" d="M2 4h1v1H2zM3 5h1v1H3zM7 5h1v1H7zM11 5h1v1h-1zM15 5h1v1h-1zM5 5h1v1H5zM9 5h1v1H9zM14 5h-1v1h1zM18 5h-1v1h1zM3 7h1v1H3zM3 9h1v1H3zM3 11h1v1H3zM3 13h1v1H3zM2 6h1v1H2zM2 8h1v1H2zM2 10h1v1H2zM2 12h1v1H2zM2 14h1v1H2zM4 4h1v1H4zM8 4h1v1H8zM12 4h1v1h-1zM6 4h1v1H6zM10 4h1v1h-1zM14 4h1v1h-1z"/><path fill="#FF0" d="M13 4h-1v1h1zM17 4h-1v1h1zM4 6h1v1H4zM8 6h1v1H8zM12 6h1v1h-1zM6 6h1v1H6zM10 6h1v1h-1zM14 6h1v1h-1z"/><path fill="#FF0" d="M13 6h-1v1h1zM17 6h-1v1h1zM4 8h1v1H4zM4 10h1v1H4zM4 12h1v1H4zM4 14h1v1H4z"/><path fill="#000" d="M5 7h19v17H5z"/><path fill="#87888F" d="M5 7h18v16H5z"/><path fill="#C0C7C8" d="M6 8h17v15H6z"/><path fill="#0000A8" d="M7 9h9v2H7z"/><path fill="#000" d="M16 9h6v2h-6z"/><path fill="#fff" d="M16 9h1v1h-1zM18 9h1v1h-1zM20 9h1v1h-1zM7 12h15v10H7z"/><path fill="#87888F" d="M8 19h3v1H8zM13 19h3v1h-3zM18 19h3v1h-3z"/><path fill="#A80057" d="M8 15v2h1v1h1v-1h1v-3H9v1H8Z"/><path fill="red" d="M9 14h1v3H9v-1H8v-1h1v-1Z"/><path fill="#FF0" d="M9 15h1v1H9z"/><path fill="#C0C7C8" d="M8 17h1v1H8z"/><path fill="#A857A8" d="M12 17h4v1h-4z"/><path fill="#C0C7C8" d="M13 17h1v1h-1z"/><path fill="#00F" d="M13 17v-3h1v1h2v1h-1v1h-2Z"/><path fill="#0FF" d="M13 15h1v1h-1z"/><path fill="#C0C7C8" d="M15 16h1v1h-1z"/><path fill="#00A857" d="M18 18h3v-3h-1v-1h-1v2h-1v2Z"/><path fill="#0F0" d="M19 16h1v1h-1z"/><path fill="#00F" d="M20 16h1v1h-1z"/><path fill="#A8A857" d="M0 15h5v1H0z"/><path fill="#000" d="M1 16h4v1H1zM18 7V3h1v1h1v3h-2Z"/><path fill="#A8A857" d="M18 4h1v3h-1z"/></symbol>
          <symbol id="arrow-right" viewBox="0 0 4 7"><path fill="currentColor" d="M0 0v7h1V6h1V5h1V4h1V3H3V2H2V1H1V0H0Z"/></symbol>
        </defs>
      </svg>
      <Icon onClick={() => openWindow('About Me', 
        <div>
          <p>I am a senior cloud development engineer with seven years of experience in software development.</p>
          <p>I am a graduate of the master's degree in Applied Computer Science at the Warsaw University of Technology.</p>
          <p>Currently I am focus on aws and azure cloud.</p>
          <div class="powerpoint big">
            My main skills
          </div>
          <p>AWS CLOUD - 3 years with microservices and serverless features</p>
          <div class="star-rating">
            <span class="star">&#9733;</span>
            <span class="star">&#9733;</span>
            <span class="star">&#9733;</span>
            <span class="star">&#9733;</span>
            <span class="star white">&#9733;</span>
          </div>
          <p>AZURE CLOUD - associate</p>
          <div class="star-rating">
            <span class="star gold">&#9733;</span>
            <span class="star gold">&#9733;</span>
            <span class="star gold">&#9733;</span>
            <span class="star white">&#9733;</span>
            <span class="star white">&#9733;</span>
          </div>
          <p>K8S</p>
          <div class="star-rating">
            <span class="star gold">&#9733;</span>
            <span class="star gold">&#9733;</span>
            <span class="star gold">&#9733;</span>
            <span class="star gold">&#9733;</span>
            <span class="star white">&#9733;</span>
          </div>
          <p>GO</p>
          <div class="star-rating">
            <span class="star gold">&#9733;</span>
            <span class="star gold">&#9733;</span>
            <span class="star gold">&#9733;</span>
            <span class="star gold">&#9733;</span>
            <span class="star white">&#9733;</span>
          </div>
          <p>C#</p>
          <div class="star-rating">
            <span class="star gold">&#9733;</span>
            <span class="star gold">&#9733;</span>
            <span class="star gold">&#9733;</span>
            <span class="star white">&#9733;</span>
            <span class="star white">&#9733;</span>
          </div>
          <p>Python</p>
          <div class="star-rating">
            <span class="star gold">&#9733;</span>
            <span class="star gold">&#9733;</span>
            <span class="star white">&#9733;</span>
            <span class="star white">&#9733;</span>
            <span class="star white">&#9733;</span>
          </div>
          <p>Java</p>
          <div class="star-rating">
            <span class="star gold">&#9733;</span>
            <span class="star gold">&#9733;</span>
            <span class="star white">&#9733;</span>
            <span class="star white">&#9733;</span>
            <span class="star white">&#9733;</span>
          </div>
          <div class="powerpoint small">
            My other skills
          </div>
          <p>HTML, JS, CSS, MSSQL, OpenSearch, MongoDB, DynamoDB, Google Cloud(GCP), Firebase</p>
          <p>Helm, Jenkins, Git, Terraform, Basic Linux commands, PowerBI, Flutter</p>
        </div>
        )}>
      <svg class="icon" width="32" height="32"><use href="#default-window-icon-32"/></svg>
        <IconLabel>About Me</IconLabel>
      </Icon>
      <Icon onClick={() => openWindow('Studies', <div>
        <h5>
        Warsaw University of technology
        </h5>
        <p>Applied Computer Science (2020-2023)</p>
        <p>Master of Science Degree;</p>
        <p>Monte Carlo simulation for lottery games</p>
        <p>The graduate of the second degree program has detailed knowledge and skills in the analysis of the functioning, methods of design, modeling, construction and operation of computer hardware and software</p>
        <p>His knowledge and skills enable him to adapt quickly to the dynamically changing IT reality. </p>
        <p>I increased my ability to analyze problems and draw conclusions and make decisions.</p>
        <p>I know how to interact in a team, organize and manage the work of the team.</p>
        <br/>
        <h5>
        Jagiellonian University
        </h5>
        <p>Computer Science (2016-2019)</p>
        <p>Bachelor's Degree; </p>
        <p>Recovery of shredded documents</p>
        <p>I increased my math knowledge. It was amazing oportunity to learn about probability, creating algorythms, optimize code and more</p>
        <p>I learned how to use create UML diagrams and work with SQL databases</p>
        <p>Also I get my first skills in programming in java, c++, python and c#</p>
        <p>That was a great opportunity to meet new people</p>
      </div>)}>
      <svg class="icon" width="32" height="32"><use href="#default-window-icon-32"/></svg>
        <IconLabel>Studies</IconLabel>
      </Icon>
      <Icon onClick={() => openWindow('Career', <div>
        <h5>
        Senior Cloud Development Engineer - Pegasystem 2019 - CURRENTLY
        </h5>
        <p>Currently, I am developing the multi region disaster recovery architecture for the Pega biggest clients.</p>
        <p>I work with Golang and AWS on a daily basis using OpenSearch and DynamoDB.</p>
        <p>In my previous projects, I had an opportunity to work on Kubernetes operators in the AWS cluster </p>
        <p>using a multi-tenancy architecture which helped me better understand K8S technologies.</p>
        <p>First two years in Pega I worked using Pega platform, Java, and Cucumber.</p>
        <p>I was working on a global operation console to better manage logs from many resources. </p>
        <br/>
        <h5>
        Software tester - BNP PARIBAS 2017 - 2019
        </h5>
        <p>testing REST API Server to improve banking systems (PSD2),</p>
        <p>working with databases like MSSQL,</p>
        <p>Java and Postman.</p>
        </div>)}>
      <svg class="icon" width="32" height="32"><use href="#default-window-icon-32"/></svg>
        <IconLabel>Career</IconLabel>
      </Icon>
      <Icon onClick={() => openWindow('Projects', <div>
        <h5>haircare</h5>
        <p>This is my first app in flutter (for ios and android [currently on android because of costs])</p>
        <p>App contains a calendar to add events about washing hair using your cosmetics</p>
        <p>You can add your products. AI should propose new cheaper and similar products and propose what should be taken during the next event</p>
        <p>DB: MongoDB + Firebase, Front-end: Flutter, backend: GO API, Cloud: Azure</p>
        <p>free to use for testers</p>
        <a href="https://play.google.com/apps/test/com.haircare.app1/6">link</a>
        <p>DURING-TESTING</p>
        <img src="./imag1.png" alt="Displayed Image1"/>
        <img src="./imag2.png" alt="Displayed Image2"/>
        <img src="./imag3.png" alt="Displayed Image3"/>
        <img src="/imag4.png" alt="Displayed Image4"/>
        <h5>A robot for watering plants.</h5>
        <p>PENDING</p>
        <p>During my travels I want to water my plants. For this case I would like to create a robot using raspberry + python</p>
        <p>Robot should move, shot water, use camera to see recognize plants</p>
      </div>)}>
      <svg class="icon" width="32" height="32"><use href="#default-window-icon-32"/></svg>
        <IconLabel>Projects</IconLabel>
      </Icon>
      <Icon onClick={() => openWindow('Contact', <div>
        <p class="wave-text">City: Kraków</p>
        <p>phone: +48 695 147 120</p>
        <p>e-mail: dominik.albiniak1@gmail.com</p>
        <p>linkedin: https://www.linkedin.com/in/dominik-albiniak-08a14a14a/</p>
        <p>github: https://www.github.com/DominikAlb</p>
        <p>birth year: 1997</p></div>)}>
      <svg class="icon" width="32" height="32"><use href="#default-window-icon-32"/></svg>
        <IconLabel>Contact</IconLabel>
      </Icon>
      {windows.map((win, index) => (
        <Draggable key={index}>
          <div className="window" style={{ position: 'absolute', zIndex: 1 }}>
            <div className="title-bar">
              <div className="title-bar-text">{win.title}</div>
              <div className="title-bar-controls">
                <button aria-label="Minimize"></button>
                <button aria-label="Maximize"></button>
                <button aria-label="Close" onClick={() => {
                  const newWindows = [...windows];
                  newWindows.splice(index, 1);
                  setWindows(newWindows);
                }}></button>
              </div>
            </div>
            <WindowContent className="window-body">
              {win.content}
            </WindowContent>
          </div>
        </Draggable>
      ))}
      <Taskbar>
        <TaskbarLeft>
          <StartButton className="button">Start</StartButton>
        </TaskbarLeft>
        <TaskbarRight>
          <Clock>{time}</Clock>
        </TaskbarRight>
      </Taskbar>
    </Desktop>
  );
};

// script.js
document.addEventListener('DOMContentLoaded', () => {
  const stars = document.querySelectorAll('.star');

  stars.forEach(star => {
    star.addEventListener('click', handleStarClick);
    star.addEventListener('mouseover', handleStarHover);
    star.addEventListener('mouseout', handleStarOut);
  });

  function handleStarClick(event) {
    const selectedValue = event.target.getAttribute('data-value');
    stars.forEach(star => {
      star.classList.toggle('selected', star.getAttribute('data-value') <= selectedValue);
    });
    console.log(`You rated this ${selectedValue} stars`);
  }

  function handleStarHover(event) {
    const hoverValue = event.target.getAttribute('data-value');
    stars.forEach(star => {
      star.classList.toggle('hover', star.getAttribute('data-value') <= hoverValue);
    });
  }

  function handleStarOut() {
    stars.forEach(star => {
      star.classList.remove('hover');
    });
  }
});

export default App;