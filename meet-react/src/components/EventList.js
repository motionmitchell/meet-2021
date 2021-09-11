import React, { useEffect, useState } from 'react';
import EventItem from './EventItem';
import { useSelector, useDispatch } from 'react-redux';
import { getEventList } from '../redux/eventSlice';
import { Container, Row, Col } from 'react-bootstrap';
const EventList = () => {
    const dispatch = useDispatch();
    // const events = useSelector((state) => state.events);
    const [events, setEvents] = useState([]);
    const [eventCount, setEventCount] = useState(32);
    const [activeRowId, setActiveRowId] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(getEventList({ fetchCount: eventCount })).then((data) => {
            console.log("loaded", data);
            setEvents(data.payload.events);
            setIsLoaded(true)
        })
    }, [eventCount]);
    const changeEventCount = (e) => {
        alert(eventCount);
    }
    return (
        <Container>
            <div>Events:<input type='text' value={eventCount} onChange={(e) => setEventCount(e.target.value)}
                onBlur={changeEventCount} /></div>
            {isLoaded ? events.map((event) => (

                <EventItem id={event.eventId} event={event} activeRowId={activeRowId} setActiveRowId={setActiveRowId} />
            )) : <div />}
        </Container>
    );
};
export default EventList;