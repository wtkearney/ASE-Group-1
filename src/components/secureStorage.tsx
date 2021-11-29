import * as SecureStore from 'expo-secure-store';


export async function getItem() {
  console.log("Getting stored item...");
  const value = await SecureStore.getItemAsync('token');
  return value ? JSON.parse(value) : null;
};

export async function setItem(value: string) {
  console.log("Setting item...");
  return SecureStore.setItemAsync('token', JSON.stringify(value));
};

export async function removeItem() {
  console.log("Removing item...");
  return SecureStore.deleteItemAsync('token');
};