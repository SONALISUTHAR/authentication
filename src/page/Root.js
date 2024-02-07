

import MainNavigation from '../components/MainNavigation'
import { Outlet , useNavigation } from 'react-router'

export default function Root() {

//  const navigation = useNavigation();
  return(
    <>
    <MainNavigation />
   
    <main>
      {/* {navigation.state === 'loading' && <p>loading</p>} */}
     <Outlet/>
     
     </main>
   </>
  )
}
