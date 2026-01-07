'use client';
import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { cn } from 'src/shared/utils/className';
import { signIn } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPassword, setCustomerPassword] = useState('');
  const [isCustomerRemembered, setIsCustomerRemembered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleCustomerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!customerEmail || !customerPassword) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (!validateEmail(customerEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: customerEmail,
        password: customerPassword,
        redirect: false,
      });

      if (result?.error) {
        setErrorMessage('Invalid credentials. Please try again.');
      } else {
        const locale = typeof params?.locale === 'string' ? params.locale : 'en';
        router.push(`/${locale}`);
      }
    } catch {
      setErrorMessage('Unable to sign in. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl'>
      <form
        className='space-y-6'
        onSubmit={(e) => {
          void handleCustomerLogin(e);
        }}>
        {errorMessage && (
          <div className='animate-in fade-in slide-in-from-top-1 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400'>
            {errorMessage}
          </div>
        )}

        <div className='space-y-2'>
          <label
            htmlFor='customer-email'
            className='text-sm leading-none font-medium text-gray-200 peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
            Email Address
          </label>
          <input
            id='customer-email'
            type='email'
            placeholder='name@company.com'
            disabled={isLoading}
            required
            className={cn(
              'ring-offset-space focus-visible:ring-primary flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            )}
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
          />
        </div>

        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <label
              htmlFor='customer-password'
              className='text-sm leading-none font-medium text-gray-200 peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Password
            </label>
            <a href='#' className='text-primary hover:text-primary/80 text-xs font-medium transition-colors'>
              Forgot password?
            </a>
          </div>
          <div className='relative'>
            <input
              id='customer-password'
              type={showPassword ? 'text' : 'password'}
              disabled={isLoading}
              required
              className={cn(
                'ring-offset-space focus-visible:ring-primary flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 pr-10 text-sm text-white transition-all placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              )}
              value={customerPassword}
              onChange={(e) => setCustomerPassword(e.target.value)}
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-300 focus:outline-none'
              aria-label={showPassword ? 'Hide password' : 'Show password'}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className='flex items-center space-x-2'>
          <input
            id='remember-customer'
            type='checkbox'
            className='text-primary focus:ring-primary focus:ring-offset-space h-4 w-4 rounded border-white/20 bg-white/5'
            checked={isCustomerRemembered}
            onChange={(e) => setIsCustomerRemembered(e.target.checked)}
          />
          <label htmlFor='remember-customer' className='cursor-pointer text-sm font-medium text-gray-400 select-none'>
            Remember me
          </label>
        </div>

        <button
          type='submit'
          disabled={isLoading}
          className={cn(
            'bg-primary text-space ring-offset-space hover:bg-primary/90 focus-visible:ring-primary relative flex h-11 w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
          )}>
          {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : 'Sign in'}
        </button>
      </form>
    </div>
  );
};
