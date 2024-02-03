import { BuildSearchBar } from './SearchBar';

export default {
  title: '/Atoms/Form/Search Bar',
  component: BuildSearchBar,
  argTypes: {
    placeholder: {
      control: { type: 'text' },
      defaultValue: 'Search by name, email or role',
      description: 'Placeholder text for the search bar',
    },
    defaultValue: {
      control: { type: 'text' },
      defaultValue: '',
      description: 'Default value for the search bar',
    },
  },
};

export const SearchBar = (args) => {
  return BuildSearchBar({ ...args });
};

SearchBar.args = {
  placeholder: 'Search by name, email or role',
  defaultValue: '',
  onSubmit: (value) => console.log('The submitted search content is:', value),
};
