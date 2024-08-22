import api from '../api/products';



export const getUsers =async () => {
    return api
      .get('/users') 
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching users:', error);
        throw error;
      });
  };
export const getUserById =async (id) => {
    return api.get(`/users/${id}`)
        .then(response => response.data
         )
        .catch(error => {
            console.error(`Error fetching user by ID: ${id}`, error);
            throw error;
        });
};

export const addUser =async (userData) => {
    return api.post('/users', userData)
        .then(response => response.data)
        .catch(error => {
            console.error('Error adding user', error);
            throw error;
        });
};

export const updateUser =async (id, userData) => {
    return api.put(`/users/${id}`, userData)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error updating user with ID: ${id}`, error);
            throw error;
        });
};

    export const deleteUser =async (id) => {
    return api.delete(`/users/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error deleting user with ID: ${id}`, error);
            throw error;
        });
};
