# Media Placement Guide for Gitanjali Productions Website

## 🎬 Interactive Elements & Media Opportunities

This guide shows where to add media (photos, videos, behind-the-scenes content) and what interactive effects are already implemented across the website.

---

## ✨ **Current Interactive Features**

### **1. Typewriter Effect (Home Page)**
- **Location**: Hero section - main tagline
- **Effect**: Automatically types and deletes rotating text
- **Current text**: "Stories that linger", "Cinema that moves", "Narratives that matter"
- **Customization**: Edit in `/src/content_option.js` → `introdata.animated`

### **2. Smooth Scroll Animations**
- **Where**: All major sections on every page
- **Effect**: Fade-in and slide-up when scrolling into view
- **Technical**: Uses `IntersectionObserver` API

### **3. Interactive Hover Effects**
- **Film videos** (About page): Lift up on hover with shadow
- **Accolades** (About page): Slide right on hover
- **Buttons**: Background inverts and lifts on hover
- **Navigation menu**: Click outside to close

### **4. Expandable Curriculum**
- **Location**: Workshop page → Curriculum section
- **Effect**: Click to expand/collapse each day's details
- **Icon**: + expands, − collapses

### **5. Expandable FAQs**
- **Location**: Workshop page → FAQs section
- **Effect**: Click to expand/collapse answers
- **Icon**: + expands, − collapses

---

## 📸 **Where to Add Media**

### **HOME PAGE (`/src/pages/home/`)**

#### **1. Hero Section - Background Media**
**Best for**: Full-screen cinematic photo or video loop

**Suggested media**:
- Behind-the-scenes film production photo
- Black and white production still
- Looping video of film equipment/set (10-15 seconds)

**How to implement**:
```css
/* In /src/pages/home/style.css */
.hero-section {
  background-image: url('YOUR_IMAGE_URL');
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* Parallax effect */
}

/* OR for video background: */
.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('YOUR_VIDEO_URL') center/cover no-repeat;
  opacity: 0.3;
  z-index: -1;
}
```

**Recommended specs**:
- Image: 1920x1080px, WebP format, < 300KB
- Video: 1920x1080px, MP4, < 5MB, muted loop

---

#### **2. Offerings Section - Individual Images**
**Best for**: Icon-style images for each service

**Suggested media** (for each offering):
- Screenwriting: Close-up of script pages
- Direction: Director's chair or viewfinder
- Workshops: Group workshop photo
- Post-Production: Editing timeline screenshot

**How to implement**:
Update `/src/content_option.js`:
```javascript
const studioOfferings = [
    {
        title: "Screenwriting",
        description: "...",
        image: "https://your-cdn.com/screenwriting.jpg"
    },
    // ... more
];
```

Then in `/src/pages/home/index.js`:
```jsx
{offering.image && (
  <img 
    src={offering.image} 
    alt={offering.title}
    className="offering-image"
  />
)}
```

---

#### **3. Recognition Section - Background Pattern**
**Best for**: Film festival logos or subtle texture

**Suggested media**:
- Collage of film festival laurels (faded)
- Film strip pattern
- Subtle noise texture

---

### **ABOUT PAGE (`/src/pages/about/`)**

#### **1. Hero Section - Profile Photo**
**Best for**: Professional portrait of Aryan

**Suggested media**:
- Black and white headshot
- On-set directing photo
- Professional portrait

**How to implement**:
Add to `/src/pages/about/index.js` after the title:
```jsx
<div className="about-image-container">
  <img 
    src="https://your-cdn.com/aryan-profile.jpg"
    alt="Aryan Bhattacharjee"
    className="about-profile-image"
  />
</div>
```

CSS in `/src/pages/about/style.css`:
```css
.about-image-container {
  margin: 60px auto;
  max-width: 400px;
  border-radius: 2px;
  overflow: hidden;
}

.about-profile-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.about-profile-image:hover {
  transform: scale(1.05);
}
```

**Recommended specs**: 800x800px, WebP, < 150KB

---

#### **2. Filmography - Already Implemented ✓**
**Current**: YouTube embedded videos
**Working perfectly** - no changes needed!

---

#### **3. Accolades Section - Background**
**Best for**: Film strip or award ceremony photo

**Suggested media**:
- Faded award ceremony photo
- Film reel texture
- Trophy silhouette

---

### **WORKSHOP PAGE (`/src/pages/portfolio/`)**

#### **1. Hero Section - Workshop Photo**
**Best for**: Past workshop photo or zoom screenshot

