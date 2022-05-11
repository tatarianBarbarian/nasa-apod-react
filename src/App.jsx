import './App.css'
import { Button, Drawer, Spin } from 'antd';
import DatePicker from './DatePicker';
import 'antd/es/style/default.css';
import 'antd/es/button/style/index.css';
import 'antd/es/drawer/style/index.css';
import 'antd/es/spin/style/index.css';
import { Viewer } from './Viewer';

import { useQuery } from 'react-query';
import { fetchApodData } from './api';
import {useDateReducer} from './useDateReducer';
import { useState } from 'react';
import { formatDate } from './date';

const validateDate = (date) => {
  const minDate = new Date("1995-06-20");
  const today = new Date();
  
  return !(minDate <= date && date <= today);
}

function App() {
  const {
    date, 
    incrementDate, 
    decrementDate, 
    resetDate, 
    setDate, 
    setRandomDate
  } = useDateReducer();
  const formattedDate = formatDate(date);
  const { isLoading, error, data = {} } = useQuery(['apod', formattedDate], fetchApodData);
  const [isDescriptionVisible, setDescriptionVisibile] = useState(false);
  const [isAboutInfoVisible, setAboutInfoVisible] = useState(false);
  const {explanation, title, copyright} = data;
  
  return (
    <div className="App">
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
        <Button onClick={() => setAboutInfoVisible(true)}>❔</Button>
      </div>
      <div style={{textAlign: 'center'}}>
        {isLoading ? <Spin size='large' data-testid="spinner" /> : <Viewer error={error} data={data}/>}
      </div>
      <Drawer
        title="About app"
        placement={'bottom'}
        closable={true}
        onClose={() => setAboutInfoVisible(false)}
        visible={isAboutInfoVisible}
        key={'about app'}
      >
        <p>Based on <a href='https://api.nasa.gov/'>NASA API</a></p>
        <p>Made by <a href='https://github.com/tatarianBarbarian'>Felix Khafizov</a></p>
        <p><a href='https://github.com/tatarianBarbarian/nasa-apod-react'>Source code</a></p>
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
