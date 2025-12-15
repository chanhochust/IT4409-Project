'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './password.module.css';

export default function ChangePasswordPage() {
  // State form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State hiển thị/ẩn mật khẩu 
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // State lỗi/loading
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự.');
      return;
    }

    // Giả lập gọi API đổi mật khẩu
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Đợi 1.5s

    // Gia lap xu ly kqua
    setIsLoading(false);
    alert('Đổi mật khẩu thành công! Vui lòng đăng nhập lại.');
    
    // Reset form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Đổi Mật Khẩu</h2>
        <p>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</p>
      </div>

      <form className={styles.passwordForm} onSubmit={handleSubmit}>
        
        {/* Mật khẩu hiện tại */}
        <div className={styles.formGroup}>
          <label>Mật khẩu hiện tại</label>
          <div className={styles.inputWrapper}>
            <input 
              type={showCurrent ? "text" : "password"} 
              className={styles.input}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <button type="button" className={styles.toggleBtn} onClick={() => setShowCurrent(!showCurrent)}>
              {showCurrent ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Mật khẩu mới */}
        <div className={styles.formGroup}>
          <label>Mật khẩu mới</label>
          <div className={styles.inputWrapper}>
            <input 
              type={showNew ? "text" : "password"} 
              className={styles.input}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button type="button" className={styles.toggleBtn} onClick={() => setShowNew(!showNew)}>
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Xác nhận mật khẩu mới */}
        <div className={styles.formGroup}>
          <label>Xác nhận mật khẩu</label>
          <div className={styles.inputWrapper}>
            <input 
              type={showConfirm ? "text" : "password"} 
              className={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="button" className={styles.toggleBtn} onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Thông báo lỗi */}
        {error && <span className={styles.errorMsg}>{error}</span>}

        <button type="submit" className={styles.btnSave} disabled={isLoading}>
          {isLoading ? 'Đang lưu...' : 'Lưu Thay Đổi'}
        </button>

        <div className={styles.forgotLink}>
          <Link href="#">Quên mật khẩu?</Link>
        </div>

      </form>
    </div>
  );
}