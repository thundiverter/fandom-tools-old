import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import NavigationEditorView from './views/navigationEditorView/NavigationEditorView';
import { handleChangeLanguage } from './i18n';
import { useGeneralStore } from './store';

function App() {
  const [active, setActive] = useState("navigation");

  const appLanguage = useGeneralStore(state => state.appLang);
  const setAppLanguage = useGeneralStore(state => state.setAppLang);
  const lsAppData = localStorage?.getItem("fandomtools") ? JSON.parse(localStorage.getItem("fandomtools")) : {
    appLang: "en"
  };
  setAppLanguage(lsAppData.appLang);
  

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
