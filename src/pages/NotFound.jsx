import ErrorPage from '../assets/errorPage.png';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Navigate } from 'react-router-dom';
export const NotFound = () => {

  return (
    <div >
      <Navbar></Navbar>
      <div className="flex flex-col items-center justify-center px-4">

        <img className='mt-20 rounded-xl md:w-2/3' src={ErrorPage} alt="Error Page" />

      </div>
      <button onClick={() => Navigate("https://saadmanfuad.netlify.app/")} className="cosmic-button mt-20">Go Home</button>
      <Footer></Footer>
    </div>
  );
};
