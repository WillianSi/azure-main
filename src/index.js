import React from 'react';
import ReactDOM from 'react-dom/client';

import Header from './components/Header'
import Banner from "./components/Banner";
import Footer from "./components/Footer/Footer";
import ComputerVision from "./components/ComputerVision";

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <div>
    <Header />
    <Banner
      videoTitle={"Copa do Mundo da FIFA Catar 2022™"}
      url={"https://www.youtube.com/watch?v=wVmdKESyg9I&ab_channel=SCS"}
      videoDescription={"A Copa do Mundo FIFA de 2022  é a vigésima segunda edição desse evento esportivo, um torneio internacional de futebol masculino que ocorre a cada quatro anos organizado pela Federação Internacional de Futebol (FIFA), que está ocorrendo no Catar. Esta edição é a primeira realizada no Oriente Médio, e é a última a ter o formato de 32 equipes, pois haverá uma mudança no formato e número de equipes na edição seguinte, a de 2026, cujos países-sedes serão Canadá, Estados Unidos e México, passando para 48 equipes"}
    />
    <ComputerVision />
    <Footer />
  </div>
    
);
