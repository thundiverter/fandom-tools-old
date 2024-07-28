import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import NavigationEditorView from './views/navigationEditorView/NavigationEditorView';

function App() {
  const [active, setActive] = useState("Navigation");

  return (
    <>
      <Header active={active} setActive={setActive} />
      <main>
        { active === "Navigation" && <NavigationEditorView /> }
      </main>
    </>
  )
}

export default App
