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

async componentDidMount() {
  if(this.props.updateprofileflag){

  console.log(this.props.idSelected);
  await fetch(`http://172.16.75.112:8080/trp/getResourceById/${this.props.idSelected.id}`)

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
                // this.props.handelprofile();
              }
            ).catch(err => {
              console.log(err)
            })
}
}
async submit() {
    if(this.validate()) {
      console.log("1111111111111111");
      // sessionStorage.setItem("FirstName", this.state.FirstName);
      // sessionStorage.setItem("LastName", this.state.LastName);
      // sessionStorage.setItem("Email", this.state.Email);
      // sessionStorage.setItem("createdUserId", this.state.createdUserId);
      // sessionStorage.setItem("lastModifiedUserId", this.state.lastModifiedUserId);
      // this.props.profileData(this.state);
      await fetch("http://172.16.75.112:8080/trp/saveResource",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'cache-control': 'no-cache',
        },
        body: JSON.stringify({
          // createdUserId: this.state.createdUserId,
          // lastModifiedUserId: this.state.lastModifiedUserId,
          createdUserId: sessionStorage.getItem('UserId'),
          lastModifiedUserId: sessionStorage.getItem('UserId'),
          firstName: this.state.FirstName,
          lastName: this.state.LastName,
          resourceEmail: this.state.Email,
          city: this.state.city,
          clientName: this.state.clientName,
          currProject: this.state.currProject,
          desiredPosition: this.state.desiredPosition,
          notes: this.state.notes,
          primaryPhone: this.state.primaryPhone,
          landLine: this.state.landLine,
          prevProject: this.state.prevProject,
          relocate: this.state.relocate,
          resourceExp: this.state.resourceExp,
          zip: this.state.zip,
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
    createdUserId: this.state.createdUserId,
    lastModifiedUserId: this.state.lastModifiedUserId
  }
  const schema = {
    FirstName: Joi.string().min(5).max(15).required().error(new Error("FirstName is required")),
    LastName: Joi.string().min(5).max(15).required().error(new Error("LastName is required")),
    Email: Joi.string().required().email({ minDomainAtoms: 2 }).error(new Error("Valid Email is required")),
    createdUserId: Joi.string().required().error(new Error("createdUserId is required")),
    lastModifiedUserId: Joi.string().required().error(new Error("lastModifiedUserId is required"))
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
        <TextField
            id="firstName"
            label={this.props.updateprofileflag ? "" :"First name*"}
            margin="normal"
            onChange={(e) => this.handleChange(e)}
            name="firstName"
            variant="outlined"
            defaultValue={this.props.updateprofileflag ? updateData.firstName : this.state.firstName}
        />
        <div className="errorMsg">{errors["FirstName"]}</div>
        </li>
        <br />
        <li>
        <TextField
          id="LastName"
          label={this.props.updateprofileflag ? "" :"Last name*"}
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
        <TextField
          id="Email"
          label={this.props.updateprofileflag ? "" :"Email*"}
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
            <TextField
              id="primaryPhone"
              label={this.props.updateprofileflag ? "" :"primaryPhone"}
              onChange={(e) => this.handleChange(e)}
              margin="normal"
              name="primaryPhone"
              variant="outlined"
              defaultValue={this.props.updateprofileflag ? updateData.primaryPhone : this.state.primaryPhone}
            />
          </li>
          <br />
          <li>
          <TextField
            id="landLine"
            label={this.props.updateprofileflag ? "" :"landLine"}
            onChange={(e) => this.handleChange(e)}
            margin="normal"
            name="landLine"
            variant="outlined"
            defaultValue={this.props.updateprofileflag ? updateData.landLine : this.state.landLine}
          />
        </li>
        <br />
        <li>
          {/* <InputLabel htmlFor="outlined-age-simple">
          Select a State
          </InputLabel> */}
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

        <TextField
          id="city"
          label={this.props.updateprofileflag ? "" :"city"}
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
        <TextField
          id="Zip Code"
          label={this.props.updateprofileflag ? "" :"Zip Code"}
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="zip"
          variant="outlined"
          defaultValue={this.props.updateprofileflag ? updateData.zip : this.state.zip}
        />
          </li><br/><li>
          <TextField
          id="Current Project"
          label={this.props.updateprofileflag ? "" :"Current Project"}
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="currProject"
          variant="outlined"
          defaultValue={this.props.updateprofileflag ? updateData.currProject : this.state.currProject}
        />
        </li><br/><li>
        <TextField
          id="Previous Project"
          label={this.props.updateprofileflag ? "" :"Previous Project"}
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="prevProject"
          variant="outlined"
          defaultValue={this.props.updateprofileflag ? updateData.prevProject : this.state.prevProject}
        />
        </li>
        </ul>
        <br/>
        <ul className="nav">
          <li>
        <TextField
          id="clientName"
          label={this.props.updateprofileflag ? "" :"clientName"}
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="clientName"
          variant="outlined"
          defaultValue={this.props.updateprofileflag ? updateData.clientName : this.state.clientName}
        />
          </li><br/><li>
          <TextField
          id="Relocate"
          label={this.props.updateprofileflag ? "" :"Relocate"}
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="relocate"
          variant="outlined"
          defaultValue={this.props.updateprofileflag ? updateData.relocate : this.state.relocate}
        />
        </li><br/><li>
        <TextField
          id="Experience"
          label={this.props.updateprofileflag ? "" :"Experience"}
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
        <TextField
          id="Skills"
          label={this.props.updateprofileflag ? "" :"Skills"}
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="Skills"
          variant="outlined"
        />
          </li><br/><li>
          <TextField
          id="Desired Position"
          label={this.props.updateprofileflag ? "" :"Desired Position"}
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="desiredPosition"
          variant="outlined"
          defaultValue={this.props.updateprofileflag ? updateData.desiredPosition : this.state.desiredPosition}
        />
        </li><br/><li>
        <TextField
          id="Notes"
          label={this.props.updateprofileflag ? "" :"Notes"}
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
