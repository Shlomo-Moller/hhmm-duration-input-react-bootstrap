import {HhMmDurationInput} from './components/HhMmDurationInput/HhMmDurationInput';
import {Button, Form} from 'react-bootstrap';
import './App.css';

function App() {

  return (
    <div className="App">
      <Form>
        <Form.Group controlId='hhmm-duration-input'>
          <Form.Label>Duration</Form.Label>
          <HhMmDurationInput />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default App
