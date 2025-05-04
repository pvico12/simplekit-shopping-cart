import { SKElementProps, SKKeyboardEvent, SKTextfield } from 'simplekit/imperative-mode';
import { measureText } from 'simplekit/utility';

type SKTextfieldProps = SKElementProps & {
  text?: string;
  minWidth?: number;
};

class ItemInputField extends SKTextfield {
    minWidth: number;

    constructor({ text = "", minWidth = 0, ...elementProps }: SKTextfieldProps = {}) {
        super(elementProps);
        this.minWidth = minWidth;
    }

    updateContentSize() {
        const m = measureText(this.text, this.font);
    
        if (!m) {
          console.warn(
            `measureText failed in ItemInputField for ${this.text}`
          );
          return;
        }

        this.contentHeight = m.height;
        this.contentWidth = m.width;

        this.textWidth = m.width;
    
        if (m.width > this.minWidth) {
            this.width = m.width + 10;
        } else {
            this.width = this.minWidth;
        }
    }

    handleKeyboardEvent(ke: SKKeyboardEvent) {
        switch (ke.type) {
          case "focusout":
            this.focus = false;
            break;
          case "focusin":
            this.focus = true;
            break;
          case "keydown":
            if (this.text.length > 0 && ke.key === "Enter") {
                this.sendEvent({
                    source: this,
                    timeStamp: ke.timeStamp,
                    type: "enterpressed",
                });
                this.text = "";
            }
            if (this.focus && ke.key) {
                this.text = this.applyEdit(this.text, ke.key);
                this.text = this.text.trimStart();
            }
            if (
                this.sendEvent({
                    source: this,
                    timeStamp: ke.timeStamp,
                    type: "textchanged",
                })
            ) {
                return true;
            }
            this.updateContentSize();
            break;
        }
    
        return false;
      }
}

export default ItemInputField;