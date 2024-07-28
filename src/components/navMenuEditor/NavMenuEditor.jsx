import { Dropdown, ButtonToolbar, Button, Tooltip, Text } from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';
// import NewItemModal from '../newItemModal/NewItemModal';
import { useState } from 'react';
import { Pencil, Trash2, Link, BookOpen } from 'lucide-react';
import { useNavigationEditorStore } from '../../store';
import NavEditItemModal from '../navEditItemModal/NavEditItemModal';
import NavDeleteItemModal from '../navDeleteItemModal/NavDeleteItemModal';

function ItemControls({
    item, path, canAddItems, handleOpenEditModal, handleOpenDeleteModal
}) {
    const getChildren = useNavigationEditorStore(state => state.getChildren);
    const setPath = useNavigationEditorStore(state => state.setPath);
    const setSelectedID = useNavigationEditorStore(state => state.setSelectedID);

    return (<>
        {/* Separator */}
        { (!item?.noedit || item.link) && getChildren(item.id).length > 0 && <Dropdown.Separator /> }

        {/* Item link */}
        { item.link && <Dropdown.Item
            icon={ <Link size="14" color="var(--rs-text-secondary)" /> }
        ><Text muted>{ item.link }</Text></Dropdown.Item> }

        {/* Add new item */}
        { !item?.noedit && canAddItems && <Dropdown.Item
            icon={ <PlusIcon /> }
            onClick={() => {
                setPath(path);
                handleOpenEditModal();
                setSelectedID(null);
            }}
        >New node</Dropdown.Item>}

        {/* Edit item */}
        { !item?.noedit && <Dropdown.Item
            icon={ <Pencil size="14" /> }
            onClick={() => {
                setPath(path.slice(-1));
                handleOpenEditModal();
                setSelectedID(item.id);
            }}
        >Edit</Dropdown.Item>}

        {/* Delete item */}
        { !item?.noedit && <Dropdown.Item
            icon={<Trash2 size="14" color="var(--rs-red-500)" />}
            onClick={() => {
                setSelectedID(item.id);
                handleOpenDeleteModal();
            }}
        ><Text color="red">Delete</Text></Dropdown.Item>}
    </>)

}

export default function NavMenuEditor() {
    const items = useNavigationEditorStore(state => state.items);
    const exploreItems = useNavigationEditorStore(state => state.exploreItems);
    const getAllChildren = useNavigationEditorStore(state => state.getAllChildren);
    const setPath = useNavigationEditorStore(state => state.setPath);
    const setSelectedID = useNavigationEditorStore(state => state.setSelectedID);

    // modals
    const [newEditItemModalStatus, setEditItemModalStatus] = useState(false);
    const handleOpenEditItemModal = () => setEditItemModalStatus(true);
    const handleCloseEditItemModal = () => setEditItemModalStatus(false);

    const [newDeleteItemModalStatus, setDeleteItemModalStatus] = useState(false);
    const handleOpenDeleteItemModal = () => setDeleteItemModalStatus(true);
    const handleCloseDeleteItemModal = () => setDeleteItemModalStatus(false);

    const allItems = [...exploreItems, ...items];

    return (<>
        <ButtonToolbar>
            {
                allItems.filter(item => item.parent === null).map((item, itemIndex) => <>
                    {/* first level */}
                    <Dropdown
                        key={itemIndex}
                        title={item.title}
                        trigger={['hover', 'click']}
                        icon={ item.id === 0 ? <BookOpen size="14" /> : undefined }
                    >
                        
                        {/* second level */}
                        { getAllChildren(item.id).map((child, childIndex) => <Dropdown.Menu
                            key={childIndex}
                            title={child.title}
                        >
                            {/* third level */}
                            { getAllChildren(child.id).map((gchild, gchildIndex) => <Dropdown.Menu
                                ley={gchildIndex}
                                title={gchild.title}
                            >
                                {/* third level controls */}
                                <ItemControls item={gchild} path={[item.id, child.id, gchild.id]} canAddItems={false} handleOpenEditModal={handleOpenEditItemModal} handleOpenDeleteModal={handleOpenDeleteItemModal} />
                            </Dropdown.Menu>) }

                            {/* second level controls */}
                            <ItemControls item={child} path={[item.id, child.id]} canAddItems={true} handleOpenEditModal={handleOpenEditItemModal} handleOpenDeleteModal={handleOpenDeleteItemModal} />
                        </Dropdown.Menu>) }

                        {/* first level controls */}
                        <ItemControls item={item} path={[item.id]} canAddItems={true} handleOpenEditModal={handleOpenEditItemModal} handleOpenDeleteModal={handleOpenDeleteItemModal} />
                    </Dropdown>
                </>)
            }

            <Button startIcon={<PlusIcon />} onClick={() => {
                handleOpenEditItemModal();
                setPath([]);
                setSelectedID(null);
            }}>New node</Button>
        </ButtonToolbar>

        <NavEditItemModal
            open={newEditItemModalStatus}
            handleClose={handleCloseEditItemModal}
        />
        <NavDeleteItemModal
            open={newDeleteItemModalStatus}
            handleClose={handleCloseDeleteItemModal}
        />
    </>)
}