import React, { useState } from 'react';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // 清除错误信息
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = '请输入用户名或邮箱';
    }

    if (!formData.password) {
      newErrors.password = '请输入密码';
    } else if (formData.password.length < 6) {
      newErrors.password = '密码长度至少为 6 位';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      // 模拟登录请求
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert(`登录成功！欢迎 ${formData.username}`);
      // 这里可以跳转到首页或其他页面
    } catch (error) {
      setErrors({ form: '登录失败，请重试' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* 卡片头部 */}
        <div className="login-header">
          <div className="logo">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="8" fill="url(#paint0_linear)" />
              <text x="10" y="28" fill="white" fontSize="20" fontWeight="bold">
                A
              </text>
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="0"
                  y1="0"
                  x2="40"
                  y2="40"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#764ba2" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="login-title">管理系统</h1>
          <p className="login-subtitle">登录到您的账户</p>
        </div>

        {/* 表单错误提示 */}
        {errors.form && <div className="error-message">{errors.form}</div>}

        {/* 登录表单 */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* 用户名/邮箱 */}
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              用户名或邮箱
            </label>
            <div className="input-wrapper">
              <svg className="input-icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M9 9C11.21 9 13 7.21 13 5C13 2.79 11.21 1 9 1C6.79 1 5 2.79 5 5C5 7.21 6.79 9 9 9ZM9 11C6.67 11 2 12.17 2 14.5V16H16V14.5C16 12.17 11.33 11 9 11Z"
                  fill="#999"
                />
              </svg>
              <input
                type="text"
                id="username"
                name="username"
                className={`form-input ${errors.username ? 'error' : ''}`}
                placeholder="输入用户名或邮箱"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            {errors.username && (
              <span className="error-text">{errors.username}</span>
            )}
          </div>

          {/* 密码 */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              密码
            </label>
            <div className="input-wrapper">
              <svg className="input-icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M14 6H13V4C13 1.79 11.21 0 9 0C6.79 0 5 1.79 5 4V6H4C2.9 6 2 6.9 2 8V16C2 17.1 2.9 18 4 18H14C15.1 18 16 17.1 16 16V8C16 6.9 15.1 6 14 6ZM9 14C7.9 14 7 13.1 7 12C7 10.9 7.9 10 9 10C10.1 10 11 10.9 11 12C11 13.1 10.1 14 9 14ZM11.1 6H6.9V4C6.9 2.9 7.85 2 9 2C10.15 2 11.1 2.9 11.1 4V6Z"
                  fill="#999"
                />
              </svg>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="输入密码"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          {/* 记住我和忘记密码 */}
          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleInputChange}
                className="checkbox-input"
              />
              <span>记住我</span>
            </label>
            <a href="#/" className="forgot-password">
              忘记密码？
            </a>
          </div>

          {/* 登录按钮 */}
          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                登录中...
              </>
            ) : (
              '登录'
            )}
          </button>
        </form>

        {/* 底部链接 */}
        <div className="login-footer">
          <p>
            没有账户？
            <a href="#/" className="signup-link">
              立即注册
            </a>
          </p>
        </div>
      </div>

      {/* 右侧装饰 */}
      <div className="login-decoration">
        <div className="decoration-circle decoration-1"></div>
        <div className="decoration-circle decoration-2"></div>
        <div className="decoration-circle decoration-3"></div>
      </div>
    </div>
  );
};

export default LoginPage;
