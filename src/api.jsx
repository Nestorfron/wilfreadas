
const API_URL = import.meta.env.VITE_API_URL;


export const getItems = async () => {
  const response = await fetch(`${API_URL}/items`);
  const data = await response.json();
  return data;
};

// Función para agregar un item
export const addItem = async (item) => {
  await fetch(`${API_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
};
