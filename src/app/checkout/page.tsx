'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSearchParams } from 'next/navigation';
import { useCartStore } from '@/store/cart_actions';
import Image from 'next/image';
import { FaMapMarkerAlt, FaChevronLeft, FaExclamationTriangle, FaTicketAlt } from 'react-icons/fa';
import { FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';
import Link from 'next/link';

interface Address {
  id: number;
  name: string;
  phone: string;
  city: string;
  district: string;
  ward: string;
  street: string;
  isDefault: boolean;
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const cart = useCartStore((s) => s.cart);

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  // Logic Voucher
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<{code: string, discountValue: number} | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('user_addresses');
    if (saved) {
      const parsed: Address[] = JSON.parse(saved);
      setAddresses(parsed);
      setSelectedAddress(parsed.find(a => a.isDefault) || parsed[0] || null);
    }
  }, []);

  const selectedProducts = useMemo(() => {
    const itemsParam = searchParams.get('items');
    const ids = itemsParam ? JSON.parse(itemsParam) : [];
    return cart.filter((item) => ids.includes(item.id));
  }, [searchParams, cart]);
  
  const subTotal = selectedProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subTotal > 0 ? 30000 : 0;

  // Xử lý áp dụng Voucher
  const handleApplyVoucher = () => {
    if (voucherCode.toUpperCase() === "SAVE20") {
      if (subTotal >= 200000) {
        setAppliedVoucher({ code: "SAVE20", discountValue: 20000 });
        alert("Áp dụng mã giảm giá 20K thành công!");
      } else {
        alert("Đơn hàng chưa đủ 200K để áp dụng mã này.");
      }
    } else if (voucherCode.toUpperCase() === "SHIP0") {
      setAppliedVoucher({ code: "SHIP0", discountValue: shippingFee });
      alert("Đã áp dụng mã Freeship!");
    } else {
      alert("Mã giảm giá không tồn tại hoặc đã hết hạn.");
    }
  };

  const total = subTotal + shippingFee - (appliedVoucher?.discountValue || 0);

  return (
    <div className="min-h-screen bg-[#f5f5fa] py-8">
      <div className="mx-auto max-w-[1200px] px-4">
        <Link href="/cart" className="mb-4 inline-flex items-center gap-2 text-gray-500 hover:text-red-600 transition text-sm font-medium">
          <FaChevronLeft size={10} /> Quay lại giỏ hàng
        </Link>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">
          {/* CỘT TRÁI */}
          <div className="flex flex-col gap-4">
            {/* 1. Địa chỉ */}
            <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-white">
              <div className="h-1 w-full bg-[repeating-linear-gradient(45deg,#ef4444,#ef4444_33px,#fff_33px,#fff_66px,#3b82f6_66px,#3b82f6_99px,#fff_99px,#fff_132px)]"></div>
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between text-[#ee4d2d]">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt size={18} />
                    <h2 className="text-lg font-bold tracking-tight uppercase">Địa chỉ nhận hàng</h2>
                  </div>
                  <Link href="/account/address" className="text-sm font-medium text-blue-600 hover:underline">Thay đổi</Link>
                </div>
                {selectedAddress ? (
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-900">{selectedAddress.name}</span>
                      <span className="text-gray-400">|</span>
                      <span className="font-bold text-gray-900">{selectedAddress.phone}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{selectedAddress.street}, {selectedAddress.ward}, {selectedAddress.district}, {selectedAddress.city}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-4 border-2 border-dashed border-gray-100 rounded-lg">
                    <FaExclamationTriangle className="text-yellow-500 mb-2" />
                    <p className="text-sm text-gray-500 mb-3">Chưa có địa chỉ giao hàng.</p>
                    <Link href="/account/address" className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-bold border border-red-100">+ Thêm địa chỉ mới</Link>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Sản phẩm */}
            <div className="rounded-xl bg-white p-6 shadow-sm border border-white">
              <h2 className="mb-4 font-bold text-gray-800 border-b pb-3 uppercase text-sm">Sản phẩm thanh toán</h2>
              <div className="space-y-6">
                {selectedProducts.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative h-20 w-20 shrink-0 bg-[#f8f8f8] rounded-lg border border-gray-100 overflow-hidden p-1">
                      <Image src={item.image} alt={item.name} fill className="object-contain" />
                    </div>
                    <div className="flex-1">
                      <h3 className="line-clamp-2 text-sm font-medium text-gray-800">{item.name}</h3>
                      <p className="text-xs text-gray-400 font-semibold uppercase">Loại: Tiêu chuẩn</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{item.price.toLocaleString()}₫</p>
                      <p className="text-xs text-gray-500">x {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Phương thức thanh toán */}
            <div className="rounded-xl bg-white p-6 shadow-sm border border-white">
              <h2 className="mb-4 text-sm font-bold text-gray-800 uppercase tracking-wider">Phương thức thanh toán</h2>
              <div className="grid grid-cols-1 gap-3">
                <label className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all ${paymentMethod === 'cod' ? 'border-[#ee4d2d] bg-[#fff5f6]' : 'border-gray-100 hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    <FaMoneyBillWave className={paymentMethod === 'cod' ? 'text-[#ee4d2d]' : 'text-gray-400'} size={20} />
                    <span className="text-sm font-medium">Thanh toán khi nhận hàng (COD)</span>
                  </div>
                  <input type="radio" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="h-4 w-4 accent-[#ee4d2d]" />
                </label>
                <label className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all ${paymentMethod === 'vnpay' ? 'border-[#ee4d2d] bg-[#fff5f6]' : 'border-gray-100 hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    <FaCreditCard className={paymentMethod === 'vnpay' ? 'text-blue-600' : 'text-gray-400'} size={20} />
                    <span className="text-sm font-medium">Ví điện tử VNPay / MoMo</span>
                  </div>
                  <input type="radio" checked={paymentMethod === 'vnpay'} onChange={() => setPaymentMethod('vnpay')} className="h-4 w-4 accent-[#ee4d2d]" />
                </label>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: TỔNG TIỀN & VOUCHER */}
          <div className="h-fit sticky top-6 flex flex-col gap-4">
            {/* PHẦN NHẬP VOUCHER */}
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-50">
               <div className="flex items-center gap-2 mb-2 text-gray-800">
                  <FaTicketAlt className="text-[#ee4d2d]" />
                  <span className="font-bold text-sm uppercase">MiniShop Voucher</span>
               </div>
               <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Nhập mã giảm giá..." 
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#ee4d2d]"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                  />
                  <button 
                    onClick={handleApplyVoucher}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition"
                  >
                    Áp dụng
                  </button>
               </div>
               {appliedVoucher && (
                 <div className="mt-2 text-xs text-green-600 font-medium flex justify-between items-center bg-green-50 p-2 rounded">
                    <span>Mã đã dùng: <b>{appliedVoucher.code}</b></span>
                    <button onClick={() => setAppliedVoucher(null)} className="text-red-500 hover:underline">Xóa</button>
                 </div>
               )}
            </div>

            {/* CHI TIẾT THANH TOÁN */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-50">
              <h2 className="mb-6 text-xl font-bold text-gray-900 border-b pb-4">Chi tiết thanh toán</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-500 text-sm font-medium">
                  <span>Tổng tiền hàng</span>
                  <span className="text-gray-900">{subTotal.toLocaleString()}₫</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm font-medium">
                  <span>Phí vận chuyển</span>
                  <span className="text-gray-900">{shippingFee.toLocaleString()}₫</span>
                </div>
                {appliedVoucher && (
                  <div className="flex justify-between text-green-600 text-sm font-medium">
                    <span>Giảm giá Voucher</span>
                    <span>-{appliedVoucher.discountValue.toLocaleString()}₫</span>
                  </div>
                )}
                <div className="border-t border-dashed my-4 pt-4">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-gray-800 font-bold">Tổng thanh toán:</span>
                    <span className="text-3xl font-black text-[#ee4d2d] leading-none">
                      {total.toLocaleString()}₫
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 text-right uppercase tracking-wider font-bold">Đã bao gồm VAT</p>
                </div>
              </div>

              <button 
                className={`mt-8 w-full py-4 rounded-xl text-lg font-bold text-white transition-all shadow-lg 
                  ${selectedAddress ? 'bg-[#ee4d2d] hover:bg-[#d73211] shadow-red-100 active:scale-[0.98]' : 'bg-gray-300 cursor-not-allowed shadow-none'}`}
                disabled={!selectedAddress}
                onClick={() => alert(`Đặt hàng thành công!\nTổng cộng: ${total.toLocaleString()}₫`)}
              >
                {selectedAddress ? 'ĐẶT HÀNG NGAY' : 'VUI LÒNG THÊM ĐỊA CHỈ'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}