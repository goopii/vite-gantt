import { Gantt } from "wx-react-gantt";
import "wx-react-gantt/dist/gantt.css";
import { data } from "./data";
import { config } from "./config";

const MyGanttComponent = () => {
  return (
    <div className="h-full w-full">
      <Gantt
        // CONFIG
        start={config.start}
        end={config.end}
        lengthUnit={config.lengthUnit}
        scales={config.scales}
        cellWidth={config.cellWidth}
        columns={config.columns}
        taskTypes={config.taskTypes}
        taskTemplate={config.MyTaskContent}
        // DATA
        tasks={data.tasks}
        links={data.links}
      />
    </div>
  );
};

export default MyGanttComponent;
