import { User } from '../types/user';

const USERS_API_URL =
  'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(USERS_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: User[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
