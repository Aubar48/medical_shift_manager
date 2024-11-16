import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { Clock, User, DoorOpen } from 'lucide-react';
import { Patient, Staff } from '../types';
import { staffMembers } from '../data';

interface WaitingListProps {
  patients: Patient[];
  selectedDoctor?: string;
}

export default function WaitingList({ patients, selectedDoctor }: WaitingListProps) {
  const filteredPatients = selectedDoctor
    ? patients.filter(patient => patient.assignedDoctor === selectedDoctor)
    : patients;

  const getDoctor = (doctorId: string): Staff | undefined => {
    return staffMembers.find(staff => staff.id === doctorId);
  };

  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-consultation':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Patient Waiting List</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {filteredPatients.map(patient => {
          const doctor = getDoctor(patient.assignedDoctor);
          const waitTimeClass = patient.estimatedWaitTime <= 5 
            ? 'text-red-500' 
            : patient.estimatedWaitTime <= 15 
              ? 'text-yellow-500' 
              : 'text-green-500';

          return (
            <div key={patient.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">{patient.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                    {patient.status.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className={`w-4 h-4 ${waitTimeClass}`} />
                  <span className={`text-sm font-medium ${waitTimeClass}`}>
                    {patient.estimatedWaitTime} min
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <DoorOpen className="w-4 h-4" />
                  <span>{patient.assignedRoom}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>Arrived: {format(new Date(patient.arrivalTime), 'HH:mm')}</span>
                  <span>•</span>
                  <span>Doctor: {doctor?.name}</span>
                </div>
              </div>
            </div>
          );
        })}
        {filteredPatients.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No patients in the waiting list
          </div>
        )}
      </div>
    </div>
  );
}