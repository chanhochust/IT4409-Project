'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaTimes, FaSave, FaBox, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating?: number; 
  stock?: number;
  status?: 'available' | 'out_of_stock' | 'draft';
}

const initialFormState: Product = {
  id: "",
  name: '',
  image: '',
  category: '',
  price: 0,
  oldPrice: 0,
  rating: 5.0,
  stock: 0,
  status: 'draft',
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
        status: p.status || 'available'
      }));

      setProducts(mappedData);
    } catch (error) {
      console.error("Lỗi tải sản phẩm:", error);
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
        rating: parseFloat(formData.rating?.toString() || '0')
    };

    if (isEditing) {
      setProducts(prev => prev.map(p => (p.id === formData.id ? formData : p)));
      alert(`Đã cập nhật (giả lập): ${formData.name}`);
    } else {
      setProducts(prev => [formData, ...prev]); // Thêm vào đầu danh sách
      alert(`Đã thêm mới (giả lập): ${formData.name}`);
    }

    setShowModal(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${name}"?`)) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let parsedValue: string | number = value;

    if (type === 'number' || ['price','oldPrice','stock','rating'].includes(name)) {
      parsedValue = parseFloat(value);
      if (isNaN(parsedValue)) {
         parsedValue = 0;
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: parsedValue,
    } as Product));
  };

  // Filter & pagination
  const allFilteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()))
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

  const getStatusBadge = (status: Product['status']) => {
    switch (status) {
      case 'available': return <span className="status-badge status-available">Đang bán</span>;
      case 'out_of_stock': return <span className="status-badge status-out-of-stock">Hết hàng</span>;
      case 'draft': return <span className="status-badge status-draft">Nháp</span>;
      default: return <span className="status-badge status-draft">Khác</span>;
    }
  };

  const getStockBadgeClass = (stock: number) => {
    if (stock > 50) return "stock-badge-high";
    if (stock > 0) return "stock-badge-low";
    return "stock-badge-zero";
  };

  if (isLoading) {
    return <div className="p-8 text-center">Đang tải dữ liệu sản phẩm...</div>;
  }

  return (
    <div className="p-0">
      <h1 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-4 mb-6">Quản lý Sản phẩm</h1>

      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">

        {/* Search */}
        <div className="relative w-full max-w-96">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên sản phẩm..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset trang khi search
            }}
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
        </div>

        {/* Add New Button */}
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-blue-700"
        >
          <FaPlus /> Thêm Sản phẩm
        </button>
      </div>

      {/* --- BẢNG DANH SÁCH SẢN PHẨM --- */}
      <div className="bg-white p-5 rounded-lg shadow border border-gray-200 overflow-x-auto">

        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-[0.75rem] font-semibold text-gray-600 uppercase tracking-wider border-b-2 border-gray-200">Mã SP</th>
              <th className="px-4 py-3 text-left text-[0.75rem] font-semibold text-gray-600 uppercase tracking-wider border-b-2 border-gray-200" style={{ width: '250px' }}>Sản phẩm</th>
              <th className="px-4 py-3 text-left text-[0.75rem] font-semibold text-gray-600 uppercase tracking-wider border-b-2 border-gray-200">Danh mục</th>
              <th className="px-4 py-3 text-left text-[0.75rem] font-semibold text-gray-600 uppercase tracking-wider border-b-2 border-gray-200">Giá gốc</th>
              <th className="px-4 py-3 text-left text-[0.75rem] font-semibold text-gray-600 uppercase tracking-wider border-b-2 border-gray-200">Giá bán</th>
              <th className="px-4 py-3 text-left text-[0.75rem] font-semibold text-gray-600 uppercase tracking-wider border-b-2 border-gray-200">Đánh giá</th>
              <th className="px-4 py-3 text-left text-[0.75rem] font-semibold text-gray-600 uppercase tracking-wider border-b-2 border-gray-200">Tồn kho</th>
              <th className="px-4 py-3 text-left text-[0.75rem] font-semibold text-gray-600 uppercase tracking-wider border-b-2 border-gray-200">Trạng thái</th>
              <th className="px-4 py-3 text-right text-[0.75rem] font-semibold text-gray-600 uppercase tracking-wider border-b-2 border-gray-200">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-6 text-gray-500">
                  Không tìm thấy sản phẩm nào.
                </td>
              </tr>
            ) : (
              displayedProducts.map(product => (
                <tr key={product.id} className="hover:bg-[#fcfcfd]">
                  <td className="px-4 py-3 text-sm text-gray-600 border-b align-middle">{product.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 border-b align-middle">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover shrink-0" />
                      <span className="font-semibold text-gray-800 leading-tight">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 border-b align-middle">{product.category}</td>
                  <td className="px-4 py-3 border-b align-middle text-xs text-gray-400 line-through">{product.oldPrice ? formatPrice(product.oldPrice) : '-'}</td>
                  <td className="px-4 py-3 text-sm border-b align-middle text-red-500 font-bold">{formatPrice(product.price)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 border-b align-middle">
                    <div className="flex items-center text-amber-500 text-xs">
                      <FaStar /> ({product.rating?.toFixed(1) || 0})
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 border-b align-middle">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full inline-block ${
                      (product.stock || 0) > 50 ? 'bg-emerald-100 text-emerald-800' : (product.stock || 0) > 0 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 border-b align-middle">{getStatusBadge(product.status)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 border-b align-middle">
                    <div className="flex gap-1 justify-end">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-1.5 rounded text-blue-600 hover:bg-blue-50"
                      title="Chỉnh sửa"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="p-1.5 rounded text-red-500 hover:bg-red-100"
                      title="Xóa"
                    >
                      <FaTrash />
                    </button>
                    </div>
                  </td>
                </tr>
              )))}
          </tbody>
        </table>
      </div>

      {/* --- Phân trang --- */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg mt-5 shadow-sm">
          <span className="text-sm text-gray-500">
            Hiển thị {startIndex + 1} - {Math.min(endIndex, allFilteredProducts.length)} / {allFilteredProducts.length} sản phẩm
          </span>
          <div className="flex gap-2">
            
            {/* Nút Previous */}
            <button 
              onClick={() => goToPage(currentPage - 1)} 
              disabled={currentPage === 1}
              className="border border-gray-300 text-gray-600 w-9 h-9 flex items-center justify-center rounded cursor-pointer text-sm font-medium transition hover:bg-gray-100 hover:border-gray-400 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-40 disabled:border-gray-200"
              title="Trang trước"
            >
              <FaChevronLeft />
            </button>
            
            {/* Render các nút số trang thông minh */}
            {getPaginationItems(currentPage, totalPages).map((item, index) => (
                typeof item === 'number' ? (
                    <button 
                        key={index} 
                        onClick={() => goToPage(item)}
                        className={`border border-gray-300 text-gray-600 w-9 h-9 flex items-center justify-center rounded cursor-pointer text-sm font-medium transition hover:bg-gray-100 hover:border-gray-400 hover:text-gray-800 ${currentPage === item ? 'bg-blue-600 text-white border-blue-600 pointer-events-none font-semibold' : ''}`}
                    >
                        {item}
                    </button>
                ) : (
                    <span key={index} className="flex items-end justify-center w-8 h-8 text-gray-400 font-bold select-none pb-1.5">...</span>
                )
            ))}
            
            {/* Nút Next */}
            <button 
              onClick={() => goToPage(currentPage + 1)} 
              disabled={currentPage === totalPages}
              className="border border-gray-300 text-gray-600 w-9 h-9 flex items-center justify-center rounded cursor-pointer text-sm font-medium transition hover:bg-gray-100 hover:border-gray-400 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-40 disabled:border-gray-200"
              title="Trang sau"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}

      {/* --- Modal thêm/sửa sản phẩm --- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-9999 flex items-center justify-center">
          <div className="bg-white w-[94%] max-w-[640px] rounded-xl shadow-2xl overflow-hidden max-h-[110vh] scale-[0.92]">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaBox style={{ color: '#3b82f6' }} />
                {isEditing ? 'Cập nhật Sản phẩm' : 'Thêm Sản phẩm mới'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">
                <FaTimes/>
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6">

              {/* Cấu trúc Grid 2 cột cho các trường */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Tên Sản phẩm</label>
                  <input type="text" name="name" id="name" required
                    value={formData.name} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Giá bán</label>
                  <input type="number" name="price" id="price" required
                    value={formData.price || ''} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                </div>
                <div>
                  <label htmlFor="oldPrice" className="block text-sm font-medium text-gray-700 mb-1">Giá gốc (nếu có)</label>
                  <input type="number" name="oldPrice" id="oldPrice"
                    value={formData.oldPrice || ''} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                  <select name="category" id="category" required
                    value={formData.category} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Chọn danh mục</option>
                    <option value="Gia dụng">Gia dụng</option>
                    <option value="Điện tử">Điện tử</option>
                    <option value="Thời trang">Thời trang</option>
                    <option value="Sách">Sách</option>
                    <option value="Gia dụng">Đồ gia dụng</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Tồn kho</label>
                  <input type="number" name="stock" id="stock" required
                    value={formData.stock || ''} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                </div>
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">Đánh giá (0.0 - 5.0)</label>
                  <input type="number" name="rating" id="rating" required
                    value={formData.rating || ''} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    min="0" max="5" step="0.1"
                  />
                </div>
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                  <select name="status" id="status" required
                    value={formData.status} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="available">Đang bán</option>
                    <option value="out_of_stock">Hết hàng</option>
                    <option value="draft">Nháp</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Link Ảnh Sản phẩm</label>
                  <input type="text" name="image" id="image" required
                    value={formData.image} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Nút Hành động */}
              <div className="flex justify-end pt-4 gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 bg-white text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600"
                >
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