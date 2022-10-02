import './bootstrap';
import '../css/app.css'

import ReactDOM from 'react-dom/client';        
import Header from './components/Header';
import Footer from './components/Footer';

ReactDOM.createRoot(document.getElementById('app')).render(     
    <>
        <Header />
        <Footer />
    </>

);