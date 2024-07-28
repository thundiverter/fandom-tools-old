import { useTranslation } from 'react-i18next';
import { Nav, Navbar, Badge, Tooltip, Whisper } from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';
import { InfoIcon } from 'lucide-react';
import { useState } from 'react';
import AboutDrawer from '../aboutDrawer/AboutDrawer';

export default function Header({ active, setActive }) {
    const { t, i18n } = useTranslation();
    const toolsTranslation = t("tools", { returnObjects: true });

    // 'about' drawer
    const [aboutDrawerState, setAboutDrawerState] = useState(false);
    const handleOpenAboutDrawer = () => setAboutDrawerState(true);
    const handleCloseAboutDrawer = () => setAboutDrawerState(false);

    return (<>
        <div style={{ position: "fixed", top: "0", left: "0", right: "0", backgroundColor: "#0F131A" }}>
            <Navbar appearance="none">
                <Nav appearance="subtle" activeKey={active} onSelect={setActive}>
                    <Nav.Item eventKey="navigation">{ toolsTranslation.navigation.title } &nbsp; <Badge color="violet" content={ t("newLabel") } /></Nav.Item>
                    {/* <Nav.Item eventKey="News">Advanced Infobox Builder</Nav.Item>
                    <Nav.Item eventKey="Navbox">Navbox Builder</Nav.Item> */}
                </Nav>
                <Nav pullRight>
                    
                    <Whisper placement="left" trigger="hover" speaker={<Tooltip>{ t("aboutToolLabel") }</Tooltip>}>
                        <Nav.Item icon={<InfoIcon size="18" />} onClick={handleOpenAboutDrawer}></Nav.Item>
                    </Whisper>
                    <Whisper placement="left" trigger="hover" speaker={<Tooltip>{ t("settingsLabel") }</Tooltip>}>
                        <Nav.Item icon={<CogIcon />} onClick={handleOpenAboutDrawer}></Nav.Item>
                    </Whisper>
                </Nav>
            </Navbar>
        </div>
        <AboutDrawer
            open={aboutDrawerState}
            handleClose={handleCloseAboutDrawer}
            view={active}
        />
    </>)
}