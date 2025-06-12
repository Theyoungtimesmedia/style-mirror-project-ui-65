
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, Music, Upload, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, isAdmin, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Admin Header */}
      <header className="bg-gray-900 border-b border-red-500/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/4f36b461-ddc9-494a-8022-d6409f46ed4e.png" 
                alt="DJ Bidex" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-red-400">Admin Dashboard</span>
            </Link>
          </div>
          
          <nav className="flex items-center space-x-6">
            <Link 
              to="/admin/dashboard" 
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <Music size={20} />
              <span>Mixtapes</span>
            </Link>
            <Link 
              to="/admin/upload" 
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <Upload size={20} />
              <span>Upload</span>
            </Link>
            <button 
              onClick={handleSignOut}
              className="flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
