'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaTimes, FaSave, FaBox, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'app/admin/products/product.css';

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
    <div className="admin-product-container">
      <h1>Quản lý Sản phẩm</h1>

      <div className="product-toolbar">

        {/* Search */}
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên sản phẩm..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset trang khi search
            }}
          />
          <FaSearch className="search-icon" />
        </div>

        {/* Add New Button */}
        <button
          onClick={handleAddNew}
          className="btn-add-product"
        >
          <FaPlus /> Thêm Sản phẩm
        </button>
      </div>

      {/* --- BẢNG DANH SÁCH SẢN PHẨM --- */}
      <div className="product-table-wrapper">

        <table className="product-table">
          <thead>
            <tr>
              <th>Mã SP</th>
              <th style={{ width: '250px' }}>Sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá gốc</th>
              <th>Giá bán</th>
              <th>Đánh giá</th>
              <th>Tồn kho</th>
              <th>Trạng thái</th>
              <th style={{ textAlign: 'right' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: '24px', color: '#6b7280' }}>
                  Không tìm thấy sản phẩm nào.
                </td>
              </tr>
            ) : (
              displayedProducts.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td className="product-col-name">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <span className="product-name">{product.name}</span>
                  </td>
                  <td>{product.category}</td>
                  <td className="price-old">{product.oldPrice ? formatPrice(product.oldPrice) : '-'}</td>
                  <td className="price-sale">{formatPrice(product.price)}</td>
                  <td>
                    <div className="rating-info">
                      <FaStar /> ({product.rating?.toFixed(1) || 0})
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${getStockBadgeClass(product.stock || 0)}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td>{getStatusBadge(product.status)}</td>
                  <td className="action-buttons">
                    <button
                      onClick={() => handleEdit(product)}
                      className="btn-edit"
                      title="Chỉnh sửa"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="btn-delete"
                      title="Xóa"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              )))}
          </tbody>
        </table>
      </div>

      {/* --- Phân trang --- */}
      {totalPages > 1 && (
        <div className="pagination-controls">
          <span className="pagination-info">
            Hiển thị {startIndex + 1} - {Math.min(endIndex, allFilteredProducts.length)} / {allFilteredProducts.length} sản phẩm
          </span>
          <div className="pagination-buttons">
            
            {/* Nút Previous */}
            <button 
              onClick={() => goToPage(currentPage - 1)} 
              disabled={currentPage === 1}
              className="btn-pagination"
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
                        className={`btn-pagination ${currentPage === item ? 'active' : ''}`}
                    >
                        {item}
                    </button>
                ) : (
                    <span key={index} className="pagination-ellipsis">...</span>
                )
            ))}
            
            {/* Nút Next */}
            <button 
              onClick={() => goToPage(currentPage + 1)} 
              disabled={currentPage === totalPages}
              className="btn-pagination"
              title="Trang sau"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}

      {/* --- Modal thêm/sửa sản phẩm --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>
                <FaBox style={{ color: '#3b82f6' }} />
                {isEditing ? 'Cập nhật Sản phẩm' : 'Thêm Sản phẩm mới'}
              </h2>
              <button onClick={() => setShowModal(false)} className="btn-close-modal">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSave} className="modal-body">

              {/* Cấu trúc Grid 2 cột cho các trường */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="modal-form-group" style={{ gridColumn: 'span 2' }}>
                  <label htmlFor="name">Tên Sản phẩm</label>
                  <input type="text" name="name" id="name" required
                    value={formData.name} onChange={handleChange}
                    className="modal-form-group input"
                  />
                </div>

                <div className="modal-form-group">
                  <label htmlFor="price">Giá bán</label>
                  <input type="number" name="price" id="price" required
                    value={formData.price || ''} onChange={handleChange}
                    className="modal-form-group input"
                    min="0"
                  />
                </div>
                <div className="modal-form-group">
                  <label htmlFor="oldPrice">Giá gốc (nếu có)</label>
                  <input type="number" name="oldPrice" id="oldPrice"
                    value={formData.oldPrice || ''} onChange={handleChange}
                    className="modal-form-group input"
                    min="0"
                  />
                </div>

                <div className="modal-form-group">
                  <label htmlFor="category">Danh mục</label>
                  <select name="category" id="category" required
                    value={formData.category} onChange={handleChange}
                    className="modal-form-group select"
                  >
                    <option value="">Chọn danh mục</option>
                    <option value="Gia dụng">Gia dụng</option>
                    <option value="Điện tử">Điện tử</option>
                    <option value="Thời trang">Thời trang</option>
                    <option value="Sách">Sách</option>
                    <option value="Gia dụng">Đồ gia dụng</option>
                  </select>
                </div>
                <div className="modal-form-group">
                  <label htmlFor="stock">Tồn kho</label>
                  <input type="number" name="stock" id="stock" required
                    value={formData.stock || ''} onChange={handleChange}
                    className="modal-form-group input"
                    min="0"
                  />
                </div>
                <div className="modal-form-group">
                  <label htmlFor="rating">Đánh giá (0.0 - 5.0)</label>
                  <input type="number" name="rating" id="rating" required
                    value={formData.rating || ''} onChange={handleChange}
                    className="modal-form-group input"
                    min="0" max="5" step="0.1"
                  />
                </div>
                <div className="modal-form-group">
                  <label htmlFor="status">Trạng thái</label>
                  <select name="status" id="status" required
                    value={formData.status} onChange={handleChange}
                    className="modal-form-group select"
                  >
                    <option value="available">Đang bán</option>
                    <option value="out_of_stock">Hết hàng</option>
                    <option value="draft">Nháp</option>
                  </select>
                </div>
                <div className="modal-form-group" style={{ gridColumn: 'span 2' }}>
                  <label htmlFor="image">Link Ảnh Sản phẩm</label>
                  <input type="text" name="image" id="image" required
                    value={formData.image} onChange={handleChange}
                    className="modal-form-group input"
                  />
                </div>
              </div>

              {/* Nút Hành động */}
              <div className="modal-footer-actions">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-cancel"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="btn-submit"
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