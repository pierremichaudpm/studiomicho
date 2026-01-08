# 📸 Images Folder - Instructions

## 🎯 Purpose
This folder contains screenshots and images for the Portfolio section browsers.

## 📁 Place your project screenshots here

### Expected files:
```
images/
├── op2-screenshot.jpg      ← Your OP2 project screenshot
├── gpcqm-screenshot.jpg    ← Your GPCQM project screenshot
└── tonic-screenshot.jpg    ← Your TONIC project screenshot
```

## 📐 Image specifications

### Recommended dimensions:
- **Width**: 1920px minimum
- **Height**: 1080px minimum (or taller if you want to show scrolling content)
- **Format**: JPG (for photos/screenshots) or PNG (for graphics)
- **Quality**: 80-85%
- **File size**: 300-500KB maximum (optimize for web)

### Aspect ratio:
The browser window is **wide and rectangular**, so landscape images work best.

## 🎨 How to take good screenshots

### 1. Full browser screenshot
- Open your project in a browser
- Use full-screen mode (F11)
- Take screenshot:
  - **Mac**: `Cmd + Shift + 3`
  - **Windows**: `Win + Shift + S`
  - **Linux**: `Shift + Print Screen`

### 2. Capture the best view
- Show the homepage or most impressive page
- Include navigation and key features
- Avoid showing empty states or loading screens
- Make sure text is readable

### 3. Optimize the image
Use online tools:
- **TinyPNG**: https://tinypng.com
- **Squoosh**: https://squoosh.app
- **Compressor.io**: https://compressor.io

Target: **300-500KB** per image

## 🔗 After adding images

1. **Restart the dev server** (if running):
   ```bash
   # Stop: Ctrl+C
   # Start: npm run dev
   ```

2. **Check the Portfolio section**:
   - Open http://localhost:3000
   - Scroll to Portfolio
   - Your images should appear in the browsers

3. **If images don't show**:
   - Check file names match exactly (case-sensitive!)
   - Verify files are in `public/images/` folder
   - Hard refresh browser: `Ctrl+F5`

## 📝 How to configure

Edit `components/Portfolio.tsx`:

```typescript
<Browser
  name="YOUR PROJECT"
  imageUrl="/images/your-screenshot.jpg"  ← Change this
  projectUrl="https://your-site.com"      ← Change this
/>
```

## ✅ Quick checklist

- [ ] Screenshot taken at 1920x1080 or larger
- [ ] Image optimized (< 500KB)
- [ ] File named correctly (e.g., `op2-screenshot.jpg`)
- [ ] File placed in `public/images/` folder
- [ ] Server restarted
- [ ] Image appears on site

## 💡 Pro tips

### Use different formats:
- **JPG**: For photos and screenshots (smaller file size)
- **PNG**: For graphics with transparency
- **WebP**: For modern browsers (best compression)

### Capture long pages:
Use browser extensions like:
- **Chrome**: "GoFullPage" or "Full Page Screen Capture"
- **Firefox**: Built-in screenshot tool (right-click → "Take Screenshot")

### Show the site in action:
- Capture with real content (not lorem ipsum)
- Show interactive features
- Display real data or mockups

## 🚀 Example file structure

```
public/
└── images/
    ├── README.md (this file)
    ├── op2-screenshot.jpg (952 KB → optimize!)
    ├── gpcqm-screenshot.jpg (458 KB ✓)
    └── tonic-screenshot.jpg (723 KB → optimize!)
```

## 🔄 Next steps

1. Add your 3 screenshots to this folder
2. Open `ADD_YOUR_PROJECTS.md` for detailed instructions
3. Edit `components/Portfolio.tsx` to link them
4. Test on http://localhost:3000

---

**Need help?** Check `ADD_YOUR_PROJECTS.md` in the project root.