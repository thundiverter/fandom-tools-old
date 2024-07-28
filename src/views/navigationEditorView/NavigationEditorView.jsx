import { useTranslation } from 'react-i18next';
import { useState } from "react";
import { Radio, RadioGroup, HStack, Button } from "rsuite";
import NavMenuEditor from "../../components/navMenuEditor/NavMenuEditor";
import NavTreeEditor from "../../components/navTreeEditor/NavTreeEditor";
import NavSourceEditor from "../../components/navSourceEditor/NavSourceEditor";
import NavImportModal from "../../components/navImportModal/NavImportModal";

const RadioLabel = ({ children }) => <label style={{ padding: 7 }}>{children}</label>;

export default function NavigationEditorView() {
    const { t, i18n } = useTranslation();
    const toolTranslation = t("tools", { returnObjects: true }).navigation;

    const [view, setView] = useState("menu");

    // modals
    const [importModalStatus, setImportModalStatus] = useState(false);
    const handleOpenImportModal = () => setImportModalStatus(true);
    const handleCloseImportModal = () => setImportModalStatus(false);

    return (<>
        <div style={{ marginBottom: "1rem" }}>
            <HStack>
                <RadioGroup
                    name="view-radio-group"
                    inline
                    appearance="picker"
                    defaultValue="menu"
                    value={view}
                    onChange={setView}
                >
                    <RadioLabel>{ t("viewLabel") }</RadioLabel>
                    <Radio value="menu">{ toolTranslation.views.dropdown }</Radio>
                    <Radio value="tree">{ toolTranslation.views.tree }</Radio>
                    <Radio value="code">{ toolTranslation.views.source }</Radio>
                </RadioGroup>
                <Button onClick={handleOpenImportModal}>{ t("importLabel") }</Button>
            </HStack>
        </div>

        { view === "menu" && <NavMenuEditor /> }
        { view === "tree" && <NavTreeEditor /> }
        { view === "code" && <NavSourceEditor /> }

        <NavImportModal
            open={importModalStatus}
            handleClose={handleCloseImportModal}
        />
    </>)
}