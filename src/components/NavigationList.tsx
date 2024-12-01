import React, { useState } from 'react';
import { Button } from '@headlessui/react';
import { NavigationFormData, NavigationItem } from '@/types/navigation';
import { NavigationForm } from '@/components/NavigationForm';
import { NavigationListItem } from '@/components/NavigationListItem';

interface NavigationListProps {
  nodes?: NavigationItem[];
  onAdd: (values: NavigationFormData) => void;
  onDelete: () => void;
}

export const NavigationList: React.FC<NavigationListProps> = ({ nodes, onAdd, onDelete }) => {
  const [showTopLevelForm, setShowTopLevelForm] = useState(false);

  const toggleTopLevelForm = () => {
    setShowTopLevelForm(!showTopLevelForm);
  };

  return (
    <div>
      <div className='border-r border-l border-t border-[var(--border-primary)] rounded-t-lg bg-white'>
        <ul>
          {nodes?.map((node, index) => (
            <NavigationListItem key={index} node={node} onAdd={onAdd} onDelete={onDelete} />
          ))}
        </ul>
      </div>
      <div className='border-r border-l border-b border-[var(--border-primary)] rounded-b-lg'>
        {showTopLevelForm && (
          <div className='px-6 py-4 bg-[var(--bg-secondary)] border-b border-[var(--border-secondary)]'>
            <NavigationForm onCancel={toggleTopLevelForm} onDelete={toggleTopLevelForm} onSubmit={onAdd} />
          </div>
        )}
        <div className='px-6 py-5'>
          <Button
            onClick={toggleTopLevelForm}
            className='text-sm text-[var(--text-secondary)] font-semibold py-[10px] px-4 rounded-lg border border-[var(--button-secondary-border)] bg-white'
          >
            Dodaj pozycję menu
          </Button>
        </div>
      </div>
    </div>
  );
};
