import React, { useState } from 'react';

// Basic example editor for terrainModification tasks
const TerrainModificationEditor = ({ task, onAction }) => {
  // Use state to manage form data, initialized with task data
  const [formData, setFormData] = useState({ ...task });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Pass the 'update-task' action and the modified data back
    onAction({ action: 'update-task', data: formData });
  };

  const handleCancel = () => {
    // Pass a 'close-form' action back
    onAction({ action: 'close-form' });
  };

  // Simple form layout - customize this with actual fields
  return (
    <div style={{
      position: 'fixed', // Example styling to overlay
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      background: 'white',
      border: '1px solid #ccc',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      zIndex: 1000, // Ensure it's above the Gantt chart
    }}>
      <h3>Editing Terrain Modification: {task.text}</h3>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="text" // Corresponds to task property
            value={formData.text || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="start" // Corresponds to task property
            value={formData.start ? new Date(formData.start).toISOString().split('T')[0] : ''} // Format date for input
            onChange={handleChange}
          />
        </div>
         <div>
          <label>End Date:</label>
          <input
            type="date"
            name="end" // Corresponds to task property
            value={formData.end ? new Date(formData.end).toISOString().split('T')[0] : ''} // Format date for input
            onChange={handleChange}
          />
        </div>
         {/* Add other relevant fields for terrainModification */}
        <div>
            <label>Modification Type:</label>
            <input
                type="text"
                name="modificationType" // Example custom field
                value={formData.modificationType || ''}
                onChange={handleChange}
             />
        </div>
        <div>
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TerrainModificationEditor; 