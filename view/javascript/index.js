// import React from 'react'
// import {
//     render
// } from 'react-dom';
// import {
//     Provider
// } from 'react-redux';
// import DevTools from './devTools';
// import {
//     Router,
//     Route,
//     IndexRoute,
//     browserHistory
// } from 'react-router';
// import rootRouter from 'sRoutes/rootRoute';
// import configureStore from './createStore';

// const store = configureStore();
// // let next = store.dispatch
// // store.dispatch = function dispatchAndLog(action) {
// //     console.log('dispatching', action)
// //     let result = next(action)
// //     console.log('next state', store.getState())
// //     return result
// // }
// render(
//     <Provider store={store}>
//         <div>
//             <Router history={browserHistory} routes={rootRouter}/>
//             {process.env.NODE_ENV=='development'?<DevTools/>:null}
//         </div>
//     </Provider>,
//     document.getElementById('Root')
// );


fetch('/proxy')
    .then(req => req.json())
    .then(json => console.log(json));