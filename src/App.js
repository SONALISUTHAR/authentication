// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// ***** DONE

// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import Event, { loader as eventsLoader } from "./page/Event";
import EventDetails, { loader as eventDetailLoader , action as deleteEventAction } from "./page/EventDetails";
import EditEvent from "./page/EditEvent";
import NewEventPage  from './page/NewEventPage'
import Root from "./page/Root";
import EventRoot from "./page/EventRoot";
import Error from "./page/Error";
import { action as manipulateEventAction } from './components/EventForm'
import NewsletterPage, { action as newsletterAction } from "./page/Newsletter";
import AuthenticationPage,{action as authAction} from "./page/Authentication";
import {action as logoutAction } from './page/Logout';
import { tokenLoader } from './util/auth';


//Add routing & route
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    id:'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <Home /> },
      
      {
        path: "event",
        element: <EventRoot />,
        children: [
          {
            index: true,
            element: <Event />,
            loader: eventsLoader,
          },
          {
            path: ":eventId",
            id: 'event-details',
            loader: eventDetailLoader,
           
            children: [
              {
                index: true,
                element: <EventDetails />,
                 action:deleteEventAction, 
              },
              { path:"edit", element: <EditEvent /> ,
              action: manipulateEventAction},
            ],
          },
          { path: 'new', element: <NewEventPage/>, action: manipulateEventAction },
        ],
      },
      {
        path:'auth',
        element: <AuthenticationPage/>,
        action: authAction,
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path:'logout',
        action:logoutAction
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={Router} />; // access data
}

export default App;
