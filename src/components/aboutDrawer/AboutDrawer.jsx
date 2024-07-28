import { Drawer, ButtonToolbar, Button, Placeholder, Text } from 'rsuite';

const navboxInfo = {
    title: "Navbox Visual Editor",
    description: [
        { text: "A visual editor for navigation menu for your wiki. Make one from scratch (or import an existing one), get source code, copy it and then paste to the " },
        { text: "MediaWiki:Wiki-navigation", color: "blue", bold: true },
        { text: " page of your wiki." },
    ]
}

export default function AboutDrawer({ view, open, handleClose }) {
    return (<Drawer open={open} onClose={handleClose} size="xs">
        <Drawer.Header>
            <Drawer.Title>{ navboxInfo.title }</Drawer.Title>
            <Drawer.Actions>
                <Button
                    as="a"
                    href="https://github.com/thundiverter/fandom-tools"
                    target="_blank"
                >GitHub</Button>
            </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
            { navboxInfo.description.map((el, index) => <Text key={index} as={el.bold ? "b" : "span"} color={el.color || "white"}>{ el.text }</Text>) }
            <hr />
            <Text muted size="sm">
                Made by <a href="https://thundiverter.github.io" target="_blank">Ivan Zubkov</a>
            </Text>
        </Drawer.Body>
    </Drawer>)
}