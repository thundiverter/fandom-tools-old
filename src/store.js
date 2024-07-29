import { create } from "zustand";

// LOCAL FUNCTIONS

function itemToSourceRow(item, level) {
    // levels: 0, 1, 2
    if (item.link !== null) {
        if (item.link.trim() === item.label.trim()) {
            return { value: ["*", "**", "***"][level] + item.label, level };
        } else {
            return { value: ["*", "**", "***"][level] + item.link + "|" + item.label, level };
        }
    } else {
        return { value: ["*#|", "**#|", "***#|"][level] + item.label, level };
    }
}

// STORES

export const useGeneralStore = create((set, get) => ({
    wikiName: "",
    wikiDisplayName: "",
    wikiLang: "en",
    appLang: "en",
    wikiLanguages: [
        { value: "id", label: "Bahasa Indonesia" },
        { value: "ms", label: "Bahasa Melayu" },
        { value: "ca", label: "català" },
        { value: "da", label: "dansk" },
        { value: "de", label: "Deutsch" },
        { value: "et", label: "eesti" },
        { value: "en", label: "English" },
        { value: "es", label: "español" },
        { value: "fr", label: "français" },
        { value: "hr", label: "hrvatski" },
        { value: "it", label: "italiano" },
        { value: "hu", label: "Magyar" },
        { value: "nl", label: "Nederlands" },
        { value: "no", label: "norsk" },
        { value: "pl", label: "polski" },
        { value: "pt-br", label: "português do Brasil" },
        { value: "ro", label: "română" },
        { value: "fi", label: "suomi" },
        { value: "sv", label: "svenska" },
        { value: "tl", label: "Tagalog" },
        { value: "vi", label: "Tiếng Việt" },
        { value: "tr", label: "Türkçe" },
        { value: "cs", label: "čeština" },
        { value: "el", label: "Ελληνικά" },
        { value: "bg", label: "български" },
        { value: "ru", label: "русский" },
        { value: "sr", label: "српски / srpski" },
        { value: "uk", label: "українська" },
        { value: "he", label: "עברית" },
        { value: "ar", label: "العربية" },
        { value: "fa", label: "فارسی" },
        { value: "hi", label: "हिन्दी" },
        { value: "th", label: "ไทย" },
        { value: "zh", label: "中文" },
        { value: "zh-tw", label: "中文（臺灣）" },
        { value: "zh-hk", label: "中文（香港）" },
        { value: "ja", label: "日本語" },
        { value: "ko", label: "한국어" },
    ],
    setAppLang: (lang) => {
        set(state => ({
            ...state,
            appLang: lang
        }));
        localStorage.setItem("fandomtools", JSON.stringify(get()));
    },
    updateData: (data) => {
        const newData = {
            wikiName: data.name !== undefined ? data.name : get().wikiName,
            wikiDisplayName: data.displayName !== undefined ? data.displayName : get().wikiDisplayName,
            wikiLang: data.wikiLang !== undefined ? data.wikiLang : get().wikiLang,
            appLang: data.appLang !== undefined ? data.appLang : get().appLang,
        };
        set(state => ({ ...state, ...newData }));
        localStorage.setItem("fandomtools", JSON.stringify(newData));
    }
}))

export const useNavigationEditorStore = create((set, get) => ({
    items: [],
    exploreItems: [
        { id: 0, title: "Explore", noedit: true, parent: null },
        { id: 1, title: "Main Page", link: "/", parent: 0, noedit: true },
        { id: 2, title: "Discuss", link: "/f", parent: 0, noedit: true },
        { id: 3, title: "All Pages", link: "Special:AllPages", parent: 0, noedit: true },
        { id: 4, title: "Community", link: "Special:Community", parent: 0, noedit: true },
        { id: 5, title: "Interactive Maps", link: "Special:AllMaps", parent: 0, noedit: true },
        { id: 6, title: "Recent Blog Posts", link: "Blog:Recent_posts", parent: 0, noedit: true },
        { id: 7, title: "Random Page", link: "Special:Random", parent: 0, noedit: true },
        { id: 8, title: "Videos", link: "Special:NewFiles?mediatype=VIDEO&wpFormIdentifier=specialnewimages", parent: 0, noedit: true },
        { id: 9, title: "Images", link: "Special:NewFiles", parent: 0, noedit: true },
    ],
    addItemPath: [],
    selectedItemID: null,
    lastItemIndex: 10,

    // adds a new item. use 'null' for link and parent if you want to leave these fields empty
    addItem: (title, link, parent) => {
        set(state => {            
            const newItem = {
                title, link, parent,
                id: state.lastItemIndex,
                parent: parent ? parent : null,
            };

            return {
                ...state,
                items: [...state.items, newItem],
                lastItemIndex: state.lastItemIndex + 1,
            };
        })
    },

    // returns an item by id
    getItem: (id) => {
        const allItems = [...get().exploreItems, ...get().items];
        return allItems.find(item => item.id === id);
    },

    // replaces an item with specific id with given data
    editItem: (id, title, link, parent) => {
        set(state => {
            const newItem = {
                id, title, link, parent
            };
            return {
                ...state,
                items: state.items.map(obj => {
                    if (obj.id === id) {
                        return newItem
                    } else return obj
                })
            }
        })
    },
    
    // removes item by id and all its children
    removeItem: (id) => {
        set(state => ({
            ...state,
            items: state.items.filter(item => item.id !== id && item.parent !== id),
        }));
    },

    // gets all children of an item by id
    getChildren: (id) => {
        return get().items.filter(item => item.parent === id);
    },
    getAllChildren: (id) => {
        const allItems = [
            ...get().exploreItems,
            ...get().items,
        ]
        return allItems.filter(item => item.parent === id);
    },

    // set the path to which the next item will be added
    setPath: (path) => {
        set(state => ({
            ...state,
            addItemPath: path,
        }));
    },

    setSelectedID: (id) => {
        set(state => ({
            ...state,
            selectedItemID: id,
        }))
    },

    // returns items as a tree
    getAllAsTree: () => {
        const allItems = get().items;
        const flatArray = allItems.map(el => ({
            id: el.id,
            label: el.title,
            value: el.id,
            parent: el.parent,
            link: el.link,
        }));

        const nodeMap = {};
        const result = [];

        flatArray.forEach(item => {
            nodeMap[item.id] = { ...item, children: null };
        });

        flatArray.forEach(item => {
            const node = nodeMap[item.id];
            if (item.parent !== null) {
                if (nodeMap[item.parent].children === null) {
                    nodeMap[item.parent].children = [node];
                } else {
                    nodeMap[item.parent].children.push(node);
                }
            } else {
                result.push(node);
            }
        });

        return result;
    },

    treeToSource: () => {
        let result = [];
        get().getAllAsTree().forEach(item => {
            result.push(itemToSourceRow(item, 0));
            if (item?.children) {
                item.children.forEach(child => { result.push(itemToSourceRow(child, 1))
                    if (child?.children) {
                        child.children.forEach(gchild => { result.push(itemToSourceRow(gchild, 2)) })
                    }
                })
            }
        })

        return result;
    }
}))