'use client';

import { useState } from 'react';
import { Button } from '@headlessui/react';
import { v4 as uuidv4 } from 'uuid';
import { NavigationFormData, NavigationItem } from '@/types/navigation';
import AddIcon from '@/assets/icons/add.svg';
import { NavigationForm } from '@/components/NavigationForm';
import { NavigationList } from '@/components/NavigationList';
import { arrayMove } from '@dnd-kit/sortable';
import { DragEndEvent } from '@dnd-kit/core';
import { flattenTree, reconstructTree } from '@/utils/dragndrop';

export default function NavigationPage() {
  const [showForm, setShowForm] = useState(false);
  const [nodes, setNodes] = useState<NavigationItem[]>([]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleAdd = (values: NavigationFormData, parentId?: string) => {
    const newNode: NavigationItem = {
      id: uuidv4(),
      label: values.name,
      url: values.link,
      children: [],
    };

    setNodes((prevNodes) => {
      if (!parentId) {
        return [...prevNodes, newNode];
      }

      const addNestedNode = (nodes: NavigationItem[]): NavigationItem[] => {
        return nodes.map((node) => {
          if (node.id === parentId) {
            // Found the parent node; add the new item to its children
            return {
              ...node,
              children: [...(node.children || []), newNode],
            };
          }

          // Recurse into children to find the correct parent
          return {
            ...node,
            children: addNestedNode(node.children || []),
          };
        });
      };

      return addNestedNode(prevNodes);
    });
  };

  const handleEdit = (values: NavigationFormData, id: string) => {
    const editNode = (nodes: NavigationItem[]): NavigationItem[] => {
      return nodes.map((node) => {
        if (node.id === id) {
          // Update the node's label and url if the id matches
          return {
            ...node,
            label: values.name,
            url: values.link,
          };
        }

        // Recursively traverse children to find the node to update
        return {
          ...node,
          children: editNode(node.children || []),
        };
      });
    };

    setNodes((prevNodes) => editNode(prevNodes));
  };

  const handleDelete = (id: string) => {
    const deleteNode = (nodes: NavigationItem[]): NavigationItem[] => {
      return nodes
        .filter((node) => node.id !== id) // Remove the node at the current level
        .map((node) => ({
          ...node,
          children: deleteNode(node.children || []), // Recursively update children
        }));
    };

    setNodes((prevNodes) => deleteNode(prevNodes));
  };

  // TODO: update this function to handle moving nested nodes between parent nodes
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setNodes((currentNodes) => {
      const flatNodes = flattenTree(currentNodes);
      const oldIndex = flatNodes.findIndex((node) => node.id === active.id);
      const newIndex = flatNodes.findIndex((node) => node.id === over.id);

      const updatedFlatNodes = arrayMove(flatNodes, oldIndex, newIndex);
      return reconstructTree(updatedFlatNodes);
    });
  };

  return (
    <>
      {nodes.length === 0 ? (
        showForm ? (
          <NavigationForm onCancel={toggleForm} onDelete={toggleForm} onSubmit={handleAdd} />
        ) : (
          <div className='py-6 px-4 border border-[var(--border-secondary)] bg-[var(--bg-secondary)] rounded-lg'>
            <div className='max-w-[512px] mx-auto flex flex-col gap-6 justify-center items-center'>
              <div className='text-center'>
                <p className='text-base font-semibold text-[var(--text-primary)] mb-1'>Menu jest puste</p>
                <p className='text-sm text-[var(--text-tertiary)]'>W tym menu nie ma jeszcze żadnych linków.</p>
              </div>
              <Button
                onClick={toggleForm}
                className='flex gap-x-[6px] items-center text-sm font-semibold py-[10px] px-[14px] bg-[var(--button-primary-bg)] text-white rounded-lg'
              >
                <AddIcon className='shrink-0 w-5 h-5' />
                Dodaj pozycję menu
              </Button>
            </div>
          </div>
        )
      ) : (
        <NavigationList
          nodes={nodes}
          onAdd={handleAdd}
          onDelete={handleDelete}
          onDragEnd={handleDragEnd}
          onEdit={handleEdit}
        />
      )}
    </>
  );
}
