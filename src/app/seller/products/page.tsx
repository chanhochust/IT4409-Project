'use client';

import { useState, useEffect } from 'react';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaTimes,
  FaSave,
  FaBox,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';

interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  stock?: number;
}

const initialFormState: Product = {
  id: '',
  name: '',
  image: '',
  category: '',
  price: 0,
  oldPrice: 0,
  rating: 5.0,
  stock: 0,
};

export default function AdminProductsPage() {
  // State sản phẩm khởi tạo rỗng, sẽ được điền bởi useEffect
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Product>(initialFormState);
  const [searchTerm, setSearchTerm] = useState('');

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  // Gọi API lấy danh sách sản phẩm
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/products'); // Gọi API
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();

      // Map dữ liệu API để đảm bảo có đủ các trường dữ liệu
      const mappedData = data.map((p: any) => ({
        ...p,
        category: p.category || 'Chưa phân loại',
        stock: p.stock !== undefined ? p.stock : 100,
      }));

      setProducts(mappedData);
    } catch (error) {
      console.error('Lỗi tải sản phẩm:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const getPaginationItems = (current: number, total: number) => {
    // Nếu tổng trang ít (<= 5), hiện tất cả
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

    // Nếu đang ở những trang đầu
    if (current <= 3) return [1, 2, 3, 4, '...', total];

    // Nếu đang ở những trang cuối
    if (current >= total - 3) return [1, '...', total - 3, total - 2, total - 1, total];

    // Nếu đang ở giữa
    return [1, '...', current - 1, current, current + 1, '...', total];
  };

  // Các hàm xử lý CRUD
  const handleAddNew = () => {
    setFormData({ ...initialFormState, id: Date.now().toString() });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalFormData = {
      ...formData,
      rating: parseFloat(formData.rating?.toString() || '0'),
    };

    if (isEditing) {
      setProducts((prev) => prev.map((p) => (p.id === formData.id ? formData : p)));
      alert(`Đã cập nhật (giả lập): ${formData.name}`);
    } else {
      setProducts((prev) => [formData, ...prev]); // Thêm vào đầu danh sách
      alert(`Đã thêm mới (giả lập): ${formData.name}`);
    }

    setShowModal(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${name}"?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let parsedValue: string | number = value;

    if (type === 'number' || ['price', 'oldPrice', 'stock', 'rating'].includes(name)) {
      parsedValue = parseFloat(value);
      if (isNaN(parsedValue)) {
        parsedValue = 0;
      }
    }

    setFormData(
      (prev) =>
        ({
          ...prev,
          [name]: parsedValue,
        }) as Product,
    );
  };

  // Filter & pagination
  const allFilteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const totalPages = Math.ceil(allFilteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  // Danh sách sản phẩm hiển thị trên trang hiện tại
  const displayedProducts = allFilteredProducts.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatPrice = (price: number) => price?.toLocaleString('vi-VN') + ' VNĐ';

  if (isLoading) {
    return <div className='p-8 text-center'>Đang tải dữ liệu sản phẩm...</div>;
  }

  return (
    <div className='p-0'>
      <h1 className='mb-6 border-b border-gray-200 pb-4 text-2xl font-bold text-gray-800'>Quản lý Sản phẩm</h1>

      <div className='mb-6 flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm'>
        {/* Search */}
        <div className='relative w-full max-w-96'>
          <input
            type='text'
            placeholder='Tìm kiếm theo tên sản phẩm...'
            className='w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset trang khi search
            }}
          />
          <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-base text-gray-400' />
        </div>

        {/* Add New Button */}
        <button
          onClick={handleAddNew}
          className='flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700'>
          <FaPlus /> Thêm Sản phẩm
        </button>
      </div>

      {/* --- BẢNG DANH SÁCH SẢN PHẨM --- */}
      <div className='overflow-x-auto rounded-lg border border-gray-200 bg-white p-5 shadow'>
        <table className='w-full border-collapse'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='border-b-2 border-gray-200 px-4 py-3 text-left text-[0.75rem] font-semibold uppercase tracking-wider text-gray-600'>
                Mã SP
              </th>
              <th
                className='border-b-2 border-gray-200 px-4 py-3 text-left text-[0.75rem] font-semibold uppercase tracking-wider text-gray-600'
                style={{ width: '250px' }}>
                Sản phẩm
              </th>
              <th className='border-b-2 border-gray-200 px-4 py-3 text-left text-[0.75rem] font-semibold uppercase tracking-wider text-gray-600'>
                Danh mục
              </th>
              <th className='border-b-2 border-gray-200 px-4 py-3 text-left text-[0.75rem] font-semibold uppercase tracking-wider text-gray-600'>
                Giá gốc
              </th>
              <th className='border-b-2 border-gray-200 px-4 py-3 text-left text-[0.75rem] font-semibold uppercase tracking-wider text-gray-600'>
                Giá bán
              </th>
              <th className='border-b-2 border-gray-200 px-4 py-3 text-left text-[0.75rem] font-semibold uppercase tracking-wider text-gray-600'>
                Đánh giá
              </th>
              <th className='border-b-2 border-gray-200 px-4 py-3 text-left text-[0.75rem] font-semibold uppercase tracking-wider text-gray-600'>
                Tồn kho
              </th>
              <th className='border-b-2 border-gray-200 px-4 py-3 text-right text-[0.75rem] font-semibold uppercase tracking-wider text-gray-600'>
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.length === 0 ? (
              <tr>
                <td colSpan={9} className='py-6 text-center text-gray-500'>
                  Không tìm thấy sản phẩm nào.
                </td>
              </tr>
            ) : (
              displayedProducts.map((product) => (
                <tr key={product.id} className='hover:bg-[#fcfcfd]'>
                  <td className='border-b px-4 py-3 align-middle text-sm text-gray-600'>{product.id}</td>
                  <td className='border-b px-4 py-3 align-middle text-sm text-gray-600'>
                    <div className='flex items-center gap-3'>
                      <img src={product.image} alt={product.name} className='h-10 w-10 shrink-0 rounded object-cover' />
                      <span className='font-semibold leading-tight text-gray-800'>{product.name}</span>
                    </div>
                  </td>
                  <td className='border-b px-4 py-3 align-middle text-sm text-gray-600'>{product.category}</td>
                  <td className='border-b px-4 py-3 align-middle text-xs text-gray-400 line-through'>
                    {product.oldPrice ? formatPrice(product.oldPrice) : '-'}
                  </td>
                  <td className='border-b px-4 py-3 align-middle text-sm font-bold text-red-500'>
                    {formatPrice(product.price)}
                  </td>
                  <td className='border-b px-4 py-3 align-middle text-sm text-gray-600'>
                    <div className='flex items-center text-xs text-amber-500'>
                      <FaStar /> ({product.rating?.toFixed(1) || 0})
                    </div>
                  </td>
                  <td className='border-b px-4 py-3 align-middle text-sm text-gray-600'>
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                        (product.stock || 0) > 50
                          ? 'bg-emerald-100 text-emerald-800'
                          : (product.stock || 0) > 0
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-red-100 text-red-800'
                      }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className='border-b px-4 py-3 align-middle text-sm text-gray-600'>
                    <div className='flex justify-end gap-1'>
                      <button
                        onClick={() => handleEdit(product)}
                        className='cursor-pointer rounded p-1.5 text-blue-600 hover:bg-blue-50'
                        title='Chỉnh sửa'>
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className='cursor-pointer rounded p-1.5 text-red-500 hover:bg-red-100'
                        title='Xóa'>
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- Phân trang --- */}
      {totalPages > 1 && (
        <div className='mt-5 flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm'>
          <span className='text-sm text-gray-500'>
            Hiển thị {startIndex + 1} - {Math.min(endIndex, allFilteredProducts.length)} / {allFilteredProducts.length}{' '}
            sản phẩm
          </span>
          <div className='flex gap-2'>
            {/* Nút Previous */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className='flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-300 text-sm font-medium text-gray-600 transition hover:border-gray-400 hover:bg-gray-100 hover:text-gray-800 disabled:cursor-not-allowed disabled:border-gray-200 disabled:opacity-40'
              title='Trang trước'>
              <FaChevronLeft />
            </button>

            {/* Render các nút số trang thông minh */}
            {getPaginationItems(currentPage, totalPages).map((item, index) =>
              typeof item === 'number' ? (
                <button
                  key={index}
                  onClick={() => goToPage(item)}
                  className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-300 text-sm font-medium text-gray-600 transition hover:border-gray-400 hover:bg-gray-100 hover:text-gray-800 ${currentPage === item ? 'pointer-events-none border-blue-600 bg-blue-600 font-semibold text-white' : ''}`}>
                  {item}
                </button>
              ) : (
                <span
                  key={index}
                  className='flex h-8 w-8 select-none items-end justify-center pb-1.5 font-bold text-gray-400'>
                  ...
                </span>
              ),
            )}

            {/* Nút Next */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className='flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-300 text-sm font-medium text-gray-600 transition hover:border-gray-400 hover:bg-gray-100 hover:text-gray-800 disabled:cursor-not-allowed disabled:border-gray-200 disabled:opacity-40'
              title='Trang sau'>
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}

      {/* --- Modal thêm/sửa sản phẩm --- */}
      {showModal && (
        <div className='z-9999 fixed inset-0 flex items-center justify-center bg-black/50'>
          <div className='max-h-[110vh] w-[94%] max-w-[640px] scale-[0.92] overflow-hidden rounded-xl bg-white shadow-2xl'>
            <div className='flex items-center justify-between border-b border-gray-200 px-6 py-4'>
              <h2 className='flex items-center gap-2 text-xl font-bold text-gray-800'>
                <FaBox style={{ color: '#3b82f6' }} />
                {isEditing ? 'Cập nhật Sản phẩm' : 'Thêm Sản phẩm mới'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className='cursor-pointer text-xl text-gray-400 hover:text-gray-600'>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSave} className='p-6'>
              <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
                <div className='sm:col-span-2'>
                  <label
                    htmlFor='name'
                    className='mb-1.5 block text-[11px] text-sm font-bold uppercase tracking-wide text-gray-700'>
                    Tên Sản phẩm
                  </label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Ví dụ: Áo thun Polo cao cấp'
                    className='w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-black transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
                  />
                </div>

                <div>
                  <label
                    htmlFor='price'
                    className='mb-1.5 block text-[11px] text-sm font-bold uppercase tracking-wide text-gray-700'>
                    Giá bán (VNĐ)
                  </label>
                  <input
                    type='number'
                    name='price'
                    id='price'
                    required
                    value={formData.price || ''}
                    onChange={handleChange}
                    className='w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-black transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
                    min='0'
                  />
                </div>
                <div>
                  <label
                    htmlFor='oldPrice'
                    className='mb-1.5 block text-[11px] text-sm font-bold uppercase tracking-wide text-gray-700'>
                    Giá gốc (nếu có)
                  </label>
                  <input
                    type='number'
                    name='oldPrice'
                    id='oldPrice'
                    value={formData.oldPrice || ''}
                    onChange={handleChange}
                    className='w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-black transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
                    min='0'
                  />
                </div>

                <div>
                  <label
                    htmlFor='category'
                    className='mb-1.5 block text-[11px] text-sm font-bold uppercase tracking-wide text-gray-700'>
                    Danh mục
                  </label>
                  <select
                    name='category'
                    id='category'
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className='w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm font-medium text-black transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'>
                    <option value=''>Chọn danh mục</option>
                    <option value='Gia dụng'>Gia dụng</option>
                    <option value='Điện tử'>Điện tử</option>
                    <option value='Thời trang'>Thời trang</option>
                    <option value='Sách'>Sách</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor='stock'
                    className='mb-1.5 block text-[11px] text-sm font-bold uppercase tracking-wide text-gray-700'>
                    Tồn kho
                  </label>
                  <input
                    type='number'
                    name='stock'
                    id='stock'
                    required
                    value={formData.stock || ''}
                    onChange={handleChange}
                    className='w-full rounded-xl border border-gray-200 border-gray-300 bg-gray-50 p-3 text-sm text-black transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
                    min='0'
                  />
                </div>
                <div className='sm:col-span-2'>
                  <label
                    htmlFor='rating'
                    className='mb-1.5 block text-[11px] text-sm font-bold uppercase tracking-wide text-gray-700'>
                    Đánh giá (0.0 - 5.0)
                  </label>
                  <input
                    type='number'
                    name='rating'
                    id='rating'
                    required
                    value={formData.rating || ''}
                    onChange={handleChange}
                    className='w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-black transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
                    min='0'
                    max='5'
                    step='0.1'
                  />
                </div>
                <div className='sm:col-span-2'>
                  <label
                    htmlFor='image'
                    className='mb-1.5 block text-[11px] text-sm font-bold uppercase tracking-wide text-gray-700'>
                    Link Ảnh Sản phẩm
                  </label>
                  <input
                    type='text'
                    name='image'
                    id='image'
                    required
                    value={formData.image}
                    onChange={handleChange}
                    className='w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-black transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
                    placeholder='Ví dụ: https://images.com/ao-thun.jpg'
                  />
                </div>
              </div>

              <div className='mt-8 flex justify-end gap-3 border-t border-gray-100 pt-6'>
                <button
                  type='button'
                  onClick={() => setShowModal(false)}
                  className='cursor-pointer rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-bold text-gray-600 shadow-sm transition-all hover:bg-gray-50 active:scale-[0.98]'>
                  Hủy bỏ
                </button>
                <button
                  type='submit'
                  className='flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-600 px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/10 transition-all hover:bg-emerald-700 active:scale-[0.98]'>
                  <FaSave /> {isEditing ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
