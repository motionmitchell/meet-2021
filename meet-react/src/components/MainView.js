import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import EventForm from './EventForm';
import EventList from './EventList';
import Chart from './Chart';
const MainView = () => {

    return (
        <Router>
            <div>version: 4</div>
            <div className="left20px container">

                <span>

                    <Link to={"/events"} > Events</Link>
                    |<Link to={"/form"}> Add Event</Link>
                    | <Link to={"/chart"}> Chart</Link>
                </span>


                <hr />
            </div>
            <Switch>
                <Route exact path="/">

                </Route>


                <Route exact path="/events">
                    <EventList />
                </Route>
                <Route exact path="/chart">
                    <Chart />
                </Route>

                <Route path="/form">
                    <EventForm id={0} />
                </Route>
                <Route path="/edit/:eventId"
                    render={({ match }) => (
                        <EventForm id={match.params.eventId} />
                    )}
                />
            </Switch>
        </Router>
    )
}


export default MainView;