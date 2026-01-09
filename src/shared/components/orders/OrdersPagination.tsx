import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AppButton } from 'src/shared/components/ui/button/AppButton';

interface OrdersPaginationProps {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly onPageChange: (page: number) => void;
}

export function OrdersPagination({ currentPage, totalPages, onPageChange }: OrdersPaginationProps) {
  const pageNumbers: (number | string)[] = [];
  const windowSize = 2;
  const start = Math.max(1, currentPage - windowSize);
  const end = Math.min(totalPages, currentPage + windowSize);

  if (start > 1) {
    pageNumbers.push(1);
    if (start > 2) pageNumbers.push('...');
  }

  for (let i = start; i <= end; i++) pageNumbers.push(i);

  if (end < totalPages) {
    if (end < totalPages - 1) pageNumbers.push('...');
    pageNumbers.push(totalPages);
  }

  return (
    <div className='flex items-center justify-center gap-2 py-8'>
      <AppButton disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} size='sm' variant='outline'>
        <ChevronLeft className='h-4 w-4' />
        Prev
      </AppButton>

      <div className='flex gap-1'>
        {pageNumbers.map((p, idx) => {
          if (p === '...') {
            return (
              <span key={`ellipsis-${idx}`} className='text-muted-foreground px-2 py-1'>
                ...
              </span>
            );
          }

          const page = p as number;
          const isActive = page === currentPage;
          return (
            <AppButton
              key={page}
              onClick={() => onPageChange(page)}
              size='sm'
              variant={isActive ? 'default' : 'outline'}>
              {page}
            </AppButton>
          );
        })}
      </div>

      <AppButton
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        size='sm'
        variant='outline'>
        Next
        <ChevronRight className='h-4 w-4' />
      </AppButton>
    </div>
  );
}
