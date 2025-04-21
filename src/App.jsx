import './App.css';
import Header from './Components/Header';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// ✅ Lazy load the ProductDetails component
const ProductDetails = lazy(() => import('./Components/ProductDetails'));

function App() {
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
    </>
  );
}

export default App;
