import { Gantt } from "wx-react-gantt";
import "wx-react-gantt/dist/gantt.css";
import { data } from "./data";
import { config } from "./config";
import { useRef, useEffect, useState } from "react";
import TerrainModificationEditor from "./TerrainModificationEditor";

const MyGanttComponent = () => {
  const apiRef = useRef(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    if (apiRef.current) {
      const api = apiRef.current;

      const interceptorId = api.intercept("show-editor", (data) => {
        if (!tasks) return true;

        const task = tasks.byId(data.id);
        if (task && task.type === "terrainModification") {
          setTaskToEdit(task);
          return false;
        }
        return true;
      });

      return () => {
        api.detach("show-editor", interceptorId);
      };
    }
  }, [tasks]);

  const handleFormAction = (action = null, data = null) => {
    console.log("Action received from custom editor:", action, data);
    if (!action) {
      setTaskToEdit(null);
      return;
    }
    switch (action) {
      case "update-task":
        if (apiRef.current) {
          if (!data) {
            console.warn("No data provided for update-task action");
            return;
          }
          apiRef.current.exec(action, data);
          setTaskToEdit(null);
        }
        break;
      default:
        console.warn("Unhandled action from custom editor:", action);
        break;
    }
  };

  return (
    <div className="h-full w-full">
      <Gantt
        init={(api) => {
          apiRef.current = api;
          setTasks(api.getState().tasks);
          api.on("update-task", () => setTasks(api.getState().tasks));
          api.on("add-task", () => setTasks(api.getState().tasks));
          api.on("delete-task", () => setTasks(api.getState().tasks));
        }}
        start={config.start}
        end={config.end}
        lengthUnit={config.lengthUnit}
        scales={config.scales}
        zoom={true}
        cellWidth={config.cellWidth}
        columns={config.columns}
        taskTypes={config.taskTypes}
        taskTemplate={config.MyTaskContent}
        tasks={data.tasks}
        links={data.links}
      />
      {taskToEdit && (
        <TerrainModificationEditor
          task={taskToEdit}
          onAction={handleFormAction}
        />
      )}
    </div>
  );
};

export default MyGanttComponent;
