import { useState } from 'react';


function App() {
  const [city, setCity] = useState('');
  const [weatherForecast, setWeatherForecast] = useState(null);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=e751ea9cf5bc4fcbbb3225428211810&q=${city}&lang=pt`)
    .then((response) => {
      if(response.status == 200){
        return response.json()
      }
    })
    .then( (data) => {
      setWeatherForecast(data)
    });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
        <a className="navbar-brand p-4" href="#top">
          <b>Previsão do Tempo da Cidade  {city}</b>
        </a>
      </nav>

      <main className="container">
        <div className="jumbotron alert alert-secondary">
          <h1>
            Verifique agora a previsão do tempo da sua cidade!
          </h1>
          
          <p className="lead">
            Digite o nome da sua cidade no campo abaixo e em seguida clique em pesquisar
          </p>

          <div className="row mb-4">
            <div className="col-md-6">
              <input 
                onChange={handleChange}
                className="form-control" 
                value={city}/>
            </div>
          </div>

          <button onClick={handleSearch} className="btn btn-primary btn-lg">
            Pesquisar
          </button>

          {
            weatherForecast ? (
              <div>
                <div>
                  <div className='mt-4 d-flex align-items-center'>
                    <div>
                      <img src={weatherForecast.current.condition.icon} />
                    </div>
                    
                    <div>
                      <h3>Hoje o dia está: {weatherForecast.current.condition.text} </h3>
                    </div>
                  </div>

                  <div className='d-flex justify-content-start ms-4 d-grid gap-4'>
                    <div>
                      <h6>
                        Temperatura: {weatherForecast.current.temp_c} °C
                      </h6>
                    </div>

                    <div>
                      <h6>
                        Sensação Térmica: {weatherForecast.current.windchill_c} °C
                      </h6>
                    </div>

                    <div>
                      <h6>
                        Umidade: {weatherForecast.current.humidity} %
                      </h6>
                    </div>

                    <div>
                      <h6>
                        Vento: {weatherForecast.current.wind_kph} km\h
                      </h6>
                    </div>

                  </div>

                </div>
              </div>
            ): null
          }
        </div>
      </main>
    </div>
  );
}

export default App;
