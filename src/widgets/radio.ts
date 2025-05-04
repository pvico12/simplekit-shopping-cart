import {
    SKElement,
    SKElementProps,
    SKEvent,
    SKMouseEvent,
    Style,
} from "simplekit/imperative-mode";

export type SKRadioProps = SKElementProps & { checked?: boolean };

export class SKRadio extends SKElement {
    constructor({ checked = false, ...elementProps }: SKRadioProps = {}) {
        super(elementProps);
        this.checked = checked;
        this.width = 15;
        this.height = 15;
    }

    state: "idle" | "hover" | "down" = "idle";

    checked: boolean;

    handleMouseEvent(me: SKMouseEvent) {
        switch (me.type) {
            case "mousedown":
                this.state = "down";
                break;
            case "mouseup":
                this.state = "hover";
                this.checked = !this.checked;
                return this.sendEvent({
                    source: this,
                    timeStamp: me.timeStamp,
                    type: "action",
                } as SKEvent);
                break;
            case "mouseenter":
                this.state = "hover";
                break;
            case "mouseexit":
                this.state = "idle";
                break;
        }

        if (super.handleMouseEvent(me)) return true;

        return false;
    }

    draw(gc: CanvasRenderingContext2D) {
        gc.save();

        const w = this.paddingBox.width;
        const h = this.paddingBox.height;
        const radius = Math.min(w, h) / 2;

        gc.translate(this.margin, this.margin);

        // thick highlight circle
        if (this.state == "hover" || this.state == "down") {
            gc.beginPath();
            gc.arc(this.x + radius, this.y + radius, radius, 0, 2 * Math.PI);
            gc.strokeStyle = Style.highlightColour;
            gc.lineWidth = 8;
            gc.stroke();
        }

        // normal background
        gc.beginPath();
        gc.arc(this.x + radius, this.y + radius, radius, 0, 2 * Math.PI);
        gc.fillStyle =
            this.state == "down" ? Style.highlightColour : "whitesmoke";
        gc.strokeStyle = "black";
        gc.lineWidth = 2;
        gc.fill();
        gc.stroke();
        gc.clip();

        // checked state
        if (this.checked === true) {
            gc.beginPath();
            gc.arc(this.x + radius, this.y + radius, radius / 2, 0, 2 * Math.PI);
            gc.fillStyle = "black";
            gc.fill();
        }

        gc.restore();

        super.draw(gc);
    }

    public toString(): string {
        return `SKRadio`;
    }
}
