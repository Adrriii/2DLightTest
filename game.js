(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const drawable_1 = require("../../../2DLight/lib/cjs/drawables/drawable");
class Button extends drawable_1.Drawable {
    setText(text) {
        text.rect = this.rect;
        this.text = text;
        return this;
    }
    onHoverStart() {
        this.color.r += 15;
        this.color.g += 15;
        this.color.b += 15;
    }
    onHoverStop() {
        this.color.r -= 15;
        this.color.g -= 15;
        this.color.b -= 15;
    }
    onDragStart() {
        this.r = Math.random() * 255;
        this.g = Math.random() * 255;
        this.b = Math.random() * 255;
        if (this.text) {
            this.text.r = Math.random() * 255;
            this.text.g = Math.random() * 255;
            this.text.b = Math.random() * 255;
        }
    }
    whileDrag() { }
    draw() {
        super.draw();
        this.context.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
        if (this.text) {
            this.text.draw();
        }
    }
}
exports.Button = Button;

},{"../../../2DLight/lib/cjs/drawables/drawable":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const rectangle_1 = require("../../2DLight/lib/cjs/drawables/shapes/rectangle");
const text_1 = require("../../2DLight/lib/cjs/drawables/text");
const rect_1 = require("../../2DLight/lib/cjs/so/rect");
const index_1 = require("../../2DLight/lib/cjs/index");
const color_1 = require("../../2DLight/lib/cjs/so/color");
const button_1 = require("./components/button");
class Game extends index_1.Light {
    static init(instance) {
        super.init(instance ? instance : this);
        Game.LAYERS.BACKGROUND.addDrawable((new rectangle_1.Rectangle(new rect_1.Rect(5, 5, 500, 500)))
            .setColor(new color_1.Color(190, 190, 190, 1)));
        let hoverTest = (new rectangle_1.Rectangle(new rect_1.Rect(15, 15, 50, 50)))
            .setColor(new color_1.Color(20, 20, 20, 1))
            .setHover(true);
        hoverTest.onHoverStart = () => {
            hoverTest.r += 40;
            hoverTest.g += 40;
            hoverTest.b += 180;
            hoverTest.a -= 0.5;
        };
        hoverTest.onHoverStop = () => {
            hoverTest.r -= 40;
            hoverTest.g -= 40;
            hoverTest.b -= 180;
            hoverTest.a += 0.5;
        };
        Game.LAYERS.FOREGROUND.addDrawable(hoverTest);
        Game.LAYERS.FOREGROUND.addDrawable((new rectangle_1.Rectangle(new rect_1.Rect(75, 15, 50, 50)))
            .setColor(new color_1.Color(20, 20, 20, 1))
            .setHover(true)
            .setDrag(true));
        Game.LAYERS.FOREGROUND.addDrawable((new rectangle_1.Rectangle(new rect_1.Rect(135, 15, 50, 50)))
            .setColor(new color_1.Color(20, 20, 20, 1))
            .setDrag(true));
        Game.LAYERS.FOREGROUND.addDrawable((new rectangle_1.Rectangle(new rect_1.Rect(195, 15, 50, 50)))
            .setColor(new color_1.Color(20, 20, 20, 1))
            .setOnTopOnClick(true)
            .setHover(true)
            .setDrag(true)
            .setBound(true));
        Game.LAYERS.FOREGROUND.addDrawable((new button_1.Button())
            .setRect(new rect_1.Rect(255, 15, 150, 50))
            .setText((new text_1.Text())
            .setText("Click me")
            .setColor(new color_1.Color(255, 255, 255, 1)))
            .setColor(new color_1.Color(20, 20, 20, 1))
            .setHover(true)
            .setDrag(true));
        let moveTest = (new rectangle_1.Rectangle(new rect_1.Rect(75, 75, 50, 50)))
            .setColor(new color_1.Color(20, 20, 20, 1))
            .setHover(true);
        moveTest.onHoverStart = () => {
            moveTest.r += 40;
            moveTest.g += 40;
            moveTest.b += 180;
            moveTest.a -= 0.5;
        };
        moveTest.onHoverStop = () => {
            moveTest.r -= 40;
            moveTest.g -= 40;
            moveTest.b -= 180;
            moveTest.a += 0.5;
        };
        moveTest.update = () => {
            moveTest.x = 75 + (25 - (Game.GLOBALS.TIME % 5000 / 100));
            moveTest.y = 75 + ((Game.GLOBALS.TIME % 5000 / 100) - 25);
        };
        Game.LAYERS.FOREGROUND.addDrawable(moveTest);
    }
    static viewTick() {
        super.viewTick();
    }
    static updateTick() {
        super.updateTick();
        console.log(Game.GLOBALS.TIME);
    }
}
exports.Game = Game;
(function () {
    Game.init(null);
})();

},{"../../2DLight/lib/cjs/drawables/shapes/rectangle":6,"../../2DLight/lib/cjs/drawables/text":7,"../../2DLight/lib/cjs/index":9,"../../2DLight/lib/cjs/so/color":10,"../../2DLight/lib/cjs/so/rect":12,"./components/button":1}],3:[function(require,module,exports){
"use strict";
// convert getter lines (with * at the end) to add setters
// \tget (.*) \(\) \{ return (.*); \};*
// \tget $1 () { return $2; };\n\tset $1 ($1) { $2 = $1; };\n
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drawable = void 0;
const globals_1 = require("../globals");
const color_1 = require("../so/color");
const rect_1 = require("../so/rect");
const dynamic_1 = require("./dynamic");
/**
 * An element that can be drawn and posesses a hitbox.
 */
class Drawable extends dynamic_1.Dynamic {
    constructor() {
        super();
        this.rect = new rect_1.Rect(0, 0, 0, 0);
        this.color = new color_1.Color(0, 0, 0, 1);
    }
    get context() { return globals_1.Globals.VIEWER; }
    ;
    // Color properties direct access
    get x() { return this.rect.x; }
    ;
    set x(x) { this.rect.x = x; }
    ;
    get y() { return this.rect.y; }
    ;
    set y(y) { this.rect.y = y; }
    ;
    get w() { return this.rect.w; }
    ;
    set w(w) { this.rect.w = w; }
    ;
    get h() { return this.rect.h; }
    ;
    set h(h) { this.rect.h = h; }
    ;
    // Rect properties direct access
    get r() { return this.color.r; }
    ;
    set r(r) { this.color.r = r; }
    ;
    get g() { return this.color.g; }
    ;
    set g(g) { this.color.g = g; }
    ;
    get b() { return this.color.b; }
    ;
    set b(b) { this.color.b = b; }
    ;
    get a() { return this.color.a; }
    ;
    set a(a) { this.color.a = a; }
    ;
    setColor(color) {
        this.color = color;
        return this;
    }
    setRect(rect) {
        this.rect = rect;
        return this;
    }
    isInbounds(bounds) {
        return this.x <= bounds.x + bounds.w && this.x + this.w >= bounds.x && this.y <= bounds.y + bounds.h && this.y + this.h >= bounds.y;
    }
    isTouched(point) {
        return point.x >= this.x && point.x <= this.x + this.w && point.y >= this.y && point.y <= this.y + this.h;
    }
    setFillStyle(color) {
        this.context.fillStyle = "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
    }
    draw() {
        this.setFillStyle(this.color);
    }
    update() { }
}
exports.Drawable = Drawable;

},{"../globals":8,"../so/color":10,"../so/rect":12,"./dynamic":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dynamic = exports.dynamicMixin = void 0;
const globals_1 = require("../globals");
/**
 * Inject hover/drag logic
 */
const dynamicMixin = (Base) => class extends Base {
    constructor() {
        super();
        this.dragged = () => globals_1.Globals.DRAGGED.includes(this); // optimize by adding a flag on drag start/end
        this.draggable = () => this.drag && (this.dragged() || globals_1.Globals.DRAGGED.length == 0);
        this.hover = false;
        this.drag = false;
        this.bound = false;
        this.hovered = false;
        this.onTopOnClick = false;
    }
    /**
     * Whether the object is bound to the canvas
     */
    setBound(mode) {
        this.bound = mode;
        return this;
    }
    /**
     * Whether the object goes on top of the layer when interacted with
     */
    setOnTopOnClick(mode) {
        this.onTopOnClick = mode;
        return this;
    }
    ///// HOVER LOGIC /////
    /**
     * Whether the object can be hovered
     */
    setHover(mode) {
        this.hover = mode;
        return this;
    }
    /**
     * Triggered for when object starts to get hovered
     */
    onHoverStart() {
    }
    ;
    /**
     * Triggered for each tick when object is hovered
     */
    onHover() {
    }
    ;
    /**
     * Triggered for when object is no longer hovered
     */
    onHoverStop() {
    }
    ;
    ///// DRAG LOGIC /////
    /**
     * Whether the object can be dragged
     */
    setDrag(mode) {
        this.drag = mode;
        return this;
    }
    /**
     * Triggered when the user first clicks on the object
     */
    onDragStart() {
    }
    ;
    /**
     * Triggered for each tick when the user holds the object
     */
    whileDrag() {
        if (!globals_1.Globals.DRAGPOS || !this.rect)
            return;
        const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
        let x = globals_1.Globals.MOUSEPOS.x - globals_1.Globals.DRAGPOS.x;
        let y = globals_1.Globals.MOUSEPOS.y - globals_1.Globals.DRAGPOS.y;
        this.rect.x = this.bound ? clamp(x, 0, globals_1.Globals.VIEWER.canvas.width - this.rect.w) : x;
        this.rect.y = this.bound ? clamp(y, 0, globals_1.Globals.VIEWER.canvas.height - this.rect.h) : y;
    }
    ;
    /**
     * Triggered when the user releases the object
     */
    onDragEnd() {
    }
    ;
};
exports.dynamicMixin = dynamicMixin;
class Dynamic extends (0, exports.dynamicMixin)(Object) {
}
exports.Dynamic = Dynamic;

},{"../globals":8}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layer = void 0;
const globals_1 = require("../globals");
const point_1 = require("../so/point");
const rect_1 = require("../so/rect");
const dynamic_1 = require("./dynamic");
/**
 * Layer of elements to draw and interact with.
 * Parameterize whether the layer allows hovering/dragging with the Dynamic methods.
 */
class Layer extends dynamic_1.Dynamic {
    constructor() {
        super();
        this.drawables = [];
    }
    /**
     * Add a drawable in front
     */
    addDrawable(drawable) {
        this.drawables.push(drawable);
        return this;
    }
    /**
     * Remove any drawable from this layers
     */
    removeDrawable(drawable) {
        let i = this.drawables.findIndex((el) => el == drawable);
        if (i == -1) {
            // Drawable already doesn't exist in this layer
            return this;
        }
        this.drawables.splice(i, 1);
        return this;
    }
    /**
     * Put a drawable on top
     */
    onTop(drawable) {
        this.removeDrawable(drawable).addDrawable(drawable);
        return this;
    }
    /**
     * Draw loop
     */
    draw() {
        this.drawables.forEach(element => {
            if (element.isInbounds(new rect_1.Rect(0, 0, globals_1.Globals.VIEWER.canvas.width, globals_1.Globals.VIEWER.canvas.height))) {
                element.draw();
            }
        });
        return this;
    }
    /**
     * Update loop
     */
    update() {
        // Update the elements starting with those in front to consume events in order
        this.drawables.reduceRight((_prev, element, _i, _arr) => {
            // Mouse actions
            if (element.isTouched(globals_1.Globals.MOUSEPOS)) {
                // Check for a click on an element
                if (this.drag && element.draggable() && globals_1.Globals.HOLD == 1) {
                    // We start the drag logic
                    // The rest is handled globally
                    globals_1.Globals.DRAGGED.push(element);
                    globals_1.Globals.DRAGPOS = new point_1.Point(globals_1.Globals.MOUSEPOS.x - element.x, globals_1.Globals.MOUSEPOS.y - element.y);
                    globals_1.Globals.HOLD = 0;
                    if (element.onTopOnClick) {
                        this.onTop(element);
                    }
                    element.onDragStart();
                }
                else if (this.hover && !globals_1.Globals.HOVERED) {
                    // Hover the first object and consume
                    // Even if the object is not hoverable, it consumes the event
                    // Dragging an object does count as hovering (planned: parameterize this in Dynamic)
                    globals_1.Globals.HOVERED = true;
                    if (element.hover && !globals_1.Globals.DRAGGED.includes(element)) {
                        if (!element.hovered) {
                            element.hovered = true;
                            element.onHoverStart();
                        }
                        else {
                            element.onHover();
                        }
                    }
                }
            }
            else if (element.hovered) {
                element.hovered = false;
                element.onHoverStop();
            }
            element.update();
            return null;
        }, null);
        return this;
    }
}
exports.Layer = Layer;

},{"../globals":8,"../so/point":11,"../so/rect":12,"./dynamic":4}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
const drawable_1 = require("../drawable");
class Rectangle extends drawable_1.Drawable {
    constructor(rect) {
        super();
        this.rect = rect;
    }
    draw() {
        super.draw();
        this.context.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
    }
}
exports.Rectangle = Rectangle;

},{"../drawable":3}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
const drawable_1 = require("./drawable");
/**
 * Inject text properties
 */
