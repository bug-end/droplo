'use client';

import { Button } from '@headlessui/react';
import AddIcon from '@/assets/icons/add.svg';

export default function NavigationPage() {
  return (
    <div className='py-6 px-4 border border-[var(--border-secondary)] bg-[var(--bg-secondary)] rounded-md'>
      <div className='max-w-[512px] mx-auto flex flex-col gap-6 justify-center items-center'>
        <div className='text-center'>
          <p className='text-base font-semibold text-[var(--text-primary)] mb-1'>Menu jest puste</p>
          <p className='text-sm text-[var(--text-tertiary)]'>W tym menu nie ma jeszcze żadnych linków.</p>
        </div>
        <Button
          onClick={() => console.log('click')}
          className='flex gap-x-[6px] items-center text-sm font-semibold py-[10px] px-[14px] bg-[var(--button-primary-bg)] text-white rounded-md'
        >
          <AddIcon className='shrink-0 w-5 h-5' />
          Dodaj pozycję menu
        </Button>
      </div>
    </div>
  );
}
