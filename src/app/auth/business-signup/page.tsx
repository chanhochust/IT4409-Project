import React from 'react';

export default function BusinessSignupPage({ handleSubmit, isLoading, error, success }: any) {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-[#f4f5f7] px-4 py-12 font-sans'>
      {/* Header hướng dẫn */}
      <div className='mb-8 max-w-[600px] text-center'>
        <h1 className='text-3xl font-bold text-[#111]'>
          Đăng ký Bán hàng cùng <span className='text-indigo-600'>Tibiki</span>
        </h1>
        <p className='mt-3 text-gray-600'>
          Cung cấp thông tin doanh nghiệp của bạn. Sau khi phê duyệt, chúng tôi sẽ gửi tài khoản và mật khẩu truy cập về
          email đăng ký trong vòng <span className='font-bold text-indigo-700'>24h</span>.
        </p>
      </div>

      <form
        className='box-border flex w-full max-w-[750px] flex-col rounded-xl border border-gray-100 bg-white p-10 shadow-lg'
        onSubmit={handleSubmit}>
        {/* THÔNG BÁO QUY TRÌNH */}
        <div className='mb-10 flex items-start gap-3 border-l-4 border-blue-500 bg-blue-50 p-4'>
          <div className='mt-0.5 text-blue-500'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <circle cx='12' cy='12' r='10' />
              <line x1='12' y1='16' x2='12' y2='12' />
              <line x1='12' y1='8' x2='12.01' y2='8' />
            </svg>
          </div>
          <p className='text-sm leading-relaxed text-blue-800'>
            Bạn không cần thiết lập mật khẩu lúc này. Hệ thống sẽ tự động khởi tạo tài khoản an toàn cho bạn sau khi hồ
            sơ được kiểm duyệt thành công.
          </p>
        </div>

        {/* PHẦN 1: THÔNG TIN CỬA HÀNG */}
        <div className='mb-10'>
          <h2 className='mb-6 flex items-center text-xl font-bold text-gray-800'>
            <span className='mr-3 h-6 w-2 rounded-full bg-indigo-600'></span>
            Thông tin cửa hàng / Doanh nghiệp
          </h2>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='md:col-span-2'>
              <label className='mb-2 block text-sm font-bold text-gray-700' htmlFor='businessName'>
                Tên Shop (Amazing/Ladada/ShopBee)
              </label>
              <input
                id='businessName'
                type='text'
                className='w-full rounded-lg border border-gray-300 p-3 text-black outline-none transition-all focus:ring-2 focus:ring-indigo-500'
                placeholder='Ví dụ: TikiShop'
                required
              />
            </div>

            <div className='md:col-span-2'>
              <label className='mb-2 block text-sm font-bold text-gray-700' htmlFor='email'>
                Email đăng ký (Email nhận mật khẩu)
              </label>
              <input
                id='email'
                type='email'
                className='w-full rounded-lg border border-gray-300 bg-indigo-50/30 p-3 text-black outline-none transition-all focus:ring-2 focus:ring-indigo-500'
                placeholder='quanly@business.com'
                required
              />
            </div>

            <div>
              <label className='mb-2 block text-sm font-bold text-gray-700' htmlFor='taxCode'>
                Mã số thuế (nếu có)
              </label>
              <input
                id='taxCode'
                type='text'
                className='w-full rounded-lg border border-gray-300 p-3 text-black outline-none transition-all focus:ring-2 focus:ring-indigo-500'
                placeholder='Nhập MST để xác minh nhanh hơn'
              />
            </div>

            <div>
              <label className='mb-2 block text-sm font-bold text-gray-700' htmlFor='businessType'>
                Loại hình kinh doanh
              </label>
              <select className='w-full cursor-pointer rounded-lg border border-gray-300 bg-white p-3 text-black outline-none transition-all focus:ring-2 focus:ring-indigo-500'>
                <option>Cá nhân / Hộ kinh doanh</option>
                <option>Công ty TNHH / Cổ phần</option>
                <option>Thương hiệu Quốc tế</option>
              </select>
            </div>

            <div className='md:col-span-2'>
              <label className='mb-2 block text-sm font-bold text-gray-700' htmlFor='address'>
                Địa chỉ trụ sở / Kho hàng
              </label>
              <textarea
                id='address'
                rows={2}
                className='w-full rounded-lg border border-gray-300 p-3 text-black outline-none transition-all focus:ring-2 focus:ring-indigo-500'
                placeholder='Số nhà, tên đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố'
                required></textarea>
            </div>
          </div>
        </div>

        {/* PHẦN 2: NGƯỜI ĐẠI DIỆN */}
        <div className='mb-10'>
          <h2 className='mb-6 flex items-center text-xl font-bold text-gray-800'>
            <span className='mr-3 h-6 w-2 rounded-full bg-indigo-600'></span>
            Thông tin người đại diện
          </h2>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div>
              <label className='mb-2 block text-sm font-bold text-gray-700' htmlFor='fullName'>
                Họ và tên
              </label>
              <input
                id='fullName'
                type='text'
                className='w-full rounded-lg border border-gray-300 p-3 text-black outline-none transition-all focus:ring-2 focus:ring-indigo-500'
                placeholder='Tên người liên hệ chính'
                required
              />
            </div>
            <div>
              <label className='mb-2 block text-sm font-bold text-gray-700' htmlFor='phone'>
                Số điện thoại
              </label>
              <input
                id='phone'
                type='tel'
                className='w-full rounded-lg border border-gray-300 p-3 text-black outline-none transition-all focus:ring-2 focus:ring-indigo-500'
                placeholder='Để chúng tôi liên hệ xác minh'
                required
              />
            </div>
          </div>
        </div>

        {error && (
          <p className='mb-6 rounded-lg border border-red-100 bg-red-50 p-3 text-center text-sm font-medium text-red-500'>
            {error}
          </p>
        )}
        {success && (
          <p className='mb-6 rounded-lg border border-green-100 bg-green-50 p-3 text-center text-sm font-medium text-green-600'>
            {success}
          </p>
        )}

        <div className='mb-8 rounded-lg border border-gray-200 bg-gray-50 p-5'>
          <label className='flex cursor-pointer items-start'>
            <input type='checkbox' className='mr-4 mt-1 h-4 w-4 accent-indigo-600' required />
            <span className='text-sm leading-relaxed text-gray-600'>
              Tôi cam kết thông tin trên là chính xác. Tôi đồng ý nhận thông tin tài khoản qua email và tuân thủ{' '}
              <a href='#' className='font-bold text-indigo-700 underline'>
                Chính sách cộng tác người bán
              </a>
              .
            </span>
          </label>
        </div>

        <button
          type='submit'
          className='cursor-pointer rounded-xl bg-indigo-700 py-4 text-lg font-bold text-white shadow-xl shadow-indigo-100 transition-all hover:bg-indigo-800 active:scale-[0.98] disabled:bg-gray-400'
          disabled={isLoading}>
          {isLoading ? 'Đang gửi hồ sơ...' : 'Gửi yêu cầu xét duyệt'}
        </button>
      </form>

      <div className='mt-10 flex items-center space-x-6'>
        <a href='/auth/signin' className='text-sm font-medium text-gray-500 hover:text-indigo-700 hover:underline'>
          Đã có tài khoản? Đăng nhập
        </a>
        <span className='text-gray-300'>|</span>
        <a href='/' className='text-sm font-medium text-gray-500 hover:text-indigo-700 hover:underline'>
          Về trang chủ
        </a>
      </div>
    </div>
  );
}
