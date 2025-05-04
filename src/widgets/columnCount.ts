import { Layout, SKButton, SKContainer, SKElementProps } from "simplekit/imperative-mode";
import { Model, DEFAULT_SETTINGS_COLUMN_COUNT } from "../model";

type SKContainerProps = SKElementProps & { fill?: string };
type SKColumnCountWidgetProps = SKContainerProps & { model?: Model };

export class SKColumnCountWidget extends SKContainer {
    minusButton: SKButton;
    plusButton: SKButton;
    countButton: SKButton;

    count: number;


    constructor(private model: Model, { ...elementProps }: SKColumnCountWidgetProps = {}) {
        super(elementProps);

        this.layoutMethod = new Layout.FillRowLayout();

        this.minusButton = new SKButton({ text: "-", width: 30 });
        this.plusButton = new SKButton({ text: "+", width: 30 });
        this.countButton = new SKButton({ text: this.model.settingsColumnCount.toString(), width: 30 });

        this.count = this.model.settingsColumnCount;

        this.addChild(this.minusButton);
        this.addChild(this.countButton);
        this.addChild(this.plusButton);

        this.countButton.addEventListener("action", () => this.resetCount());
        this.minusButton.addEventListener("action", () => this.decrementCount());
        this.plusButton.addEventListener("action", () => this.incrementCount());
    }

    private decrementCount() {
        if (this.count > 1) {
            this.count--;
            this.updateCountButton();
        }
    }

    private incrementCount() {
        if (this.count < this.model.getNumItems()) {
            this.count++;
            this.updateCountButton();
        }
    }

    private resetCount() {
        this.count = DEFAULT_SETTINGS_COLUMN_COUNT;
        this.updateCountButton();
    }

    private updateCountButton() {
        this.countButton.text = this.count.toString();
        this.model.updateSettingsRowCount(this.count);
    }

    public toString(): string {
        return `SKContainer`;
    }
}