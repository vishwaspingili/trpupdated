import React, { Component } from 'react';
import './Upload.css';
let fileupl = [];
class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  submit(e) {
    if(fileupl.length > 0) {
      fetch('http://172.16.75.55:8080/trp/uploadResume', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Content-Disposition': 'form-data',
        },  body: JSON.stringify({
          userId: this.state.UserId,
          userPwd: this.state.Password
          }),
      })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          if(result.responseCode.errorCode==="0"){
            // result.responseCode.errorCode==="0"
            console.log("Uploaded successfully");
          }
          else{
            console.log("Unable to upload");
        }}
      ).catch(err => {
        console.log(err)
      })

    }
    this.props.uploadresume(false, null,null)
  }

  handleChange(e){
    // let fd = new FormData();

    fileupl = []
    for(let i =0; i< e.target.files.length; i++) {
      fileupl.push(e.target.files[i]);
      //fd.append('uploadFiles', e.target.files[i], e.target.files[i].name);
    }
    
    this.props.uploadresume(false,fileupl, fileupl.length);

    //sessionStorage.setItem('filesUploaded', fileupl.toString());

    // let reader = new FileReader();
    // reader.readAsDataURL(fileupl[0]);
    // reader.onload = function(ff) {
    // console.log(ff.target.result)
  //}
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

          <center><input type="file" name="drag and drop" onChange={ (e) => this.handleChange(e) } /></center>
          <br />
          <center> <input type="submit" onClick={(e) => this.submit(e)} value="Submit" /></center>
          <br />
          <br />

      </div>
    )
  }
}
export default Upload;
