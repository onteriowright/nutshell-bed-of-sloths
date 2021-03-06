import React, { useContext, useState, useEffect, useRef } from "react"
import { EventContext } from "./EventsProvider"

export default props => {
    const { addEvent, events, editEvent } = useContext(EventContext)
    const [event, setEvent] = useState({})
    const [buttonClicked, setButtonClicked] = useState(false)
    const eventName = useRef("")
    const eventDate = useRef("")
    const eventClosingDate = useRef("")
    const eventLocation = useRef("")

    const editMode = props.match.params.hasOwnProperty("eventId")

    const handleControlledInputChange = (e) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newEvent = Object.assign({}, event)
        newEvent[e.target.name] = e.target.value
        setEvent(newEvent)
    }

    const setDefaults = () => {
        if (editMode) {
            const eventId = parseInt(props.match.params.eventId)
            const selectedEvent = events.find(e => e.id === eventId) || {}
            setEvent(selectedEvent)
        }
    }

    useEffect(() => {
        setDefaults()
    }, [events])

    const formatDateTime = (dateValue) => {
        let formattedDate = new Date(dateValue).toString()
        console.log(`formattedDate is ${formattedDate}`)
        formattedDate = formattedDate.split(" ")
        switch (formattedDate[0]) {
            case "Sun":
                formattedDate[0] = "Sunday,";
                break;
            case "Mon":
                formattedDate[0] = "Monday,";
                break;
            case "Tue":
                formattedDate[0] = "Tuesday,";
                break;
            case "Wed":
                formattedDate[0] = "Wednesday,";
                break;
            case "Thu":
                formattedDate[0] = "Thursday,";
                break;
            case "Fri":
                formattedDate[0] = "Friday,";
                break;
            case "Sat":
                formattedDate[0] = "Saturday,";
                break;
        }
        switch (formattedDate[1]) {
            case "Jan":
                formattedDate[1] = "January";
                break;
            case "Feb":
                formattedDate[1] = "February";
                break;
            case "Mar":
                formattedDate[1] = "March";
                break;
            case "Apr":
                formattedDate[1] = "April";
                break;
            case "May":
                formattedDate[1] = "May";
                break;
            case "Jun":
                formattedDate[1] = "June";
                break;
            case "Jul":
                formattedDate[1] = "July";
                break;
            case "Aug":
                formattedDate[1] = "August";
                break;
            case "Sep":
                formattedDate[1] = "September";
                break;
            case "Oct":
                formattedDate[1] = "October";
                break;
            case "Nov":
                formattedDate[1] = "November";
                break;
            case "Dec":
                formattedDate[1] = "December"
                break;
        }
        let formattedTime = formattedDate[4].split(":")
        let formattedHour = parseInt(formattedTime[0], 10)
        if (formattedHour > 11) {
            formattedHour -= 12
            if (formattedHour === 0) {
                formattedHour = 12
            }
            formattedTime[0] = formattedHour.toString()
            formattedDate[5] = "PM"
        } else {
            formattedDate[5] = "AM"
        }
        formattedDate[4] = formattedTime.slice(0, 2).join(":")
        formattedDate[4] = " at " + formattedDate[4]
        formattedDate = formattedDate.slice(0, 6).join(" ")
        return formattedDate
    }

    const constructNewEvent = () => {
            if (editMode) {
                let beginningDate = formatDateTime(eventDate.current.value)
                if (buttonClicked) {
                    let endingDate = formatDateTime(eventClosingDate.current.value)
                    editEvent({
                        id: event.id,
                        userId: parseInt(localStorage.getItem("nutshell_user"), 10),
                        name: eventName.current.value,
                        beginningDate: eventDate.current.value,
                        closingDate: eventClosingDate.current.value,
                        formattedBeginningDate: beginningDate,
                        formatttedEndingDate: endingDate,
                        location: eventLocation.current.value
                    })
                        .then(() => props.history.push("/"))
                } else {
                    editEvent({
                        id: event.id,
                        userId: parseInt(localStorage.getItem("nutshell_user"), 10),
                        name: eventName.current.value,
                        beginningDate: eventDate.current.value,
                        formattedBeginningDate: beginningDate,
                        location: eventLocation.current.value
                    })
                        .then(() => props.history.push("/"))
                }
            } else {
                let beginningDate = formatDateTime(eventDate.current.value)
                if (buttonClicked) {
                    let endingDate = formatDateTime(eventClosingDate.current.value)
                    addEvent({
                        id: event.id,
                        userId: parseInt(localStorage.getItem("nutshell_user"), 10),
                        name: eventName.current.value,
                        beginningDate: eventDate.current.value,
                        closingDate: eventClosingDate.current.value,
                        formattedBeginningDate: beginningDate,
                        formatttedEndingDate: endingDate,
                        location: eventLocation.current.value
                    })
                        .then(() => props.history.push("/"))
                } else {
                    addEvent({
                        id: event.id,
                        userId: parseInt(localStorage.getItem("nutshell_user"), 10),
                        name: eventName.current.value,
                        beginningDate: eventDate.current.value,
                        formattedBeginningDate: beginningDate,
                        location: eventLocation.current.value
                    })
                        .then(() => props.history.push("/"))
                }
            }
    }    

    let eventDateLabel = "Event date: "

    let closingTimeButtonClicked = false

    console.log(closingTimeButtonClicked)

    console.log(closingTimeButtonClicked)
    
    console.log(closingTimeButtonClicked, "line 258")

    return (
        <form className="eventForm" onSubmit={event => {
            event.preventDefault()
        }}>
            <h2 className="eventForm__title">{editMode ? "Edit event" : "Add event"}</h2>
            <fieldset className="eventName">
                <div className="form-group">
                    <label htmlFor="name">Event name: </label>
                    <input type="text" name="name" required autoFocus className="form-control eventFormInput"
                        ref={eventName}
                        proptype="varchar"
                        placeholder="Event name"
                        defaultValue={event.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset className="eventLocation">
                <div className="form-group">
                    <label htmlFor="location">Event location: </label>
                    <input type="text" name="location" required autoFocus className="form-control eventFormInput"
                        ref={eventLocation}
                        proptype="varchar"
                        placeholder="Event location"
                        defaultValue={event.location}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">{eventDateLabel} </label>
                    <input type="datetime-local" name="date" required className="form-control eventFormInput"
                        ref={eventDate}
                        proptype="varchar"
                        defaultValue={event.beginningDate}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
                {buttonClicked ? (
                    <>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="date">End: </label>
                            <input type="datetime-local" name="date" required className="form-control"
                                ref={eventClosingDate}
                                proptype="varchar"
                                defaultValue={event.closingDate}
                                onChange={handleControlledInputChange}
                            />
                        </div>
                    </fieldset>
                    <button id="closingTimeRemoveButton" onClick={() => {
                        let falseVariable = false
                        setButtonClicked(falseVariable)
                    }}>Remove</button>
                    </>
                ) : (
                    <>
        <button id="closingTimeButton" onClick={event => {
            let closingTimeButtonClicked = true
            setButtonClicked(closingTimeButtonClicked)
            }
        }>+ End Time</button>
    </>
                )}
            <section className="eventFormButtons">
                <button id="eventFormSubmitButton" type="submit"
                    onClick={evt => {
                        evt.preventDefault()
                        constructNewEvent()
                    }}
                    className="btn btn-primary">
                    {editMode ? "Save Edit" : "Save Event"}
                </button>
                <button className="btn btn-light" id="closeEvent" onClick={() => props.history.push("/")}>Close</button>
            </section>
        </form>
    )
}