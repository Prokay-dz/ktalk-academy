import React, { useState } from 'react';
import { X, Plus, BookOpen } from 'lucide-react';

export default function AddCourseModal({ isOpen, onClose, onAddCourse }) {
  const [courseTitle, setCourseTitle] = useState('');
  const [category, setCategory] = useState('Executive Series');
  const [scheduleTime, setScheduleTime] = useState('09:00 AM - 10:30 AM');
  const [capacity, setCapacity] = useState('15');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!courseTitle.trim()) return;

    onAddCourse({
      id: Date.now(),
      dateMonth: "OCT",
      dateDay: String(new Date().getDate() + 2),
      title: courseTitle,
      time: scheduleTime,
      studentsCount: parseInt(capacity, 10) || 12,
      category
    });

    setCourseTitle('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#041527', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} color="#F5A623" /> Add New Course
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748B' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Course Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Advanced Business Negotiations"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Executive Series">Executive Series</option>
              <option value="Academic Series">Academic Series (IELTS)</option>
              <option value="Leadership & Pitching">Leadership & Pitching</option>
              <option value="Fluency Accelerator">Fluency Accelerator</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Schedule Time</label>
              <input
                type="text"
                className="form-input"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Student Capacity</label>
              <input
                type="number"
                className="form-input"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" style={{ flex: 1 }}>
              <Plus size={16} /> Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
