import { Layout, SKButton, SKContainer, SKLabel, SKTextfield } from "simplekit/imperative-mode";

// local imports
import { Model, ViewMode } from "../model";
import { StackColLayout } from "../layouts/stackCol";
import { ListItemView } from "./listItemView";
import ItemInputField from "../widgets/itemInputField";
import { SKQuantityWidget } from "../widgets/quantity";

export class ListView extends SKContainer {
  private editCategoriesButton: SKButton;
  textField: ItemInputField;
  quantityWidget: SKQuantityWidget;

  constructor(private model: Model) {
    super();

    this.layoutMethod = new StackColLayout(20);

    
    // NAVIGATION Section
    this.editCategoriesButton = new SKButton({ text: "Edit Categories", width: 125 });
    this.editCategoriesButton.addEventListener("click", () => {
      this.model.toggleViewMode();
    });
    this.addChild(this.editCategoriesButton);

    let shoppingItems = this.model.getShoppingItems();



    
    // ADD Section
    const addItemContainer = new SKContainer();
    addItemContainer.layoutMethod = new Layout.FillRowLayout();
    addItemContainer.width = 500;

    this.textField = new ItemInputField({ minWidth: 300 });
    this.quantityWidget = new SKQuantityWidget(model, { id: 0, categoryId: 0, name: "", quantity: 1 });
    const addButton = new SKButton({ text: "Add"});


    addItemContainer.addChild(this.textField);
    addItemContainer.addChild(this.quantityWidget);
    addItemContainer.addChild(addButton);

    this.addChild(addItemContainer);

    this.textField.addEventListener("enterpressed", () => {
      this.processAdd();
    });

    addButton.addEventListener("click", () => {
      this.processAdd();
    });




    // SHOPPING LIST Section

    // add shopping list items by category to the page
    this.model.getCategories().forEach(category => {
      const categoryContainer = new SKContainer();
      categoryContainer.layoutMethod = new StackColLayout();
      categoryContainer.fill = category.color;
      categoryContainer.padding = 5;
      categoryContainer.width = 500;
      categoryContainer.fillWidth = 1;

      const categoryName = new SKLabel({
        text: `--- ${category.name} ---`,
      });
      categoryName.padding = 10;
      categoryName.font = "10pt sans-serif";
      categoryContainer.addChild(categoryName);

      shoppingItems.filter(x => x.categoryId == category.id).sort((a, b) => a.name.localeCompare(b.name)).forEach(item => {
        const itemContainer = new ListItemView(this.model, item.id);
        if (item.bought) {
          itemContainer.fill = "rgb(91, 91, 91)";
        }

        itemContainer.addEventListener("dblclick", () => {
          console.log("dblClick");
          this.model.toggleBought(item.id);
        });

        categoryContainer.addChild(itemContainer);
      });

      this.addChild(categoryContainer);
    });
  }

  processAdd() {
    const name = this.textField.text;
    const quantity = this.quantityWidget.quantity;
    if (name) {
      this.model.addItem(name, quantity);
    }
    this.textField.text = "";
    this.quantityWidget.quantity = 1;
  }
}
