import React from 'react'
import './personaltabs.css'
import Scrape from '../scrape/scrape'
import Doctors from '../Doctors/Doctors'
import Medications from '../Medications/Medications'
import API from '../../utils/API'

class PersonalTabs extends React.Component {

  state = {
    scrape: [],
    doctors: [],
    medications: [],
    scraperTab: "active",
    doctorsTab: "",
    medicationsTab: "",
    userID: this.props.userID
  }

  componentWillMount(){
    this.scrape()
    this.getDoctors()
    this.getMedications()
  }

  toggleSwitch = event => {
    event.preventDefault()
    let name = event.target.name
    switch (name) {
      case "scraper":
        this.setState({ scraperTab: "active", doctorsTab: "", medicationsTab: "" })
        break
      case "doctors":
        this.setState({ scraperTab: "", doctorsTab: "active", medicationsTab: "" })
        break
      case "medications":
        this.setState({ scraperTab: "", doctorsTab: "", medicationsTab: "active" })
        break
      default:
        this.setState({ scraperTab: "active", doctorsTab: "", medicationsTab: "" })
    }
  }
  
  scrape = () => {
    API.scrape().then(async response => {
      await this.setState({
        scrape: response.data
      })
    }).catch(err => console.log(err))
  }

  getDoctors = () => {
    // API call to get all Dr Info and use as callback
    API.getDoctors().then(async response => {
      console.log(response)
      await this.setState({ doctors: response.data.allDoctors })
      console.log(this.state.doctors)
    }).catch(err => console.log(err))
  }

  getMedications = () => {
    // API call to get all meds and use as callback
    API.getMedications().then(async response => {
      console.log(response)
      await this.setState({ medications: response.data.allMedications })
      console.log(this.state.medications)
    }).catch(err => console.log(err))
  }

  render() {
    return (
      <div className="jumbotron personaltabs">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button className={`nav-link ${this.state.scraperTab}`} name={"scraper"} onClick={this.toggleSwitch}>Articles</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${this.state.doctorsTab}`} name={"doctors"} onClick={this.toggleSwitch}>My Doctors</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${this.state.medicationsTab}`} name={"medications"} onClick={this.toggleSwitch}>My Meds</button>
          </li>
        </ul>
        <br/>

        {(this.state.scraperTab === "active") ?
          <Scrape scrape={this.state.scrape}/> : 
          (this.state.doctorsTab === "active") ?
          <Doctors userID={this.props.userID} getDoctors={this.getDoctors} doctors={this.state.doctors}/> : 
          (this.state.medicationsTab === "active") ?
          <Medications userID={this.props.userID} getMedications={this.getMedications} medications={this.state.medications}/> : ""
        }

        {/* {(this.state.doctorsTab === "active") && (this.state.doctors[0]) (
          <div>
          <h6>My Doctors</h6>
          <Doctors userID={this.props.userID} doctors={this.state.doctors} getDoctors={this.getDoctors}/>
        </div> 
        )}
        {(this.state.doctorsTab === "active") && (this.state.doctors) (
          <div>
            <h6>No Doctor's information.</h6>
            <p>Enter in your Doctor's information.</p>
            <Medications userID={this.props.userID} medications={this.state.medications} getMedications={this.getMedications}/>
          </div>
        )}

        {(this.state.medicationsTab === "active") && (this.state.medications[0]) (
          <div>
            <h6>My Medications</h6>
            <Medications userID={this.props.userID} medications={this.state.medications} getMedications={this.getMedications}/>
          </div> 
        )}
        {(this.state.medicationsTav === "active") && (this.state.medications) (
          <div>
            <h6>No Medications stored.</h6>
            <p>Enter in your Medication's information.</p>
            <Medications userID={this.props.userID} medications={this.state.medications} getMedications={this.getMedications}/>
          </div>
        )} */}
      </div>
    )
  }
}

export default PersonalTabs