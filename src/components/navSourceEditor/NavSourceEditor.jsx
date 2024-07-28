import { useTranslation } from 'react-i18next';
import { Dropdown, ButtonToolbar, Button, Tooltip, Text, Tree, Panel } from 'rsuite';
// import NewItemModal from '../newItemModal/NewItemModal';
import { useState } from 'react';
import { useGeneralStore, useNavigationEditorStore } from '../../store';

export default function NavSoruceEditor() {
    const { t, i18n } = useTranslation();
    const toolTranslation = t("tools", { returnObjects: true }).navigation.labels;

    const items = useNavigationEditorStore(state => state.items);
    const getAllAsTree = useNavigationEditorStore(state => state.getAllAsTree);
    const wikiname = useGeneralStore(state => state.wikiName);
    const wikilang = useGeneralStore(state => state.wikiLang);

    return (<>
        <div style={{ marginBottom: ".5rem" }}>
            <Text muted as="span">{ toolTranslation.sourceMessage[0] }</Text>
            { wikiname.trim().length === 0 && <Text color="blue" as="b">MediaWiki:Wiki-navigation</Text> }
            { wikiname.trim().length > 0 && <a style={{ textDecoration: "none" }} target="_blank"
                href={ `https://${wikiname}.fandom.com/${wikilang}/wiki/MediaWiki:Wiki-navigation?action=edit` }
            ><Text color="blue" as="b">MediaWiki:Wiki-navigation</Text></a> }
            <Text muted as="span">{ toolTranslation.sourceMessage[1] }</Text>
        </div>

        {/* <div style={{ marginBottom: "1rem" }}>
            <Button>Copy</Button>
        </div> */}

        <Panel bordered>
            {
                getAllAsTree() && getAllAsTree().map((item, index) => <>
                    <p className="source source-root">{ item.link ? "*" : "*#|" }{ item.label }{ item.link ? "|" + item.link : "" }</p>
                    {
                        item?.children && item.children.map((child, childIndex) => <>
                            <p className="source source-child">{ child.link ? "**" : "**#|" }{ child.label }{ child.link ? "|" + child.link : "" }</p>
                            { child?.children && child.children.map((gchild, gchildIndex) => <>
                                <p className="source source-gchild">{ gchild.link ? "***" : "***#|" }{ gchild.label }{ gchild.link ? "|" + gchild.link : "" }</p>
                            </>) }
                        </>)
                    }
                </>)
            }
            { items.length === 0 && <Text muted align="center" style={{ margin: "2rem 0" }}>{ toolTranslation.noNodesFound }</Text> }
        </Panel>
    </>)
}