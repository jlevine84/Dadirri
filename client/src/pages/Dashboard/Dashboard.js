import React from 'react'
import './dashboard.css'
import Calendar from '../../components/Calendar/Calendar'
import LogUserData from './../../components/LogUserData/LogUserData';
import ViewUserData from './../../components/ViewUserData/ViewUserData';
import BarChart from '../../components/Charts/BarChart.js'
import LineChart from '../../components/Charts/LineChart.js'
import API from '../../utils/API';
import moment from 'moment'

class Dashboard extends React.Component {

  state = {
    selectedDate: moment().format('MMMM DD YYYY'),
    Mood: "",
    Anxiety: "",
    Energy: "",
    MedicineTaken: "",
    Exercise: "",
    SleepHours: "",
    DailyLog: "",
    ExerciseAmount: "",
    Date: "",
    dateRangeStart: "", 
    dateRangeEnd: ""
  }

  componentDidMount() {
    this.viewByDate()
  }

  grabCalendarDate = (grabMonth, grabDay, grabYear) => {
    let date = `${grabMonth} ${grabDay} ${grabYear}`
    this.setState({ selectedDate: date })
    this.viewByDate()
  }

  viewByDate = async () => {
    console.log(`First API Fire: ${this.state.selectedDate}`)
    API.getByDate(this.state.selectedDate)
    .then( async response => {
      if (response.data.todaysentry[0]) {
        await this.setState({
            Mood: response.data.todaysentry[0].Mood,
            Anxiety: response.data.todaysentry[0].Anxiety,
            Energy: response.data.todaysentry[0].Energy,
            MedicineTaken: response.data.todaysentry[0].MedicineTaken,
            Exercise: response.data.todaysentry[0].Exercise,
            SleepHours: response.data.todaysentry[0].SleepHours,
            DailyLog: response.data.todaysentry[0].DailyLog,
            ExerciseAmount: response.data.todaysentry[0].ExerciseAmount,
            Date: response.data.todaysentry[0].Date
        })
      } else {
        await this.setState({ 
          Mood: "",
          Anxiety: "",
          Energy: "",
          MedicineTaken: "",
          Exercise: "",
          SleepHours: "",
          DailyLog: "",
          ExerciseAmount: "",
          Date: ""
        })
      }
    }).catch(err => console.log(err))
  }

  // Stuff for Jeffy to Dooz
  grabDateRange = () => {

  }

  viewDateRange = () => {

  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-6">
            <BarChart/>
            <LineChart/>
          </div>
          <div className="col-6">
            <div className="calendar-component">
              <Calendar grabCalendarDate={this.grabCalendarDate}/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            
            <ViewUserData  
              selectedDate={this.state.selectedDate}
              mood={this.state.Mood}
              anxiety={this.state.Anxiety}
              energy={this.state.Energy}
              medicineTaken={this.state.MedicineTaken.toString()}
              exercise={this.state.Exercise.toString()}
              sleepHours={this.state.SleepHours}
              dailyLog={this.state.DailyLog}
              exerciseAmount={this.state.ExerciseAmount}
              date={this.state.Date}
              noInfo={"No Info"}
            />
          </div>
          <div className="col-6">

          <LogUserData userID={this.props.userID}/>

          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard