import './App.css';
import Header from './Components/Header';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import Toast from './Components/Toast';
import { hideToast } from './Redux/uiSlice';
import { useDispatch } from 'react-redux';

// ✅ Lazy load the ProductDetails component
const ProductDetails = lazy(() => import('./Components/ProductDetails'));

function App() {
  const dispatch = useDispatch();
  const { toast } = useSelector((state) => state.ui);

  const handleCloseToast = () => {
    dispatch(hideToast());
  };

  return (
    <>
      <main>
        <Header />

        {/* ✅ Wrap lazy-loaded routes inside Suspense */}
        <Suspense fallback={<p>Loading component...</p>}>
          <Routes>
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </Suspense>

        <Outlet />
      </main>
      
      {/* Toast Notification */}
      <Toast 
        message={toast.message} 
        isVisible={toast.isVisible} 
        onClose={handleCloseToast}
      />
    </>
  );
}

export default App;
