import './bootstrap';
import '../css/app.css'

import ReactDOM from 'react-dom/client';        
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

ReactDOM.createRoot(document.getElementById('app')).render(     
    <>
        <Sidebar />
        <Header />
        <Footer />
    </>

);