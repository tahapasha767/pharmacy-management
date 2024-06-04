import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Adminpage from './Adminpage';
import Viewuser from './Viewuser';
import Adduser from './Adduser';
import Addstore from './Addstore';
import Addmedicine from './Addmedicine';
import Editstore from './Editstore';

function Body() {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Adminpage />,  // Adminpage will remain constant
            children: [
                {
                    path: "addstore",
                    element: <Addstore />
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
