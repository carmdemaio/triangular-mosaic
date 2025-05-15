# **Triangular Mosaic Generator**

A dynamic, browser-based mosaic generator that subdivides a canvas into triangles, rendering them with either vibrant solid colors or image-based patterns. Watch in real-time as the mosaic builds itself, with an optional art‑nouveau “psychedelic” curve style for each triangle edge.

# 🎨 **Features**

Real-Time Generation: See the mosaic animate step‑by‑step using requestAnimationFrame.

Adaptive Subdivision: Large triangles are recursively split until a configurable minimum area is reached.

Psychedelic Curves: Toggle between straight edges or randomly offset quadratic curves for a flowing, 60s rock‑poster look.

Image Pattern Fills: Automatically detects assets/img1.jpeg, img2.jpeg, … and uses them as repeating patterns. Falls back to an RGB palette when no images are available.

Responsive Canvas: Full‑screen, auto‑resizes to your browser window.

Easy Toggle: A fixed button lets you switch curve mode on or off at any time.

# 📂 **File Structure**

triangular-mosaic/
├── index.html        # Main entry; loads CSS and JS
├── css/              # Stylesheet folder
│   └── style.css     # Canvas & button styles
├── js/               # JavaScript logic
│   └── mosaic.js     # Generation, drawing, animation, asset loader
├── assets/           # Drop `img1.jpeg`, `img2.jpeg`, … here for pattern fills
└── README.md         # Project documentation

# 🔧 **Installation & Setup**

Clone the repo

git clone https://github.com/<your-username>/triangular-mosaic.git
cd triangular-mosaic

Serve or open locally

Simply double‑click index.html in a browser, or

Run a lightweight server (recommended for pattern fetch):

python3 -m http.server 8000
then open http://localhost:8000

# **Prepare assets** (optional)

Add image files named sequentially (img1.jpeg, img2.jpeg, …) into the assets/ folder. There are currently three images in the folder already. They are from ThisPersonDoesNotExist.com THEY ARE NOT REAL PEOPLE. If you remove the assets, the application defaults to generating red, green, and blue triangles. 

On load, the script will detect these images and use them as fill patterns.

# ⚙️ **Configuration**

MIN_AREA (in js/mosaic.js): Adjust to control how small triangles get (px²). Smaller → more triangles.

Curve offsets: In drawCurvyTriangle(), tweak the offset range (20 + Math.random()*30) for tighter or wider curves.

Color Palette: Modify the colors array in js/mosaic.js for different fallback fills.

# 🧩 **Future Customization Ideas**

Add an export button to snapshot the canvas as a PNG.

Introduce a palette picker UI to select different color schemes or blend modes.

Animate the curve toggle with a smooth transition.

Allow subdividing based on other criteria (e.g., brightness from an input image).

# 🤝 **Contributing**

Feel free to open issues or pull requests for new features, bug fixes, or optimizations.

# 📜 **License**

Whatever you wanna do with this code as long as it is non commercial. Otherwise reach out to me.

