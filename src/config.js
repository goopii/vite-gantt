import MyTaskContent from "./MyTaskContent";
import { DateGantt } from "./utils/DateGantt";

export const config = {
  start: new DateGantt(2025, 4, 1, false),
  end: new DateGantt(2025, 4, 15, true),
  lengthUnit: "day",
  scales: [
    { unit: "month", step: 1, format: "MMMM yyy" },
    { unit: "day", step: 1, format: "d" },
  ],
  cellWidth: 50,
  columns: [
    { id: "text", header: "Name", flexgrow: 1 },
    {
      id: "start",
      header: "Start",
      flexgrow: 1,
      align: "center",
      sort: true,
    },
    {
      id: "end",
      header: "End",
      flexgrow: 1,
      align: "center",
      sort: true,
    },
    {
      id: "duration",
      header: "Time span",
      flexgrow: 1,
      align: "center",
      sort: true,
    },
    {
      id: "action",
      header: "",
      width: 50,
      align: "center",
    },
  ],
  taskTypes: [
    { id: "task", label: "Task" },
    { id: "terrainModification", label: "Terrain Modification" },
  ],
  // MyTaskContent: MyTaskContent,
};
