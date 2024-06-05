import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Adminpage from './Adminpage';
import Viewuser from './Viewuser';
import Adduser from './Adduser';
import Addstore from './Addstore';
import Addmedicine from './Addmedicine';
<<<<<<< HEAD
import Employee from './employess'
=======
import Editstore from './Editstore';

>>>>>>> 4d1c23824c585bf34a4043f658a62668cbc5b5d7
function Body() {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Adminpage />,  
            children: [
                {
                    path: "addstore",
                    element: <Employee employeeId={1}/>
                },
                {
                    path: "addmedicine",
                    element: <Addmedicine/>
                },
                {
                    path: "viewuser",
                    element: <Viewuser />
                },
                {
                    path: "addemployee",
                    element: <Adduser />
                },
                {
                    path:"editstore/:storeid",
                    element:<Editstore/>
                }
            ]
        },
    ]);

    return (
        <RouterProvider router={appRouter} />
    );
}

export default Body;
