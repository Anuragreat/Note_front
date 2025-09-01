import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: '', otp: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear related error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateEmail = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    return newErrors;
  };

  const validateFullForm = () => {
    const newErrors = validateEmail();
    if (!formData.otp) {
      newErrors.otp = 'OTP is required';
    }
    return newErrors;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    const newErrors = validateEmail();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`https://noteapp-0eu4.onrender.com/api/auth/send-otp?email=${encodeURIComponent(formData.email)}`, {
        method: 'POST',
      });

      if (!response.ok) {
        const data = await response.text();
        throw new Error(data || 'Failed to send OTP');
      }

      setOtpSent(true);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const newErrors = validateFullForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    const result = await login(formData.email, formData.otp);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrors({ submit: result.error });
    }

    setIsLoading(false);
  };

  const renderFormFields = (isDesktop = false) => (
    <form onSubmit={otpSent ? handleLogin : handleSendOtp} className="signin-form">
      <div className="form-group">
        <label htmlFor={isDesktop ? 'emailDesktop' : 'email'}>Email</label>
        <input
          type="email"
          id={isDesktop ? 'emailDesktop' : 'email'}
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
          placeholder="Enter your email"
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      {otpSent && (
        <div className="form-group">
          <label htmlFor={isDesktop ? 'otpDesktop' : 'otp'}>OTP</label>
          <input
            type="text"
            id={isDesktop ? 'otpDesktop' : 'otp'}
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            className={errors.otp ? 'error' : ''}
            placeholder="Enter OTP from email"
            maxLength="6"
          />
          {errors.otp && <span className="error-message">{errors.otp}</span>}
        </div>
      )}

      {otpSent && (
        <div className="form-options">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="checkmark"></span>
            Remember me
          </label>
        </div>
      )}

      {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}

      <button type="submit" className="signin-button" disabled={isLoading}>
        {isLoading ? (otpSent ? 'Signing in...' : 'Sending...') : otpSent ? 'Sign in' : 'Send OTP'}
      </button>

      {!otpSent && (
        <div className="signup-link" style={{ marginTop: '16px' }}>
          New user? <Link to="/signup">Register</Link>
        </div>
      )}
    </form>
  );

  return (
    <div className="signin-container">
      {/* Mobile View */}
      <div className="signin-mobile">
        <div className="signin-mobile-header">
          <div className="hd-logo">HD</div>
          <h1>Sign in</h1>
        </div>
        {renderFormFields()}
      </div>

      {/* Desktop View */}
      <div className="signin-desktop">
        <div className="signin-desktop-left">
          <div className="hd-logo">HD</div>
          <h1>Sign in</h1>
          {renderFormFields(true)}

          {otpSent && (
            <div className="signin-links">
              <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
              <div className="signup-link">
                New user? <Link to="/signup">Register</Link>
              </div>
            </div>
          )}
        </div>

        <div className="signin-desktop-right">
          <div className="abstract-background"></div>
          <img src="/bg.png" alt="User Avatar" className="user-avatar" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
