//https://docs.microsoft.com/en-us/azure/developer/javascript/tutorial/static-web-app-image-analysis?tabs=bash%2Cvscode
import React, { useState } from 'react';
import { computerVision, isConfigured as ComputerVisionIsConfigured } from './azure-cognitiveservices-computervision';
import ProgressBar from 'react-bootstrap/ProgressBar';
import "./index.css";

function ComputerVision() {

  const [fileSelected, setFileSelected] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [processing, setProcessing] = useState(false);
  
  const handleChange = (e) => {
    setFileSelected(e.target.value) // controla a alteração do input da imagem
  }
  const sendImage = (e) => {
    // hold UI
    setProcessing(true);
    setAnalysis(null);

    computerVision(fileSelected || null).then((item) => {
      // reset state/form
      setAnalysis(item); // defindo variável analysis com o retorno item da chamada da funcao
      setFileSelected("");
      setProcessing(false);
    });

  };

  // Display JSON data in readable format
  const PrettyPrintJson = (data) => {
    //console.log(JSON.stringify(data,null,2));
    return (<div><pre>{JSON.stringify(data, null, 2)}</pre></div>);
  }

  const DisplayTag = () =>{
    return (
      <div>
      <h3 className="cat">Tags</h3>

    <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Confiança </th>
          </tr>
        </thead>
        <tbody>
          {analysis.tags.map(function (item, index) {
            if(item.confidence>0.1)
            return (
              <tr key={index}>
                <td>{item.name}</td>
                <td><ProgressBar now={item.confidence} label={`${item.confidence.toFixed(2)}%`} variant="success" min="0" max="1"/></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    )
  };

  const DisplayCategorias = () =>{
    return (
        <div className="categoria">
        <div className="espac"><img className="card" src={analysis.URL} height="200" border="1" alt="Imagem" /></div>
        <h3 className="cat">Categorias</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Confiança</th>
          </tr>
        </thead>
        <tbody>
          {analysis.categories.map(function (item, index) {
            if(item.score>0.1)
            return (
              <tr key={index}>
                <td>{item.name}</td>
                <td><ProgressBar now={item.score} label={`${item.score.toFixed(2)}%`} variant="success" min="0" max="1"/></td>
              </tr>
            );
          })}
        </tbody>
      </table>
        </div>

    )
};

const DisplayCapition = () => {
  return (
    <div className="descri">
      <h2>Descrição da imagem</h2>
      {analysis.description.captions[0].text}
    </div>
  )
}

  const DisplayResults = () => {
    return (
      <div> 
        {DisplayCapition()}
        {DisplayCategorias()}
        {DisplayTag()}
      </div>
    )
  };
  
  const Analyze = () => {
    return (
    <div className="container">
      <h1 className="text">Análise de imagens da COPA</h1>
      {!processing &&
        <div className="text-center">
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">URL</span>
            <input class="form-control" type="text" placeholder="Entre com a URL" size="50" onChange={handleChange}></input>
            
          </div>
          <button className='btn btn-secondary' onClick={sendImage}>Analisar</button> 
        </div>
      }
      {processing && <div className="text">Processing</div>}
      <hr />
      {analysis && DisplayResults()}
      </div>
    )
  }
  
  const CantAnalyze = () => {
    return (
      <div>Key e/ou endpoint não configurado em ./azure-cognitiveservices-computervision.js</div>
    )
  }
  
  function Render() {
    const ready = ComputerVisionIsConfigured();
    if (ready) {
      return <Analyze />;
    }
    return <CantAnalyze />;
  }

  return (
    <div>
      {Render()}
    </div>
    
  );
}

export default ComputerVision;