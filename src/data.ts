import { Staff, Shift, Patient } from './types';

export const staffMembers: Staff[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    role: 'Doctor',
    department: 'Emergency',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: '2',
    name: 'Dr. James Wilson',
    role: 'Doctor',
    department: 'Cardiology',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: '3',
    name: 'Dr. Nahuel Argandoña',
    role: 'Specialist',
    department: 'Neurology',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300'
  },
];

export const shifts: Shift[] = [
  {
    id: '1',
    staffId: '1',
    date: '2024-03-20',
    startTime: '07:00',
    endTime: '15:00',
    department: 'Emergency'
  },
  {
    id: '2',
    staffId: '2',
    date: '2024-03-20',
    startTime: '14:00',
    endTime: '22:00',
    department: 'Cardiology'
  },
  {
    id: '3',
    staffId: '3',
    date: '2024-11-16',
    startTime: '09:00',
    endTime: '17:00',
    department: 'Neurology'
  }
];

export const rooms = [
  'Room 101',
  'Room 102',
  'Room 103',
  'Room 104',
  'Room 105',
];