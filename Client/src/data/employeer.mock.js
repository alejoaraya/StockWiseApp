import { mockUsers } from './index';

export const mockEmpleados = [
    {
        id: mockUsers[0].id,
        nombre: 'Ximena',
        apellido: 'Morales',
        photo_url: 'https://i.pravatar.cc/150?img=32',
        rol: 'admin',
        email: 'ximena@test.com',
        fechaIngreso: '2025-11-10T09:00:00',
        deleted: false,
        user: mockUsers[0],
    },
    {
        id: mockUsers[0].id,
        nombre: 'Admin',
        apellido: 'Sistema',
        photo_url: 'https://i.pravatar.cc/150?img=12',
        rol: 'gerente',
        email: 'admin@test.com',
        fechaIngreso: '2025-10-01T08:30:00',
        deleted: false,
        user: mockUsers[1],
    },
    {
        id: mockUsers[0].id,
        nombre: 'Carlos',
        apellido: 'Pérez',
        photo_url: 'https://i.pravatar.cc/150?img=15',
        rol: 'empleado',
        email: 'operador1@test.com',
        fechaIngreso: '2026-01-20T10:00:00',
        deleted: false,
        user: mockUsers[2],
    },
];