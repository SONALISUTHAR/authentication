import AuthForm from '../components/AuthForm';
import { json, redirect } from 'react-router-dom';


function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {

   const searchParams = new URL(request.url).searchParams;
   const mode = searchParams.get('mode') || 'login';
  
    // Checking if the 'mode' is neither 'login' nor 'signup'
   if(mode !== 'login' && mode !== 'signup'){
     // If unsupported mode, throwing an exception with a JSON response and status code 422
    throw json ({message: 'Unsupported mode.'}, {status: 422})
   };


 const data = await request.formData();

  const authData = {
    email:data.get('email'),
    password:data.get('password'),
  };
  const response = await fetch('http://localhost:8080/' + mode ,{
    method: 'POST',
    headers:{
      'Content-Type':'application/json',
    }, 
    body: JSON.stringify(authData),
    // convert authData to json string
  });

  if(response.status === 422 || response.status === 401){
    return response;
    //if the status code is 422 or 401, the function returns the response without further processing. This indicates that the authentication failed,
  }

  if(!response.ok){
    throw json ({message: 'Could not authenticate.'}, {status: 500})
  }

  // soon manage that token

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem('token' , token)
 
  return redirect('/');
  
}