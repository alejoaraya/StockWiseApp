/* import { httpClient } from '@/utils/';

export function serviceLogin(loginUser) {
  return new Promise((resolve, reject) => {
    httpClient
      .post('/login', loginUser)
      .then(({ data }) => resolve(data))
      .catch(error => reject(new Error(error)));
  });
}

export function serviceSignUp(newUser) {
  return new Promise((resolve, reject) => {
    httpClient
      .post('/signup', newUser)
      .then(({ data }) => resolve(data))
      .catch(error => reject(new Error(error)));
  });
}

export function serviceGetUser() {
  return new Promise((resolve, reject) => {
    httpClient
      .get('/user')
      .then(({ data }) => resolve(data))
      .catch(error => reject(new Error(error)));
  });
}

export function serviceUpdateUser(newUser) {
  return new Promise((resolve, reject) => {
    httpClient
      .put('/user', newUser)
      .then(({ data }) => resolve(data))
      .catch(error => reject(new Error(error)));
  });
}

export function serviceResetPassword(email) {
  return new Promise((resolve, reject) => {
    httpClient
      .post(`/resetPassword?email=${email}`)
      .then(() => resolve(true))
      .catch(error => reject(new Error(error)));
  });
}

export function serviceChangePassword({ password, email, token }) {
  return new Promise((resolve, reject) => {
    httpClient
      .post(`/changePassword?email=${email}&token=${token}`, { password })
      .then(() => resolve(true))
      .catch(error => reject(new Error(error)));
  });
}
 */

import { mockToken, mockUsers } from '../data/auth.mock';

export function serviceLogin(loginUser) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userFound = mockUsers.find(
        user =>
          (loginUser.email && user.email === loginUser.email) ||
          (loginUser.username && user.userName === loginUser.username)
      );

      if (!userFound || userFound.password !== loginUser.password) {
        reject(new Error('Credenciales inválidas'));
        return;
      }

      resolve({ token: mockToken });
    }, 400);
  });
}

export function serviceSignUp(newUser) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exists = mockUsers.some(
        user =>
          user.email === newUser.email || user.userName === newUser.username
      );

      if (exists) {
        reject(new Error('El usuario ya existe'));
        return;
      }

      resolve({
        id: String(mockUsers.length + 1),
        nombre: newUser.nombre,
        apellido: newUser.apellido,
        username: newUser.username,
        password: newUser.password,
        email: newUser.email,
        url: newUser.url ?? '',
      });
    }, 400);
  });
}

export function serviceGetUser() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id: mockUsers[0].id,
        nombre: mockUsers[0].name,
        apellido: mockUsers[0].surname,
        username: mockUsers[0].userName,
        password: mockUsers[0].password,
        email: mockUsers[0].email,
        url: mockUsers[0].url,
      });
    }, 400);
  });
}

export function serviceUpdateUser(newUser) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id: newUser.id ?? '1',
        nombre: newUser.nombre,
        apellido: newUser.apellido,
        username: newUser.username,
        password: newUser.password,
        email: newUser.email,
        url: newUser.url,
      });
    }, 400);
  });
}

export function serviceResetPassword(email) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exists = mockUsers.some(user => user.email === email);

      if (!exists) {
        reject(new Error('Email no encontrado'));
        return;
      }

      resolve(true);
    }, 400);
  });
}

export function serviceChangePassword({ password, email, token }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exists = mockUsers.some(user => user.email === email);

      if (!exists || !token || !password) {
        reject(new Error('Datos inválidos'));
        return;
      }

      resolve(true);
    }, 400);
  });
}