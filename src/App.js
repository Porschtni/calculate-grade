import './App.css';
import React, { Component } from 'react'; 

class App extends Component {
  constructor() {
    super();
    this.state = {
      number: '',
      Grade: '-'
    };
     
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    
  handleChange(event) {
    const re = /^[0-9\b]+$/;
      if (event.target.value === '' || re.test(event.target.value)) { 
        if(event.target.value > 100)
          this.setState({number: 100})
        else if(event.target.value < 0)
          this.setState({number: ''})
        else
          this.setState({number: event.target.value})
      }
  }
    
  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
  }

  sendAPI() { 
    if(this.state.number != ''){
      // GET request using fetch with set headers
      const headers = { 'Content-Type': 'application/json' }
      fetch('http://localhost:9000/gradeAll/'+this.state.number, { headers })
        .then(async response => {
          const data = await response.json(); 
          this.setState({ Grade: data.grade })
        })
        .then(data => console.log(data));
    }
  }
    
  render() {
    return ( 
        <div className="App">  
            <form onSubmit={this.handleSubmit}>
            <h1>Calculate grade</h1>
            <p>Enter your score:</p>
              <input 
                  type="text"
                  value={this.state.number} 
                  onChange={this.handleChange}
                  placeholder='0-100'
                  maxLength="3" />
              <button onClick={() =>this.sendAPI()} >Submit</button>
            </form>
            <h1>Grade : {this.state.Grade}</h1> 
        </div> 
    );
  }
}
export default App;