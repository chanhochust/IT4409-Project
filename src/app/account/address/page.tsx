'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaCheckCircle } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

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
  const { user, isLoading: authLoading } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const initialFormState: Address = {
    id: 0,
    name: '',
    company: '',
    phone: '',
    city: '',
    cityCode: 0,
    district: '',
    districtCode: 0,
    ward: '',
    wardCode: 0,
    street: '',
    type: 'home',
    isDefault: false,
  };
  const [formData, setFormData] = useState<Address>(initialFormState);

  const [provinces, setProvinces] = useState<LocationOption[]>([]);
  const [districts, setDistricts] = useState<LocationOption[]>([]);
  const [wards, setWards] = useState<LocationOption[]>([]);

  // Tải từ API
  const fetchUserAddresses = async () => {
    if (!user?.id) return;
    setIsDataLoading(true);
    try {
      const res = await fetch(`/api/user/address?userId=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setAddresses(data);
      }
    } catch (err) {
      console.error('Lỗi lấy danh sách địa chỉ:', err);
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) fetchUserAddresses();
  }, [user?.id]);

  // Lay ds cac tinh thanh qua API
  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/?depth=1')
      .then((res) => res.json())
      .then((data) => setProvinces(data))
      .catch((err) => console.error('Lỗi lấy tỉnh:', err));
  }, []);

  const fetchDistricts = (cityCode: number) => {
    if (!cityCode) {
      setDistricts([]);
      setWards([]);
      return;
    }
    fetch(`https://provinces.open-api.vn/api/p/${cityCode}?depth=2`)
      .then((res) => res.json())
      .then((data) => {
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
      .then((res) => res.json())
      .then((data) => setWards(data.wards));
  };

  const handleAddNew = () => {
    setFormData({ ...initialFormState, id: 0 });
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

  const handleDelete = async (id: number) => {
    if (window.confirm('Bạn có chắc muốn xóa địa chỉ này?')) {
      try {
        const res = await fetch(`/api/user/address?id=${id}&userId=${user?.id}`, { method: 'DELETE' });
        const result = await res.json();
        if (res.ok) {
          fetchUserAddresses(); // Tải lại danh sách
        } else {
          alert(result.error || 'Không thể xóa địa chỉ.');
        }
      } catch (err) {
        alert('Lỗi kết nối.');
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const code = parseInt(value);

    // Tìm tên tỉnh tương ứng với mã code vừa chọn
    if (name === 'city') {
      const selectedCity = provinces.find((p) => p.code === code);
      setFormData((prev) => ({
        ...prev,
        city: selectedCity?.name || '',
        cityCode: code,
        district: '',
        districtCode: 0,
        ward: '',
        wardCode: 0,
      }));
      fetchDistricts(code);
    } else if (name === 'district') {
      const selectedDistrict = districts.find((d) => d.code === code);
      setFormData((prev) => ({
        ...prev,
        district: selectedDistrict?.name || '',
        districtCode: code,
        ward: '',
        wardCode: 0,
      }));
      fetchWards(code);
    } else if (name === 'ward') {
      const selectedWard = wards.find((w) => w.code === code);
      setFormData((prev) => ({
        ...prev,
        ward: selectedWard?.name || '',
        wardCode: code,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    setIsSaving(true);
    try {
      const method = isEditing ? 'PUT' : 'POST';
      const res = await fetch('/api/user/address', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          ...formData,
        }),
      });
      if (res.ok) {
        setShowModal(false);
        fetchUserAddresses(); // Cập nhật lại danh sách sau khi lưu
      } else {
        const error = await res.json();
        alert(error.error || 'Có lỗi xảy ra.');
      }
    } catch (err) {
      alert('Lỗi kết nối máy chủ.');
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading || isDataLoading)
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-[#097b9e] border-t-transparent'></div>
      </div>
    );

  return (
    <div className='profile-page-content'>
      <h1 className='border-b border-slate-200 text-lg text-[#161616]'>Địa chỉ của tôi</h1>

      <button
        className='m-auto mb-10 flex w-full cursor-pointer items-center justify-center gap-2.5 rounded border border-dashed border-[#b8b8b8] bg-white p-4 font-medium text-blue-600 transition hover:border-blue-600 hover:bg-[#f0f5ff]'
        onClick={handleAddNew}>
        <FaPlus /> <span>Thêm địa chỉ mới</span>
      </button>

      <div className='flex flex-col gap-[15px]'>
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className='flex items-start justify-between rounded-lg border border-[#eee] bg-white p-5 transition-shadow hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)]'>
            <div className='flex-1'>
              <div className='mb-2.5 flex items-center gap-3'>
                <strong className='text-base font-semibold uppercase text-[#333]'>{addr.name}</strong>
                {addr.isDefault && (
                  <span className='flex items-center gap-1 rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] px-2 py-[3px] text-xs font-medium text-green-600'>
                    <FaCheckCircle /> Địa chỉ mặc định
                  </span>
                )}
              </div>
              <p className='my-1.5 text-[0.9rem] leading-6 text-[#333]'>
                <span className='text-[#777]'>Địa chỉ: </span>
                {addr.street}, {addr.ward}, {addr.district}, {addr.city}
              </p>
              <p className='my-1.5 text-[0.9rem] leading-6 text-[#333]'>
                <span className='text-[#777]'>Điện thoại: </span>
                {addr.phone}
              </p>
            </div>
            <div className='flex min-w-20 flex-col items-end gap-2.5'>
              <button
                className='cursor-pointer border-0 bg-transparent p-0 text-[0.9rem] text-blue-600 hover:font-semibold hover:underline'
                onClick={() => handleEdit(addr)}>
                Chỉnh sửa
              </button>
              {!addr.isDefault && (
                <button
                  className='cursor-pointer border-0 bg-transparent p-0 text-[0.9rem] text-red-500 hover:font-semibold hover:underline'
                  onClick={() => handleDelete(addr.id)}>
                  Xóa
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className='z-9999 fixed inset-0 flex items-center justify-center bg-black/50'>
          <div className='flex max-h-[90vh] w-[700px] max-w-[95%] flex-col overflow-hidden rounded bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)]'>
            <div className='flex items-center justify-between border-b border-[#ebebeb] bg-white px-6 py-4'>
              <h2>{isEditing ? 'Cập nhật địa chỉ' : 'Tạo địa chỉ'}</h2>
              <button
                className='cursor-pointer border-0 bg-transparent px-[5px] text-[1.5rem] leading-none text-[#999] hover:text-[#333]'
                onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>

            <form className='overflow-y-auto bg-white p-5' onSubmit={handleSubmit}>
              <div className='mb-5 grid grid-cols-[140px_1fr] items-center gap-4'>
                <label className='text-right text-[0.9rem] font-normal text-[#555]'>Họ và tên:</label>
                <input
                  type='text'
                  name='name'
                  className='box-border w-full rounded border border-[#ccc] px-3 py-2.5 text-[0.9rem] text-[#333] outline-none focus:border-blue-600 focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]'
                  placeholder='Nhập họ tên'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='mb-5 grid grid-cols-[140px_1fr] items-center gap-4'>
                <label className='text-right text-[0.9rem] font-normal text-[#555]'>Công ty:</label>
                <input
                  type='text'
                  name='company'
                  className='box-border w-full rounded border border-[#ccc] px-3 py-2.5 text-[0.9rem] text-[#333] outline-none focus:border-blue-600 focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]'
                  placeholder='Nhập công ty'
                  value={formData.company || ''}
                  onChange={handleChange}
                />
              </div>

              <div className='mb-5 grid grid-cols-[140px_1fr] items-center gap-4'>
                <label className='text-right text-[0.9rem] font-normal text-[#555]'>Số điện thoại:</label>
                <input
                  type='text'
                  name='phone'
                  className='box-border w-full rounded border border-[#ccc] px-3 py-2.5 text-[0.9rem] text-[#333] outline-none focus:border-blue-600 focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]'
                  placeholder='Nhập số điện thoại'
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='mb-5 grid grid-cols-[140px_1fr] items-center gap-4'>
                <label className='text-right text-[0.9rem] font-normal text-[#555]'>Tỉnh/Thành phố:</label>
                <select
                  name='city'
                  className='box-border w-full rounded border border-[#ccc] px-3 py-2.5 text-[0.9rem] text-[#333] outline-none focus:border-blue-600 focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]'
                  value={formData.cityCode} // Dùng Code làm value
                  onChange={handleLocationChange}
                  required>
                  <option value={0}>Chọn Tỉnh/Thành phố</option>
                  {provinces.map((p) => (
                    <option key={p.code} value={p.code}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mb-5 grid grid-cols-[140px_1fr] items-center gap-4'>
                <label className='text-right text-[0.9rem] font-normal text-[#555]'>Quận huyện:</label>
                <select
                  name='district'
                  className='box-border w-full rounded border border-[#ccc] px-3 py-2.5 text-[0.9rem] text-[#333] outline-none focus:border-blue-600 focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]'
                  value={formData.districtCode}
                  onChange={handleLocationChange}
                  disabled={!formData.cityCode} // Khóa nếu chưa chọn Tỉnh
                  required>
                  <option value={0}>Chọn Quận/Huyện</option>
                  {districts.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mb-5 grid grid-cols-[140px_1fr] items-center gap-4'>
                <label className='text-right text-[0.9rem] font-normal text-[#555]'>Phường xã:</label>
                <select
                  name='ward'
                  className='box-border w-full rounded border border-[#ccc] px-3 py-2.5 text-[0.9rem] text-[#333] outline-none focus:border-blue-600 focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]'
                  value={formData.wardCode}
                  onChange={handleLocationChange}
                  disabled={!formData.districtCode} // Khóa nếu chưa chọn Huyện
                  required>
                  <option value={0}>Chọn Phường/Xã</option>
                  {wards.map((w) => (
                    <option key={w.code} value={w.code}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mb-5 grid grid-cols-[140px_1fr] items-center gap-4'>
                <label className='text-right text-[0.9rem] font-normal text-[#555]'>Địa chỉ:</label>
                <textarea
                  name='street'
                  className='box-border w-full rounded border border-[#ccc] px-3 py-2.5 text-[0.9rem] text-[#333] outline-none focus:border-blue-600 focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]'
                  placeholder='Nhập địa chỉ cụ thể (Số nhà, ngõ...)'
                  rows={3}
                  value={formData.street}
                  onChange={handleChange}
                  required></textarea>
              </div>

              <div className='mb-5 grid grid-cols-[140px_1fr] items-center gap-4'>
                <label className='text-right text-[0.9rem] font-normal text-[#555]'>Loại địa chỉ:</label>
                <div className='flex items-center gap-6'>
                  <label className='flex cursor-pointer items-center gap-2 text-[0.9rem] text-[#333]'>
                    <input
                      type='radio'
                      name='type'
                      value='home'
                      checked={formData.type === 'home'}
                      onChange={handleChange}
                      className='h-[18px] w-[18px] cursor-pointer'
                    />{' '}
                    Nhà riêng / Chung cư
                  </label>
                  <label className='flex cursor-pointer items-center gap-2 text-[0.9rem] text-[#333]'>
                    <input
                      type='radio'
                      name='type'
                      value='office'
                      checked={formData.type === 'office'}
                      onChange={handleChange}
                      className='h-[18px] w-[18px] cursor-pointer'
                    />{' '}
                    Cơ quan / Công ty
                  </label>
                </div>
              </div>

              <div className='-mt-2.5 mb-6 flex justify-start pl-[156px]'>
                <label className='flex cursor-pointer items-center gap-2 text-[0.9rem] text-[#333]'>
                  <input
                    type='checkbox'
                    name='isDefault'
                    checked={formData.isDefault}
                    onChange={handleChange}
                    className='h-[18px] w-[18px] cursor-pointer'
                  />
                  Đặt làm địa chỉ mặc định
                </label>
              </div>

              <div className='flex justify-end gap-3 bg-white px-6 py-4'>
                <button
                  type='button'
                  className='cursor-pointer rounded border border-[#ccc] bg-white px-6 py-2.5 text-[0.9rem] text-[#555] hover:bg-[#f5f5f5]'
                  onClick={() => setShowModal(false)}>
                  Hủy bỏ
                </button>
                <button
                  type='submit'
                  className='cursor-pointer rounded border-0 bg-[#2562e6] px-6 py-2.5 text-[0.9rem] font-medium text-white hover:bg-[#0f3484]'>
                  {isSaving ? 'Đang lưu...' : isEditing ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
