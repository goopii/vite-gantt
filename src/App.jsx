import './App.css'
import { Willow } from "wx-react-gantt";
import "wx-react-gantt/dist/gantt.css";
import MyGanttComponent from "./MyGanttComponent";

function App() {

  return (
    <>
      <Willow>
        <MyGanttComponent />
      </Willow>
    </>
  );
}

export default App
