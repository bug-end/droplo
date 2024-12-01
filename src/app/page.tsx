'use client';

import { useState } from 'react';
import { Button } from '@headlessui/react';
import { NavigationFormData, NavigationItem } from '@/types/navigation';
import AddIcon from '@/assets/icons/add.svg';
import { NavigationForm } from '@/components/NavigationForm';
import { NavigationList } from '@/components/NavigationList';

export default function NavigationPage() {
  const [showForm, setShowForm] = useState(false);
  const [nodes, setNodes] = useState<NavigationItem[]>([
    {
      id: '1',
      label: 'Promocje',
      url: 'https://rc32141.redcart.pl/promocje',
    },
    {
      id: '2',
      label: 'Koszyk',
      url: 'https://rc32141.redcart.pl/koszyk',
    },
    {
      id: '3',
      label: 'Kontakt',
    },
  ]);

  const handleAdd = (values: NavigationFormData) => {
    console.log('Add button clicked with values:', values);
  };

  const handleDelete = () => {
    console.log('Delete button clicked');
  };

  return (
    <>
      {nodes.length === 0 ? (
        showForm ? (
          <NavigationForm
            onCancel={() => setShowForm(false)}
            onDelete={() => setShowForm(false)}
            onSubmit={handleAdd}
          />
        ) : (
          <div className='py-6 px-4 border border-[var(--border-secondary)] bg-[var(--bg-secondary)] rounded-lg'>
            <div className='max-w-[512px] mx-auto flex flex-col gap-6 justify-center items-center'>
              <div className='text-center'>
                <p className='text-base font-semibold text-[var(--text-primary)] mb-1'>Menu jest puste</p>
                <p className='text-sm text-[var(--text-tertiary)]'>W tym menu nie ma jeszcze żadnych linków.</p>
              </div>
              <Button
                onClick={() => setShowForm(true)}
                className='flex gap-x-[6px] items-center text-sm font-semibold py-[10px] px-[14px] bg-[var(--button-primary-bg)] text-white rounded-lg'
              >
                <AddIcon className='shrink-0 w-5 h-5' />
                Dodaj pozycję menu
              </Button>
            </div>
          </div>
        )
      ) : (
        <NavigationList nodes={nodes} onAdd={handleAdd} onDelete={handleDelete} />
      )}
    </>
  );
}
