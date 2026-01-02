/**
 * TIBIKI MOCK DATABASE (GLOBAL PERSISTENCE VERSION)
 * Tệp này chứa toàn bộ dữ liệu mẫu cho hệ thống và duy trì trạng thái trong bộ nhớ máy chủ.
 */

// 1. Dữ liệu mặc định ban đầu
const initialUsers = [
  { id: 'USR-001', email: 'admin@test.com', password: '123', role: 'admin', shopStatus: 'none' },
  { id: 'USR-002', email: 'seller@test.com', password: '123', role: 'customer', shopStatus: 'active' },
  { id: 'USR-003', email: 'customer@test.com', password: '123', role: 'customer', shopStatus: 'none' },
  { id: 'USR-004', email: 'pending@test.com', password: '123', role: 'customer', shopStatus: 'pending' },
];

const initialProfiles: Record<string, any> = {
  'USR-001': {
    fullName: 'Admin Hệ Thống',
    nickname: 'super_admin',
    dob_day: '1',
    dob_month: '1',
    dob_year: '1990',
    gender: 'other',
    nationality: 'VN',
    phone: '0911222333',
    avatar: 'https://i.pravatar.cc/150?u=admin',
  },
  'USR-002': {
    fullName: 'Trần Nam',
    nickname: 'nam_seller',
    dob_day: '15',
    dob_month: '5',
    dob_year: '1995',
    gender: 'male',
    nationality: 'VN',
    phone: '0988777666',
    avatar: 'https://i.pravatar.cc/150?u=seller',
  },
  'USR-003': {
    fullName: 'Trần Thị Nhài',
    nickname: 'datmin',
    dob_day: '14',
    dob_month: '2',
    dob_year: '2004',
    gender: 'female',
    nationality: 'VN',
    phone: '0123456789',
    avatar: 'https://i.pravatar.cc/150?u=customer',
  },
  'USR-004': {
    fullName: 'Nguyễn Bảo Ngọc',
    nickname: 'ngoc_ruby',
    dob_day: '20',
    dob_month: '10',
    dob_year: '1998',
    gender: 'female',
    nationality: 'VN',
    phone: '0909090909',
    avatar: 'https://i.pravatar.cc/150?u=pending',
  },
};

const initialAddresses = [
  {
    id: 1,
    userId: 'USR-003',
    name: 'Trần Thị Nhài',
    phone: '0123456789',
    city: 'Hồ Chí Minh',
    cityCode: 79,
    district: 'Quận Bình Thạnh',
    districtCode: 760,
    ward: 'Phường 12',
    wardCode: 26734,
    street: '123 Chu Văn An',
    type: 'home',
    isDefault: true,
  },
  {
    id: 2,
    userId: 'USR-003',
    name: 'Văn phòng',
    phone: '0988777666',
    city: 'Hà Nội',
    cityCode: 1,
    district: 'Quận Đống Đa',
    districtCode: 6,
    ward: 'Phường Láng Thượng',
    wardCode: 172,
    street: '456 Đường Láng',
    type: 'office',
    isDefault: false,
  },
  {
    id: 3,
    userId: 'USR-002',
    name: 'Trần Nam',
    company: '',
    phone: '0988777666',
    city: 'Hà Nội',
    cityCode: 1,
    district: 'Quận Đống Đa',
    districtCode: 6,
    ward: 'Phường Láng Thượng',
    wardCode: 172,
    street: '456 Đường Láng',
    type: 'home',
    isDefault: true,
  },
];

