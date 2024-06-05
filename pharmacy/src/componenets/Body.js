import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Adminpage from './Adminpage';
import Viewuser from './Viewuser';
import Adduser from './Adduser';
import Addstore from './Addstore';
import Addmedicine from './Addmedicine';
import Editstore from './Editstore';
import Viewmedicine from './Viewmedicine';
import Updatestock from './Updatestock';

function Body() {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Adminpage />,  
            children: [
                {
                    path: "addstore",
                    element: <Addstore employeeId={1}/>
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
                },{
                    path:"viewmedicine",
                    element:<Viewmedicine/>

                },
                {
                    path:"updatestock/:productid",
                    element:<Updatestock/>
                }
               
            ]
        },
    ]);

    return (
        <RouterProvider router={appRouter} />
    );
}

export default Body;
