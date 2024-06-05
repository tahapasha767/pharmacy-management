import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Adminpage from './Adminpage';
import Viewuser from './Viewuser';
import Adduser from './Adduser';
import Addstore from './Addstore';
import Addmedicine from './Addmedicine';
import Employee from './employess'
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
                    element: <Addmedicine />
                },
                {
                    path: "viewuser",
                    element: <Viewuser />
                },
                {
                    path: "addemployee",
                    element: <Adduser />
                },
            ]
        },
    ]);

    return (
        <RouterProvider router={appRouter} />
    );
}

export default Body;
