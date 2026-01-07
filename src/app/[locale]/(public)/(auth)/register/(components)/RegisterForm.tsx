'use client';
import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { cn } from 'src/shared/utils/className';
import { useRouter, useParams } from 'next/navigation';
import { AuthService } from 'src/shared/services/api/auth.service';
import { signIn } from 'next-auth/react';

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const params = useParams();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validateEmail = (value: string) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        email,
        name: `${firstName} ${lastName}`.trim().replace(/\s+/g, ' '),
        password,
      };

      const response = await AuthService.register(payload);

      if (!response?.success) {
        setErrorMessage(response?.message ?? 'Unable to register. Please try again later.');
        setIsLoading(false);
        return;
      }

      setSuccessMessage('Registration successful. Signing you in...');

      const signInResult = await signIn('credentials', { email, password, redirect: false });

      const locale = typeof params?.locale === 'string' ? params.locale : 'en';

      if (signInResult?.error) {
        setErrorMessage('Registered, but sign-in failed. Please log in.');
        router.push(`/${locale}/login`);
        return;
      }

      router.push(`/${locale}`);
    } catch (error: unknown) {
      const message =
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as { response?: unknown }).response === 'object' &&
        (error as { response?: { data?: unknown } }).response?.data &&
        typeof (error as { response?: { data?: { message?: unknown } } }).response?.data?.message === 'string'
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
          : 'Unable to register. Please try again later.';

      setErrorMessage(message ?? 'Unable to register. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl'>
      <form className='space-y-6' onSubmit={(e) => void onSubmit(e)}>
        {errorMessage && (
          <div className='animate-in fade-in slide-in-from-top-1 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400'>
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className='animate-in fade-in slide-in-from-top-1 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-400'>
            {successMessage}
          </div>
        )}

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='space-y-2'>
            <label htmlFor='first-name' className='text-sm leading-none font-medium text-gray-200'>
              First name
            </label>
            <input
              id='first-name'
              type='text'
              required
              disabled={isLoading}
              className={cn(
                'ring-offset-space focus-visible:ring-primary h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition-all placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              )}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='last-name' className='text-sm leading-none font-medium text-gray-200'>
              Last name
            </label>
            <input
              id='last-name'
              type='text'
              required
              disabled={isLoading}
              className={cn(
                'ring-offset-space focus-visible:ring-primary h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition-all placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              )}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className='space-y-2'>
          <label htmlFor='email' className='text-sm leading-none font-medium text-gray-200'>
            Email Address
          </label>
          <input
            id='email'
            type='email'
            required
            disabled={isLoading}
            placeholder='name@company.com'
            className={cn(
              'ring-offset-space focus-visible:ring-primary h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition-all placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            )}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='space-y-2'>
            <label htmlFor='password' className='text-sm leading-none font-medium text-gray-200'>
              Password
            </label>
            <div className='relative'>
              <input
                id='password'
                type={showPassword ? 'text' : 'password'}
                required
                disabled={isLoading}
                className={cn(
                  'ring-offset-space focus-visible:ring-primary h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 pr-10 text-sm text-white transition-all placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                )}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <div className='space-y-2'>
            <label htmlFor='confirm-password' className='text-sm leading-none font-medium text-gray-200'>
              Confirm Password
            </label>
            <div className='relative'>
              <input
                id='confirm-password'
                type={showConfirmPassword ? 'text' : 'password'}
                required
                disabled={isLoading}
                className={cn(
                  'ring-offset-space focus-visible:ring-primary h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 pr-10 text-sm text-white transition-all placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                )}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-300 focus:outline-none'
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}>
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        <button
          type='submit'
          disabled={isLoading}
          className={cn(
            'bg-primary text-space ring-offset-space hover:bg-primary/90 focus-visible:ring-primary relative flex h-11 w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
          )}>
          {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : 'Create account'}
        </button>
      </form>
    </div>
  );
};
