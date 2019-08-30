import React, { Component } from 'react';
import './profile.css';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Upload from './Upload';
import Input from '@material-ui/core/Input';


const Joi = require('joi');

let errors = {};
let updateData = {};
class Profile extends Component {
  constructor() {
    super()
    this.state = {
      upload:false,
      flag: false,
      postResult: false,
      getResourceById: {}
    }

  }
uploadresume(value, fileInput, length){
  this.setState({
    upload:value,
  });
  if(length === 1) {
  }

}

async componentWillMount() {
  if(this.props.updateprofileflag){

  console.log(this.props.idSelected);
  await fetch(`http://172.16.75.112:8081/trp/getResourceById/${this.props.idSelected.id}`)

      .then(res => res.json())
            .then(
              (result) => {
                console.log(result)
                sessionStorage.setItem("data", JSON.stringify(result));
                updateData = JSON.parse(sessionStorage.getItem("data"));

                //JSON.parse(sessionStorage.getItem("data"));
                this.setState({
                  getResourceById: JSON.parse(sessionStorage.getItem("data"))
                })
                console.log(updateData)
                return true
                // this.props.handelprofile();
              }
            ).catch(err => {
              console.log(err)
            })
}
}
async submit() {
    if(this.props.updateprofileflag ?true : this.validate() ) {
      console.log("1111111111111111");
      // sessionStorage.setItem("FirstName", this.state.FirstName);
      // sessionStorage.setItem("LastName", this.state.LastName);
      // sessionStorage.setItem("Email", this.state.Email);
      // sessionStorage.setItem("createdUserId", this.state.createdUserId);
      // sessionStorage.setItem("lastModifiedUserId", this.state.lastModifiedUserId);
      // this.props.profileData(this.state);
      await fetch("http://172.16.75.112:8081/trp/saveResource",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'cache-control': 'no-cache',
        },
        body: JSON.stringify({
          // createdUserId: this.state.createdUserId,
          // lastModifiedUserId: this.state.lastModifiedUserId,
          createdUserId: sessionStorage.getItem('userId'),
          lastModifiedUserId: sessionStorage.getItem('userId'),
          firstName: this.props.updateprofileflag  ?this.state.firstName :updateData.firstName  ,
          lastName: this.props.updateprofileflag  ?  this.state.lastName: updateData.lastName,
          resourceEmail: this.props.updateprofileflag  ? this.state.resourceEmail:updateData.resourceEmail,
          city: this.props.updateprofileflag  ?  this.state.city: updateData.city,
          clientName:this.props.updateprofileflag  ?  this.state.clientName:updateData.clientName,
          currProject: this.props.updateprofileflag  ? this.state.currProject:updateData.currProject,
          desiredPosition: this.props.updateprofileflag  ? this.state.desiredPosition:updateData.desiredPosition,
          notes: this.props.updateprofileflag  ? this.state.notes:updateData.notes,
          primaryPhone: this.props.updateprofileflag  ? this.state.primaryPhone: updateData.primaryPhone,
          landLine: this.props.updateprofileflag  ? this.state.landLine:updateData.landLine,
          prevProject: this.props.updateprofileflag  ? this.state.prevProject:updateData.prevProject,
          relocate: this.props.updateprofileflag  ? this.state.relocate:updateData.relocate,
          resourceExp: this.props.updateprofileflag  ? this.state.resourceExp:updateData.resourceExp,
          zip: this.props.updateprofileflag  ? this.state.zip:updateData.zip,
          }),

      })
      .then(res => res.json())
            .then(
              (result) => {
                console.log(result)
                this.setState({
                  postResult: true
                } )
                this.props.handelprofile();
              }
            ).catch(err => {
              console.log(err)
            })
      }
    }
backtodatagrid(){
this.props.handelprofile();
}

handleChange(e) {
  this.setState({
    [e.target.name] : e.target.value
  });
}

validate() {
  errors={};
  let valueflag = false;
  const valid = {
    FirstName: this.state.firstName,
    LastName: this.state.lastName,
    Email: this.state.resourceEmail,
    // createdUserId: this.state.createdUserId,
    // lastModifiedUserId: this.state.lastModifiedUserId
  }
  const schema = {
    FirstName: Joi.string().min(5).max(15).required().error(new Error("FirstName is required")),
    LastName: Joi.string().min(5).max(15).required().error(new Error("LastName is required")),
    Email: Joi.string().required().email({ minDomainAtoms: 2 }).error(new Error("Valid Email is required")),
    // createdUserId: Joi.string().required().error(new Error("createdUserId is required")),
    // lastModifiedUserId: Joi.string().required().error(new Error("lastModifiedUserId is required"))
};
Joi.validate(valid, schema, (err,value)=> {
  console.log(value);
  if(err) {
  console.log("Errorrrrrrr")
  errors["FirstName"] = err.message.includes("FirstName") ? err.message : "";
  errors["LastName"] = err.message.includes("LastName") ? err.message : "";
  errors["Email"] = err.message.includes("Email") ? err.message : "";
  // errors["createdUserId"] = err.message.includes("createdUserId") ? err.message : "";
  // errors["lastModifiedUserId"] = err.message.includes("lastModifiedUserId") ? err.message : "";
  console.log(err.message,errors);
  valueflag = false;
  this.setState({
    flag: valueflag
  })
  } else {
    console.log("33333333333");
    valueflag = true;
    this.setState({
      flag: valueflag
    })
  }
})
return valueflag;
}

