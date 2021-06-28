import React from 'react';
import {app} from '../../config/firebase'

const Dashboard = () => {

    const signOut = (event) => {
        event.preventDefault();
        app.auth().signOut();
      };
      

    return(
        <div onClick={(event) => signOut(event)}>
            sign out
        </div>
    )
}

export default Dashboard;