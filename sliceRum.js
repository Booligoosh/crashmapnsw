const Clipper = require("image-clipper");
const Canvas = require("canvas");
const clipper = Clipper();
clipper.injectNodeCanvas(Canvas);

const ROWS = 10;
const COLS = 10;
const DIVIDER_WIDTH = 5;
const DIVIDER_HEIGHT = 4;
const SLICE_WIDTH = 141;
const SLICE_HEIGHT = 105;
const Y_OFFSET = 49;
const X_OFFSET = 0;

for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
    const startX = X_OFFSET + DIVIDER_WIDTH * (col + 1) + SLICE_WIDTH * col;
    const startY = Y_OFFSET + DIVIDER_HEIGHT * (row + 1) + SLICE_HEIGHT * row;

    console.log({ row, col, startX, startY });

    clipper.image(__dirname + "/public/rumTable.png", function () {
      this.crop(startX, startY, SLICE_WIDTH, SLICE_HEIGHT).toFile(
        `${__dirname}/public/rum/${row + col * 10}.png`,
        () => {
          // console.log("saved!");
        }
      );
    });
  }
}
