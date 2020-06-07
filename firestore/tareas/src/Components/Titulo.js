import React from 'react';
import {Row, Col, Jumbotron} from 'reactstrap';

export default()=>{
    return(
    <div>
        <Row>
          <Col xs= "12">
              <Jumbotron className="text-center">
                  <h1 className = "display-5">Aplicación de Tareas </h1>
                  <p className = "lead"> Proyecto Final </p>
              </Jumbotron>
          </Col>
        </Row>
    </div>
    )
}
