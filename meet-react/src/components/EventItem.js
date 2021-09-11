import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteEventItem } from '../redux/eventSlice';
import { Link } from "react-router-dom";
import { Row, Col, Button } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.css';
const EventItem = ({ id, event, activeRowId, setActiveRowId }) => {
    const dispatch = useDispatch();

    const expandClick = (pid) => {
        //  alert(pid + "=" + activeRowId);
        if (pid === activeRowId) {
            setActiveRowId(0);
            activeRowId = 0;
        } else {
            //   alert("set equal " + activeRowId)
            setActiveRowId(pid);
            activeRowId = pid
        }
    };

    return (
        <Row key="eventId">

            <Col className="col-md-4 text-start">
                <Link to={`/edit/${event.eventId}`}>{event.title}</Link>
            </Col>
            <Col className="col-md-4 text-start">
                {event.city}
            </Col>
            <Col>
                <Button onClick={() => expandClick(event.eventId)}>...</Button>
                {
                    activeRowId === event.eventId ?
                        <div>
                            {event.date} | {event.time} |
                            {event.description} |  {event.city}

                            <hr />
                        </div>
                        : <span />
                }
            </Col>



        </Row>


    );
};

export default EventItem;