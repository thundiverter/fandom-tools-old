import { Nav, Navbar, Badge } from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';

export default function Header({ active, setActive }) {
    return (<div style={{ position: "fixed", top: "0", left: "0", right: "0", backgroundColor: "#0F131A" }}>
        <Navbar appearance="none">
            <Nav appearance="subtle" activeKey={active} onSelect={setActive}>
                <Nav.Item eventKey="Navigation">Navigation Vusial Editor &nbsp; <Badge color="violet" content="NEW" /></Nav.Item>
                {/* <Nav.Item eventKey="News">Advanced Infobox Builder</Nav.Item>
                <Nav.Item eventKey="Navbox">Navbox Builder</Nav.Item> */}
            </Nav>
            {/* <Nav pullRight>
                <Nav.Item icon={<CogIcon />}>Wiki Settings</Nav.Item>
            </Nav> */}
        </Navbar>
    </div>)
}