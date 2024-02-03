import { User } from '../types/user';

const nameList = [
  'Tom',
  'Jerry',
  'Eliza',
  'Nancy',
  'Celine',
  'Justin',
  'Ruby',
  'Gem',
  'Grid',
  'Villa',
  'House',
  'Townhouse',
  'Garrila',
  'White',
  'Masters',
];

const domainList = [
  '@gmail.com',
  '@example.com',
  '@test.com',
  '@boxhill.property.com',
];

const roleList = ['owner', 'admin', 'member', 'customer', 'long term customer'];

const getRandomElement = (array: string[]) =>
  array[Math.floor(Math.random() * array.length)];

export const mockUserData = (rows: number): User[] => {
  const users: User[] = [];

  for (let i = 0; i < rows; i++) {
    const firstName = getRandomElement(nameList);
    const lastName = getRandomElement(nameList);
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${getRandomElement(domainList)}`;
    const role = getRandomElement(roleList);

    users.push({
      id: `user-${i}`,
      name,
      email,
      role,
    });
  }

  return users;
};
