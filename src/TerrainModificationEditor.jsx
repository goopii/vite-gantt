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
import { subDays, addDays } from 'date-fns';
import LandcoverSwatches from './components/LandcoverSwatches';

const TerrainModificationEditor = ({ task, tasks, onAction }) => {
  const [formData, setFormData] = useState({ ...task });
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    console.log(task);
    if (task.mapParent !== null) {
      const mapParent = tasks.byId(task.mapParent);
      setFormData({
        ...task,
        // start: mapParent.end,
        mapTile: mapParent.mapTile,
        // mapLandcover: mapParent.mapLandcover,
        // mapLandcoverType: mapParent.mapLandcoverType,
      });
    }
    else {
      setFormData({
        ...task,
      });
    }
    setIsOpen(true);
  }, [task, tasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Specific handler for date changes from DatePicker
  // Assumes DatePicker returns a Date object or undefined
  const handleDateChange = (fieldName, date) => {
    setFormData((prev) => ({ ...prev, [fieldName]: date }));
  };

  const handleSave = () => {
    const updatedTaskData = {
      id: formData.id,
      task: formData,
    };
    onAction("update-task", updatedTaskData);
    setIsOpen(false);
  };

  const handleCancel = () => {
    onAction(null);
    setFormData({});
    setIsOpen(false);
  };

  const handleOpenChange = (open) => {
    if (!open) {
      handleCancel();
    }
    setIsOpen(open);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent onKeyDown={handleKeyDown}>
        <DialogHeader>
          <DialogTitle>Editing '{formData.text}':</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="text" className="text-left">
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
            <Label htmlFor="start" className="text-left">
              Start Date
            </Label>
            <DatePicker
              className="col-span-3"
              value={formData.start}
              onDateChange={(date) => handleDateChange("start", date)}
              minDate={formData.mapParent ? tasks.byId(formData.mapParent)?.end : undefined}
              maxDate={formData.end ? subDays(formData.end, 1) : undefined}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="end" className="text-left">
              End Date
            </Label>
            <DatePicker
              className="col-span-3"
              value={formData.end}
              onDateChange={(date) => handleDateChange("end", date)}
              minDate={formData.start ? addDays(formData.start, 1) : undefined}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mapTile" className="text-left">
              Map Tile
            </Label>
            <div className="col-span-3 relative flex">
              <img src={formData.mapTile} alt="Map Tile" className="" />
              <img
                src={formData.mapLandcover}
                alt="Map Landcover"
                className="absolute"
              />
              {formData.mapParent && tasks.byId(formData.mapParent)?.mapLandcover && (
                <img
                  src={tasks.byId(formData.mapParent).mapLandcover}
                  alt="Parent Map Landcover"
                  className="absolute"
                />
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mapLandcoverType" className="text-left">
              Map Landcover Type
            </Label>
            <div className="col-span-3">
              <LandcoverSwatches
                selectedType={formData.mapLandcoverType}
                onSelect={(type) => setFormData(prev => ({ ...prev, mapLandcoverType: type }))}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-2">
              <Label htmlFor="mapParent" className="text-left">
                Map Parent
              </Label>
              {formData.mapParent ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    const parentTask = tasks.byId(formData.mapParent);
                    if (parentTask) {
                      setFormData({ ...parentTask });
                    }
                  }}
                >
                  {tasks.byId(formData.mapParent)?.text || formData.mapParent}
                </Button>
              ) : (
                <div className="w-full h-10 px-3 py-2 text-sm border rounded-md bg-muted select-none">
                  No parent task
                </div>
              )}
            </div>
            <div className="col-span-2">
              <Label htmlFor="mapChild" className="text-left">
                Map Child
              </Label>
              {formData.mapChild ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    const childTask = tasks.byId(formData.mapChild);
                    if (childTask) {
                      setFormData({ ...childTask });
                    }
                  }}
                >
                  {tasks.byId(formData.mapChild)?.text || formData.mapChild}
                </Button>
              ) : (
                <div className="w-full h-10 px-3 py-2 text-sm border rounded-md bg-muted select-none">
                  No child task
                </div>
              )}
            </div>
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