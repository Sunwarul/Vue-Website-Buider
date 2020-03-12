import Login from '../components/authentication/Login';
import Register from '../components/authentication/Register';
import ForgotPassword from '../components/authentication/ForgotPassword';
import About from '../components/pages/About';
import Sites from '../components/sites/Sites';
import NewSite from '../components/sites/NewSite';

export default [
    {
        path: '/login',
        component: Login,
    },

    {
        path: '/about',
        component: About
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/forgot-password',
        component: ForgotPassword
    },
    {
        path: '/sites',
        component: Sites,
        alias: '/'
    },
    {
        path: '/sites/create',
        component: NewSite,
    }

];