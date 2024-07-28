import { useTranslation } from 'react-i18next';
import { Dropdown, ButtonToolbar, Button, Tooltip, Text, Tree } from 'rsuite';
// import NewItemModal from '../newItemModal/NewItemModal';
import { useState } from 'react';
import { useNavigationEditorStore } from '../../store';

export default function NavMenuEditor() {
    const { t, i18n } = useTranslation();
    const toolTranslation = t("tools", { returnObjects: true }).navigation.labels;

    const items = useNavigationEditorStore(state => state.items);
    const exploreItems = useNavigationEditorStore(state => state.exploreItems);
    const getItem = useNavigationEditorStore(state => state.getItem);
    const getAllChildren = useNavigationEditorStore(state => state.getAllChildren);
    const setPath = useNavigationEditorStore(state => state.setPath);
    const setSelectedID = useNavigationEditorStore(state => state.setSelectedID);
    const getAllAsTree = useNavigationEditorStore(state => state.getAllAsTree);

    return (<>
        <Tree
            data={getAllAsTree}
            showIndentLine
            searchable
            renderTreeNode={node => {
                return (<>
                    { node.label } <Text as="small" muted>&nbsp;{ getItem(node.value)?.link }</Text>
                </>)
            }}
        ></Tree>
        { items.length === 0 && <Text muted align="center" style={{ margin: "5rem 0" }}>{ toolTranslation.noNodesFound }</Text> }
    </>)
}