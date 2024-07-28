import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Read i18n.md to learn about adding this to components
// Any help with translation would be appreciated

export function handleChangeLanguage(lang) {
    i18n.changeLanguage(`${lang}`.toLowerCase());
}

const resources = {
    en: {
        translation: {
            "title": "FANDOM Tools",
            "newLabel": "NEW",
            "namespaces": ["(Main)", "Talk", "User", "User talk", "{{SITENAME}}", "{{SITENAME}} talk", "File", "File talk",
                "MediaWiki", "MediaWiki talk", "Template", "Template talk", "Help", "Help talk",
                "Category", "Category talk", "Forum", "Forum talk", "GeoJson", "GeoJson talk", "User blog",
                "Blog", "Blog talk", "Module", "Module talk", "Message Wall", "Map", "Map talk", "Special"],
            "tools": {
                "navigation": {
                    title: "Navbox Visual Editor",
                    description: [
                        { text: "A visual editor for navigation menu for your wiki. Make one from scratch (or import an existing one), get source code, copy it and then paste to the " },
                        { text: "MediaWiki:Wiki-navigation", color: "blue", bold: true },
                        { text: " page of your wiki." },
                    ],
                    author: "Ivan Zubkov",
                    authorURL: "https://thundiverter.github.io/",
                    views: {
                        dropdown: "Dropdown menu",
                        tree: "Tree",
                        source: "Source",
                    },
                    labels: {
                        "newNode": "New node",
                        "editNode": "Edit node",
                        "deleteNode": "Delete node",
                        "deleteNodeMessage": ["Are you sure you want to delete ", "?"],
                        "name": "Name",
                        "addLink": "Add link",
                        "link": "Link",
                        "addLinkPlaceholder": "E.g. article name, Special:Random, MediaWiki:Wiki-navigation, etc.",
                        "noNodesFound": "No nodes found",
                        "sourceMessage": ["The code below can be inserted on the ", " page on your wiki."],
                        "importMessage": ["Copy the source of the ", " page of your wiki and paste it in the field below."],
                    },
                    "copiedMessage": "Source code was copied to the clipboard",
                },
            },
            "viewLabel": "View:",
            "importLabel": "Import",
            "exportLabel": "Export",
            "githubLabel": "GitHub",
            "aboutToolLabel": "About tool",
            "madeByText": "Made by",
            "cancelLabel": "Cancel",
            "createLabel": "Create",
            "editLabel": "Edit",
            "deleteLabel": "Delete",
            "saveLabel": "Сохранить",
            "settingsLabel": "Settings",
            "settings": {
                "appLanguage": "Language",
            },
            "languages": [
                { value: "en", label: "English" },
                { value: "ru", label: "Russian (Русский)" },
            ]
        }
    },
    ru: {
        translation: {
            "title": "FANDOM Инструменты",
            "newLabel": "НОВЫЙ",
            "namespaces": ["(Main)", "Talk", "User", "User talk", "{{SITENAME}}", "{{SITENAME}} talk", "File", "File talk",
                "MediaWiki", "MediaWiki talk", "Template", "Template talk", "Help", "Help talk",
                "Category", "Category talk", "Forum", "Forum talk", "GeoJson", "GeoJson talk", "User blog",
                "Blog", "Blog talk", "Module", "Module talk", "Message Wall", "Map", "Map talk", "Special"],
            "tools": {
                "navigation": {
                    title: "Визуальный редактор навигации",
                    description: [
                        { text: "Визуальный редактор меню навигации для вашей вики. Создайте с нуля (или импортируйте существующее), получите исходный код, скопируйте его и затем вставьте на странице " },
                        { text: "MediaWiki:Wiki-navigation", color: "blue", bold: true },
                        { text: " вашей вики." },
                    ],
                    author: "Иван Зубков",
                    authorURL: "https://thundiverter.github.io/",
                    views: {
                        dropdown: "Выпадающий список",
                        tree: "Дерево",
                        source: "Исходный код",
                    },
                    labels: {
                        "newNode": "Новый узел",
                        "editNode": "Редактировать узел",
                        "deleteNode": "Удалить узел",
                        "deleteNodeMessage": ["Вы уверены, что хотите удалить ", "?"],
                        "name": "Отображаемый текст",
                        "addLink": "Добавить ссылку",
                        "link": "Ссылка",
                        "addLinkPlaceholder": "Например, название страницы, Служебная:Random, MediaWiki:Wiki-navigation и т. д.",
                        "noNodesFound": "Узлы не найдены",
                        "sourceMessage": ["Код ниже может быть вставлен на страницу ", " вашей вики."],
                        "importMessage": ["Скопируйте исходный код страницы ", " вашей вики и вставьте его в поле ниже."],
                    },
                    "copiedMessage": "Исходный код скопирован в буфер обмена",
                },
            },
            "viewLabel": "Вид:",
            "importLabel": "Импорт",
            "exportLabel": "Экспорт",
            "githubLabel": "GitHub",
            "aboutToolLabel": "Об инструменте",
            "madeByText": "Автор:",
            "cancelLabel": "Отмена",
            "createLabel": "Создать",
            "editLabel": "Редактировать",
            "deleteLabel": "Удалить",
            "saveLabel": "Сохранить",
            "settingsLabel": "Настройки",
            "settings": {
                "appLanguage": "Язык",
            },
            "languages": [
                { value: "en", label: "Английский (English)" },
                { value: "ru", label: "Русский" },
            ]
        }
    }
}

i18n
.use(initReactI18next)
.init({
    resources,
    lng: "en",
    interpolation: {
        escapeValue: false
    }
});

export default i18n;