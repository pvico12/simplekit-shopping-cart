import {
  SKElement,
  LayoutMethod,
  Size,
} from "simplekit/imperative-mode";

// places elements in a vertical stack with a gap
export class StackColLayout implements LayoutMethod {
  private gap: number;

  constructor(gap: number = 0) {
    this.gap = gap;
  }

  measure(elements: SKElement[]) {
    // measure all children first
    elements.forEach((el) => {
      el.measure();
    });

    // width is width of widest element
    const totalWidth = elements.reduce(
      (acc, el) => Math.max(acc, el.intrinsicWidth),
      0
    );

    // height is sum of all element heights plus gaps
    const totalHeight = elements.reduce(
      (acc, el) => acc + el.intrinsicHeight,
      0
    ) + this.gap * (elements.length - 1);

    // return minimum layout size
    return {
      width: totalWidth,
      height: totalHeight,
    };
  }

  layout(width: number, _: number, elements: SKElement[]) {
    const newBounds: Size = { width: 0, height: 0 };

    let y = 0;

    elements.forEach((el) => {
      // set the element position
      el.x = 0;
      el.y = y;

      // optional fill width
      const w = el.fillWidth ? width : el.intrinsicWidth;

      el.layout(w);

      // next row
      y += el.layoutHeight + this.gap;

      // update bounds that were actually used
      newBounds.width = Math.max(newBounds.width, el.layoutWidth);
      newBounds.height = Math.max(
        newBounds.height,
        y + el.layoutHeight
      );
    });

    return newBounds;
  }
}
