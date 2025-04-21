import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription, // Optional: if you want a description area
} from "@/components/ui/dialog";
import { DatePicker } from './DatePickerComponent'; // Assuming this uses Shadcn's DatePicker setup
import { isValid, parseISO, format, isDate } from 'date-fns'; // Import date-fns functions

// Basic example editor for terrainModification tasks
const TerrainModificationEditor = ({apiRef, task, onAction }) => {
  const [formData, setFormData] = useState({ ...task });
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    console.log(apiRef.current);
    setFormData({
      ...task
    });
    setIsOpen(true);
  }, [task]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Specific handler for date changes from DatePicker
  // Assumes DatePicker returns a Date object or undefined
  const handleDateChange = (fieldName, date) => {
    setFormData(prev => ({ ...prev, [fieldName]: date }));
  };

  const handleSave = () => {
    const updatedTaskData = {
        id: task.id,
        task: formData
    };
    onAction("update-task", updatedTaskData);
    setIsOpen(false);
  };

  const handleCancel = () => {
    onAction(null);
    setFormData({})
    setIsOpen(false);
  };

  const handleOpenChange = (open) => {
    if (!open) {
      handleCancel();
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Terrain Modification: {task?.text}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="text" className="text-right">
              Name
            </Label>
            <Input
              id="text"
              name="text"
              value={formData.text || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="start" className="text-right">
              Start Date
            </Label>
            <DatePicker
              className="col-span-3"
              value={formData.start}
              onDateChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="end" className="text-right">
              End Date
            </Label>
            <DatePicker
              className="col-span-3"
              value={formData.end || formData.start}
              onDateChange={(date) => handleDateChange("end", date)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TerrainModificationEditor; 