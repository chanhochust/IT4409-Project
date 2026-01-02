'use client';

import { useEffect, useState, useMemo } from 'react';
import ProductList  from '../components/ProductList';
import ProductCard, { ProductCardProps } from "../components/ui/ProductCard";

export default function Products() {
  const [data, setData] = useState<ProductCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  // States quản lý bộ lọc
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(data.map((p) => p.category)));
    return ['Tất cả', ...uniqueCats.filter(Boolean)]; // Loại bỏ giá trị null/undefined nếu có
  }, [data]);

  const filteredProducts = useMemo(() => {
    let result = [...data];

    // Lọc theo Category
    if (selectedCategory !== 'Tất cả') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Lọc theo Giá
    if (priceRange.min) {
      result = result.filter((p) => p.price >= Number(priceRange.min));
    }
    if (priceRange.max) {
      result = result.filter((p) => p.price <= Number(priceRange.max));
    }

    // Sắp xếp
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [data, selectedCategory, priceRange, sortBy]);

  return (
    <main className='min-h-screen bg-[#f5f5fa] py-8 px-4 font-sans'>
      <div className='mx-auto max-w-[1250px]'>
        
        {/* THANH CÔNG CỤ TRÊN CÙNG */}
        <div className='mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-sm border border-white'>
          <div>
            <h1 className='text-xl font-bold text-gray-800 uppercase tracking-tight'>
              {selectedCategory === 'Tất cả' ? 'Tất cả sản phẩm' : selectedCategory}
            </h1>
            <p className='text-sm text-gray-400 mt-1'>Tìm thấy {filteredProducts.length} sản phẩm phù hợp</p>
          </div>
          
          <div className='flex items-center gap-3'>
            <span className='text-m text-gray-700 hidden sm:block'>Sắp xếp:</span>
            <select 
              className='bg-gray-50 border border-gray-100 text-sm font-semibold cursor-pointer p-2.5 outline-none focus:ring-2 focus:ring-blue-100'
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Mới nhất</option>
              <option value="price-asc">Giá thấp đến cao</option>
              <option value="price-desc">Giá cao đến thấp</option>
            </select>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8'>
          
          {/* SIDEBAR BÊN TRÁI */}
          <aside className='space-y-6'>
            {/* Khối Danh mục */}
            <div className='bg-white p-6 rounded-2xl shadow-sm border border-white'>
              <h3 className='font-bold text-m text-gray-700 mb-5 flex items-center justify-between'>
                Danh mục sản phẩm
              </h3>
              <div className='flex flex-col gap-1.5'>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat ?? 'Tất cả')}
                    className={`text-left text-[14px] py-2 px-3 rounded-lg transition-all duration-200 ${
                      selectedCategory === cat 
                      ? 'bg-blue-50 text-blue-600 font-bold translate-x-1' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-blue-500'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Khối Lọc Giá */}
            <div className='bg-white p-6 rounded-2xl shadow-sm border border-white'>
              <h3 className='font-bold text-m text-gray-700 mb-5'>Khoảng giá </h3>
              <div className='space-y-3'>
                <input 
                  type="number" 
                  placeholder="Từ" 
                  className='w-full bg-gray-50 border-transparent rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all' 
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                />
                <input 
                  type="number" 
                  placeholder="Đến" 
                  className='w-full bg-gray-50 border-transparent rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all' 
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                />
              </div>
              {(priceRange.min || priceRange.max || selectedCategory !== 'Tất cả') && (
                <button 
                  onClick={() => {setPriceRange({ min: '', max: '' }); setSelectedCategory('Tất cả');}}
                  className='w-full mt-5 text-[12px] font-bold text-red-400 hover:text-red-600 transition-colors uppercase'
                >
                  Xóa tất cả bộ lọc
                </button>
              )}
            </div>
          </aside>

          {/* DANH SÁCH SẢN PHẨM */}
          <section>
            {loading ? (
              <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                {[...Array(8)].map((_, i) => (
                  <div key={i} className='aspect-[3/4] bg-white rounded-2xl animate-pulse shadow-sm border border-white'></div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                <ProductList products={filteredProducts} />
              </div>
            ) : (
              <div className='bg-white rounded-[2rem] p-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-100'>
                <img src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png" className="w-20 opacity-20 mb-4" alt="" />
                <p className='text-gray-400 font-medium'>Rất tiếc, không tìm thấy sản phẩm nào.</p>
                <button 
                   onClick={() => {setSelectedCategory('Tất cả'); setPriceRange({min:'', max:''})}}
                   className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition"
                >
                  Thử lại
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}