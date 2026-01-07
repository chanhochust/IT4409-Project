'use client';

import React, { useState } from 'react';
import { Camera, Edit2, RotateCcw } from 'lucide-react';
import { ProfileHeader } from './(components)/ProfileHeader';
import { ProfileSummaryCard } from './(components)/ProfileSummaryCard';
import { ProfileDetailsCard } from './(components)/ProfileDetailsCard';
import { ProfileSkeleton } from './(components)/ProfileSkeleton';
import { useProfileQuery } from 'src/shared/services/api/queries/profile.query';
import { AppDialog } from 'src/shared/components/ui/dialog/AppDialog';
import { AppInput } from 'src/shared/components/ui/input/AppInput';
import { AppButton } from 'src/shared/components/ui/button/AppButton';
import { AppSelect } from 'src/shared/components/ui/select/AppSelect';
import { toast } from 'sonner';
import { useUpdateProfileMutation } from 'src/shared/services/api/mutations/profile.mutation';
import { Gender } from 'src/shared/constants/enums';
import { isAxiosError } from 'axios';
import type { ApiResponse } from 'src/shared/types/api/common';

export default function Page() {
  const profileQuery = useProfileQuery();
  const user = profileQuery.data?.data;
  const updateProfile = useUpdateProfileMutation();
  const [open, setOpen] = useState(false);

  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [nationality, setNationality] = useState('');
  const [gender, setGender] = useState<string>(Gender.Male);
  const [dobDay, setDobDay] = useState<string>('');
  const [dobMonth, setDobMonth] = useState<string>('');
  const [dobYear, setDobYear] = useState<string>('');

  // Avatar dialog state
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarName, setAvatarName] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const isSubmitting = updateProfile.isPending;

  React.useEffect(() => {
    if (!user) return;
    setNickname(user.nickname ?? '');
    setPhone(user.phone ?? '');
    setNationality(user.nationality ?? '');
    setGender(user.gender ?? Gender.Male);
  }, [user]);

  React.useEffect(() => {
    if (!avatarFile) {
      setAvatarPreview(null);
      setAvatarName('');
      return;
    }
    const url = URL.createObjectURL(avatarFile);
    setAvatarPreview(url);
    // Default image name without extension
    setAvatarName(avatarFile.name.replace(/\.[^.]+$/, ''));
    return () => URL.revokeObjectURL(url);
  }, [avatarFile]);

  const extractErrorMessage = (e: unknown): string => {
    if (isAxiosError<ApiResponse<unknown>>(e)) {
      const msg = e.response?.data?.message;
      if (typeof msg === 'string' && msg) return msg;
    }
    if (e instanceof Error && e.message) return e.message;
    return 'Failed to update profile';
  };

  if (profileQuery.isLoading) {
    return (
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <ProfileHeader />
        <ProfileSkeleton />
      </div>
    );
  }

  if (profileQuery.isError) {
    return (
      <div className='mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-32 text-center sm:px-6 lg:px-8'>
        <div className='text-muted mb-4 h-16 w-16'>
          <RotateCcw className='h-full w-full opacity-20' />
        </div>
        <h2 className='text-foreground text-xl font-bold'>Failed to load profile data. Please try again.</h2>
        <button
          onClick={() => {
            void profileQuery.refetch();
          }}
          className='bg-primary text-background mt-6 flex items-center gap-2 rounded-lg px-6 py-2 font-bold transition-transform hover:scale-105 active:scale-95'>
          <RotateCcw className='h-4 w-4' />
          Retry
        </button>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
      <ProfileHeader />

      <div className='grid gap-8 lg:grid-cols-12'>
        <aside className='lg:col-span-4'>
          <ProfileSummaryCard
            avatar={user.avatar}
            fullName={user.name}
            isActive={user.isActive}
            nickname={user.nickname}
            role={user.role}
          />
        </aside>

        <main className='lg:col-span-8'>
          <ProfileDetailsCard
            createdAt={user.createdAt}
            email={user.email}
            id={user.id}
            name={user.name}
            gender={user.gender}
            nationality={user.nationality}
            phone={user.phone}
            updatedAt={user.updatedAt}
          />

          <div className='mt-8 flex flex-col items-center justify-end gap-4 sm:flex-row'>
            <button
              onClick={() => setAvatarOpen(true)}
              className='border-muted/50 bg-background text-secondary hover:bg-muted/10 flex w-full items-center justify-center gap-2 rounded-lg border px-6 py-3 font-bold transition-colors sm:w-auto'>
              <Camera className='h-4 w-4' />
              Change Avatar
            </button>
            <button
              onClick={() => setOpen(true)}
              className='bg-primary text-background flex w-full items-center justify-center gap-2 rounded-lg px-10 py-3 font-bold transition-opacity hover:opacity-90 sm:w-auto'>
              <Edit2 className='h-4 w-4' />
              Edit Profile
            </button>
          </div>

          {/* Change Avatar Dialog */}
          <AppDialog.Root open={avatarOpen} onOpenChange={setAvatarOpen}>
            <AppDialog.Content>
              <AppDialog.Header>
                <AppDialog.Title>Change Avatar</AppDialog.Title>
                <AppDialog.Description>Select an image and confirm its name.</AppDialog.Description>
              </AppDialog.Header>

              <form
                className='mt-4 space-y-4'
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!avatarFile) {
                    toast.error('Please select an image');
                    return;
                  }
                  const originalName = avatarFile.name;
                  const extMatch = originalName.match(/\.([^.]+)$/);
                  const ext = extMatch ? extMatch[1] : '';
                  const finalName = avatarName ? (ext ? `${avatarName}.${ext}` : avatarName) : originalName;
                  const fileToUpload = new File([avatarFile], finalName, { type: avatarFile.type });

                  updateProfile.mutate(
                    { avatar: fileToUpload },
                    {
                      onSuccess: () => {
                        toast.success('Avatar updated');
                        setAvatarOpen(false);
                        setAvatarFile(null);
                        setAvatarName('');
                      },
                      onError: (err) => {
                        toast.error(extractErrorMessage(err));
                      },
                    },
                  );
                }}>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <label className='flex flex-col gap-1 sm:col-span-2'>
                    <span className='text-xs font-semibold'>Select Image</span>
                    <AppInput
                      type='file'
                      accept='image/*'
                      onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
                    />
                  </label>

                  {avatarPreview && (
                    <div className='sm:col-span-2'>
                      <img src={avatarPreview} alt='Preview' className='h-40 w-40 rounded-full object-cover' />
                    </div>
                  )}

                  <label className='flex flex-col gap-1 sm:col-span-2'>
                    <span className='text-xs font-semibold'>Image Name</span>
                    <AppInput value={avatarName} onChange={(e) => setAvatarName(e.target.value)} />
                  </label>
                </div>

                <AppDialog.Footer className='pt-4'>
                  <AppButton
                    type='button'
                    variant='outline'
                    onClick={() => setAvatarOpen(false)}
                    disabled={isSubmitting}>
                    Cancel
                  </AppButton>
                  <AppButton type='submit' disabled={isSubmitting || !avatarFile}>
                    {isSubmitting ? 'Uploading…' : 'Upload'}
                  </AppButton>
                </AppDialog.Footer>
              </form>
            </AppDialog.Content>
          </AppDialog.Root>

          <AppDialog.Root open={open} onOpenChange={setOpen}>
            <AppDialog.Content>
              <AppDialog.Header>
                <AppDialog.Title>Edit Profile</AppDialog.Title>
                <AppDialog.Description>Update your basic profile information.</AppDialog.Description>
              </AppDialog.Header>

              <form
                className='mt-4 space-y-4'
                onSubmit={(e) => {
                  e.preventDefault();
                  const payload = {
                    nickname: nickname || undefined,
                    phone: phone || undefined,
                    nationality: nationality || undefined,
                    gender: gender || undefined,
                    dob_day: dobDay ? Number(dobDay) : undefined,
                    dob_month: dobMonth ? Number(dobMonth) : undefined,
                    dob_year: dobYear ? Number(dobYear) : undefined,
                  };

                  updateProfile.mutate(payload, {
                    onSuccess: () => {
                      toast.success('Profile updated');
                      setOpen(false);
                    },
                    onError: (err) => {
                      toast.error(extractErrorMessage(err));
                    },
                  });
                }}>
                <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                  <label className='flex flex-col gap-1'>
                    <span className='text-xs font-semibold'>Nickname</span>
                    <AppInput value={nickname} onChange={(e) => setNickname(e.target.value)} />
                  </label>
                  <label className='flex flex-col gap-1'>
                    <span className='text-xs font-semibold'>Phone</span>
                    <AppInput value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </label>
                  <label className='flex flex-col gap-1'>
                    <span className='text-xs font-semibold'>Nationality</span>
                    <AppInput value={nationality} onChange={(e) => setNationality(e.target.value)} />
                  </label>
                  <label className='flex flex-col gap-1'>
                    <span className='text-xs font-semibold'>Gender</span>
                    <AppSelect.Root value={gender} onValueChange={setGender}>
                      <AppSelect.Trigger>
                        <AppSelect.Value placeholder='Select gender' />
                      </AppSelect.Trigger>
                      <AppSelect.Content>
                        <AppSelect.Item value={Gender.Male}>Male</AppSelect.Item>
                        <AppSelect.Item value={Gender.Female}>Female</AppSelect.Item>
                        <AppSelect.Item value={Gender.Other}>Other</AppSelect.Item>
                      </AppSelect.Content>
                    </AppSelect.Root>
                  </label>
                  <div className='grid grid-cols-3 gap-3 sm:col-span-2'>
                    <label className='flex flex-col gap-1'>
                      <span className='text-xs font-semibold'>DOB Day</span>
                      <AppInput inputMode='numeric' value={dobDay} onChange={(e) => setDobDay(e.target.value)} />
                    </label>
                    <label className='flex flex-col gap-1'>
                      <span className='text-xs font-semibold'>DOB Month</span>
                      <AppInput inputMode='numeric' value={dobMonth} onChange={(e) => setDobMonth(e.target.value)} />
                    </label>
                    <label className='flex flex-col gap-1'>
                      <span className='text-xs font-semibold'>DOB Year</span>
                      <AppInput inputMode='numeric' value={dobYear} onChange={(e) => setDobYear(e.target.value)} />
                    </label>
                  </div>
                </div>

                <AppDialog.Footer className='pt-4'>
                  <AppButton type='button' variant='outline' onClick={() => setOpen(false)} disabled={isSubmitting}>
                    Cancel
                  </AppButton>
                  <AppButton type='submit' disabled={isSubmitting}>
                    {isSubmitting ? 'Saving…' : 'Save changes'}
                  </AppButton>
                </AppDialog.Footer>
              </form>
            </AppDialog.Content>
          </AppDialog.Root>
        </main>
      </div>
    </div>
  );
}
