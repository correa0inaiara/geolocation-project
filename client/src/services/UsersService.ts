import { IUser, UsersData } from '@/interfaces/IUser';
import { API_URL } from '@/utils/globals';
import axios from 'axios'

// function getLocation

export async function getUsers() {
  try {
    const response = await axios.get(API_URL + '/users') as UsersData;
    const result = response.data.rows ? response.data.rows : response.data;
    console.log('result api', result)

    return result
  } catch (error) {
    console.error('Error fetching jobs:', error);
  }
}

export async function getUserById(userId: string) {
  try {
    const response = await axios.get(API_URL + '/users/' + userId);
    const result = response.data.rows ? response.data.rows : response.data;
    console.log('result api', result)
    
    return result
  } catch (error) {
    console.error(`Error fetching userId ${userId}: ${error}`);
  }
}

export async function saveUser(newUser: IUser) {
  try {
    const response = await axios.post(API_URL + '/users', newUser);
    const result = response.data.rows ? response.data.rows : response.data;
    console.log('result api', result)
    
    return result
  } catch (error) {
    console.error('Error saving new user: ', error);
  }
}

export async function updateUser(userId: string) {
  try {
    const response = await axios.put(API_URL + '/users/' + userId);
    const result = response.data.rows ? response.data.rows : response.data;
    console.log('result api', result)
    
    return result
  } catch (error) {
    console.error(`Error updating userId ${userId}: ${error}`);
  }
}

export async function deleteUser(userId: string) {
  try {
    const response = await axios.delete(API_URL + '/users/' + userId);
    const result = response.data.rows ? response.data.rows : response.data;
    console.log('result api', result)
    
    return result
  } catch (error) {
    console.error(`Error deleting userId ${userId}: ${error}`);
  }
}