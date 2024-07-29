import { useTranslation } from 'react-i18next';
import { Drawer, ButtonToolbar, Button, Placeholder, Text, Divider } from 'rsuite';

export default function AboutDrawer({ view, open, handleClose }) {
    const { t, i18n } = useTranslation();
    const toolTranslation = t("tools", { returnObjects: true })[view];

    return (<Drawer open={open} onClose={handleClose} size="xs">
        <Drawer.Header>
            <Drawer.Title>{ toolTranslation.title }</Drawer.Title>
            <Drawer.Actions>
                <Button
                    as="a"
                    href="https://github.com/thundiverter/fandom-tools"
                    target="_blank"
                >{ t("githubLabel") }</Button>
            </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
            { toolTranslation.description.map((el, index) => <Text key={index} as={el.bold ? "b" : "span"} color={el.color || "white"}>{ el.text }</Text>) }
            
            <div style={{ marginTop: "1rem" }}>
                <Text as="a" size="sm" color="cyan" href="https://github.com/thundiverter/fandom-tools/issues" target="_blank">{ t("githubIssuesLink") }</Text>
            </div>

            <Divider />

            <Text muted size="sm">
                { t("madeByText") } <Text as="a" size="sm" color="cyan" href={ toolTranslation.authorURL } target="_blank">{ toolTranslation.author }</Text>
            </Text>
        </Drawer.Body>
    </Drawer>)
}