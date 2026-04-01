import { SignIn, SignUp } from '@clerk/react';
import { useLocation } from 'react-router-dom';


export default function AuthPage() {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <section className="py-20 px-4 min-h-screen bg-linear-to-r from-indigo-50 to-purple-50">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8">
        {isLogin ? (
          <>
            <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>
            <SignIn routing="path" path="/login" signUpUrl="/register" />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
            <SignUp routing="path" path="/register" signInUrl="/login" />
          </>
        )}
      </div>
    </section>
  );
}
  
