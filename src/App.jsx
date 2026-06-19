import { useState } from "react"
import HeaderSection from "./components/header"
import WorkItemForm from "./components/workItemForm"
import WorkItemSection from "./components/WorkItemSection"
function App() {

  const [workItems, setWorkItems] = useState([{
    id: 1,
    title: "Review production roll-up issue",
    description: "Check why officer production is missing",
    assignedTo: "John Officer",
    status: "Pending",
    priority: "Medium",
    dueDate: "2024-05-28",
    createdDate: "2024-05-21",
  },
  {
    id: 2,
    title: "Weekly case inventory check",
    description: "Verify all cases are assigned",
    assignedTo: "Jane Smith",
    status: "In Progress",
    priority: "High",
    dueDate: "2024-05-25",
    createdDate: "2024-05-20",
  },
  {
    id: 3,
    title: "Update training materials",
    description: "Add new process for TL training"
    ,
    assignedTo: "Mike Brown",
    status: "Completed",
    priority: "Low",
    dueDate: "2024-05-20",
    createdDate: "2024-05-18",
  },
  {
    id: 4,
    title: "Audit unresolved cases",
    description: "Review and resolve old cases",
    assignedTo: "Sarah Lee",
    status: "Pending",
    priority: "Medium",
    dueDate: "2024-05-30",
    createdDate: "2024-05-21",
  },

  ])
  return (<div className="app">

    <main>
      <HeaderSection />
      <WorkItemForm />
      <WorkItemSection workItems={workItems} />
    </main>

  </div>)
}

export default App
