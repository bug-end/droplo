import React, { useState } from 'react';
import { Button } from '@headlessui/react';
import { NavigationFormData, NavigationItem } from '@/types/navigation';
import MoveIcon from '@/assets/icons/move.svg';
import { NavigationForm } from '@/components/NavigationForm';

interface NavigationListItemProps {
  variant?: 'nested';
  node: NavigationItem;
  onAdd: (values: NavigationFormData, parentId?: string) => void;
  onDelete: (id: string) => void;
}

export const NavigationListItem: React.FC<NavigationListItemProps> = ({ node, onAdd, onDelete, variant }) => {
  const [showNestedForm, setShowNestedForm] = useState(false);

  const toggleNestedForm = () => {
    setShowNestedForm(!showNestedForm);
  };

  return (
    <li
      className={`${
        variant === 'nested' ? '' : 'bg-white border-b border-[var(--border-secondary)] first:rounded-t-lg'
      }`}
    >
      <div
        className={`flex items-center justify-between gap-x-1 px-6 py-4 h-[78px] ${
          variant === 'nested'
            ? 'bg-white rounded-bl-lg border-b border-l border-[var(--border-secondary)]'
            : node.children?.length
            ? 'border-b border-[var(--border-secondary)]'
            : ''
        }`}
      >
        <Button aria-label='Zmień pozycję elementu' className='flex items-center justify-center w-10 h-10 shrink-0'>
          <MoveIcon className='w-5 h-5 text-[var(--button-tertiary-fg)]' />
        </Button>

        <div className='w-full min-w-40 flex flex-col gap-y-[6px] overflow-hidden'>
          <p className='text-sm text-[var(--text-primary)] font-semibold'>{node.label}</p>
          {node.url ? <p className='text-sm text-[var(--text-tertiary)] truncate'>{node.url}</p> : null}
        </div>

        <div className='flex rounded-lg border border-[var(--button-secondary-border)] shrink-0'>
          <Button
            onClick={() => onDelete(node.id)}
            className='text-sm text-[var(--text-secondary)] font-semibold py-[10px] px-4'
          >
            Usuń
          </Button>
          <Button
            onClick={toggleNestedForm}
            className='text-sm text-[var(--text-secondary)] font-semibold py-[10px] px-4 border-x border-[var(--button-secondary-border)]'
          >
            Edytuj
          </Button>
          <Button
            onClick={toggleNestedForm}
            className='text-sm text-[var(--text-secondary)] font-semibold py-[10px] px-4'
          >
            Dodaj pozycję menu
          </Button>
        </div>
      </div>
      {showNestedForm ? (
        <div
          className={`pl-16 pr-6 py-4 bg-[var(--bg-secondary)] ${
            node.children?.length || variant === 'nested' ? '' : 'border-t border-[var(--border-secondary)]'
          }`}
        >
          <NavigationForm
            nodeId={node.id}
            onCancel={toggleNestedForm}
            onDelete={toggleNestedForm}
            onSubmit={(values) => {
              onAdd(values, node.id);
              toggleNestedForm();
            }}
          />
        </div>
      ) : null}

      {node.children && node.children.length > 0 && (
        <ul className='pl-16 bg-[var(--bg-secondary)]'>
          {node.children.map((childNode) => (
            <NavigationListItem
              key={childNode.id}
              node={childNode}
              onAdd={onAdd}
              onDelete={onDelete}
              variant='nested'
            />
          ))}
        </ul>
      )}
    </li>
  );
};
