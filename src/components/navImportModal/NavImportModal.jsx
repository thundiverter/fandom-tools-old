import { Modal, Button, Form, Toggle, FlexboxGrid, Breadcrumb, Text, Input } from 'rsuite';
import React, { useEffect, useState } from "react"
import { useGeneralStore, useNavigationEditorStore } from '../../store';

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

export default function NavImportModal({
    open, handleClose
}) {
    const wikiname = useGeneralStore(state => state.wikiName);
    const wikilang = useGeneralStore(state => state.wikiLang);
    const addItem = useNavigationEditorStore(state => state.addItem);
    const lastItemIndex = useNavigationEditorStore(state => state.lastItemIndex);

    const [formValue, setFormValue] = useState({
        text: ""
    });

    useEffect(() => {
        if (open === true) {
            setFormValue({
                ...formValue,
                text: "",
            })
        }
    }, [open]);

    function handleAddItems() {
        let lastRoot = null;
        let lastChild = null;
        let lastIndex = lastItemIndex;

        for (let line of formValue.text.split("\n")) {
            // level 1 - no link
            if (line.startsWith("*#|")) {
                addItem( line.slice(3), null, null );
                lastRoot = lastIndex;
                lastIndex = lastIndex + 1;
                console.log("1-no");
            } else
            // level 2 - no link
            if (line.startsWith("**#|")) {
                addItem( line.slice(4), null, lastRoot );
                lastChild = lastIndex;
                lastIndex = lastIndex + 1;
                console.log("2-no");
            } else 
            // level 3 - no link
            if (line.startsWith("***#|")) {
                addItem( line.slice(5), null, lastChild );
                lastIndex = lastIndex + 1;
                console.log("3-no");
            } else
            // level 1 - with link
            if (/^[*]{1}[^*]/.test(line)) {
                addItem( line.slice(1).split("|").at(-1), line.slice(1).split("|").at(0), null );
                lastRoot = lastIndex;
                lastIndex = lastIndex + 1;
                console.log("1-yes");
            } else
            // level 2 - with link
            if (/^[*]{2}[^*]/.test(line)) {
                addItem( line.slice(2).split("|").at(-1), line.slice(2).split("|").at(0), lastRoot );
                lastChild = lastIndex;
                lastIndex = lastIndex + 1;
                console.log("2-yes");
            } else 
            // level 3 - with link
            if (/^[*]{3}[^*]/.test(line)) {
                addItem( line.slice(3).split("|").at(-1), line.slice(3).split("|").at(0), lastChild );
                lastIndex = lastIndex + 1;
                console.log("3-yes");
            };
        }
    }

    function handleSubmit(e) {
        handleAddItems();
        handleClose();
    }

    return (<>
        <Modal
            open={open}
            onClose={handleClose}
            size="md"
        >
            <Modal.Header>
                <Modal.Title>Import</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form
                    fluid
                    formValue={formValue}
                    onChange={setFormValue}
                    onSubmit={handleSubmit}
                >
                    <div style={{ marginBottom: "1rem" }}>
                    <Text muted as="span">Copy the source of the</Text>&nbsp;
                    { wikiname.trim().length === 0 && <><Text color="blue" as="b">MediaWiki:Wiki-navigation</Text>&nbsp;</> }
                    { wikiname.trim().length > 0 && <><a style={{ textDecoration: "none" }} target="_blank"
                        href={ `https://${wikiname}.fandom.com/${wikilang}/wiki/MediaWiki:Wiki-navigation?action=edit` }
                    ><Text color="blue" as="b">MediaWiki:Wiki-navigation</Text></a>&nbsp;</> }
                    <Text muted as="span">page of your wiki and paste in the field below.</Text>
                    </div>

                    <Form.Group controlId="text">
                        <Form.Control autoFocus name="text" rows={10} accepter={Textarea} />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    onClick={handleClose}
                    appearance="subtle"
                >Cancel</Button>
                <Button
                    onClick={handleSubmit}
                    appearance="primary"
                >Import</Button>
            </Modal.Footer>
        </Modal>
    </>)
}