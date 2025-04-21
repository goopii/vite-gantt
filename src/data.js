import { DateGantt } from "./utils/DateGantt";

export const data = {
  tasks: [
    {
      id: 20,
      text: "TESTING Task 1",
      start: new DateGantt(2025, 4, 1, false),
      end: new DateGantt(2025, 4, 15, true),
      type: "task",
    },
    {
      id: 21,
      text: "TESTING Task 2",
      start: new DateGantt(2025, 4, 1, false),
      end: new DateGantt(2025, 4, 7, true),
      type: "task",
    },
    {
      id: 22,
      text: "TESTING Terrain Modification",
      start: new DateGantt(2025, 4, 1, false),
      end: new DateGantt(2025, 4, 15, true),
      type: "terrainModification",
    },
  ],
  links: [],
};
