import React, { Component } from 'react';
import './Upload.css';

class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  submit(e) {
    // this.setState({
    //   username: "",
    //   showLogin: true
    // })
    // this.props.handelresume()
  }

  handleChange(e){
    console.log(e[0]);
    console.log(e[0].name);
    // this.props.uploadResume(this.props.indexSelected, e[0]);
  }
  backtodatagrid(e){
    // this.props.handelresume()
    }
    
  render() {
    return (
      <div className="UploadApp">
          <button type="button" onClick={(e) => this.backtodatagrid(e)}>Back</button>            
            <br />
            <h1>Upload Resume</h1> 

          <center><input type="file" name="drag and drop" onChange={ (e) => this.handleChange(e.target.files) } /></center>
          <br />
          <center> <input type="submit" onClick={(e) => this.submit(e)} value="Submit" /></center>
          <br />
          <br />
        
      </div>
    )
  }
}
export default Upload;