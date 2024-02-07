import {useRouteLoaderData, json, redirect , defer, Await } from "react-router";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";
import { getAuthToken} from '../util/auth';

function EventDetails() {
  const { event , events } = useRouteLoaderData('event-details');

  return (
    <>
    <Suspense fallback={<p style={{textAlign:'center'}}>Loading..</p>}>
    <Await resolve={event}>
        {(loadedEvents) => <EventItem event={loadedEvents}/>}
    </Await>
    </Suspense>

    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>

    </>
  )
}

export default EventDetails;

async function loadEvent(id){

  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json({ message: "Could not fetch details for selected event." } , {status:500,});
  } else {
  const resData = await response.json();
    return resData.event;
  }

}

async function loadEvents(){

  const response = await fetch("http://localhost:8080/events");
 
  if (!response.ok) {
   
    throw json({message:'Could not fetch events.'},
    {
      status: 500,
    }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  } 
}


 export async function loader({ request, params }) {
  const id = params.eventId;
  
 return defer({
 event: await loadEvent(id),
 events:loadEvents(),
 });
 }

// loader function to delete works //
// we use params to delete event by id
export async function action({params , request}) {
  const eventId = params.eventId;
 
 
  const token = getAuthToken();
  console.log("Token:" , token);

  const response = await fetch('http://localhost:8080/events/' + eventId , {
    method: request.method,
    // we must add token to this outgoing token
    headers:{
      'Authorization' : 'Bearer ' + token
    }
  });
  
  if (!response.ok) {
    throw json({ message: "Could not delete event." } , {status:500,});
  } {
    return redirect('/events');
  }
}