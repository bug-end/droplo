import React, { useState } from 'react';
import { Button } from '@headlessui/react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { NavigationFormData, NavigationItem } from '@/types/navigation';
import { NavigationForm } from '@/components/NavigationForm';
import { NavigationListItem } from '@/components/NavigationListItem';

interface NavigationListProps {
  nodes?: NavigationItem[];
  onAdd: (values: NavigationFormData, parentId?: string) => void;
  onDelete: (id: string) => void;
  onDragEnd: (event: DragEndEvent) => void;
}

export const NavigationList: React.FC<NavigationListProps> = ({ nodes, onAdd, onDelete, onDragEnd }) => {
  const [showTopLevelForm, setShowTopLevelForm] = useState(false);

  const toggleTopLevelForm = () => {
    setShowTopLevelForm(!showTopLevelForm);
  };

  return (
    <div>
      <div className='border-r border-l border-t border-[var(--border-primary)] rounded-t-lg bg-white'>
        <ul>
          <DndContext onDragEnd={onDragEnd}>
            <SortableContext items={nodes || []}>
              {nodes?.map((node) => (
                <NavigationListItem key={node.id} node={node} onAdd={onAdd} onDelete={onDelete} />
              ))}
            </SortableContext>
          </DndContext>
        </ul>
      </div>
      <div className='border-r border-l border-b border-[var(--border-primary)] rounded-b-lg'>
        {showTopLevelForm && (
          <div className='px-6 py-4 bg-[var(--bg-secondary)] border-b border-[var(--border-secondary)]'>
            <NavigationForm
              onCancel={toggleTopLevelForm}
              onDelete={toggleTopLevelForm}
              onSubmit={(values) => {
                onAdd(values);
                toggleTopLevelForm();
              }}
            />
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
