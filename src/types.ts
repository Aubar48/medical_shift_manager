export interface Staff {
  id: string;
  name: string;
  role: 'Doctor' | 'Nurse' | 'Specialist';
  department: string;
  image: string;
}

export interface Shift {
  id: string;
  staffId: string;
  date: string;
  startTime: string;
  endTime: string;
  department: string;
}

export interface Patient {
  id: string;
  name: string;
  estimatedWaitTime: number; // in minutes
  arrivalTime: string;
  assignedDoctor: string;
  assignedRoom: string;
  status: 'waiting' | 'in-consultation' | 'completed';
}