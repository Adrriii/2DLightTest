import { Rectangle } from "../../2DLight/lib/cjs/drawables/shapes/rectangle";
import { Text } from "../../2DLight/lib/cjs/drawables/text";
import { Rect } from "../../2DLight/lib/cjs/so/rect";
import { Light } from "../../2DLight/lib/cjs/index";
import { Color } from "../../2DLight/lib/cjs/so/color";
import { Button } from "./components/button";

export class Game extends Light {
	
	static init(instance: any): void {
		super.init(instance ? instance : this);
		
		Game.LAYERS.BACKGROUND.addDrawable(
			(new Rectangle(new Rect(5, 5, 500, 500)))
			.setColor(new Color(190, 190, 190, 1))
		);
		

		let hoverTest = (new Rectangle(new Rect(15, 15, 50, 50)))
		.setColor(new Color(20, 20, 20, 1))
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

		
		Game.LAYERS.FOREGROUND.addDrawable(
			(new Rectangle(new Rect(75, 15, 50, 50)))
			.setColor(new Color(20, 20, 20, 1))
			.setHover(true)
			.setDrag(true)
		);
		
		Game.LAYERS.FOREGROUND.addDrawable(
			(new Rectangle(new Rect(135, 15, 50, 50)))
			.setColor(new Color(20, 20, 20, 1))
			.setDrag(true)
		);
		
		Game.LAYERS.FOREGROUND.addDrawable(
			(new Rectangle(new Rect(195, 15, 50, 50)))
			.setColor(new Color(20, 20, 20, 1))
			.setOnTopOnClick(true)
			.setHover(true)
			.setDrag(true)
			.setBound(true)
		);
		
		Game.LAYERS.FOREGROUND.addDrawable(
			(new Button())
			.setRect(new Rect(255, 15, 150, 50))
			.setText(
				(new Text())
				.setText("Click me")
				.setColor(new Color(255, 255, 255, 1))
			)
			.setColor(new Color(20, 20, 20, 1))
			.setHover(true)
			.setDrag(true)
		);
		
		let moveTest = (new Rectangle(new Rect(75, 75, 50, 50)))
		.setColor(new Color(20, 20, 20, 1))
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

	static viewTick(): void {
		super.viewTick();
	}

	static updateTick(): void {
		super.updateTick();
		console.log(Game.GLOBALS.TIME);
	}
}

(function() {
	Game.init(null);
})();