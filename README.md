## Description
A simple drawing app that functions like a digital sketchpad / Etch-a-Sketch, allowing users to create pixel art on a variable sized canvas.

There are three color modes available:
1. Color: This is the default mode and it colors the grid cells in black.
2. Rainbow: This colors each cell with a random color, creating a "rainbow" pattern on the canvas.
3. Mosaic: This is a simple darkening tool. Each time a cell is revisited, it's opacity is increased. 
    The pattern of cells with varying opacities across the canvas gives a "mosaic" effect.

Two eraser tools:
1. Eraser: A simple tool to help to fix mistakes. It simply colors the cells in a white color.
2. Clear: Sets the color of all cells in the canvas to white to "clear" all coloring.

Two miscellaneous tools:
1. Set Size: Allows the user to create an NxN grid, where N is a value between 1 to 100, and is provided by the user.
2. Toggle Grid: Toggles the display of a grid on the canvas.

---

## Note
1. This program is currently *not* responsive. It is recommended to use the program on computer screens only.
2. Certain grid sizes can create unnecessary white spaces in the canvas, which may effect the user experience.
3. The color palette used for this program is inspired by the colors used for the ["Terracotta blocks"](https://minecraft.fandom.com/wiki/Terracotta#ID) in Minecraft.