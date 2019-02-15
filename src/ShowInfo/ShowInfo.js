import React from 'react';

const ShowInfo = (props) => {

  // handleChange(event) {
  //   this.setState({value: event.target.value});
  // }

    return (
  		<div style={{
  			border: '1px solid #ccc',
  			marginBottom: '10px',
  			display: 'block',
  			padding: '10px'
  		}}>
  		  <p>Выбран пользователь: <strong>{props.firstName} {props.lastName}</strong></p>
        {/*<p>Описание: <br/>
          <textarea
            cols="70" rows="5"
            className="TextArea"
            value={props.description}
            onChange={this.handleChange}
          />
        </p>*/}
        <p>Описание: {props.description}</p>
        <p>Адрес проживания: <strong>{props.streetAddress}</strong></p>
        <p>Город: <strong>{props.city}</strong></p>
        <p>Провинция/штат: <strong>{props.state}</strong></p>
        <p>Индекс: <strong>{props.zip}</strong></p>
  		</div>
  	)


}

export default ShowInfo;
