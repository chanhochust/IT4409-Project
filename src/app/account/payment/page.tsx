'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaShieldAlt, FaRegQuestionCircle, FaCcVisa, FaCcMastercard, FaCreditCard, FaArrowLeft, FaUniversity } from 'react-icons/fa';

interface Card {
  id: number;
  last4: string;
  brand: string; // visa, mastercard
  expiry: string;
}

interface BankAccount {
  id: number;
  bankName: string;
  accountNumber: string;
  fullName: string;
}

interface BankOption {
  id: number;
  name: string;
  code: string;
  bin: string;
  shortName: string;
  logo: string;
}


export default function PaymentPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  
  // State modal
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showAddBankModal, setShowAddBankModal] = useState(false);

  const [bankStep, setBankStep] = useState(1); // 2 bước
  const [bankList, setBankList] = useState<BankOption[]>([]); // DS ngân hàng từ API

  const [userIdName, setUserIdName] = useState('');
  const [userIdNumber, setUserIdNumber] = useState('');

  const [selectedBankId, setSelectedBankId] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [isDefaultBank, setIsDefaultBank] = useState(false);

  // Goi API cac ngan hang
  useEffect(() => {
    if (showAddBankModal && bankList.length === 0) {
      fetch('https://api.vietqr.io/v2/banks')
        .then(res => res.json())
        .then(data => {
          if (data.code === "00") {
            setBankList(data.data);
          }
        })
        .catch(err => console.error("Lỗi lấy danh sách ngân hàng:", err));
    }
  }, [showAddBankModal]);

  const handleBankStep1Submit = () => {
    if (!userIdName || !userIdNumber) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    setBankStep(2);
  };

  const handleSaveBank = () => {
    const bank = bankList.find(b => b.id.toString() === selectedBankId);
    const newAccount: BankAccount = {
      id: Date.now(),
      bankName: bank?.shortName || 'Ngân hàng',
      accountNumber: bankAccountNumber,
      fullName: userIdName
    };
    setBankAccounts([...bankAccounts, newAccount]);
    
    // Reset và đóng modal
    setShowAddBankModal(false);
    setBankStep(1);
    setUserIdName('');
    setUserIdNumber('');
    setBankAccountNumber('');
    setSelectedBankId('');
  };

  // Giả lập danh sách chi nhánh khi chọn ngân hàng
  const getBranchOptions = () => {
    if (!selectedBankId) return [];
    return ["Chi nhánh Hội sở chính", "Chi nhánh Hà Nội", "Chi nhánh TP.HCM", "Chi nhánh Đà Nẵng"];
  };

  // State form
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState(''); 
  const [postalCode, setPostalCode] = useState('');

  const maskCardNumber = (last4: string) => {
    return `**** **** **** ${last4}`;
  };


  // Hàm lưu thẻ
  const handleSaveCard = () => {
    // Giả lập lưu
    const newCard: Card = {
      id: Date.now(),
      last4: cardNumber.slice(-4) || '0000',
      brand: 'visa',
      expiry: expiry || '12/25'
    };
    setCards([...cards, newCard]);
    setShowAddCardModal(false);
    
    // Reset form
    setCardNumber('');
    setExpiry('');
    setCvv('');
    setName('');
  };

  return (
    <div className="bg-white min-h-[400px]">
      
      <div className="mb-10">
        <div className="flex justify-between items-center border-b border-[#eee] pb-[15px] mb-5">
          <h2 className="text-[1.1rem] font-medium text-[#333] m-0">Thẻ Tín Dụng/Ghi Nợ</h2>
          <button className="bg-[rgba(25,146,211,1)] text-white border-0 px-4 py-2 rounded cursor-pointer text-[0.9rem] inline-flex items-center gap-[5px] transition-opacity hover:bg-[rgb(20,102,147)]" onClick={() => setShowAddCardModal(true)}>
            <FaPlus /> Thêm Thẻ Mới
          </button>
        </div>

        {cards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-[#777] text-[0.95rem]">
            <p>Bạn chưa liên kết thẻ.</p>
          </div>
        ) : (
          // Danh sách thẻ đã có
          <div className="flex flex-col gap-[15px]">
            {cards.map(card => (
              <div key={card.id} className="border border-[#e0e0e0] p-[15px] rounded flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <FaCcVisa className="text-[24px] text-[#1a237e]" />
                  <div className="flex flex-col">
                    <span className="font-medium text-base">
                        {maskCardNumber(card.last4)}
                    </span>
                    <span className="text-[0.8rem] text-[#777]">
                        Hết hạn: {card.expiry}
                    </span>
                  </div>
                </div>
                <button className="text-[#ee4d2d] bg-transparent border-0 cursor-pointer hover:underline" onClick={() => setCards(cards.filter(c => c.id !== card.id))}>Xóa</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-center border-b border-[#eee] pb-[15px] mb-5">
          <h2 className="text-[1.1rem] font-medium text-[#333] m-0">Tài Khoản Ngân Hàng Của Tôi</h2>
          <button className="bg-[rgba(25,146,211,1)] text-white border-0 px-4 py-2 rounded cursor-pointer text-[0.9rem] inline-flex items-center gap-[5px] transition-opacity hover:bg-[rgb(20,102,147)]" onClick={() => setShowAddBankModal(true)}>
            <FaPlus /> Thêm Ngân Hàng Liên Kết
          </button>
        </div>

        {bankAccounts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-[#777] text-[0.95rem]"><p>Bạn chưa có tài khoản ngân hàng.</p></div>
        ) : (
          <div className="flex flex-col gap-[15px]">
            {bankAccounts.map(acc => (
              <div key={acc.id} className="border border-[#e0e0e0] p-[15px] rounded flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <FaUniversity className="text-[24px] text-[#1a237e]" />
                  <div>
                    <div className="font-semibold">{acc.bankName}</div>
                    <div className="text-[0.85rem] text-[#666]">
                        STK: **** {acc.accountNumber.slice(-3)} - {acc.fullName}
                    </div>
                  </div>
                </div>
                <button className="text-[#ee4d2d] bg-transparent border-0 cursor-pointer hover:underline" onClick={() => setBankAccounts(bankAccounts.filter(a => a.id !== acc.id))}>Xóa</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- MODAL THÊM THẺ TÍN DỤNG --- */}
      {showAddCardModal && (
        <div className="fixed inset-0 bg-black/40 z-9999 flex items-center justify-center">
          <div className="bg-white w-[600px] max-w-[95%] rounded shadow-[0_2px_10px_rgba(0,0,0,0.1)] flex flex-col max-h-[95vh] overflow-y-auto">
            
            <div className="px-[30px] py-5 border-b border-[#eee] text-[1.2rem] font-medium text-[#333]">
              Thêm thẻ tín dụng
            </div>

            <div className="p-[30px]">
              
              {/* Banner Bảo Mật */}
              <div className="bg-[#f0f9f4] border border-[#cbf3de] px-[15px] py-3 rounded flex gap-2.5 mb-[25px] text-[0.85rem] text-[#333] leading-[1.4]">
                <FaShieldAlt className="text-[#00bfa5] text-[1.2rem] shrink-0" />
                <div>
                  <strong>Thông tin thẻ của bạn được bảo vệ.</strong>
                  <br />
                  Chúng tôi hợp tác với các đơn vị thanh toán quốc tế để đảm bảo thông tin thẻ của bạn được bảo mật và an toàn.
                </div>
              </div>

              {/* Form Chi Tiết Thẻ */}
              <div className="font-medium mb-[15px] flex justify-between items-center">
                <span>Chi tiết thẻ</span>
                <div className="flex gap-[5px] opacity-70">
                  <FaCcVisa size={20} /> <FaCcMastercard size={20} /> <FaCreditCard size={20} />
                </div>
              </div>

              <div className="mb-[15px]">
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 border border-[#d5d5d5] rounded text-[0.9rem] outline-none box-border transition placeholder:text-[#bbb] focus:border-[#777]" 
                  placeholder="Số thẻ" 
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-[15px] mb-[15px]">
                <div className="mb-0">
                  <input 
                    type="text" 
                    className="w-full px-3 py-2.5 border border-[#d5d5d5] rounded text-[0.9rem] outline-none box-border transition placeholder:text-[#bbb] focus:border-[#777]" 
                    placeholder="Ngày hết hạn (MM/YY)" 
                    value={expiry}
                    onChange={e => setExpiry(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    className="w-full px-3 py-2.5 border border-[#d5d5d5] rounded text-[0.9rem] outline-none box-border transition placeholder:text-[#bbb] focus:border-[#777]" 
                    placeholder="Mã CVV" 
                    value={cvv}
                    onChange={e => setCvv(e.target.value)}
                  />
                  <FaRegQuestionCircle className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#999] cursor-pointer" title="3 số cuối mặt sau thẻ" />
                </div>
              </div>

              <div className="mb-[15px]">
                <input 
                  type="text" 
                  className="w-full px-3 py-2.5 border border-[#d5d5d5] rounded text-[0.9rem] outline-none box-border transition placeholder:text-[#bbb] focus:border-[#777]" 
                  placeholder="Họ và tên chủ thẻ" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              {/* Form Địa Chỉ */}
              <div className="mt-[30px]">
                <div className="font-medium mb-[15px]">Địa chỉ đăng ký thẻ Tín dụng/Ghi nợ</div>
                
                <div className="mb-[15px]">
                  <input 
                    type="text" 
                    className="w-full px-3 py-2.5 border border-[#d5d5d5] rounded text-[0.9rem] outline-none box-border transition placeholder:text-[#bbb] bg-[#fdfdfd] focus:border-[#777]" 
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Địa chỉ"
                  />
                </div>

                <div className="mb-[15px]">
                  <input 
                    type="text" 
                    className="w-full px-3 py-2.5 border border-[#d5d5d5] rounded text-[0.9rem] outline-none box-border transition placeholder:text-[#bbb] focus:border-[#777]" 
                    placeholder="Mã bưu chính" 
                    value={postalCode}
                    onChange={e => setPostalCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="text-[0.8rem] text-[#777] mt-5 leading-[1.4]">
                1.000 VND có thể bị trừ trong thẻ của bạn trong quá trình xác minh thẻ. Số tiền này sẽ được hoàn trả trong vòng 14 ngày.
              </div>

            </div>

            {/* Footer Buttons */}
            <div className="px-[30px] py-5 border-t border-[#eee] flex justify-end gap-2.5">
              <button className="bg-white border border-[#e0e0e0] text-[#555] px-[30px] py-2.5 cursor-pointer rounded hover:bg-[#f8f8f8]" onClick={() => setShowAddCardModal(false)}>Trở lại</button>
              <button className="bg-[rgba(18,141,207,1)] border border-[#2ca4e5] text-white px-[30px] py-2.5 cursor-pointer rounded hover:bg-[rgb(20,102,147)]" onClick={handleSaveCard}>Hoàn thành</button>
            </div>

          </div>
        </div>
      )}

      {/* --- MODAL THÊM TK NGÂN HÀNG --- */}
      {showAddBankModal && (
        <div className="fixed inset-0 bg-black/40 z-9999 flex items-center justify-center">
          <div className="bg-white w-[600px] max-w-[95%] rounded shadow-[0_2px_10px_rgba(0,0,0,0.1)] flex flex-col max-h-[95vh] overflow-y-auto">
            
            {/* Header: Có nút back nếu ở bước 2 */}
            <div className="px-[30px] py-5 border-b border-[#eee] text-[1.2rem] font-medium text-[#333] flex items-center justify-start gap-2.5">
              {bankStep === 2 && (
                <button className="bg-transparent border-0 text-[#777] cursor-pointer text-[1.2rem] mr-2.5 flex items-center hover:text-[#333]" onClick={() => setBankStep(1)}>
                  <FaArrowLeft />
                </button>
              )}
              {bankStep === 1 ? 'Thông Tin Người Dùng' : 'Thêm Tài Khoản Ngân Hàng'}
            </div>

            <div className="p-[30px]">
              
              {/* BƯỚC 1: NHẬP TÊN VÀ CCCD */}
              {bankStep === 1 && (
                <>
                  <div className="mb-[15px]">
                    <input 
                      type="text" 
                      className="w-full px-3 py-2.5 border border-[#d5d5d5] rounded text-[0.9rem] outline-none box-border transition placeholder:text-[#bbb] focus:border-[#777]" 
                      placeholder="Họ và tên" 
                      value={userIdName}
                      onChange={e => setUserIdName(e.target.value)}
                    />
                  </div>
                  <div className="mb-[15px]">
                    <input 
                      type="text" 
                      className="w-full px-3 py-2.5 border border-[#d5d5d5] rounded text-[0.9rem] outline-none box-border transition placeholder:text-[#bbb] focus:border-[#777]" 
                      placeholder="Số CCCD / CMND" 
                      value={userIdNumber}
                      onChange={e => setUserIdNumber(e.target.value)}
                    />
                  </div>
                </>
              )}

              {/* BƯỚC 2: CHỌN NGÂN HÀNG & SỐ TÀI KHOẢN */}
              {bankStep === 2 && (
                <>
                  <div className="mb-[15px]">
                    {/* Select Ngân hàng từ API */}
                    <select 
                      className="w-full px-3 py-2.5 border border-[#d5d5d5] rounded text-[0.9rem] outline-none box-border transition placeholder:text-[#bbb] focus:border-[#777]" 
                      value={selectedBankId}
                      onChange={e => {
                        setSelectedBankId(e.target.value);
                        setSelectedBranch(''); // Reset nhánh khi đổi bank
                      }}
                    >
                      <option value="">Chọn ngân hàng</option>
                      {bankList.map(bank => (
                        <option key={bank.id} value={bank.id}>
                          {bank.shortName} - {bank.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-[15px]">
                    {/* Select Chi nhánh */}
                    <select 
                      className="w-full px-3 py-2.5 border border-[#d5d5d5] rounded text-[0.9rem] outline-none box-border transition placeholder:text-[#bbb] focus:border-[#777]"
                      value={selectedBranch}
                      onChange={e => setSelectedBranch(e.target.value)}
                      disabled={!selectedBankId}
                    >
                      <option value="">Chọn chi nhánh</option>
                      {getBranchOptions().map((branch, idx) => (
                        <option key={idx} value={branch}>{branch}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-[15px]">
                    <input 
                      type="text" 
                      className="w-full px-3 py-2.5 border border-[#d5d5d5] rounded text-[0.9rem] outline-none box-border transition placeholder:text-[#bbb] focus:border-[#777]" 
                      placeholder="Số tài khoản" 
                      value={bankAccountNumber}
                      onChange={e => setBankAccountNumber(e.target.value)}
                    />
                  </div>

                  <div className="mb-[15px]">
                    <input 
                      type="text" 
                      className="w-full px-3 py-2.5 border border-[#d5d5d5] rounded text-[0.9rem] outline-none box-border transition placeholder:text-[#bbb] bg-[#fdfdfd] focus:border-[#777]" 
                      placeholder="Tên đầy đủ (Tự động điền)" 
                      value={userIdName.toUpperCase()}
                      readOnly
                    />
                  </div>

                  <label className="flex items-center gap-2 text-[0.9rem] text-[#555] mt-2.5 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={isDefaultBank}
                      onChange={e => setIsDefaultBank(e.target.checked)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    Đặt làm tài khoản mặc định
                  </label>
                </>
              )}

            </div>

            {/* Footer Buttons */}
            <div className="px-[30px] py-5 border-t border-[#eee] flex justify-end gap-2.5">
              <button 
                className="bg-white border border-[#e0e0e0] text-[#555] px-[30px] py-2.5 cursor-pointer rounded hover:bg-[#f8f8f8]" 
                onClick={() => {
                  setShowAddBankModal(false); 
                  setBankStep(1); // Reset về bước 1
                }}
              >
                Trở lại
              </button>
              
              {bankStep === 1 ? (
                <button className="bg-[rgba(18,141,207,1)] border border-[#2ca4e5] text-white px-[30px] py-2.5 cursor-pointer rounded hover:bg-[rgb(20,102,147)]" onClick={handleBankStep1Submit}>Tiếp theo</button>
              ) : (
                <button className="bg-[rgba(18,141,207,1)] border border-[#2ca4e5] text-white px-[30px] py-2.5 cursor-pointer rounded hover:bg-[rgb(20,102,147)]" onClick={handleSaveBank}>Hoàn thành</button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}