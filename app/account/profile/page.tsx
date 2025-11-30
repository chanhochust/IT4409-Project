'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext'; 
import { FaUserCircle, FaMapMarkerAlt, FaCreditCard, FaLock, FaEnvelope, FaPhone, FaTrash, FaShieldAlt } from 'react-icons/fa';

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 100 }, (_, i) => CURRENT_YEAR - i);


export default function ProfilePage() {
  const { user, updateAvatar } = useAuth();

  const [profile, setProfile] = useState({
    fullName: "Trần Thị Nhài", 
    nickname: "datmin",
    dob_day: "14",
    dob_month: "2",
    dob_year: "2004",
    gender: "female",
    nationality: "VN",
    phone: "0123456789",
    email: user?.email || "abc@gmail.com"
  });

  const [showContactModal, setShowContactModal] = useState(false);
  const [editingField, setEditingField] = useState<'phone' | 'email' | null>(null);
  const [tempValue, setTempValue] = useState('');

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

  const openEditModal = (field: 'phone' | 'email') => {
    setEditingField(field);
    setTempValue(field === 'phone' ? profile.phone : profile.email);
    setShowContactModal(true);
  };

  const handleSaveContact = () => {
    if (!tempValue) {
      alert("Vui lòng nhập thông tin!");
      return;
    }

    if (editingField === 'phone') {
      // Giả lập validate số điện thoại
      if (!/^\d{10,11}$/.test(tempValue)) {
        alert("Số điện thoại không hợp lệ!");
        return;
      }
      setProfile(prev => ({ ...prev, phone: tempValue }));
    } else if (editingField === 'email') {
      // Giả lập validate email
      if (!/\S+@\S+\.\S+/.test(tempValue)) {
        alert("Email không hợp lệ!");
        return;
      }
      setProfile(prev => ({ ...prev, email: tempValue }));
    }

    setShowContactModal(false);
    setEditingField(null);
  };

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
                  {DAYS.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                <select name="dob_month" value={profile.dob_month} onChange={handleInputChange} className="form-input">
                  {MONTHS.map(month => (
                    <option key={month} value={month}>Tháng {month}</option>
                  ))}
                </select>
                <select name="dob_year" value={profile.dob_year} onChange={handleInputChange} className="form-input">
                  {YEARS.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
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
              <strong>{profile.phone}</strong>
            </div>
            <button className="btn-secondary" onClick={() => openEditModal('phone')}>Cập nhật</button>
          </div>
          <div className="info-box">
            <FaEnvelope className="info-icon" />
            <div className="info-text">
              <span>Địa chỉ email</span>
              <strong>{user?.email}</strong>
            </div>
            <button className="btn-secondary" onClick={() => openEditModal('email')}>Cập nhật</button>
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
      {showContactModal && (
        <div className="contact-modal-overlay">
          <div className="contact-modal-content">
            <div className="contact-modal-body">
              
              <h3 className="contact-modal-title">
                {editingField === 'phone' ? 'Số điện thoại' : 'Địa chỉ Email'}
              </h3>
              
              <div className="contact-input-wrapper">
                {editingField === 'phone' && <FaPhone className="contact-input-icon"/>}
                {editingField === 'email' && <FaEnvelope className="contact-input-icon" />}
                
                <input 
                  type={editingField === 'phone' ? 'tel' : 'email'}
                  className="contact-input-field"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  placeholder={editingField === 'phone' ? 'Nhập số điện thoại mới' : 'Nhập email mới'}
                  autoFocus
                />
              </div>

              <button className="btn-save" onClick={handleSaveContact}>
                Lưu thay đổi
              </button>
              
              <button className="btn-cancel" onClick={() => setShowContactModal(false)}>
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}