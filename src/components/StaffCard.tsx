import React from 'react';
import { Staff } from '../types';
import { UserRound } from 'lucide-react';

interface StaffCardProps {
  staff: Staff;
  isActive?: boolean;
  onClick?: () => void;
}

export default function StaffCard({ staff, isActive, onClick }: StaffCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`p-4 rounded-lg transition-all cursor-pointer ${
        isActive 
          ? 'bg-blue-50 border-2 border-blue-500' 
          : 'bg-white border border-gray-200 hover:border-blue-300'
      }`}
    >
      <div className="flex items-center space-x-4">
        {staff.image ? (
          <img 
            src={staff.image} 
            alt={staff.name} 
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <UserRound className="w-6 h-6 text-gray-500" />
          </div>
        )}
        <div>
          <h3 className="font-medium text-gray-900">{staff.name}</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="px-2 py-1 rounded-full bg-gray-100">{staff.role}</span>
            <span>•</span>
            <span>{staff.department}</span>
          </div>
        </div>
      </div>
    </div>
  );
}