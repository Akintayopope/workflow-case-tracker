import HeaderSection from "./components/header"
import WorkItemForm from "./components/workItemForm"
import WorkItemSection from "./components/WorkItemSection"
function App() {
  return (<div className="app">

    <main>
      <HeaderSection />
      <WorkItemForm />
      <WorkItemSection />
    </main>

  </div>)
}

export default App
