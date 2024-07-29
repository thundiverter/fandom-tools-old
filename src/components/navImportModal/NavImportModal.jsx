import { useTranslation } from 'react-i18next';
import { Modal, Button, Form, Toggle, FlexboxGrid, Breadcrumb, Text, Input, Divider, HStack, SelectPicker, Tabs, Navbar, Nav, Badge } from 'rsuite';
import React, { useEffect, useState } from "react"
import { useGeneralStore, useNavigationEditorStore } from '../../store';

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

export default function NavImportModal({
    open, handleClose
}) {
    const { t, i18n } = useTranslation();
    const toolTranslation = t("tools", { returnObjects: true }).navigation.labels;

    const wikiname = useGeneralStore(state => state.wikiName);
    const wikilang = useGeneralStore(state => state.wikiLang);
    const wikiLanguages = useGeneralStore(state => state.wikiLanguages);
    const addItem = useNavigationEditorStore(state => state.addItem);
    const lastItemIndex = useNavigationEditorStore(state => state.lastItemIndex);

    const [tab, setTab] = useState(1);
    const [formValue, setFormValue] = useState({
        text: ""
    });
    const [importWikiAddress, setImportWikiAddress] = useState("");
    const [importWikiLang, setImportWikiLang] = useState("en");

    useEffect(() => {
        if (open === true) {
            setFormValue({
                ...formValue,
                text: "",
            })
        }
    }, [open]);

    function handleAddItems(items) {
        let lastRoot = null;
        let lastChild = null;
        let lastIndex = lastItemIndex;

        for (let line of items) {
            // level 1 - no link
            if (line.startsWith("*#|") || line.startsWith("* #|")) {
                addItem( line.split("|").slice(1).join("|").trim(), null, null );
                lastRoot = lastIndex;
                lastIndex = lastIndex + 1;
            } else
            // level 2 - no link
            if (line.startsWith("**#|") || line.startsWith("** #|")) {
                addItem( line.split("|").slice(1).join("|").trim(), null, lastRoot );
                lastChild = lastIndex;
                lastIndex = lastIndex + 1;
            } else 
            // level 3 - no link
            if (line.startsWith("***#|") || line.startsWith("*** #|")) {
                addItem( line.split("|").slice(1).join("|").trim(), null, lastChild );
                lastIndex = lastIndex + 1;
            } else
            // level 1 - with link
            if (/^[*]{1}[^*]/.test(line)) {
                addItem( line.slice(1).split("|").at(-1).trim(), line.slice(1).split("|").at(0).trim(), null );
                lastRoot = lastIndex;
                lastIndex = lastIndex + 1;
            } else
            // level 2 - with link
            if (/^[*]{2}[^*]/.test(line)) {
                addItem( line.slice(2).split("|").at(-1).trim(), line.slice(2).split("|").at(0).trim(), lastRoot );
                lastChild = lastIndex;
                lastIndex = lastIndex + 1;
            } else 
            // level 3 - with link
            if (/^[*]{3}[^*]/.test(line)) {
                addItem( line.slice(3).split("|").at(-1).trim(), line.slice(3).split("|").at(0).trim(), lastChild );
                lastIndex = lastIndex + 1;
            };
        }
    }

    async function handleSubmit(e) {
        if (tab === "1") {
            handleAddItems(formValue.text.split("\n"));
            handleClose();
        } else {
            fetch(`https://${importWikiAddress}.fandom.com/${importWikiLang !== "en" ? importWikiLang + "/" : ""}api.php?action=query&titles=MediaWiki:Wiki-navigation&gaplimit=5&prop=revisions&rvprop=content&format=json`, {
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                // handleAddItems(data.split("\n"));
            })
            .then(() => {
                handleClose();
            })
        }
    }

    return (<>
        <Modal
            open={open}
            onClose={handleClose}
            size="md"
        >
            <Modal.Header>
                <Modal.Title>{ t("importLabel") }</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Tabs defaultActiveKey="1" appearance="pills" defaultValue={tab} onSelect={setTab}>
                    <Tabs.Tab eventKey="1" title="Paste">
                        <Form
                            fluid
                            formValue={formValue}
                            onChange={setFormValue}
                            onSubmit={handleSubmit}
                        >
                            <div style={{ marginBottom: "1rem" }}>
                            <Text muted as="span">{ toolTranslation.importMessage[0] }</Text>
                            { wikiname.trim().length === 0 && <Text color="blue" as="b">MediaWiki:Wiki-navigation</Text> }
                            { wikiname.trim().length > 0 && <a style={{ textDecoration: "none" }} target="_blank"
                                href={ `https://${wikiname}.fandom.com/${wikilang}/wiki/MediaWiki:Wiki-navigation?action=edit` }
                            ><Text color="blue" as="b">MediaWiki:Wiki-navigation</Text></a> }
                            <Text muted as="span">{ toolTranslation.importMessage[1] }</Text>
                            </div>

                            <Form.Group controlId="text">
                                <Form.Control autoFocus name="text" rows={5} accepter={Textarea} style={{ resize: "none" }} />
                            </Form.Group>
                        </Form>
                    </Tabs.Tab>
                    <Tabs.Tab eventKey="2" title="Wiki URL">
                    <Text muted>Try to import navigation from existing wiki.</Text>
                        <Form fluid layout="inline" style={{ marginTop: "1rem" }}>
                            <HStack>
                                <Form.Control value={importWikiAddress} onChange={setImportWikiAddress} placeholder="E.g. community, minecraft, etc." />.fandom.com/<SelectPicker
                                value={ importWikiLang }
                                data={ wikiLanguages.map(el => ({ ...el, label: el.value + " — " + el.label })) }
                                cleanable={false}
                                onChange={ setImportWikiLang }
                                placement="auto"
                                renderValue={(value, items) => <span>{ value }</span>}
                            />
                            </HStack>
                        </Form>
                    </Tabs.Tab>
                </Tabs>

            </Modal.Body>

            <Modal.Footer>
                <Button
                    onClick={handleClose}
                    appearance="subtle"
                >{ t("cancelLabel") }</Button>
                <Button
                    onClick={handleSubmit}
                    appearance="primary"
                >{ t("importLabel") }</Button>
            </Modal.Footer>
        </Modal>
    </>)
}