class Text extends drawable_1.Drawable {
    constructor() {
        super();
        this.setFont("32px serif");
        this.setText("");
    }
    setText(text) {
        this.text = text;
        this.context.font = this.font;
        this.textInfo = this.context.measureText(this.text);
        return this;
    }
    setFont(font) {
        this.font = font;
        return this;
    }
    draw() {
        if (this.text.length > 0) {
            super.draw();
            this.context.font = this.font;
            let x = this.rect.x + this.rect.w / 2 - Math.floor(this.textInfo.width / 2);
            let y = this.rect.y + this.rect.h / 2 + Math.floor((this.textInfo.actualBoundingBoxAscent + this.textInfo.actualBoundingBoxDescent) / 2);
            this.context.fillText(this.text, x, y);
        }
    }
}
exports.Text = Text;

},{"./drawable":3}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Globals = void 0;
const layer_1 = require("./drawables/layer");
const point_1 = require("./so/point");
class Globals {
}
exports.Globals = Globals;
/**
 * Hierarchy of drawable/interactable layers
 */
Globals.LAYERS = {
    OVERLAY: (new layer_1.Layer()).setHover(true),
    FOREGROUND: (new layer_1.Layer()).setHover(true).setDrag(true),
    BACKGROUND: (new layer_1.Layer()),
};
/**
 * Whether the canvas is ready to be used
 */
