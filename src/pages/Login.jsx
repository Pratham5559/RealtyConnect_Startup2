import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || '/dashboard';

  const handleLogin = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(redirectPath, { replace: true });
    } catch (firebaseError) {
      switch (firebaseError.code) {
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('Invalid email or password.');
          break;
        case 'auth/too-many-requests':
          setError('Too many attempts. Please try again a little later.');
          break;
        default:
          setError('Unable to sign in right now. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async () => {
    if (!email) {
      setError('Enter your email first, then use password reset.');
      return;
    }

    setError('');

    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent.');
    } catch (firebaseError) {
      setError(
        firebaseError.code === 'auth/user-not-found'
          ? 'No account exists for this email.'
          : 'Could not send reset email right now.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[var(--color-navy)] text-white flex items-center justify-center font-bold text-2xl shadow-lg">
            RC
          </div>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-[var(--color-navy)] font-serif">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or <Link to="/register" className="font-medium text-[var(--color-blue)] hover:text-blue-500">register a new account</Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-900">
            <p className="font-bold text-base mb-1">Demo Credentials</p>
            <p className="font-medium">Email: <span className="font-bold">demo@realtyconnect.in</span></p>
            <p className="font-medium">Password: <span className="font-bold">demo123</span></p>
          </div>
          <form className="space-y-6" onSubmit={handleLogin}>
            {error ? (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-blue)] focus:border-[var(--color-blue)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-blue)] focus:border-[var(--color-blue)]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <button type="button" onClick={handleForgot} className="font-medium text-[var(--color-blue)] hover:text-blue-500">
                  Forgot your password?
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[var(--color-navy)] hover:bg-[#152e55] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-navy)]"
              >
                {loading ? 'Signing in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="mt-6 text-center text-sm font-bold text-gray-800">
          SEBI SM-REIT regulated platform | Minimum investment ₹10,00,000
        </div>
      </div>
    </div>
  );
};

export default Login;
