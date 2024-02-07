import { Outlet } from 'react-router';
import EventsNavigation from '../components/EventsNavigation'

 function EventRoot() {
 
  return <>
  <h1>On Event Page</h1>
  <EventsNavigation />
  <Outlet/>
  </>
}
export default EventRoot;