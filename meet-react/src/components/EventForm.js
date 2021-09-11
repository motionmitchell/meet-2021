import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addEventItem, getEvent } from '../redux/eventSlice';
import { Row, Col, Container } from 'react-bootstrap';
<link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
    crossorigin="anonymous"
/>
const EventForm = ({ id }) => {
    // const [event, setEvent] = useState({ });
    const [eventId, setEventId] = useState(0);
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [city, setCity] = useState('');
    const [capacity, setCapacity] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("FORM: " + id);
        //  dispatch(getEvent(id));
        setEventId(id);
        dispatch(getEvent({ id: id })).then((data) => {

            const e = data.payload.event;
            // setEvent(e);
            console.log("EVENT", e);
            setEventDate(e.date);
            setEventTime(e.time);
            setCity(e.city);
            setCapacity(e.capacity);
            setContactName(e.contactInfo.name);
            setContactEmail(e.contactInfo.email);
            setDescription(e.description);
            setTitle(e.title);

            //        this.setState({ movie: data.payload.movie, isLoaded: true });

        })
        //setLocation(eventObj.location);
    }, []);
    const onSubmit = (e) => {
        e.preventDefault();

        if (title && eventDate && eventTime) {
            const eventObject = {
                eventId: eventId,
                userId: 1,
                date: eventDate,
                time: eventTime,
                city: city,
                capacity: capacity,
                contactInfo: { name: contactName, email: contactEmail },
                title: title,
                description: description
            };
            console.log("NEW EVENT", eventObject);
            dispatch(
                addEventItem({
                    event: eventObject,
                })
            ).then((resp) => {
                setMessage(resp.payload.message)
            });
        }
    };

    return (
        <div>
            <Container>
                <form onSubmit={onSubmit} >
                    <Row>

                        <Col className="col-md-4">
                            <input
                                type='date'
                                className='form-control mb-2 mr-sm-2'
                                placeholder="Event Date"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}>
                            </input>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-md-4">
                            <input
                                type='text'
                                className='form-control mb-2 mr-sm-2'
                                placeholder="Event Time"
                                value={eventTime}
                                onChange={(e) => setEventTime(e.target.value)}>
                            </input>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-md-4">

                            <input
                                type='text'
                                className='form-control mb-2 mr-sm-2'
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}>
                            </input>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-md-4">

                            <input
                                type='text'
                                className='form-control mb-2 mr-sm-2'
                                placeholder="Capacity"
                                value={capacity}
                                onChange={(e) => setCapacity(e.target.value)}>
                            </input>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-md-4">

                            <input
                                type='text'
                                className='form-control mb-2 mr-sm-2'
                                placeholder="Contact Name"
                                value={contactName}
                                onChange={(e) => setContactName(e.target.value)}>
                            </input>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-md-4">

                            <input
                                type='text'
                                className='form-control mb-2 mr-sm-2'
                                placeholder="Contact Email"
                                value={contactEmail}
                                onChange={(e) => setContactEmail(e.target.value)}>
                            </input>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-md-4">

                            <input
                                type='text'
                                className='form-control mb-2 mr-sm-2'
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}>
                            </input>
                        </Col>
                    </Row>
                    <Row>
                        <Col>

                            <input
                                type='text'
                                className='form-control mb-2 mr-sm-2'
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}>
                            </input>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <button type='submit' className='btn btn-primary mb-2'>
                                Submit
                            </button>
                        </Col>

                    </Row>
                </form>
                <div>{message}</div>
            </Container>
        </div>
    );
};

export default EventForm;