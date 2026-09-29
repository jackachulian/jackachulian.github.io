var e=`*jan kule* is a small 2D platformer created for [*pali musi 2026*](https://itch.io/jam/tu), a game jam for games created using the minimalist constructed language Toki Pona. (Yes, I am a bit of a nerd when it comes to obscure languages!) This game was created in less than 48 hours.\r
\r
\r
## Technical Details\r
\r
The game is written in GDScript and uses Godot's 2D rendering system.\r
The paint textures on the ground are rendered using a single Texture2D that stretches across the entire world. This Texture2D is displayed on a material that the ground's tilemap uses. The texture's filter mode is set to None, so that the crisp pixel-perfect look is achieved.\r
\r
Whenever the player swings their brush, many paint particles are emitted from the brush. These travel until they hit a wall, at which point a new object is spawned on another layer, This special layer is only visible by a separate camera from the main camera. This separate camera renders to a texture.\r
\r
To avoid taking up large amounts of memory, each particle spawned on the paint layer despawns after a single frame. This still allows each pixel to be rendered to the paint texture before the particle is despawned the following frame. The camera that renders to this texture has a clear mode of None, meaning pixels previously rendered onto the texture will not be cleared by subsequent frames, unless another paint color is painted on top of it.`;export{e as default};