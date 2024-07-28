import { create } from "zustand";

export const useGeneralStore = create((set, get) => ({
    wikiName: "",
    wikiDisplayName: "",
    wikiLang: "en",
    appLang: "en",
    setAppLang: (lang) => {
        set(state => ({
            ...state,
            appLang: lang
        }));
        localStorage.setItem("fandomtools", JSON.stringify(get()));
    },
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
            console.log(`${title} added (id: ${state.lastItemIndex}, parent: ${parent})`);
            
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
        console.log(`Removed id=${id}`);
        console.log(get().items)
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
        // const allItems = [...get().exploreItems, ...get().items];
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
}))