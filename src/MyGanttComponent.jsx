import { Gantt } from "wx-react-gantt";
import "wx-react-gantt/dist/gantt.css";
import { data } from "./data";
import { config } from "./config";
import { useRef, useEffect, useState } from "react";
import TerrainModificationEditor from "./TerrainModificationEditor";

const MyGanttComponent = () => {
  const apiRef = useRef(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [store, setStore] = useState(null);

  useEffect(() => {
    console.log("apiRef.current", apiRef.current);
    if (apiRef.current) {
      const api = apiRef.current;
      setStore(api.getState().tasks);

      api.on("zoom-scale", () => {
        console.log(
          "The current zoom level is",
          apiRef.current.getState().zoom
        );
      });

      const interceptorId = api.intercept("show-editor", (data) => {
        if (!store) return true;

        const task = store.byId(data.id);
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
  }, [apiRef, store]);

  const handleFormAction = (ev) => {
    const { action, data } = ev;
    console.log("Action received from custom editor:", action, data);

    switch (action) {
      case "close-form":
        setTaskToEdit(null);
        break;
      case "update-task":
        if (apiRef.current) {
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
          setStore(api.getState().tasks);
          api.on("update-task", () => setStore(api.getState().tasks));
          api.on("add-task", () => setStore(api.getState().tasks));
          api.on("delete-task", () => setStore(api.getState().tasks));
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
