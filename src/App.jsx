// import './App.css'
import { Willow } from "wx-react-gantt";
import "wx-react-gantt/dist/gantt.css";
import MyGanttComponent from "./MyGanttComponent";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Toolbar */}
      <div className="bg-gray-100 p-4 border-b">
        <h2 className="text-xl font-bold">Managment Dashboard</h2>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 overflow-hidden">
        <Willow>
          <MyGanttComponent />
        </Willow>
      </div>
    </div>
  );
}

export default App
