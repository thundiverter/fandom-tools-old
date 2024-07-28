import { useTranslation } from 'react-i18next';
import { Modal, Button, Form, Toggle, FlexboxGrid, Breadcrumb, Text } from 'rsuite';
import { useEffect, useState } from "react"
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import { useGeneralStore, useNavigationEditorStore } from '../../store';


export default function NavEditItemModal({
    open, handleClose
}) {
    const { t, i18n } = useTranslation();
    const toolTranslation = t("tools", { returnObjects: true }).navigation.labels;

    const addItem = useNavigationEditorStore(state => state.addItem);
    const getItem = useNavigationEditorStore(state => state.getItem);
    const editItem = useNavigationEditorStore(state => state.editItem);
    const selectedID = useNavigationEditorStore(state => state.selectedItemID);
    const path = useNavigationEditorStore(state => state.addItemPath);
    const namespacesList = t("namespaces", { returnObjects: true });
    const wikiname = useGeneralStore(state => state.wikiDisplayName);

    const [formValue, setFormValue] = useState({
        title: "",
        link: "",
    });
    const [linkStatus, setLinkStatus] = useState(true);

    useEffect(() => {
        if (open === true) {
            if (selectedID === null) {
                setFormValue({
                    title: "",
                    link: "",
                })
            } else {
                setFormValue({
                    title: getItem(selectedID)?.title || "",
                    link: getItem(selectedID)?.link || "",
                });
                
                if (getItem(selectedID)?.link) {
                    setLinkStatus(true);
                } else setLinkStatus(false);
            }
        }
    }, [open]);

    function handleValidation() {
        return formValue.title.trim().length > 0 && ( ( linkStatus && formValue.link.trim().length > 0 ) || !linkStatus );
    }

    function handleAddItem() {
        addItem(
            formValue.title,
            linkStatus ? formValue.link : null,
            path.length > 0 ? path.at(-1) : null
        );
    }

    function handleEditItem() {
        editItem(
            selectedID,
            formValue.title,
            linkStatus ? formValue.link : null,
            getItem(selectedID).parent
        )
    }

    function handleLinkHint(el, index) {
        const linkList = formValue.link.split(":").length > 1 && namespacesList.includes(formValue.link.split(":")[0]);
        const linkMainPart = linkList ? formValue.link.split(":").slice(1) : formValue.link;
        setFormValue({
            ...formValue,
            link: `${index > 0 ? el : ""}${index > 0 ? ":" : ""}` + linkMainPart
        })
    }

    function handleSubmit(e) {
        if (handleValidation()) {
            if (!selectedID) { handleAddItem(); }       // add
            else { handleEditItem(); }                  // edit

            handleClose();
        } else e.preventDefault();
    }

    return (<>
        <Modal
            open={open}
            onClose={handleClose}
            size="md"
        >
            <Modal.Header>
                <Modal.Title>{ selectedID === null ? toolTranslation.newNode : toolTranslation.editNode }</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form
                    fluid
                    formValue={formValue}
                    onChange={setFormValue}
                    onSubmit={handleSubmit}
                >
                    <Form.Group controlId="title">
                        <Form.ControlLabel>{ toolTranslation.name }</Form.ControlLabel>
                        <Form.Control autoFocus name="title" />
                    </Form.Group>

                    <Form.Group controlId="addLink">
                        <Toggle id="addLink" onChange={setLinkStatus} checked={linkStatus} /> &nbsp; <Form.ControlLabel style={{ display: "inline-block" }}>{ toolTranslation.addLink }</Form.ControlLabel>
                    </Form.Group>

                    {
                        linkStatus && <Form.Group controlId="link">
                            <Form.ControlLabel>{ toolTranslation.link }</Form.ControlLabel>
                            <Form.Control name="link" type="text" placeholder={ toolTranslation.addLinkPlaceholder } />
                            <div style={{ display: "flex", flexWrap: "wrap", gap: ".25rem", margin: "1rem 0" }}>
                                { namespacesList.map((el, index) => <FlexboxGrid.Item key={index}><Button size="sm" onClick={() => handleLinkHint(el, index)}>{ wikiname.trim().length > 0 ? el.replaceAll("{{SITENAME}}", wikiname) : el }{ index > 0 ? " : " : "" }</Button></FlexboxGrid.Item>)  }
                            </div>
                        </Form.Group>
                    }
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    onClick={handleClose}
                    appearance="subtle"
                >{ t("cancelLabel") }</Button>
                <Button
                    onClick={handleSubmit}
                    appearance={ handleValidation() ? "primary" : "ghost" }
                >{ selectedID === null ? t("createLabel") : t("editLabel") }</Button>
            </Modal.Footer>
        </Modal>
    </>)
}