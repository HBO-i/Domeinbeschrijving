import React from 'react';

import 'swiper/css';
import './styles/main.scss';

import App from './App';
import reportWebVitals from './reportWebVitals';
import {createRoot} from 'react-dom/client';

const root = createRoot(document.getElementById('root')!);

// export function setViewPort() {
//     document.querySelector("meta[name=viewport]")?.setAttribute('content', 'width=device-width, initial-scale='+(1/window.devicePixelRatio));
// }
//
// setViewPort();

root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