render() {
  if(this.state.upload){
   return(
    <Upload uploadresume={this.uploadresume}/>
   )
  }
  
    return (
      <div style={{backgroundColor: '#e0ebeb', textAlign: 'center'}}>
        <br/>
        <h1>{ this.props.addProfile ? "Add Profile" : "Update Profile"}</h1>
        <ul className="nav">
        <li>
        <label>firstName: </label>

        <input
        
            id="firstName"
            label="First name*"
            margin="normal"
            onChange={(e) => this.handleChange(e)}
            name="firstName"
            variant="outlined"
            defaultValue={this.props.updateprofileflag  ? updateData.firstName : updateData.firstName}
        />
        <div className="errorMsg">{errors["FirstName"]}</div>
        </li>
        <br />
        <li>
        <label> LastName: </label>

        <input
          id="LastName"
          label="Last name*"
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="lastName"
          variant="outlined"
          defaultValue={this.props.updateprofileflag ? updateData.lastName : this.state.lastName}
        />
        <div className="errorMsg">{errors["LastName"]}</div>
        </li>
        <br />
        <li>
        <label> Email: </label>

        <input
          id="Email"
          label="Email*"
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="resourceEmail"
          variant="outlined"
          defaultValue={this.props.updateprofileflag ? updateData.resourceEmail : this.state.resourceEmail}
        />
        <div className="errorMsg">{errors["Email"]}</div>
        </li>
        
        </ul>
        <br />
        <ul className="nav">
          <li>
          <label>primaryPhone: </label>

            <input
              id="primaryPhone"
              label="primaryPhone"
              onChange={(e) => this.handleChange(e)}
              margin="normal"
              name="primaryPhone"
              variant="outlined"
              defaultValue={this.props.updateprofileflag ? updateData.primaryPhone : this.state.primaryPhone}
            />
          </li>
          <br />
          <li>
          <label> SecondaryPhone: </label>

          <input
            id="landLine"
            label="landLine"
            onChange={(e) => this.handleChange(e)}
            margin="normal"
            name="landLine"
            variant="outlined"
            defaultValue={this.props.updateprofileflag ? updateData.landLine : this.state.landLine}
          />
        </li>
        <br />
        <li>

          <InputLabel htmlFor="outlined-age-simple">
          Select a State
          </InputLabel>
        <Select
          input={<OutlinedInput name="state" id="state" />}
          onChange={(e) => this.handleChange(e)}
          placeholder="Select a State"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>TN</MenuItem>
          <MenuItem value={20}>AL</MenuItem>
          <MenuItem value={30}>AK</MenuItem>
        </Select>
        </li>
        <br />
        <li>
        <label> city: </label>

        <input
          id="city"
          label="city"
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="city"
          variant="outlined"
          defaultValue={this.props.updateprofileflag ? updateData.city : this.state.city}
        />
        </li>
      </ul>
      <br/>
        <ul className="nav">
          <li>
          <label> Zip Code: </label>

        <input
          id="Zip Code"
          label="Zip Code"
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="zip"
          variant="outlined"
          defaultValue={this.props.updateprofileflag ? updateData.zip : this.state.zip}
        />
          </li><br/><li>
          <label> Current Project: </label>

          <input
          id="Current Project"
          label="Current Project"
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="currProject"
          variant="outlined"
          defaultValue={this.props.updateprofileflag ? updateData.currProject : this.state.currProject}
        />
        </li><br/><li>
        <label>Desired Position</label>

        <input
          id="Previous Project"
          label="Previous Project"
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="prevProject"
          variant="outlined"
          defaultalue={this.props.updateprofileflag ? updateData.prevProject : this.state.prevProject}
        />
        </li>
        </ul>
        <br/>
        <ul className="nav">
          <li>
          <label> clientName: </label>

        <input
          id="clientName"
          label="clientName"
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="clientName"
          variant="outlined"
          defaultalue={this.props.updateprofileflag ? updateData.clientName : this.state.clientName}
        />
          </li><br/><li>
          <label>Relocate: </label>

          <input
          id="Relocate"
          label="Relocate"
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="relocate"
          variant="outlined"
          defaultalue={this.props.updateprofileflag ? updateData.relocate : this.state.relocate}
        />
        </li><br/><li>
        <label> Experience: </label>

        <input
          id="Experience"
          label="Experience"
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="resourceExp"
          variant="outlined"
          defaultValue={this.props.updateprofileflag ? updateData.resourceExp : this.state.resourceExp}
        />
        </li>
        </ul>
        <br/>
        <ul className="nav">
          <li>
          <label> Skills: </label>

        <input
          id="Skills"
          label="Skills"
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="Skills"
          variant="outlined"
        />
          </li><br/><li>
            <label>Desired Position</label>
          <input
          id="Desired Position"
          label="Desired Position"
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="desiredPosition"
          variant="outlined"
          defaultValue={this.props.updateprofileflag ? updateData.desiredPosition : this.state.desiredPosition}
        />
        </li><br/><li>
        <label> Notes: </label>

        <input
          id="Notes"
          label="Notes"
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="notes"
          variant="outlined"
          defaultValue={this.props.updateprofileflag ? updateData.notes : this.state.notes}
        />
        </li>
        </ul>
        <br/>
        <div>
        <Button variant="contained" component="span" onClick={(e) => this.uploadresume(true,null,null)}>
          Upload Resume
        </Button>
        </div>
        <br/>
        <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="full-width contained primary button group"
        >
        <Button type="submit" variant="contained" color="primary" onClick={(e) => this.submit(e)}>
          Submit

        </Button>
        <Button type="button" variant="contained" color="primary" onClick={(e) => this.backtodatagrid(e)}>
        Back
        </Button>
        </ButtonGroup>
      </div>

    );
  }
}
export default Profile;
