import React, { Component } from 'react';
import api from '../utils/api';
import isLocalHost from '../utils/isLocalHost';
import './odometer-theme-minimal.css';
import Odometer from "react-odometerjs";

export default class Counts extends Component {
    state = {
        "stackoverflow.com":"",
        coffeeCupsCount: 0,
        codeLinesCount: "",
        odometerValue:0
    }

    componentDidMount() {
        // Fetch all counts
        
        this.updateCups()
        api.readAll().then((counts) => {
            if (counts.message === 'unauthorized') {
                if (isLocalHost()) {
                alert('FaunaDB key is not unauthorized. Make sure you set it in terminal session where you ran `npm start`. Visit http://bit.ly/set-fauna-key for more info')
                } else {
                alert('FaunaDB key is not unauthorized. Verify the key `FAUNADB_SERVER_SECRET` set in Netlify enviroment variables is correct')
                }
                return false
            }
            
            this.setState(Object.fromEntries(counts.map((count) => [count.data.title,count.data.count])))
            console.log('state', this.state)
        })
        // const intervalId = setInterval(() => recurringFunction(), 10000)
        // this.setState({ intervalId })
    }
    updateCups(){
        const today = new Date()
        const firstcup = new Date('2017-01-23T08:00:00')
        const totaldaydiff = Math.ceil(Math.abs(today.getTime() - firstcup.getTime())/(1000*60*60*24))
        var workdays = totaldaydiff - (Math.floor(totaldaydiff/7) * 2)
        const todayDay = today.getDay()
        const firstcupDay = firstcup.getDay()
        if (firstcupDay - todayDay > 1) {
            workdays = workdays - 2
        }
        if (firstcupDay === 0 && todayDay !== 6) {
            workdays = workdays - 1
        }
        if (firstcupDay === 6 && todayDay !== 0) {
            workdays = workdays - 1
        }
        this.setState({
            coffeeCupsCount: workdays
        })
    }
    renderVisits() {
        return(
        <div key="visits">
            <span>Visited stackoverflow <Odometer 
                format="d" 
                duration={10000} 
                value={ this.state["stackoverflow.com"] ? this.state["stackoverflow.com"] : this.state.odometerValue }/> times.
            </span>
        </div>
        )
    }
    renderCups() {
        return(
        <div key="cups">
            <span>
                <Odometer 
                format="d" 
                duration={10000} 
                value={ this.state.coffeeCupsCount ? this.state.coffeeCupsCount : this.state.odometerValue }/> cups of coffee brewed at M4S.
            </span>
        </div>
        )
    }
    renderLines() {
        return(
        <div key="lines">
            <span>
                <Odometer 
                format="d" 
                duration={10000} 
                value={ this.state.codeLinesCount ? this.state.codeLinesCount : this.state.odometerValue }/> lines of code.
            </span>
        </div>
        )
    }
    render() {
        return (
        <div>
            {this.renderVisits()}
            {this.renderCups()}
            {this.renderLines()}
        </div>
        );
    }
}