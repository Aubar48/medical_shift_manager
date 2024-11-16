import React from 'react';
import { format } from 'date-fns';
import { Clock, Calendar, Edit2, Trash2 } from 'lucide-react';
import { Shift, Staff } from '../types';
import { staffMembers } from '../data';

interface ShiftScheduleProps {
  shifts: Shift[];
  selectedDate: Date;
  onEditShift: (shift: Shift) => void;
  onDeleteShift: (shiftId: string) => void;
}

export default function ShiftSchedule({ 
  shifts, 
  selectedDate,
  onEditShift,
  onDeleteShift 
}: ShiftScheduleProps) {
  const filteredShifts = shifts.filter(
    shift => shift.date === format(selectedDate, 'yyyy-MM-dd')
  );

  const getStaffMember = (staffId: string): Staff | undefined => {
    return staffMembers.find(staff => staff.id === staffId);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-900">
            {format(selectedDate, 'EEEE, MMMM d, yyyy')}
          </h2>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {filteredShifts.map(shift => {
          const staff = getStaffMember(shift.staffId);
          if (!staff) return null;

          return (
            <div key={shift.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={staff.image} 
                    alt={staff.name} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{staff.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{staff.role}</span>
                      <span>•</span>
                      <span>{staff.department}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{shift.startTime} - {shift.endTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onEditShift(shift)}
                      className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteShift(shift.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {filteredShifts.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No shifts scheduled for this date
          </div>
        )}
      </div>
    </div>
  );
}