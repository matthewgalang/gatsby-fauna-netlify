import React, { Component } from 'react';
import api from '../utils/api';
import isLocalHost from '../utils/isLocalHost';

export default class Counts extends Component {
    state = {
        "stackoverflow.com":"",
        coffeeCupsCount: "",
        codeLinesCount: ""
    }

    componentDidMount() {
        // Fetch all counts
        api.readAll().then((counts) => {
            if (counts.message === 'unauthorized') {
                if (isLocalHost()) {
                alert('FaunaDB key is not unauthorized. Make sure you set it in terminal session where you ran `npm start`. Visit http://bit.ly/set-fauna-key for more info')
                } else {
                alert('FaunaDB key is not unauthorized. Verify the key `FAUNADB_SERVER_SECRET` set in Netlify enviroment variables is correct')
                }
                return false
            }
            console.log('state', this.state)
            this.setState(Object.fromEntries(counts.map((count) => [count.data.title,count.data.count])))
        })
    }
    renderVisits() {
        return(
        <div key="visits">
            Visited stackoverflow {this.state["stackoverflow.com"]} times.
        </div>
        )
    }
    renderCups() {
        return(
        <div key="cups">
            { this.state.coffeeCupsCount } cups of coffee brewed at M4S.
        </div>
        )
    }
    renderLines() {
        return(
        <div key="lines">
            { this.state.codeLinesCount } lines of code.
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