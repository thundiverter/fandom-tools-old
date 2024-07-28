import { useTranslation } from 'react-i18next';
import { Drawer, ButtonToolbar, Button, Placeholder, Text, Form, SelectPicker } from 'rsuite';
import { useGeneralStore } from '../../store';

export default function SettingsDrawer({ view, open, handleClose }) {
    const { t, i18n } = useTranslation();
    const settingsTranslation = t("settings", { returnObjects: true });
    const appLanguage = useGeneralStore(state => state.appLang);
    const setAppLanguage = useGeneralStore(state => state.setAppLang);

    function handleChangeLanguage(lang) {
        setAppLanguage(lang);
        handleChangeLanguage(lang);
    }

    return (<Drawer open={open} onClose={handleClose} size="xs">
        <Drawer.Header>
            <Drawer.Title>{ t("settingsLabel") }</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
            
            <Form fluid>
                {/* App language */}
                <Form.Group controlId="applanguage">
                    <Form.ControlLabel>{ settingsTranslation.appLanguage }</Form.ControlLabel>
                    <SelectPicker
                        value={ appLanguage }
                        data={ t("languages", { returnObjects: true }) }
                        cleanable={false}
                        searchable={false}
                        onChange={ setAppLanguage }
                    />
                </Form.Group>
            </Form>
        </Drawer.Body>
    </Drawer>)
}