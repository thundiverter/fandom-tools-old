import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import NavigationEditorView from './views/navigationEditorView/NavigationEditorView';
import { handleChangeLanguage } from './i18n';
import { useGeneralStore } from './store';

function App() {
  const [active, setActive] = useState("navigation");

  const appLanguage = useGeneralStore(state => state.appLang);
  const updateData = useGeneralStore(state => state.updateData);
  const lsAppData = JSON.parse(localStorage.getItem("fandomtools"));
  const appData = {
    appLang: lsAppData.appLang || "en",
    name: lsAppData.wikiName || "",
    displayName: lsAppData.wikiDisplayName || "",
    wikiLang: lsAppData.wikiLang || "en",
  };
  updateData(appData);
  

  useEffect(() => {
    handleChangeLanguage(appLanguage)
  }, [appLanguage]);

  return (
    <>
      <Header active={active} setActive={setActive} />
      <main>
        { active === "navigation" && <NavigationEditorView /> }
      </main>
    </>
  )
}

export default App
