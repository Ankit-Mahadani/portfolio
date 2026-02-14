
import os

icons_dir = r"d:\IDE PROJECTS\portfolio\portfolio\assets\icons"
os.makedirs(icons_dir, exist_ok=True)

# Helper to create simple pixel art SVGs
def create_svg(name, color, content):
    svg_template = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" shape-rendering="crispEdges">
  <rect width="24" height="24" fill="none"/>
  {content}
</svg>'''
    with open(os.path.join(icons_dir, f"{name}.svg"), "w", encoding="utf-8") as f:
        f.write(svg_template)

# Define pixel data (simulated with rectangles for now to be efficient)
# In a real scenario, this would be actual pixel paths, but for "retro" feel, 
# simple geometric blocky shapes work well.

def rect(x, y, w, h, fill):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}"/>'

# Theme Icons
create_svg("gamepad", "#00ff9f", 
           rect(2, 6, 20, 12, "#00ff9f") + 
           rect(4, 8, 16, 8, "#0a0e27") + 
           rect(5, 10, 4, 4, "#00ff9f") + 
           rect(15, 10, 2, 2, "#ff00ff") + 
           rect(18, 11, 2, 2, "#00d4ff"))

create_svg("city-night", "#00d4ff",
           rect(4, 10, 4, 14, "#00d4ff") +
           rect(10, 6, 6, 18, "#ff00ff") +
           rect(18, 12, 4, 12, "#ffff00") +
           rect(11, 8, 1, 1, "#ffffff") + rect(13, 8, 1, 1, "#ffffff") +
           rect(11, 11, 1, 1, "#ffffff") + rect(13, 11, 1, 1, "#ffffff"))

create_svg("flower", "#ff00ff",
           rect(10, 4, 4, 4, "#ff00ff") +
           rect(6, 8, 4, 4, "#ff00ff") + rect(14, 8, 4, 4, "#ff00ff") +
           rect(10, 12, 4, 4, "#ff00ff") + 
           rect(10, 8, 4, 4, "#ffff00") +
           rect(11, 16, 2, 8, "#00ff9f"))

create_svg("heart-green", "#00ff9f",
           rect(4, 4, 4, 4, "#00ff9f") + rect(16, 4, 4, 4, "#00ff9f") +
           rect(2, 8, 20, 4, "#00ff9f") +
           rect(4, 12, 16, 4, "#00ff9f") +
           rect(6, 16, 12, 4, "#00ff9f") +
           rect(8, 20, 8, 2, "#00ff9f") + rect(10, 22, 4, 2, "#00ff9f"))

create_svg("target", "#ff0055",
           rect(2, 2, 20, 2, "#ff0055") + rect(2, 20, 20, 2, "#ff0055") +
           rect(2, 4, 2, 16, "#ff0055") + rect(20, 4, 2, 16, "#ff0055") +
           rect(8, 8, 8, 8, "#ff0055") +
           rect(11, 11, 2, 2, "#ff0055"))

# Sections
create_svg("coder", "#00ff9f",
           rect(4, 4, 16, 12, "#00ff9f") + 
           rect(6, 6, 12, 8, "#0a0e27") +
           rect(2, 18, 20, 4, "#00d4ff"))

create_svg("tools", "#ffff00",
           rect(4, 4, 6, 16, "#ffff00") + rect(14, 4, 6, 16, "#ff00ff"))

create_svg("laptop", "#00d4ff",
           rect(2, 4, 20, 12, "#00d4ff") + rect(4, 6, 16, 8, "#0a0e27") +
           rect(0, 18, 24, 2, "#00d4ff"))

create_svg("chart", "#ff00ff",
           rect(2, 2, 2, 20, "#ff00ff") + rect(2, 20, 20, 2, "#ff00ff") +
           rect(6, 14, 4, 6, "#00ff9f") + 
           rect(12, 10, 4, 10, "#00d4ff") + 
           rect(18, 6, 4, 14, "#ffff00"))

create_svg("brain", "#ff00ff",
           rect(4, 4, 16, 14, "#ff00ff") + 
           rect(6, 6, 4, 4, "#ff88ff") + rect(14, 6, 4, 4, "#ff88ff") +
           rect(6, 12, 12, 4, "#ff88ff"))

create_svg("robot", "#00d4ff",
           rect(6, 4, 12, 10, "#00d4ff") + 
           rect(8, 6, 3, 3, "#000") + rect(13, 6, 3, 3, "#000") +
           rect(8, 11, 8, 2, "#000") +
           rect(4, 8, 2, 6, "#00d4ff") + rect(18, 8, 2, 6, "#00d4ff"))

create_svg("gear", "#ffff00",
           rect(8, 8, 8, 8, "#ffff00") + 
           rect(10, 2, 4, 4, "#ffff00") + rect(10, 18, 4, 4, "#ffff00") +
           rect(2, 10, 4, 4, "#ffff00") + rect(18, 10, 4, 4, "#ffff00"))

# Projects
create_svg("rocket", "#ff0055",
           rect(10, 2, 4, 4, "#ff0055") + rect(8, 6, 8, 8, "#ff0055") +
           rect(6, 14, 4, 6, "#ff0055") + rect(14, 14, 4, 6, "#ff0055") +
           rect(10, 16, 4, 4, "#ffff00") + rect(10, 20, 4, 4, "#ff8800"))

create_svg("hospital", "#ff0055",
           rect(4, 8, 16, 14, "#ffffff") +
           rect(10, 2, 4, 6, "#ffffff") +
           rect(10, 10, 4, 10, "#ff0055") + rect(7, 13, 10, 4, "#ff0055"))

create_svg("mic", "#00ff9f",
           rect(8, 2, 8, 12, "#00ff9f") +
           rect(11, 14, 2, 6, "#00ff9f") + rect(8, 20, 8, 2, "#00ff9f"))

create_svg("dna", "#00d4ff",
           rect(4, 4, 4, 4, "#00d4ff") + rect(16, 4, 4, 4, "#ff00ff") +
           rect(8, 8, 8, 2, "#ffffff") +
           rect(16, 10, 4, 4, "#00d4ff") + rect(4, 10, 4, 4, "#ff00ff") +
           rect(8, 14, 8, 2, "#ffffff") +
           rect(4, 16, 4, 4, "#00d4ff") + rect(16, 16, 4, 4, "#ff00ff"))

create_svg("memo", "#ffff00",
           rect(4, 2, 16, 20, "#ffff00") + 
           rect(6, 6, 12, 2, "#000000") + rect(6, 10, 12, 2, "#000000") + rect(6, 14, 8, 2, "#000000"))

create_svg("graph", "#00ff9f",
          rect(2, 22, 20, 2, "#00ff9f") +
          rect(2, 16, 4, 6, "#00ff9f") + rect(8, 10, 4, 12, "#00ff9f") + rect(14, 4, 4, 18, "#00ff9f"))

# Controls & UI
create_svg("play", "#00ff9f",
           '<polygon points="8,4 20,12 8,20" fill="#00ff9f"/>')

create_svg("sound-on", "#00ff9f",
           '<path d="M4,8 L4,16 L8,16 L14,22 L14,2 L8,8 L4,8 Z" fill="#00ff9f"/><path d="M18,8 A6,6 0 0,1 18,16" stroke="#00ff9f" stroke-width="2" fill="none"/><path d="M21,5 A10,10 0 0,1 21,19" stroke="#00ff9f" stroke-width="2" fill="none"/>')

create_svg("sound-off", "#ff0055",
           '<path d="M4,8 L4,16 L8,16 L14,22 L14,2 L8,8 L4,8 Z" fill="#ff0055"/><path d="M18,8 L24,14 M24,8 L18,14" stroke="#ff0055" stroke-width="2" fill="none"/>')

create_svg("cat", "#00d4ff",
           rect(6, 8, 12, 10, "#00d4ff") + 
           rect(6, 4, 2, 4, "#00d4ff") + rect(16, 4, 2, 4, "#00d4ff") +
           rect(8, 10, 2, 2, "#000") + rect(14, 10, 2, 2, "#000"))

create_svg("bulb", "#ffff00",
           rect(8, 4, 8, 12, "#ffff00") + rect(10, 16, 4, 4, "#888"))

# Contact
create_svg("email", "#ff00ff",
           rect(2, 4, 20, 16, "#ff00ff") + 
           '<path d="M2,4 L12,14 L22,4" stroke="#000" stroke-width="2" fill="none"/>')

create_svg("github", "#ffffff",
           rect(4, 4, 16, 16, "#ffffff"))

create_svg("linkedin", "#0077b5",
           rect(4, 4, 16, 16, "#0077b5") + rect(8, 8, 4, 4, "#fff"))

create_svg("trophy", "#gold",
           rect(6, 4, 12, 8, "#ffd700") + rect(10, 12, 4, 8, "#ffd700") + rect(6, 20, 12, 2, "#ffd700") +
           rect(2, 6, 4, 4, "#ffd700") + rect(18, 6, 4, 4, "#ffd700"))

create_svg("medal", "#silver",
           rect(10, 2, 4, 8, "#ff0055") + 
           '<circle cx="12" cy="16" r="6" fill="#c0c0c0"/>')

create_svg("grad-cap", "#ffffff",
           rect(4, 8, 16, 4, "#ffffff") + rect(8, 4, 8, 4, "#ffffff") + rect(12, 8, 2, 10, "#ffff00"))

create_svg("scroll", "#f4e4bc",
           rect(4, 2, 16, 20, "#f4e4bc") + rect(6, 6, 12, 2, "#000") + rect(6, 10, 12, 2, "#000"))

create_svg("wrench", "#aaaaaa",
           '<path d="M4,4 L10,10 L8,12 L2,6 Z M18,18 L12,12 L14,10 L20,16 Z" fill="#aaaaaa"/>')

create_svg("ruler", "#ff00ff",
           rect(2, 10, 20, 4, "#ff00ff") + rect(4, 10, 1, 2, "#000") + rect(8, 10, 1, 2, "#000") + rect(12, 10, 1, 2, "#000"))

create_svg("mailbox", "#00d4ff",
           rect(4, 4, 16, 12, "#00d4ff") + rect(10, 16, 4, 8, "#888"))

create_svg("link", "#00ff9f",
           '<path d="M4,12 L12,12 M12,12 L20,12" stroke="#00ff9f" stroke-width="4" stroke-linecap="round"/>')

create_svg("lightning", "#ffff00",
           '<polygon points="12,2 4,14 12,14 10,22 18,10 10,10" fill="#ffff00"/>')

create_svg("heart", "#ff0000",
           '<path d="M12,21.35 L10.55,20.03 C5.4,15.36 2,12.27 2,8.5 C2,5.41 4.42,3 7.5,3 C9.24,3 10.91,3.81 12,5.08 C13.09,3.81 14.76,3 16.5,3 C19.58,3 22,5.41 22,8.5 C22,12.27 18.6,15.36 13.45,20.03 L12,21.35 Z" fill="#ff0000"/>')

create_svg("briefcase", "#a0522d",
           rect(4, 6, 16, 14, "#a0522d") + rect(10, 2, 4, 4, "#a0522d"))

# Missing Icons
create_svg("hand", "#ffcc00",
           rect(4, 10, 4, 10, "#ffcc00") + rect(8, 6, 4, 14, "#ffcc00") + rect(12, 4, 4, 16, "#ffcc00") + rect(16, 8, 4, 12, "#ffcc00"))

create_svg("map", "#00d4ff",
           '<polygon points="4,6 10,4 16,6 22,4 22,18 16,20 10,18 4,20" fill="#00d4ff" stroke="#000" stroke-width="1"/>')

create_svg("palette", "#ff00ff",
            '<path d="M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z M6,12 C6,11 6.9,10 8,10 C9.1,10 10,11 10,12 C10,13 9.1,14 8,14 C6.9,14 6,13 6,12 Z M12,6 C12,5 12.9,4 14,4 C15.1,4 16,5 16,6 C16,7 15.1,8 14,8 C12.9,8 12,7 12,6 Z M18,12 C18,11 18.9,10 20,10 C21.1,10 22,11 22,12 C22,13 21.1,14 20,14 C18.9,14 18,13 18,12 Z" fill="#ff00ff"/>')