const initialShops = [
  {
    shopId: 'SHOP-9921',
    ownerId: 'USR-002',
    shopName: 'MiniShop Official Store',
    businessEmail: 'contact@minishop.vn',
    taxCode: '0102030405',
    businessType: 'Công ty TNHH / Cổ phần',
    warehouseAddress: '456 Đường Láng, Đống Đa, Hà Nội',
    status: 'active',
    logo: 'https://placehold.co/200x200?text=MiniShop',
    submittedDate: '01/10/2023',
    representative: {
      fullName: 'Trần Nam',
      phone: '0988777666',
      email: 'seller@test.com',
      citizenId: '001095123456',
    },
  },
  {
    shopId: 'SHOP-1102',
    ownerId: 'USR-004',
    shopName: 'Ngọc Ruby Fashion',
    businessEmail: 'ngoc@fashion.vn',
    taxCode: '0987654321',
    businessType: 'Cá nhân / Hộ kinh doanh',
    warehouseAddress: '789 Trần Hưng Đạo, Quận 5, TP.HCM',
    status: 'pending',
    logo: 'https://placehold.co/200x200?text=Ruby',
    submittedDate: '15/12/2024',
    representative: {
      fullName: 'Nguyễn Bảo Ngọc',
      phone: '0909090909',
      email: 'pending@test.com',
      citizenId: '079123456789',
    },
  },
];

// 2. Khởi tạo vùng nhớ global để tránh mất dữ liệu khi HMR (Hot Module Replacement)
if (!(global as any).tibikiUsers) {
  (global as any).tibikiUsers = [...initialUsers];
}
if (!(global as any).tibikiProfiles) {
  (global as any).tibikiProfiles = { ...initialProfiles };
}
if (!(global as any).tibikiAddresses) {
  (global as any).tibikiAddresses = [...initialAddresses];
}
if (!(global as any).tibikiShops || (global as any).tibikiShops.length === 0) {
  (global as any).tibikiShops = [...initialShops];
}
// 3. Export các biến tham chiếu trực tiếp từ vùng nhớ global
export const mockUsers = (global as any).tibikiUsers;
export const mockProfiles = (global as any).tibikiProfiles;
export const mockAddresses = (global as any).tibikiAddresses;
export const mockShops = (global as any).tibikiShops;

/**
 * HÀM TRỢ GIÚP: Thêm người dùng mới
 */
export const addUser = (user: any, profile: any) => {
  const users = (global as any).tibikiUsers;
  const profiles = (global as any).tibikiProfiles;

  const exists = users.find((u: any) => u.email === user.email);
  if (!exists) {
    users.push(user);
    profiles[user.id] = profile;
    console.log(`[MockDB] Đã thêm User thành công: ${user.email} (ID: ${user.id})`);
  }
};

/**
 * HÀM TRỢ GIÚP: Cập nhật hồ sơ cá nhân
 */
export const updateProfile = (userId: string, data: any) => {
  const profiles = (global as any).tibikiProfiles;

  if (profiles[userId]) {
    profiles[userId] = { ...profiles[userId], ...data };
    console.log(`[MockDB] Cập nhật Profile cho User ID: ${userId}`);
    return true;
  }
  return false;
};

/**
 * HÀM TRỢ GIÚP: Quản lý địa chỉ
 */
export const syncAddressDefault = (userId: string, addressId: number) => {
  const addresses = (global as any).tibikiAddresses;
  addresses.forEach((addr: any) => {
    if (addr.userId === userId) {
      addr.isDefault = addr.id === addressId;
    }
  });
};

/**
 * HÀM TRỢ GIÚP: Thêm hồ sơ đăng ký Shop mới
 */
export const addShop = (shopData: any) => {
  const shops = (global as any).tibikiShops;
  // Kiểm tra xem user này đã có shop chưa (tránh trùng lặp nếu cần)
  const existingShop = shops.find((s: any) => s.ownerId === shopData.ownerId);

  if (!existingShop) {
    shops.push(shopData);
    console.log(`[MockDB] Đã thêm hồ sơ Shop mới: ${shopData.shopName} (Owner: ${shopData.ownerId})`);
    return true;
  } else {
    console.warn(`[MockDB] User ${shopData.ownerId} đã có hồ sơ Shop.`);
    // Tùy logic, có thể cho phép cập nhật lại hoặc trả về false
    return false;
  }
};
