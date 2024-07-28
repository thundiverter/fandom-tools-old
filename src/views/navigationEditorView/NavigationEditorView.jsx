import { useTranslation } from 'react-i18next';
import { useState } from "react";
import { Radio, RadioGroup, HStack, Button, ButtonGroup, useToaster, Notification } from "rsuite";
import NavMenuEditor from "../../components/navMenuEditor/NavMenuEditor";
import NavTreeEditor from "../../components/navTreeEditor/NavTreeEditor";
import NavSourceEditor from "../../components/navSourceEditor/NavSourceEditor";
import NavImportModal from "../../components/navImportModal/NavImportModal";
import { useNavigationEditorStore } from '../../store';

const RadioLabel = ({ children }) => <label style={{ padding: 7 }}>{children}</label>;

export default function NavigationEditorView() {
    const { t, i18n } = useTranslation();
    const toolTranslation = t("tools", { returnObjects: true }).navigation;
    const treeToSource = useNavigationEditorStore(state => state.treeToSource);

    const [view, setView] = useState("menu");

    const toaster = useToaster();
    const copiedMessage = (<Notification type="info" closable style={{ userSelect: "none" }}>
        <p>{ toolTranslation.copiedMessage }</p>
    </Notification>);

    // modals
    const [importModalStatus, setImportModalStatus] = useState(false);
    const handleOpenImportModal = () => setImportModalStatus(true);
    const handleCloseImportModal = () => setImportModalStatus(false);

    function handleExport() {
        navigator.clipboard.writeText(treeToSource().map(e => e.value).join("\n"));
        toaster.push(copiedMessage, { placement: "bottomEnd" })
    }

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
                <ButtonGroup>
                    <Button onClick={handleOpenImportModal}>{ t("importLabel") }</Button>
                    <Button onClick={handleExport}>{ t("exportLabel") }</Button>
                </ButtonGroup>
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