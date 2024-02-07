import { useRouteLoaderData } from 'react-router';
import EventForm from '../components/EventForm';

export default function EditEvent() {
  const data = useRouteLoaderData('event-details');

  return (
   <EventForm method="patch" event={data.event} />
  )
};
