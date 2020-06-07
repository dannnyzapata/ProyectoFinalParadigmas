import React, {Component} from 'react'
import db from '../FirestoreConfig';
import {Table, Button, Row, Col, InputGroup, Input} from 'reactstrap';


export default class Todos extends Component{

    state = {
        items: [],
        inputValue: '',
        inputNombre: '',
        inputDescripcion: '',
        inputPrioridad: '',
        edit: false,
        edit2: false,
        edit3: false,
        edit4: false,
        id:'',
    }
   componentDidMount(){
      db.collection('todos').onSnapshot((snapShots)=>{
          this.setState({
            items: snapShots.docs.map( doc => {
              return {id: doc.id, data:doc.data()}
            })
          })

      });
   };

   changeValue = (e) => {
     this.setState({
       inputValue:e.target.value,
     })
   }

   changeValue2 = (e) => {
     this.setState({
       inputNombre:e.target.value,
     })
   }

   changeValue3 = (e) => {
     this.setState({
       inputDescripcion:e.target.value,
     })
   }

   changeValue4 = (e) => {
     this.setState({
       inputPrioridad:e.target.value
     })
   }

action = () => {

  const {inputValue, edit} = this.state;
  const {inputNombre, edit2} = this.state;
  const {inputDescripcion, edit3} = this.state;
  const {inputPrioridad, edit4} = this.state;

  !edit?
  db.collection("todos").add({
      item: inputValue,
      nombre: inputNombre,
      desc: inputDescripcion,
      priori: inputPrioridad
  }).then (()=>{
      console.log('Agregado')
  }).catch(()=>{
    console.log('error')
  }):
  this.update();

}

getTodo = (id)=> {
  let docRef = db.collection("todos").doc(id);
  docRef.get().then((doc) =>{
    if(doc.exists){
      this.setState({
        inputValue: doc.data().item,
        inputNombre: doc.data().nombre,
        inputDescripcion: doc.data().desc,
        inputPrioridad: doc.data().priori,
        edit: true,
        edit2: true,
        edit3: true,
        edit4: true,
        id: doc.id
      })
    }else{
      console.log('El Documento No Existe')
    }
  }).catch((error => {
    console.log(error);
  }))
};

Borrar = (id) => {
  db.collection("todos").doc(id).delete();
};

update = () => {
  const {id, inputValue, inputNombre, inputDescripcion, inputPrioridad} = this.state;
  db.collection("todos").doc(id).update({

    item: inputValue,
    nombre: inputNombre,
    desc: inputDescripcion,
    priori: inputPrioridad
  }).then (()=>{
    console.log('actualizado')
  }).catch((error)=>{
    console.log(error);
  })


};
   render(){
     const {items, inputValue} = this.state;;
     const {nombres, inputNombre} = this.state;;
     const {descripciones, inputDescripcion} = this.state;;
     const {prioridades, inputPrioridad} = this.state;;
     return(
        <div>
        <Row>
          <Col xs="10">
            <InputGroup>
            <Input
              placeholder = " ID de Tarea"
              value = {inputValue}
              onChange = {this.changeValue}
            />
            <Input
              placeholder = " Nombre de Tarea"
              value = {inputNombre}
              onChange = {this.changeValue2}
            />
            <Input
              placeholder = "Descripcion  de Tarea"
              value = {inputDescripcion}
              onChange = {this.changeValue3}
            />
            <div className="form-group">
            <select
                name="Prioridad"
                className="form-control"
                value = {inputPrioridad}
                onChange = {this.changeValue4}
              >
              <option>Baja</option>
              <option>Media</option>
              <option>Alta</option>
            </select>
          </div>

            </InputGroup>

          </Col>
          <Col xs="2">
            <Button color = "info" onClick = {this.action}>
                {this.state.edit ? 'Editar': 'Agregar'}
            </Button>
          </Col>
        </Row>
          <Table hover className = "text-center">
          <thead>
            <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Prioridad</th>
                <th>Editar</th>
                <th>Eliminar</th>
            </tr>
            </thead>
            <tbody>
              {items && items !== undefined ? items.map ( (item, key) =>
                <tr key = {key}>
                  <td> {item.data.item}</td>
                  <td> {item.data.nombre} </td>
                  <td> {item.data.desc} </td>
                  <td> {item.data.priori} </td>
                  <td> <Button color="warning" onClick={()=> this.getTodo(item.id)}> Editar </Button></td>
                  <td> <Button color="danger" onClick={()=> this.Borrar(item.id)}> Eliminar </Button></td>
                </tr>

              ): null}

            </tbody>
          </Table>
        </div>


     )
   }
}
