import { Modal, Button, Form, Toggle, FlexboxGrid, Breadcrumb, Text } from 'rsuite';
import { useEffect, useState } from "react"
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import { useGeneralStore, useNavigationEditorStore } from '../../store';


export default function NavDeleteItemModal({
    open, handleClose
}) {
    const getItem = useNavigationEditorStore(state => state.getItem);
    const removeItem = useNavigationEditorStore(state => state.removeItem);
    const selectedID = useNavigationEditorStore(state => state.selectedItemID);

    function handleSubmit(e) {
        removeItem(selectedID);
        handleClose();
    }

    return (<>
        <Modal
            open={open}
            onClose={handleClose}
            size="sm"
        >
            <Modal.Header>
                <Modal.Title>Delete node</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Text as="span">Are you sure you want to delete</Text> <Text as="b">{ getItem(selectedID)?.title || "" }</Text><Text as="span">?</Text>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    onClick={handleClose}
                    appearance="subtle"
                >Cancel</Button>
                <Button
                    onClick={handleSubmit}
                    appearance="primary"
                    color="red"
                >Delete</Button>
            </Modal.Footer>
        </Modal>
    </>)
}