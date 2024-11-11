import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, logout } from '../firebase'; 
import { onAuthStateChanged, User } from 'firebase/auth';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);  
      } else {
        setUser(null);  
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/'); 
    }
  }, [loading, user, navigate]);

  const handleLogout = async () => {
    await logout(); 
    navigate('/'); 
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
        
        {user ? (
          <div>
            <p className="mb-4 text-lg">Welcome, {user.email}!</p>
            <button
              onClick={handleLogout}
              className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-gray-500">Please log in to access your dashboard.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
