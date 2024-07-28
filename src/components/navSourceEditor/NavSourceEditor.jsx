import { Dropdown, ButtonToolbar, Button, Tooltip, Text, Tree, Panel } from 'rsuite';
// import NewItemModal from '../newItemModal/NewItemModal';
import { useState } from 'react';
import { useGeneralStore, useNavigationEditorStore } from '../../store';

export default function NavSoruceEditor() {
    const items = useNavigationEditorStore(state => state.items);
    const getAllAsTree = useNavigationEditorStore(state => state.getAllAsTree);
    const wikiname = useGeneralStore(state => state.wikiName);
    const wikilang = useGeneralStore(state => state.wikiLang);

    return (<>
        <div style={{ marginBottom: ".5rem" }}>
            <Text muted as="span">The code below can be inserted on the</Text>&nbsp;
            { wikiname.trim().length === 0 && <><Text color="blue" as="b">MediaWiki:Wiki-navigation</Text>&nbsp;</> }
            { wikiname.trim().length > 0 && <><a style={{ textDecoration: "none" }} target="_blank"
                href={ `https://${wikiname}.fandom.com/${wikilang}/wiki/MediaWiki:Wiki-navigation?action=edit` }
            ><Text color="blue" as="b">MediaWiki:Wiki-navigation</Text></a>&nbsp;</> }
            <Text muted as="span">page on your wiki.</Text>
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
            { items.length === 0 && <Text muted align="center" style={{ margin: "2rem 0" }}>No nodes found</Text> }
        </Panel>
    </>)
}