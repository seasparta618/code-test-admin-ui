import { BuildPagination } from './Pagination';

export default {
  title: '/Atoms/Pagination',
  argTypes: {
    initialSelectedPage: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5],
      description: 'The initial selected page',
    },
    pageRange: {
      control: { type: 'object' },
      defaultValue: [1, 2, 3, 4, 5],
      description: 'The range of pages to display',
    },
    buttonStyle: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'quatenary'],
      description: 'select the button type',
    },
  },
};

export const Pagination = (args) => {
  return BuildPagination({ ...args });
};
Pagination.args = {
  initialSelectedPage: 1,
  pageRange: [1, 2, 3, 4, 5],
  buttonStyle: 'secondary',
};
