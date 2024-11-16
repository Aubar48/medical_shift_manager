import React, { useState, useEffect } from 'react';
import { format, addDays, subDays } from 'date-fns';
import { ChevronLeft, ChevronRight, Users, Calendar as CalendarIcon, Plus } from 'lucide-react';
import { staffMembers } from './data';
import StaffCard from './components/StaffCard';
import ShiftSchedule from './components/ShiftSchedule';
import ShiftModal from './components/ShiftModal';
import WaitingList from './components/WaitingList';
import { Shift, Patient } from './types';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShift, setEditingShift] = useState<Shift | undefined>();
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'John Smith',
      estimatedWaitTime: 15,
      arrivalTime: new Date().toISOString(),
      assignedDoctor: '1',
      assignedRoom: 'Room 101',
      status: 'waiting'
    },
    {
      id: '2',
      name: 'Emma Johnson',
      estimatedWaitTime: 5,
      arrivalTime: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      assignedDoctor: '2',
      assignedRoom: 'Room 102',
      status: 'in-consultation'
    },
    {
      id: '3',
      name: 'Michael Brown',
      estimatedWaitTime: 30,
      arrivalTime: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      assignedDoctor: '1',
      assignedRoom: 'Room 103',
      status: 'waiting'
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setPatients(currentPatients =>
        currentPatients.map(patient => ({
          ...patient,
          estimatedWaitTime: Math.max(0, patient.estimatedWaitTime - 1)
        }))
      );
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleAddShift = (shiftData: Omit<Shift, 'id'>) => {
    const newShift: Shift = {
      ...shiftData,
      id: Math.random().toString(36).substr(2, 9)
    };
    setShifts([...shifts, newShift]);
  };

  const handleEditShift = (shift: Shift) => {
    setEditingShift(shift);
    setIsModalOpen(true);
  };

  const handleDeleteShift = (shiftId: string) => {
    setShifts(shifts.filter(shift => shift.id !== shiftId));
  };

  const handleSaveShift = (shiftData: Omit<Shift, 'id'>) => {
    if (editingShift) {
      setShifts(shifts.map(shift => 
        shift.id === editingShift.id 
          ? { ...shiftData, id: shift.id }
          : shift
      ));
      setEditingShift(undefined);
    } else {
      handleAddShift(shiftData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CalendarIcon className="w-8 h-8 text-blue-500" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">
                Medical Shift Manager
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSelectedDate(subDays(selectedDate, 1))}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <span className="text-lg font-medium text-gray-900">
                {format(selectedDate, 'MMM d, yyyy')}
              </span>
              <button 
                onClick={() => setSelectedDate(addDays(selectedDate, 1))}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <h2 className="text-lg font-semibold text-gray-900">Staff</h2>
                  </div>
                  <button
                    onClick={() => {
                      setEditingShift(undefined);
                      setIsModalOpen(true);
                    }}
                    className="btn btn-primary flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Shift</span>
                  </button>
                </div>
              </div>
              <div className="p-4 space-y-4">
                {staffMembers.map(staff => (
                  <StaffCard
                    key={staff.id}
                    staff={staff}
                    isActive={selectedStaff === staff.id}
                    onClick={() => setSelectedStaff(staff.id === selectedStaff ? null : staff.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <ShiftSchedule 
              shifts={selectedStaff 
                ? shifts.filter(shift => shift.staffId === selectedStaff)
                : shifts
              }
              selectedDate={selectedDate}
              onEditShift={handleEditShift}
              onDeleteShift={handleDeleteShift}
            />
            
            <WaitingList 
              patients={patients}
              selectedDoctor={selectedStaff}
            />
          </div>
        </div>
      </main>

      <ShiftModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingShift(undefined);
        }}
        onSave={handleSaveShift}
        staff={staffMembers}
        editingShift={editingShift}
      />
    </div>
  );
}

export default App;