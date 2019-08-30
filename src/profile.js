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
uploadresume(){
  this.setState({
    upload:true,
  })
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
    FirstName: this.state.FirstName,
    LastName: this.state.LastName,
    Email: this.state.Email,
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
    <Upload />
   )
  }
    return (
      <div style={{backgroundColor: '#e0ebeb', textAlign: 'center'}}>
        <br/>
        <h1>Add Profile </h1>
        <ul className="nav">
        <li>
        <TextField
            id="firstName"
            label="First name*"
            margin="normal"
            onChange={(e) => this.handleChange(e)}
            name="FirstName"
            variant="outlined"
            value={this.props.updateprofileflag ? updateData.firstName : this.state.FirstName}
        />
        <div className="errorMsg">{errors["FirstName"]}</div>
        </li>
        <br />
        <li>
        <TextField
          id="LastName"
          label="Last name*"
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="LastName"
          variant="outlined"
          value={this.props.updateprofileflag ? updateData.lastName : this.state.LastName}
        />
        <div className="errorMsg">{errors["LastName"]}</div>
        </li>
        <br />
        <li>
        <TextField
          id="Email"
          label="Email*"
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="Email"
          variant="outlined"
          value={this.props.updateprofileflag ? updateData.personalEmail : this.state.Email}
        />
        <div className="errorMsg">{errors["Email"]}</div>
        </li>
        </ul>
        <br />
        <ul className="nav">
          <li>
            <TextField
              id="Phone"
              label="Phone"
              onChange={(e) => this.handleChange(e)}
              margin="normal"
              name="Phone"
              variant="outlined"
              value={this.props.updateprofileflag ? updateData.personalEmail : this.state.Email}
            />
          </li>
          <br />
          <li>
          <TextField
            id="Address"
            label="Address"
            onChange={(e) => this.handleChange(e)}
            margin="normal"
            name="Address"
            variant="outlined"
          />
        </li>
        <br />
        <li>
          <InputLabel htmlFor="outlined-age-simple">
          Select a State
          </InputLabel>
        <Select
          input={<OutlinedInput name="State" id="state" />}
          onChange={(e) => this.handleChange(e)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        </li>
        <br />
        <li>

        <TextField
          id="City"
          label="City"
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="City"
          variant="outlined"
          value={this.props.updateprofileflag ? updateData.City : this.state.City}
        />
        </li>
      </ul>
      <br/>
        <ul className="nav">
          <li>
        <TextField
          id="Zip Code"
          label="Zip Code"
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="ZipCode"
          variant="outlined"
        />
          </li><br/><li>
          <TextField
          id="Current Project"
          label="Current Project"
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="CurrentProject"
          variant="outlined"
        />
        </li><br/><li>
        <TextField
          id="Previous Project"
          label="Previous Project"
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="PreviousProject"
          variant="outlined"
        />
        </li>
        </ul>
        <br/>
        <ul className="nav">
          <li>
        <TextField
          id="Visa"
          label="Visa"
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="Visa"
          variant="outlined"
        />
          </li><br/><li>
          <TextField
          id="Relocate"
          label="Relocate"
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="Relocate"
          variant="outlined"
        />
        </li><br/><li>
        <TextField
          id="Experience"
          label="Experience"
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="Experience"
          variant="outlined"
        />
        </li>
        </ul>
        <br/>
        <ul className="nav">
          <li>
        <TextField
          id="Skills"
          label="Skills"
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="Skills"
          variant="outlined"
        />
          </li><br/><li>
          <TextField
          id="Desired Position"
          label="Desired Position"
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="DesiredPosition"
          variant="outlined"
        />
        </li><br/><li>
        <TextField
          id="Notes"
          label="Notes"
          onChange={(e) => this.handleChange(e)}
          margin="normal"
          name="Notes"
          variant="outlined"
        />
        </li>
        </ul>
        <br/>
        <div>
        <Button variant="contained" component="span" onClick={(e) => this.uploadresume(e)}>
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