Globals.READY = false;
/**
 * Holds the current mouse position
 */
Globals.MOUSEPOS = new point_1.Point(0, 0);
/**
 * Mouse click state to handle
 */
Globals.HOLD = 0;
/**
 * Whether the hover state has been consumed by a layer's element
 */
Globals.HOVERED = false;
/**
 * The currently dragged element
 */
Globals.DRAGGED = [];
/**
 * The start position of the drag
 */
Globals.DRAGPOS = undefined;

},{"./drawables/layer":5,"./so/point":11}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Light = void 0;
const globals_js_1 = require("./globals.js");
class Light {
    static get GLOBALS() { return globals_js_1.Globals; }
    ;
    static get LAYERS() { return globals_js_1.Globals.LAYERS; }
    ;
    /**
     * Capture the canvas and initialize the engine
     */
    static init(instance) {
        onmousemove = function (e) {
            globals_js_1.Globals.MOUSEPOS.x = e.clientX;
            globals_js_1.Globals.MOUSEPOS.y = e.clientY;
        };
        onmousedown = function (e) {
            if (globals_js_1.Globals.HOLD == 0) {
                globals_js_1.Globals.HOLD = 1;
            }
        };
        onmouseup = function (e) {
            globals_js_1.Globals.HOLD = 2;
        };
        let body = document.getElementsByTagName("body")[0];
        body.style.padding = "0px";
        body.style.margin = "0px";
        body.style.overflow = "hidden";
        let canvas = document.createElement('canvas');
        canvas.setAttribute("id", "viewer");
        body.appendChild(canvas);
        if (!canvas) {
            document.getElementsByTagName("body")[0].innerHTML = "Unable to load canvas : Not found.";
            return;
        }
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let context = canvas.getContext('2d');
        if (!context) {
            document.getElementsByTagName("body")[0].innerHTML = "Unable to load canvas : Could not initialize 2D Context.";
            return;
        }
        globals_js_1.Globals.VIEWER = context;
        setInterval(instance["viewTick"], 16);
        setInterval(instance["updateTick"], 16);
        globals_js_1.Globals.STARTTIME = Date.now();
        globals_js_1.Globals.READY = true;
    }
    /**
     * Removes all from the canvas
     */
    static clearCanvas() {
        globals_js_1.Globals.VIEWER.clearRect(0, 0, globals_js_1.Globals.VIEWER.canvas.width, globals_js_1.Globals.VIEWER.canvas.height);
        globals_js_1.Globals.VIEWER.beginPath();
    }
    /**
     * Draw loop
     */
    static viewTick() {
        Light.clearCanvas();
        globals_js_1.Globals.LAYERS.BACKGROUND.draw();
        globals_js_1.Globals.LAYERS.FOREGROUND.draw();
        globals_js_1.Globals.LAYERS.OVERLAY.draw();
    }
    /**
     * Update loop
     */
    static updateTick() {
        // Update the application clock
        globals_js_1.Globals.TIME = Date.now() - globals_js_1.Globals.STARTTIME;
        // Unlock the hover event
        globals_js_1.Globals.HOVERED = false;
        // Undrag on release
        if (globals_js_1.Globals.HOLD == 2) {
            globals_js_1.Globals.DRAGGED.forEach(el => el.onDragEnd());
            globals_js_1.Globals.DRAGGED = [];
            globals_js_1.Globals.HOLD = 0;
        }
        // Trigger layer updates
        globals_js_1.Globals.LAYERS.OVERLAY.update();
        globals_js_1.Globals.LAYERS.FOREGROUND.update();
        globals_js_1.Globals.LAYERS.BACKGROUND.update();
        // If the click was not consumed, cancel
        if (globals_js_1.Globals.HOLD == 1) {
            globals_js_1.Globals.HOLD = 0;
        }
        globals_js_1.Globals.DRAGGED.forEach(el => el.whileDrag());
    }
}
exports.Light = Light;

},{"./globals.js":8}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = void 0;
/**
 * Simple RGBA structure
 */
class Color {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}
exports.Color = Color;

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
/**
 * Simple X;Y structure
 */
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
exports.Point = Point;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rect = void 0;
/**
 * Simple X;Y Width/Height structure
 */
class Rect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}
exports.Rect = Rect;

},{}]},{},[2]);
