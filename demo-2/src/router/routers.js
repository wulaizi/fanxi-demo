import Popular from '../pages/popular';
import Battle from '../pages/battle';
import Result from '../pages/result';
export const  routers =[
    {
        path:'/popular',
        label:'Popular',
        Component:Popular,
        nav:true
    },
    {
        path:'/battle',
        label:'Battle',
        Component:Battle,
        nav:true
    },
    {
        path:"/result",
        lable:"Resut",
        Component:Result
    }
];
