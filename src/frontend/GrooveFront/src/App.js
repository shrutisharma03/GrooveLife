import React from 'react';
import AuthenticatedApp from './features/authenticated/Authenticated';
import UnauthenticatedApp from './features/unauthenticated/Unauthenticated';

import { selectUser } from './app/auth_api/authSlice';
import { useSelector } from 'react-redux';

function App() {
    const user = useSelector(selectUser)
    return (
        <div>
            {user ?
                (<AuthenticatedApp />) :
                (<UnauthenticatedApp />)
            }
        </div>
    )

}

export default App;
