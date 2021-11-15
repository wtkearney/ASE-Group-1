import * as SecureStore from 'expo-secure-store';


export async function getItem() {
  const value = await SecureStore.getItemAsync('token');
  return value ? JSON.parse(value) : null;
};

export async function setItem(value: string) {
  return SecureStore.setItemAsync('token', JSON.stringify(value));
};

export async function removeItem() {
  return SecureStore.deleteItemAsync('token');
};