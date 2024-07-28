import { useTranslation } from 'react-i18next';
import { Modal, Button, Form, Toggle, FlexboxGrid, Breadcrumb, Text } from 'rsuite';
import { useEffect, useState } from "react"
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import { useGeneralStore, useNavigationEditorStore } from '../../store';


export default function NavDeleteItemModal({
    open, handleClose
}) {
    const { t, i18n } = useTranslation();
    const toolTranslation = t("tools", { returnObjects: true }).navigation.labels;

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
                <Modal.Title>{ toolTranslation.deleteNode }</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Text as="span">{ toolTranslation.deleteNodeMessage[0] }</Text><Text as="b">{ getItem(selectedID)?.title || "" }</Text><Text as="span">{ toolTranslation.deleteNodeMessage[1] }</Text>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    onClick={handleClose}
                    appearance="subtle"
                >{ t("cancelLabel") }</Button>
                <Button
                    onClick={handleSubmit}
                    appearance="primary"
                    color="red"
                >{ t("deleteLabel") }</Button>
            </Modal.Footer>
        </Modal>
    </>)
}