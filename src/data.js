import { parse } from 'date-fns';

export const data = {
  tasks: [
    {
      id: 20,
      text: "TESTING Task 1",
      start: parse('2025-04-01', 'yyyy-MM-dd', new Date()),
      end: parse('2025-04-15', 'yyyy-MM-dd', new Date()),
      type: "task",
    },
    {
      id: 21,
      text: "TESTING Task 2",
      start: parse('2025-04-01', 'yyyy-MM-dd', new Date()),
      end: parse('2025-04-07', 'yyyy-MM-dd', new Date()),
      type: "task",
    },
    {
      id: 22,
      text: "TESTING Terrain Modification",
      start: parse('2025-04-01', 'yyyy-MM-dd', new Date()),
      end: parse('2025-04-15', 'yyyy-MM-dd', new Date()),
      type: "terrainModification",
    },
  ],
  links: [],
};
