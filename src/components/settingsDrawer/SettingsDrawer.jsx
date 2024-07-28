import { useTranslation } from 'react-i18next';
import { Drawer, ButtonToolbar, Button, Placeholder, Text, Form, SelectPicker } from 'rsuite';
import { useGeneralStore } from '../../store';

export default function SettingsDrawer({ view, open, handleClose }) {
    const { t, i18n } = useTranslation();
    const settingsTranslation = t("settings", { returnObjects: true });
    const appLanguage = useGeneralStore(state => state.appLang);
    const wikiName = useGeneralStore(state => state.wikiName);
    const wikiDisplayName = useGeneralStore(state => state.wikiDisplayName);
    const wikiLanguage = useGeneralStore(state => state.wikiLang);
    const updateData = useGeneralStore(state => state.updateData);

    return (<Drawer open={open} onClose={handleClose} size="xs">
        <Drawer.Header>
            <Drawer.Title>{ t("settingsLabel") }</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
            
            <Form fluid>
                <h6>{ settingsTranslation.sectionApp }</h6>
                
                {/* App language */}
                <Form.Group controlId="applanguage">
                    <Form.ControlLabel>{ settingsTranslation.appLanguage }</Form.ControlLabel>
                    <SelectPicker
                        value={ appLanguage }
                        data={ t("languages", { returnObjects: true }) }
                        cleanable={false}
                        searchable={false}
                        onChange={ value => updateData({ appLang: value }) }
                    />
                    <Form.HelpText tooltip>{ settingsTranslation.appLanguageHelp }</Form.HelpText>
                </Form.Group>

                <hr />

                <h6>{ settingsTranslation.sectionWiki }</h6>

                <Form.Group controlId="wikidisplayname">
                    <Form.ControlLabel>{ settingsTranslation.wikiDisplayName }</Form.ControlLabel>
                    <Form.Control name="wikidisplayname" value={wikiDisplayName} onChange={value => updateData({ displayName: value })} />
                    <Form.HelpText>{ settingsTranslation.wikiDisplayNameHelp }</Form.HelpText>
                </Form.Group>

                <Form.Group controlId="wikiname">
                    <Form.ControlLabel>{ settingsTranslation.wikiName }</Form.ControlLabel>
                    <Form.Control name="wikiname" value={wikiName} onChange={value => updateData({ name: value })} />
                    <Form.HelpText>
                        { wikiName ? wikiName : settingsTranslation.wikiNameHelpEmpty }
                        { settingsTranslation.wikiNameHelp }
                        { wikiLanguage !== "en" ? "/" + wikiLanguage : "" }
                        </Form.HelpText>
                </Form.Group>

                <Form.Group controlId="wikilanguage">
                    <Form.ControlLabel>{ settingsTranslation.appLanguage }</Form.ControlLabel>
                    <SelectPicker
                        value={ wikiLanguage }
                        data={ t("languages", { returnObjects: true }).map(el => ({ ...el, label: `${el.value} — ${el.label}` })) }
                        cleanable={false}
                        searchable={false}
                        onChange={ value => updateData({ wikiLang: value }) }
                    />
                </Form.Group>
            </Form>
        </Drawer.Body>
    </Drawer>)
}