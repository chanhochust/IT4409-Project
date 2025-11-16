'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext'; 
import { FaUserCircle, FaMapMarkerAlt, FaCreditCard, FaLock, FaEnvelope, FaPhone, FaTrash, FaShieldAlt } from 'react-icons/fa';

export default function ProfilePage() {
  const { user, updateAvatar } = useAuth();

  const [profile, setProfile] = useState({
    fullName: "Trần Thị Nhài", 
    nickname: "datmin",
    dob_day: "1",
    dob_month: "1",
    dob_year: "2004",
    gender: "female",
    nationality: "VN",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Đã lưu thông tin (giả lập)!");
    console.log("Dữ liệu đã lưu:", profile);
  }
  const handleAvatarChange = () => {
    const newAvatarUrl = window.prompt("Hinh gia lap",
      "https://www.anhnghethuatdulich.com/wp-content/uploads/2025/07/me-and-logic-long-distance-relationship.jpg"
    );

    if (newAvatarUrl && newAvatarUrl.trim() !== '') {
      updateAvatar(newAvatarUrl);
      alert("Đã cập nhật Avatar!");
    } else {
      alert("Đã hủy thay đổi.");
    }
  }
  return (
    <div className="profile-page-content"> 
      <h1>Thông tin tài khoản</h1>

      <div className="account-layout-grid">
        
        <div className="profile-card">
          <h2>Thông tin cá nhân</h2>

          {/* Avatar */}
          <div className="avatar-section">
            <img 
              src={user?.avatar || 'https://placehold.co/100x100?text=...'} 
              alt="Avatar" 
              className="profile-avatar-image"
            />
            <button className="btn-upload-avatar" onClick={handleAvatarChange}>Chọn ảnh</button>
          </div>

          {/* Form thông tin */}
          <form className="profile-form" onSubmit={handleSaveProfile}>
            
            <div className="form-group">
              <label htmlFor="fullName">Họ & Tên</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="form-input"
                value={profile.fullName}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="nickname">Nickname</label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                className="form-input"
                value={profile.nickname}
                onChange={handleInputChange}
              />
            </div>

            {/* Ngày sinh */}
            <div className="form-group">
              <label>Ngày sinh</label>
              <div className="dob-group">
                <select name="dob_day" value={profile.dob_day} onChange={handleInputChange} className="form-input">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  {/* ... */}
                </select>
                <select name="dob_month" value={profile.dob_month} onChange={handleInputChange} className="form-input">
                  <option value="1">Tháng 1</option>
                  <option value="2">Tháng 2</option>
                  {/* ... */}
                </select>
                <select name="dob_year" value={profile.dob_year} onChange={handleInputChange} className="form-input">
                  <option value="2000">2000</option>
                  <option value="2001">2001</option>
                  {/* ... */}
                </select>
              </div>
            </div>

            {/* Giới tính */}
            <div className="form-group">
              <label>Giới tính</label>
              <div className="radio-group">
                <label>
                  <input type="radio" name="gender" value="male" checked={profile.gender === 'male'} onChange={handleInputChange} /> Nam
                </label>
                <label>
                  <input type="radio" name="gender" value="female" checked={profile.gender === 'female'} onChange={handleInputChange} /> Nữ
                </label>
                <label>
                  <input type="radio" name="gender" value="other" checked={profile.gender === 'other'} onChange={handleInputChange} /> Khác
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="nationality">Quốc tịch</label>
              <select id="nationality" name="nationality" value={profile.nationality} onChange={handleInputChange} className="form-input">
                <option value="VN">Việt Nam</option>
                <option value="US">Mỹ</option>
                <option value="JP">Nhật Bản</option>
              </select>
            </div>

            <button type="submit" className="form-button">Lưu thay đổi</button>
          </form>
        </div>

        <div className="security-card">
          
          <h2>Số điện thoại và Email</h2>
          <div className="info-box">
            <FaPhone className="info-icon" />
            <div className="info-text">
              <span>Số điện thoại</span>
              <strong>0987654321</strong>
            </div>
            <button className="btn-secondary">Cập nhật</button>
          </div>
          <div className="info-box">
            <FaEnvelope className="info-icon" />
            <div className="info-text">
              <span>Địa chỉ email</span>
              <strong>{user?.email}</strong>
            </div>
            <button className="btn-secondary">Cập nhật</button>
          </div>

          <h2>Bảo mật</h2>
          <div className="info-box">
            <FaShieldAlt className="info-icon" />
            <div className="info-text">
              <span>Thiết lập mã PIN</span>
            </div>
            <button className="btn-secondary">Cập nhật</button>
          </div>
          <div className="info-box">
            <FaTrash className="info-icon" />
            <div className="info-text">
              <span>Yêu cầu xóa tài khoản</span>
            </div>
            <button className="btn-secondary">Yêu cầu</button>
          </div>
        </div>
      </div>
    </div>
  );
}