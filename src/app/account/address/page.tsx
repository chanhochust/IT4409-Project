'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaCheckCircle } from 'react-icons/fa';

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
  const [addresses, setAddresses] = useState<Address[]>([]);
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

  // 1. Tải dữ liệu từ LocalStorage khi khởi tạo trang
  useEffect(() => {
    const saved = localStorage.getItem('user_addresses');
    if (saved) {
      try {
        setAddresses(JSON.parse(saved));
      } catch (e) {
        console.error("Lỗi đọc dữ liệu:", e);
      }
    }
  }, []);

  // 2. Hàm lưu dữ liệu vào LocalStorage (dùng chung cho Thêm/Sửa/Xóa)
  const syncToLocalStorage = (data: Address[]) => {
    localStorage.setItem('user_addresses', JSON.stringify(data));
  };

  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/?depth=1')
      .then(res => res.json())
      .then(data => setProvinces(data))
      .catch(err => console.error("Lỗi lấy tỉnh:", err));
  }, []);

  const fetchDistricts = (cityCode: number) => {
    if (!cityCode) return;
    fetch(`https://provinces.open-api.vn/api/p/${cityCode}?depth=2`)
      .then(res => res.json())
      .then(data => {
        setDistricts(data.districts);
        setWards([]);
      });
  };

  const fetchWards = (districtCode: number) => {
    if (!districtCode) return;
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
      const updated = addresses.filter(a => a.id !== id);
      setAddresses(updated);
      syncToLocalStorage(updated); // Lưu sau khi xóa
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

    // Xử lý logic địa chỉ mặc định
    if (formData.isDefault) {
      newAddresses = newAddresses.map(a => ({ ...a, isDefault: false }));
    }

    if (isEditing) {
      newAddresses = newAddresses.map(a => a.id === formData.id ? formData : a);
    } else {
      newAddresses.push(formData);
    }

    setAddresses(newAddresses);
    syncToLocalStorage(newAddresses); // Lưu sau khi thêm/sửa
    setShowModal(false);
  };

  return (
    <div className="profile-page-content">
      <h1>Địa chỉ của tôi</h1>

      <div className="border border-dashed border-[#b8b8b8] p-4 flex items-center justify-center gap-2.5 text-blue-600 font-medium cursor-pointer rounded mb-5 bg-white transition hover:bg-[#f0f5ff] hover:border-blue-600" onClick={handleAddNew}>
        <FaPlus /> <span>Thêm địa chỉ mới</span>
      </div>

      <div className="flex flex-col gap-[15px]">
        {addresses.map(addr => (
          <div key={addr.id} className="bg-white p-5 rounded-lg flex justify-between items-start border border-[#eee] transition-shadow hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2.5">
                <strong className="text-base uppercase text-[#333] font-semibold">{addr.name}</strong>
                {addr.isDefault && (
                  <span className="text-xs text-green-600 flex items-center gap-1 bg-[#f0fdf4] px-2 py-[3px] rounded-2xl border border-[#bbf7d0] font-medium"><FaCheckCircle /> Địa chỉ mặc định</span>
                )}
              </div>
              <p className="text-[0.9rem] text-[#333] my-1.5 leading-6">
                <span className="text-[#777]">Địa chỉ: </span>
                {addr.street}, {addr.ward}, {addr.district}, {addr.city}
              </p>
              <p className="text-[0.9rem] text-[#333] my-1.5 leading-6">
                <span className="text-[#777]">Điện thoại: </span>{addr.phone}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2.5 min-w-20">
              <button className="bg-transparent border-0 text-blue-600 cursor-pointer text-[0.9rem] p-0 hover:underline hover:font-semibold" onClick={() => handleEdit(addr)}>Chỉnh sửa</button>
              {!addr.isDefault && (
                <button className="bg-transparent border-0 text-red-500 cursor-pointer text-[0.9rem] p-0 hover:underline hover:font-semibold" onClick={() => handleDelete(addr.id)}>Xóa</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center">
          <div className="bg-white w-[700px] max-w-[95%] rounded shadow-[0_4px_20px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-[#ebebeb] flex justify-between items-center bg-white">
              <h2 className="text-xl font-bold">{isEditing ? 'Cập nhật địa chỉ' : 'Tạo địa chỉ'}</h2>
              <button className="bg-transparent border-0 text-[1.5rem] cursor-pointer text-[#999] leading-none px-[5px] hover:text-[#333]" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            
            <form className="p-5 overflow-y-auto bg-white" onSubmit={handleSubmit}>
              <div className="grid grid-cols-[140px_1fr] gap-4 items-center mb-5">
                <label className="text-right text-[#555] text-[0.9rem] font-normal">Họ và tên:</label>
                <input 
                  type="text" name="name" className="w-full px-3 py-2.5 border border-[#ccc] rounded text-[0.9rem] text-[#333] outline-none box-border focus:border-blue-600 focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]" placeholder="Nhập họ tên"
                  value={formData.name} onChange={handleChange} required
                />
              </div>
              
              <div className="grid grid-cols-[140px_1fr] gap-4 items-center mb-5">
                <label className="text-right text-[#555] text-[0.9rem] font-normal">Công ty:</label>
                <input 
                  type="text" name="company" className="w-full px-3 py-2.5 border border-[#ccc] rounded text-[0.9rem] text-[#333] outline-none box-border focus:border-blue-600 focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]" placeholder="Nhập công ty"
                  value={formData.company || ''} onChange={handleChange}
                />
              </div>
              
              <div className="grid grid-cols-[140px_1fr] gap-4 items-center mb-5">
                <label className="text-right text-[#555] text-[0.9rem] font-normal">Số điện thoại:</label>
                <input 
                  type="text" name="phone" className="w-full px-3 py-2.5 border border-[#ccc] rounded text-[0.9rem] text-[#333] outline-none box-border focus:border-blue-600 focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]" placeholder="Nhập số điện thoại"
                  value={formData.phone} onChange={handleChange} required
                />
              </div>
              
              <div className="grid grid-cols-[140px_1fr] gap-4 items-center mb-5">
                <label className="text-right text-[#555] text-[0.9rem] font-normal">Tỉnh/Thành phố:</label>
                <select 
                  name="city" 
                  className="w-full px-3 py-2.5 border border-[#ccc] rounded text-[0.9rem] text-[#333] outline-none box-border focus:border-blue-600 focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]" 
                  value={formData.cityCode} 
                  onChange={handleLocationChange}
                  required
                >
                  <option value={0}>Chọn Tỉnh/Thành phố</option>
                  {provinces.map(p => (
                    <option key={p.code} value={p.code}>{p.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-[140px_1fr] gap-4 items-center mb-5">
                <label className="text-right text-[#555] text-[0.9rem] font-normal">Quận huyện:</label>
                <select 
                  name="district" 
                  className="w-full px-3 py-2.5 border border-[#ccc] rounded text-[0.9rem] text-[#333] outline-none box-border focus:border-blue-600 focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]" 
                  value={formData.districtCode} 
                  onChange={handleLocationChange}
                  disabled={!formData.cityCode}
                  required
                >
                  <option value={0}>Chọn Quận/Huyện</option>
                  {districts.map(d => (
                    <option key={d.code} value={d.code}>{d.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-[140px_1fr] gap-4 items-center mb-5">
                <label className="text-right text-[#555] text-[0.9rem] font-normal">Phường xã:</label>
                <select 
                  name="ward" 
                  className="w-full px-3 py-2.5 border border-[#ccc] rounded text-[0.9rem] text-[#333] outline-none box-border focus:border-blue-600 focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]" 
                  value={formData.wardCode} 
                  onChange={handleLocationChange}
                  disabled={!formData.districtCode}
                  required
                >
                  <option value={0}>Chọn Phường/Xã</option>
                  {wards.map(w => (
                    <option key={w.code} value={w.code}>{w.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-[140px_1fr] gap-4 items-center mb-5">
                <label className="text-right text-[#555] text-[0.9rem] font-normal">Địa chỉ:</label>
                <textarea 
                  name="street" className="w-full px-3 py-2.5 border border-[#ccc] rounded text-[0.9rem] text-[#333] outline-none box-border focus:border-blue-600 focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]" placeholder="Nhập địa chỉ cụ thể"
                  rows={3} value={formData.street} onChange={handleChange} required
                ></textarea>
              </div>

              <div className="grid grid-cols-[140px_1fr] gap-4 items-center mb-5">
                <label className="text-right text-[#555] text-[0.9rem] font-normal">Loại địa chỉ:</label>
                <div className="flex gap-6 items-center">
                  <label className="flex items-center gap-2 cursor-pointer text-[0.9rem] text-[#333]">
                    <input type="radio" name="type" value="home" checked={formData.type === 'home'} onChange={handleChange} className="w-[18px] h-[18px]" /> Nhà riêng
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-[0.9rem] text-[#333]">
                    <input type="radio" name="type" value="office" checked={formData.type === 'office'} onChange={handleChange} className="w-[18px] h-[18px]" /> Văn phòng
                  </label>
                </div>
              </div>

              <div className="flex justify-start pl-[156px] mb-6 -mt-2.5">
                <label className="flex items-center gap-2 cursor-pointer text-[0.9rem] text-[#333]">
                  <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleChange} className="w-[18px] h-[18px]" /> Đặt làm mặc định
                </label>
              </div>

              <div className="px-6 py-4 flex justify-end gap-3 bg-white">
                <button type="button" className="bg-white border border-[#ccc] text-[#555] px-6 py-2.5 rounded cursor-pointer text-[0.9rem]" onClick={() => setShowModal(false)}>Hủy bỏ</button>
                <button type="submit" className="bg-[#2562e6] text-white border-0 px-6 py-2.5 rounded cursor-pointer text-[0.9rem]">
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