import './App.css'
import { Button, Drawer, Spin } from 'antd';
import DatePicker from './DatePicker';
import 'antd/es/style/default.css';
import 'antd/es/button/style/index.css';
import 'antd/es/drawer/style/index.css';
import 'antd/es/spin/style/index.css';
import { Viewer } from './Viewer';

import { useQuery } from 'react-query';
import { fetchApodDataQuery } from './api';
import {useDateReducer} from './useDateReducer';
import { useEffect, useState } from 'react';
import { formatDate } from './date';
import {useParams, useNavigate} from 'react-router-dom';

const validateDate = (date) => {
  const minDate = new Date("1995-06-20");
  const today = new Date();
  
  return !(minDate <= date && date <= today);
}

function App() {
  const navigate = useNavigate();
  const dt = useParams().date || formatDate(new Date())

  const {
    date, 
    incrementDate, 
    decrementDate, 
    resetDate, 
    setDate, 
    setRandomDate
  } = useDateReducer(dt);
  const formattedDate = formatDate(date);
  const { isLoading, error, data = {} } = useQuery(['apod', formattedDate], fetchApodDataQuery);
  const [isDescriptionVisible, setDescriptionVisibile] = useState(false);
  const [isAboutInfoVisible, setAboutInfoVisible] = useState(false);
  const {explanation, title, copyright} = data;

  useEffect(() => {
    navigate(`/${formattedDate}`)
  }, [formattedDate])

  return (
    <div className="App container">
      <h1 style={{color: 'white', textAlign: 'center'}}>NASA's Astronomy Picture of the day</h1>
      <div className="controls">
        <Button data-testid="prevBtn" disabled={isLoading} onClick={decrementDate}>Prev</Button>
        <Button data-testid="nextBtn" disabled={isLoading} onClick={incrementDate}>Next</Button>
        <Button data-testid="randomBtn" disabled={isLoading} onClick={setRandomDate}>Random</Button>
        <Button data-testid="aboutBtn" disabled={isLoading} onClick={() => setDescriptionVisibile(true)}>About this pic</Button>
        <Button data-testid="todayBtn" disabled={isLoading} onClick={resetDate}>Today</Button>
        <DatePicker
          data-testid="datepicker" 
          disabled={isLoading}
          disabledDate={validateDate}
          defaultValue={date}
          value={date}
          onChange={setDate}
        />
        <Button data-testid="appInfoBtn" onClick={() => setAboutInfoVisible(true)}>❔</Button>
      </div>
      <div style={{textAlign: 'center'}}>
        {
          isLoading 
            ? <Spin size='large' data-testid="spinner" /> 
            : error
              ? <p style={{color: 'white'}}>{error.message}</p>
              : <Viewer data={data} />
        }
      </div>
      <Drawer
        title="About app"
        placement={'bottom'}
        closable={true}
        onClose={() => setAboutInfoVisible(false)}
        visible={isAboutInfoVisible}
        key={'about app'}
      >
        <div data-testid="appInfo">
          <p>Based on <a target="_blank" rel="noopener norefer" href='https://api.nasa.gov/'>NASA API</a></p>
          <p>Made by <a target="_blank" rel="noopener norefer" href='https://github.com/tatarianBarbarian'>Felix Khafizov</a></p>
          <p><a target="_blank" rel="noopener norefer" href='https://github.com/tatarianBarbarian/nasa-apod-react'>Source code</a></p>
        </div>
      </Drawer>
      <Drawer
          title={title}
          placement={'bottom'}
          closable={true}
          onClose={() => setDescriptionVisibile(false)}
          visible={isDescriptionVisible}
          key={'about pic'}
        >
          <div className="description">
            {explanation && <p>{explanation}</p>}
            {copyright && <p>Copyright: {copyright}</p>}
          </div>
      </Drawer>
    </div>
  )
}

export default App
