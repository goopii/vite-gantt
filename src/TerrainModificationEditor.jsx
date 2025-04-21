import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { DatePicker } from './DatePickerComponent';

const TerrainModificationEditor = ({ task, onAction }) => {
  const [formData, setFormData] = useState({ ...task });
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setFormData({
      ...task
    });
    setIsOpen(true);
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
          <DialogTitle>{task.text}</DialogTitle>
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
              onDateChange={(date) => handleDateChange("start", date)}
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="myCustomProperty" className="text-right">
              My Custom Property
            </Label>
            <Input
              id="myCustomProperty"
              name="myCustomProperty"
              value={formData.myCustomProperty || ""}
              onChange={handleChange}
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