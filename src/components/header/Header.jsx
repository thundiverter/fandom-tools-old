import { Nav, Navbar, Badge, Tooltip, Whisper } from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';
import { InfoIcon } from 'lucide-react';
import { useState } from 'react';
import AboutDrawer from '../aboutDrawer/AboutDrawer';

export default function Header({ active, setActive }) {
    // 'about' drawer
    const [aboutDrawerState, setAboutDrawerState] = useState(false);
    const handleOpenAboutDrawer = () => setAboutDrawerState(true);
    const handleCloseAboutDrawer = () => setAboutDrawerState(false);

    return (<>
        <div style={{ position: "fixed", top: "0", left: "0", right: "0", backgroundColor: "#0F131A" }}>
            <Navbar appearance="none">
                <Nav appearance="subtle" activeKey={active} onSelect={setActive}>
                    <Nav.Item eventKey="Navigation">Navigation Vusial Editor &nbsp; <Badge color="violet" content="NEW" /></Nav.Item>
                    {/* <Nav.Item eventKey="News">Advanced Infobox Builder</Nav.Item>
                    <Nav.Item eventKey="Navbox">Navbox Builder</Nav.Item> */}
                </Nav>
                <Nav pullRight>
                    
                    <Whisper placement="left" controlId="control-id-focus" trigger="hover" speaker={<Tooltip>About this tool</Tooltip>}>
                        <Nav.Item icon={<InfoIcon size="18" />} onClick={handleOpenAboutDrawer}></Nav.Item>
                    </Whisper>
                    {/* <Nav.Item icon={<CogIcon />}>Wiki Settings</Nav.Item> */}
                </Nav>
            </Navbar>
        </div>
        <AboutDrawer
            open={aboutDrawerState}
            handleClose={handleCloseAboutDrawer}
        />
    </>)
}