**Suggested media**:
- Zoom workshop screenshot (blurred faces)
- Screenplay formatting example
- Film production still

---

#### **2. Overview Section - Icons**
**Best for**: Small icons for Essence, AI, Outcomes

**Suggested media**:
- Essence: Script icon
- AI: Circuit/tech icon
- Outcomes: Film reel icon

---

#### **3. Enrollment Form - Trust Badges**
**Best for**: Payment security icons, testimonials

**Suggested media**:
- Razorpay logo
- NYU Tisch logo
- Past student testimonials with photos

---

## 🎨 **Advanced Interactive Effects to Add**

### **1. Parallax Scrolling**
**Where**: Home hero, About hero
**Effect**: Background moves slower than foreground

```css
.hero-section {
  background-attachment: fixed;
}
```

---

### **2. Image Reveal on Scroll**
**Where**: About page, filmography thumbnails
**Effect**: Images fade in as you scroll

```jsx
// Add to component
const [imageLoaded, setImageLoaded] = useState(false);

<img 
  src={url}
  className={`reveal-image ${imageLoaded ? 'loaded' : ''}`}
  onLoad={() => setImageLoaded(true)}
/>
```

```css
.reveal-image {
  opacity: 0;
  transform: scale(0.95);
  transition: all 0.6s ease;
}

.reveal-image.loaded {
  opacity: 1;
  transform: scale(1);
}
```

---

### **3. Text Highlighting on Hover**
**Where**: Recognition list, accolades
**Already implemented** for accolades!

---

### **4. Loading Skeleton**
**Where**: Video thumbnails, images
**Effect**: Grey placeholder while loading

```css
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

### **5. Cursor Trail Effect**
**Where**: Hero sections (optional)
**Effect**: Glowing trail follows cursor

**Note**: Can add if you want - currently disabled per request.

---

## 📋 **Quick Media Checklist**

### **Priority 1 (Recommended)**
- [ ] Hero background image/video (Home)
- [ ] Aryan's profile photo (About)
- [ ] Workshop photo (Workshop page)

### **Priority 2 (Nice to Have)**
- [ ] Service icons (Home → Offerings)
- [ ] Film festival logos (Home → Recognition)
- [ ] Past workshop screenshots (Workshop)

### **Priority 3 (Optional)**
- [ ] Texture overlays
- [ ] Pattern backgrounds
- [ ] Trust badges/logos

---

## 🎯 **Media Specifications**

### **Images**
- Format: **WebP** (best compression)
- Fallback: JPG
- Max file size: 200KB each
- Use: https://squoosh.app to compress

### **Videos**
- Format: **MP4 (H.264)**
- Max file size: 5MB
- Duration: 10-15 seconds for loops
- Must be: muted, autoplay, loop

### **Hosting Options**
1. **Cloudflare Images** - $5/month (recommended)
2. **Bunny CDN** - $1-3/month
3. **ImgBB** - Free tier available

See `SETUP_GUIDE.md` for hosting details.

---

## 🚀 **How to Add Your First Media**

### **Step 1**: Choose a photo
- Example: Aryan's profile photo for About page

### **Step 2**: Optimize it
1. Go to https://squoosh.app
2. Upload photo
3. Resize to 800x800px
4. Convert to WebP
5. Compress to < 150KB
6. Download

### **Step 3**: Upload to CDN
1. Create Cloudflare Images account (or use ImgBB)
2. Upload optimized photo
3. Copy the public URL

### **Step 4**: Add to website
1. Open `/src/content_option.js`
2. Add:
```javascript
const mediaUrls = {
    profilePhoto: "https://your-cdn.com/aryan-profile.webp"
};

export { mediaUrls };
```

3. Open `/src/pages/about/index.js`
4. Import and use:
```javascript
import { mediaUrls } from "../../content_option";

// In component:
<img src={mediaUrls.profilePhoto} alt="Aryan Bhattacharjee" />
```

---

## 💡 **Pro Tips**

1. **Always optimize** - Use WebP format
2. **Lazy load** - Add `loading="lazy"` to images
3. **Use CDN** - Don't host locally for production
4. **Alt text** - Always add for accessibility
5. **Test mobile** - Check how media looks on phones

---

## 📞 **Need Help?**

If you want help implementing any of these media placements or interactive effects, just let me know which ones you'd like to prioritize!

**Current Status**: Website is fully functional with core interactive features. Media can be added gradually.
