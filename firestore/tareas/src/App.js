import React from 'react';
import {Container} from 'reactstrap';
import Titulo from './Components/Titulo';
import Todos from './Components/Todos'
function App() {
  return (
    <div className="App">
    <Container>
        <Titulo/>
        <Todos/>
    </Container>

    </div>
  );
}

export default App;
