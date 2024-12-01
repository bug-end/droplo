import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from '@headlessui/react';
import { NavigationFormData } from '@/types/navigation';
import TrashIcon from '@/assets/icons/trash.svg';
import SearchIcon from '@/assets/icons/search.svg';

interface NavigationFormProps {
  onCancel: () => void;
  onDelete: () => void;
  onSubmit: (values: NavigationFormData) => void;
}

export const NavigationForm: React.FC<NavigationFormProps> = ({ onCancel, onDelete, onSubmit }) => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Pole wymagane')
      .matches(
        /^[^\s](?!.*\s{2,})[\S\s]*[^\s]$/, // No leading/trailing spaces, no double spaces
        'Niepoprawny format'
      ),
  });

  const initialValues: NavigationFormData = {
    name: '',
    link: '',
  };

  return (
    <div className='relative py-5 pl-6 pr-20 border border-[var(--border-primary)] bg-white rounded-lg'>
      <Formik<NavigationFormData>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          resetForm();
        }}
      >
        {() => (
          <Form>
            <div className='mb-2'>
              <label htmlFor='name' className='block text-sm text-[var(--text-secondary)] font-medium mb-[6px]'>
                Nazwa
              </label>
              <Field id='name' name='name'>
                {({ field, form }: FieldProps<string, NavigationFormData>) => (
                  <Input
                    id='name'
                    name={field.name}
                    value={field.value}
                    placeholder='np. Promocja'
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className={`w-full px-3 py-2 border rounded-lg placeholder:text-base placeholder:text-[var(--text-placeholder)] ${
                      form.errors.name && form.touched.name ? 'border-red-500' : 'border-[var(--border-primary)]'
                    }`}
                  />
                )}
              </Field>
              <ErrorMessage name='name' component='div' className='mt-1 text-xs text-red-500' />
            </div>
            <div className='mb-5'>
              <label htmlFor='link' className='block mb-[6px] text-sm text-[var(--text-secondary)] font-medium'>
                Link
              </label>
              <Field id='link' name='link'>
                {({ field }: FieldProps<string, NavigationFormData>) => (
                  <div className='relative'>
                    <Input
                      id='link'
                      name={field.name}
                      value={field.value}
                      placeholder='Wklej lub wyszukaj'
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={
                        'w-full pl-[42px] pr-[14px] py-2 border border-[var(--border-primary)] rounded-lg placeholder:text-base placeholder:text-[var(--text-placeholder)]'
                      }
                    />
                    <div className='absolute inset-y-0 left-0 flex items-center pl-[14px] pointer-events-none'>
                      <SearchIcon className='w-5 h-5 text-[var(--text-placeholder)]' />
                    </div>
                  </div>
                )}
              </Field>
            </div>
            <div>
              <Button
                type='button'
                onClick={onCancel}
                className='mr-2 text-sm text-[var(--button-secondary-text)] font-semibold py-[10px] px-4 rounded-lg border border-[var(--button-secondary-border)]'
              >
                Anuluj
              </Button>
              <Button
                type='submit'
                className='text-sm text-[var(--button-secondary-fg)] font-semibold py-[10px] px-4 rounded-lg border border-[var(--button-accent-border)]'
              >
                Dodaj
              </Button>
              <Button
                aria-label='Usuń element nawigacji'
                type='button'
                onClick={onDelete}
                className='absolute flex items-center justify-center w-10 h-10 top-5 right-6'
              >
                <TrashIcon className='w-5 h-5 text-[var(--button-tertiary-fg)]' />
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
