import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { fetchProducts } from './features/products/productsAPI';
import { restoreAuth } from './features/auth/authSlice';
import router from './router/router';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Restore auth from localStorage
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        dispatch(restoreAuth(authData));
      } catch (error) {
        console.error('Failed to restore auth:', error);
      }
    }

    // Fetch products
    dispatch(fetchProducts());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
