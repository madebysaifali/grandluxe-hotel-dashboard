import { useState, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { loginAPI } from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';
import '../css/LoginPage.css'; // Import CSS

export default function LoginPage() {
  const { dispatch } = useApp();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 5) e.password = 'Minimum 5 characters';
    return e;
  };

  const handleChange = useCallback((e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: '' }));
  }, []);

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setLoading(true);
    setApiError('');
    try {
      const { user } = await loginAPI(form.email, form.password);
      dispatch({ type: 'LOGIN', payload: user });
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrap">
      {/* Left panel */}
      <div className="login-left">
        <div className="login-brand">
          <div className="login-logo">◆</div>
          <div className="login-tagline">Where luxury finds its home</div>
          <div className="login-divider" />
          <div className="login-hotel-name">GrandLuxe Hotels & Resorts</div>
        </div>
      </div>

      {/* Right panel */}
      <div className="login-right">
        <div className="login-form-wrap">
          <h2 className="login-heading">Welcome back</h2>
          <p className="login-subheading">
            Sign in to manage your reservations
          </p>

          <div className="login-hint">
            <strong>Demo:</strong> demo@hotel.com / demo123
          </div>

          {apiError && <div className="login-api-err">{apiError}</div>}

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            error={errors.password}
          />

          <Button
            variant="primary"
            fullWidth
            loading={loading}
            onClick={handleSubmit}
          >
            Sign In →
          </Button>
        </div>
      </div>
    </div>
  );
}
