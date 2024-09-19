//import Home from './Home'
import React from 'react'

const Home = React.lazy(() => import('./Home'))

const routes = [
    { path: '/home', name: 'Home', component: Home },
]
export default routes