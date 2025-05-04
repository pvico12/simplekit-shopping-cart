// try changing to "observer-debug"
import { Subject } from "./observer";

export type Item = {
    id: number;
    name: string;
    categoryId: number;
    quantity?: number;
    bought?: boolean;
};

type Category = {
    id: number;
    name: string;
    color: string;
};

export enum ViewMode {
    Main = "main",
    Settings = "settings"
}

const OTHER_CATEGORY_ID = 4;
export const DEFAULT_SETTINGS_COLUMN_COUNT = 3;

const CATEGORIES: Category[] = [
    { id: 1, name: "Dairy", color: "hsl(220, 75%, 75%)" },
    { id: 2, name: "Frozen", color: "hsl(220, 90%, 95%)" },
    { id: 3, name: "Fruit", color: "hsl(140, 75%, 75%)" },
    { id: OTHER_CATEGORY_ID, name: "Other", color: "hsl(0, 0%, 90%)" }
];




export class Model extends Subject {

    private itemCategoryMap: Item[] = [
        { id: 1, name: "Yogurt", categoryId: 1 },
        { id: 2, name: "Milk", categoryId: 1 },
        { id: 3, name: "Pizza", categoryId: 2 },
        { id: 4, name: "Apples", categoryId: 3 },
        { id: 5, name: "Bananas", categoryId: 3 }
    ];
    
    private items: Item[] = [
        { id: 1, name: "Yogurt", categoryId: 1, quantity: 3, bought: false },
        { id: 2, name: "Milk", categoryId: 1, quantity: 5, bought: false },
        { id: 3, name: "Pizza", categoryId: 2, quantity: 2, bought: false },
        { id: 4, name: "Apples", categoryId: 3, quantity: 3, bought: true },
        { id: 5, name: "Bananas", categoryId: 3, quantity: 2, bought: true },
        { id: 6, name: "Super Long Item Name That Wont Fit", categoryId: OTHER_CATEGORY_ID, quantity: 2, bought: false },
    ];

    public viewMode = ViewMode.Main;
    public settingsColumnCount = Math.min(DEFAULT_SETTINGS_COLUMN_COUNT, this.items.length);

    // NAVIGATION LOGIC
    // Toggle view mode
    toggleViewMode(): void {
        this.viewMode = this.viewMode === ViewMode.Main ? ViewMode.Settings : ViewMode.Main;
        this.notifyObservers();
    }

    // BUSINESS LOGIC (CRUD)
    // Add
    addItem(name: string, quantity: number): void {
        // check if item already exists
        if (!this.items.find((item) => item.name === name)) {
            const id = Date.now();
            var categoryId = this.itemCategoryMap.find((item) => item.name === name)?.categoryId || OTHER_CATEGORY_ID;
            this.items.push({ id, name, categoryId, quantity, bought: false });
            this.notifyObservers();
        }
    }

    removeItem(id: number): void {
        this.items = this.items.filter((item) => item.id !== id);
        this.notifyObservers();
    }

    updateQuantity(id: number, quantity: number): void {
        const item = this.items.find((item) => item.id === id);
        if (item) {
            item.quantity = quantity;
            this.notifyObservers();
        }
    }

    updateItemCategory(id: number, categoryId: number): void {
        const item = this.items.find((item) => item.id === id);
        if (item) {
            item.categoryId = categoryId;

            // update mapping to new category
            const itemCategory = this.itemCategoryMap.find((item) => item.id === id);
            if (itemCategory) {
                itemCategory.categoryId = categoryId;
            } else {
                this.itemCategoryMap.push({ id, name: item.name, categoryId });
            }

            this.notifyObservers();
        }
    }

    updateSettingsRowCount(count: number): void {
        this.settingsColumnCount = count;
        this.notifyObservers();
    }

    toggleBought(id: number): void {
        const item = this.items.find((item) => item.id === id);
        if (item) {
            item.bought = !item.bought;
            this.notifyObservers();
        }
    }

    getItem(id: number): Item | undefined {
        return this.items.find((item) => item.id === id);
    }

    getCategories(): Category[] {
        return CATEGORIES;
    }

    getShoppingItems(): Item[] {
        return this.items;
    }

    getNumItems(): number {
        return this.items.length;
    }  
}

