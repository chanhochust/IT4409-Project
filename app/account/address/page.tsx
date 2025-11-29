'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaCheckCircle } from 'react-icons/fa';
import styles from './address.module.css';

interface Address {
  id: number;
  name: string;
  company?: string;
  phone: string;
  
  city: string;
  cityCode: number;
  
  district: string;
  districtCode: number;
  
  ward: string;
  wardCode: number;
  
  street: string;
  type: 'home' | 'office';
  isDefault: boolean;
}

interface LocationOption {
  code: number;
  name: string;
}

export default function AddressPage() {
  const [addresses, setAddresses] = useState<Address[]>([
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const initialFormState: Address = {
    id: 0, name: '', company: '', phone: '', 
    city: '', cityCode: 0,
    district: '', districtCode: 0,
    ward: '', wardCode: 0,
    street: '', type: 'home', isDefault: false,
  };
  const [formData, setFormData] = useState<Address>(initialFormState);

  const [provinces, setProvinces] = useState<LocationOption[]>([]);
  const [districts, setDistricts] = useState<LocationOption[]>([]);
  const [wards, setWards] = useState<LocationOption[]>([]);

  // Lay ds cac tinh thanh qua API
  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/?depth=1')
      .then(res => res.json())
      .then(data => setProvinces(data))
      .catch(err => console.error("Lỗi lấy tỉnh:", err));
  }, []);

  const fetchDistricts = (cityCode: number) => {
    if (!cityCode) {
      setDistricts([]);
      setWards([]);
      return;
    }
    fetch(`https://provinces.open-api.vn/api/p/${cityCode}?depth=2`)
      .then(res => res.json())
      .then(data => {
        setDistricts(data.districts);
        setWards([]); // Reset xã khi đổi tỉnh
      });
  };

  const fetchWards = (districtCode: number) => {
    if (!districtCode) {
      setWards([]);
      return;
    }
    fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
      .then(res => res.json())
      .then(data => setWards(data.wards));
  };


  const handleAddNew = () => {
    setFormData({ ...initialFormState, id: Date.now() });
    setDistricts([]);
    setWards([]);    
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (addr: Address) => {
    setFormData(addr);
    fetchDistricts(addr.cityCode);
    fetchWards(addr.districtCode);
    
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc muốn xóa địa chỉ này?')) {
      setAddresses(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const code = parseInt(value);
    
    // Tìm tên tỉnh tương ứng với mã code vừa chọn
    if (name === 'city') {
      const selectedCity = provinces.find(p => p.code === code);
      setFormData(prev => ({
        ...prev,
        city: selectedCity?.name || '',
        cityCode: code,
        district: '', districtCode: 0,
        ward: '', wardCode: 0        
      }));
      fetchDistricts(code);
    } 
    else if (name === 'district') {
      const selectedDistrict = districts.find(d => d.code === code);
      setFormData(prev => ({
        ...prev,
        district: selectedDistrict?.name || '',
        districtCode: code,
        ward: '', wardCode: 0       
      }));
      fetchWards(code);
    } 
    else if (name === 'ward') {
      const selectedWard = wards.find(w => w.code === code);
      setFormData(prev => ({
        ...prev,
        ward: selectedWard?.name || '',
        wardCode: code
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newAddresses = [...addresses];
    if (formData.isDefault) {
      newAddresses = newAddresses.map(a => ({ ...a, isDefault: false }));
    }
    if (isEditing) {
      newAddresses = newAddresses.map(a => a.id === formData.id ? formData : a);
    } else {
      newAddresses.push(formData);
    }
    setAddresses(newAddresses);
    setShowModal(false);
  };

  return (
    <div className="profile-page-content">
      <h1>Địa chỉ của tôi</h1>

      <div className={styles.addAddressBtnArea} onClick={handleAddNew}>
        <FaPlus /> <span>Thêm địa chỉ mới</span>
      </div>

      <div className={styles.addressList}>
        {addresses.map(addr => (
          <div key={addr.id} className={styles.addressCard}>
            <div className={styles.addressInfo}>
              <div className={styles.addressHeader}>
                <strong className={styles.addressName}>{addr.name}</strong>
                {addr.isDefault && (
                  <span className={styles.tagDefault}><FaCheckCircle /> Địa chỉ mặc định</span>
                )}
              </div>
              <p className={styles.addressDetail}>
                <span>Địa chỉ: </span>
                {addr.street}, {addr.ward}, {addr.district}, {addr.city}
              </p>
              <p className={styles.addressPhone}>
                <span>Điện thoại: </span>{addr.phone}
              </p>
            </div>
            <div className={styles.addressActions}>
              <button className={styles.btnTextEdit} onClick={() => handleEdit(addr)}>Chỉnh sửa</button>
              {!addr.isDefault && (
                <button className={styles.btnTextDelete} onClick={() => handleDelete(addr.id)}>Xóa</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>{isEditing ? 'Cập nhật địa chỉ' : 'Tạo địa chỉ'}</h2>
              <button className={styles.btnClose} onClick={() => setShowModal(false)}>&times;</button>
            </div>
            
            <form className={styles.modalBody} onSubmit={handleSubmit}>
              
              <div className={styles.formGroup}>
                <label>Họ và tên:</label>
                <input 
                  type="text" name="name" className={styles.formInput} placeholder="Nhập họ tên"
                  value={formData.name} onChange={handleChange} required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Công ty:</label>
                <input 
                  type="text" name="company" className={styles.formInput} placeholder="Nhập công ty"
                  value={formData.company || ''} onChange={handleChange}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Số điện thoại:</label>
                <input 
                  type="text" name="phone" className={styles.formInput} placeholder="Nhập số điện thoại"
                  value={formData.phone} onChange={handleChange} required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Tỉnh/Thành phố:</label>
                <select 
                  name="city" 
                  className={styles.formInput} 
                  value={formData.cityCode} // Dùng Code làm value
                  onChange={handleLocationChange}
                  required
                >
                  <option value={0}>Chọn Tỉnh/Thành phố</option>
                  {provinces.map(p => (
                    <option key={p.code} value={p.code}>{p.name}</option>
                  ))}
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label>Quận huyện:</label>
                <select 
                  name="district" 
                  className={styles.formInput} 
                  value={formData.districtCode} 
                  onChange={handleLocationChange}
                  disabled={!formData.cityCode} // Khóa nếu chưa chọn Tỉnh
                  required
                >
                  <option value={0}>Chọn Quận/Huyện</option>
                  {districts.map(d => (
                    <option key={d.code} value={d.code}>{d.name}</option>
                  ))}
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label>Phường xã:</label>
                <select 
                  name="ward" 
                  className={styles.formInput} 
                  value={formData.wardCode} 
                  onChange={handleLocationChange}
                  disabled={!formData.districtCode} // Khóa nếu chưa chọn Huyện
                  required
                >
                  <option value={0}>Chọn Phường/Xã</option>
                  {wards.map(w => (
                    <option key={w.code} value={w.code}>{w.name}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Địa chỉ:</label>
                <textarea 
                  name="street" className={styles.formInput} placeholder="Nhập địa chỉ cụ thể (Số nhà, ngõ...)"
                  rows={3} value={formData.street} onChange={handleChange} required
                ></textarea>
              </div>

              <div className={styles.formGroup}>
                <label>Loại địa chỉ:</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input 
                      type="radio" name="type" value="home" 
                      checked={formData.type === 'home'} onChange={handleChange} 
                    /> Nhà riêng / Chung cư
                  </label>
                  <label className={styles.radioLabel}>
                    <input 
                      type="radio" name="type" value="office" 
                      checked={formData.type === 'office'} onChange={handleChange} 
                    /> Cơ quan / Công ty
                  </label>
                </div>
              </div>

              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" name="isDefault" 
                    checked={formData.isDefault} onChange={handleChange} 
                  /> 
                  Đặt làm địa chỉ mặc định
                </label>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.btnCancel} onClick={() => setShowModal(false)}>Hủy bỏ</button>
                <button type="submit" className={styles.submitBtn}>
                  {isEditing ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}