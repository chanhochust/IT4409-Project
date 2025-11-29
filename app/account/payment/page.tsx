'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaShieldAlt, FaRegQuestionCircle, FaCcVisa, FaCcMastercard, FaCreditCard, FaArrowLeft, FaUniversity } from 'react-icons/fa';
import styles from './payment.module.css';

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
    <div className={styles.paymentContainer}>
      
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Thẻ Tín Dụng/Ghi Nợ</h2>
          <button className={styles.btnAdd} onClick={() => setShowAddCardModal(true)}>
            <FaPlus /> Thêm Thẻ Mới
          </button>
        </div>

        {cards.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Bạn chưa liên kết thẻ.</p>
          </div>
        ) : (
          // Danh sách thẻ đã có
          <div className={styles.cardList}>
            {cards.map(card => (
              <div key={card.id} className={styles.cardItem}>
                <div className={styles.cardInfo}>
                  <FaCcVisa className={styles.cardIcon} />
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    <span style={{fontWeight: 500, fontSize: '1rem'}}>
                        {maskCardNumber(card.last4)}
                    </span>
                    <span style={{fontSize: '0.8rem', color: '#777'}}>
                        Hết hạn: {card.expiry}
                    </span>
                  </div>
                </div>
                <button className={styles.btnRemove} onClick={() => setCards(cards.filter(c => c.id !== card.id))}>Xóa</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Tài Khoản Ngân Hàng Của Tôi</h2>
          <button className={styles.btnAdd} onClick={() => setShowAddBankModal(true)}>
            <FaPlus /> Thêm Ngân Hàng Liên Kết
          </button>
        </div>

        {bankAccounts.length === 0 ? (
          <div className={styles.emptyState}><p>Bạn chưa có tài khoản ngân hàng.</p></div>
        ) : (
          <div className={styles.cardList}>
            {bankAccounts.map(acc => (
              <div key={acc.id} className={styles.cardItem}>
                <div className={styles.cardInfo}>
                  <FaUniversity className={styles.cardIcon} />
                  <div>
                    <div style={{fontWeight: 600}}>{acc.bankName}</div>
                    <div style={{fontSize: '0.85rem', color: '#666'}}>
                        STK: **** {acc.accountNumber.slice(-3)} - {acc.fullName}
                    </div>
                  </div>
                </div>
                <button className={styles.btnRemove} onClick={() => setBankAccounts(bankAccounts.filter(a => a.id !== acc.id))}>Xóa</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- MODAL THÊM THẺ TÍN DỤNG --- */}
      {showAddCardModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            
            <div className={styles.modalHeader}>
              Thêm thẻ tín dụng
            </div>

            <div className={styles.modalBody}>
              
              {/* Banner Bảo Mật */}
              <div className={styles.secureBanner}>
                <FaShieldAlt className={styles.secureIcon} />
                <div>
                  <strong>Thông tin thẻ của bạn được bảo vệ.</strong>
                  <br />
                  Chúng tôi hợp tác với các đơn vị thanh toán quốc tế để đảm bảo thông tin thẻ của bạn được bảo mật và an toàn.
                </div>
              </div>

              {/* Form Chi Tiết Thẻ */}
              <div className={styles.formSectionTitle}>
                <span>Chi tiết thẻ</span>
                <div className={styles.cardIcons}>
                  <FaCcVisa size={20} /> <FaCcMastercard size={20} /> <FaCreditCard size={20} />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <input 
                  type="text" 
                  className={styles.input} 
                  placeholder="Số thẻ" 
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                />
              </div>

              <div className={styles.row2Cols}>
                <div className={styles.inputGroup}>
                  <input 
                    type="text" 
                    className={styles.input} 
                    placeholder="Ngày hết hạn (MM/YY)" 
                    value={expiry}
                    onChange={e => setExpiry(e.target.value)}
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <input 
                    type="text" 
                    className={styles.input} 
                    placeholder="Mã CVV" 
                    value={cvv}
                    onChange={e => setCvv(e.target.value)}
                  />
                  <FaRegQuestionCircle className={styles.iconHelp} title="3 số cuối mặt sau thẻ" />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <input 
                  type="text" 
                  className={styles.input} 
                  placeholder="Họ và tên chủ thẻ" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              {/* Form Địa Chỉ */}
              <div className={styles.addressSection}>
                <div className={styles.addressLabel}>Địa chỉ đăng ký thẻ Tín dụng/Ghi nợ</div>
                
                <div className={styles.inputGroup}>
                  <input 
                    type="text" 
                    className={`${styles.input} ${styles.addressPreview}`} 
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Địa chỉ"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <input 
                    type="text" 
                    className={styles.input} 
                    placeholder="Mã bưu chính" 
                    value={postalCode}
                    onChange={e => setPostalCode(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.noteText}>
                1.000 VND có thể bị trừ trong thẻ của bạn trong quá trình xác minh thẻ. Số tiền này sẽ được hoàn trả trong vòng 14 ngày.
              </div>

            </div>

            {/* Footer Buttons */}
            <div className={styles.modalFooter}>
              <button className={styles.btnCancel} onClick={() => setShowAddCardModal(false)}>Trở lại</button>
              <button className={styles.btnSubmit} onClick={handleSaveCard}>Hoàn thành</button>
            </div>

          </div>
        </div>
      )}

      {/* --- MODAL THÊM TK NGÂN HÀNG --- */}
      {showAddBankModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            
            {/* Header: Có nút back nếu ở bước 2 */}
            <div className={styles.modalHeader} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '10px' }}>
              {bankStep === 2 && (
                <button className={styles.backButton} onClick={() => setBankStep(1)}>
                  <FaArrowLeft />
                </button>
              )}
              {bankStep === 1 ? 'Thông Tin Người Dùng' : 'Thêm Tài Khoản Ngân Hàng'}
            </div>

            <div className={styles.modalBody}>
              
              {/* BƯỚC 1: NHẬP TÊN VÀ CCCD */}
              {bankStep === 1 && (
                <>
                  <div className={styles.inputGroup}>
                    <input 
                      type="text" 
                      className={styles.input} 
                      placeholder="Họ và tên" 
                      value={userIdName}
                      onChange={e => setUserIdName(e.target.value)}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <input 
                      type="text" 
                      className={styles.input} 
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
                  <div className={styles.inputGroup}>
                    {/* Select Ngân hàng từ API */}
                    <select 
                      className={styles.input} 
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

                  <div className={styles.inputGroup}>
                    {/* Select Chi nhánh */}
                    <select 
                      className={styles.input}
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

                  <div className={styles.inputGroup}>
                    <input 
                      type="text" 
                      className={styles.input} 
                      placeholder="Số tài khoản" 
                      value={bankAccountNumber}
                      onChange={e => setBankAccountNumber(e.target.value)}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <input 
                      type="text" 
                      className={`${styles.input} ${styles.addressPreview}`} 
                      placeholder="Tên đầy đủ (Tự động điền)" 
                      value={userIdName.toUpperCase()}
                      readOnly
                    />
                  </div>

                  <label className={styles.checkboxLabel}>
                    <input 
                      type="checkbox" 
                      checked={isDefaultBank}
                      onChange={e => setIsDefaultBank(e.target.checked)}
                    />
                    Đặt làm tài khoản mặc định
                  </label>
                </>
              )}

            </div>

            {/* Footer Buttons */}
            <div className={styles.modalFooter}>
              <button 
                className={styles.btnCancel} 
                onClick={() => {
                  setShowAddBankModal(false); 
                  setBankStep(1); // Reset về bước 1
                }}
              >
                Trở lại
              </button>
              
              {bankStep === 1 ? (
                <button className={styles.btnSubmit} onClick={handleBankStep1Submit}>Tiếp theo</button>
              ) : (
                <button className={styles.btnSubmit} onClick={handleSaveBank}>Hoàn thành</button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}