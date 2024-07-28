import { useState } from "react";
import { Radio, RadioGroup, HStack, Button } from "rsuite";
import NavMenuEditor from "../../components/navMenuEditor/NavMenuEditor";
import NavTreeEditor from "../../components/navTreeEditor/NavTreeEditor";
import NavSourceEditor from "../../components/navSourceEditor/NavSourceEditor";
import NavImportModal from "../../components/navImportModal/NavImportModal";

const RadioLabel = ({ children }) => <label style={{ padding: 7 }}>{children}</label>;

export default function NavigationEditorView() {
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
                    <RadioLabel>View: </RadioLabel>
                    <Radio value="menu">Dropdown menu</Radio>
                    <Radio value="tree">Tree</Radio>
                    <Radio value="code">Source</Radio>
                </RadioGroup>
                <Button onClick={handleOpenImportModal}>Import</Button>
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