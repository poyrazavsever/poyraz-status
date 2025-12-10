# 🎨 Status Page Design Transformation Plan

## 📋 Proje Özeti

Portfolio sitesinin subdomain'i olan Status Page'in tasarımını, ana portfolio ile uyumlu hale getirmek için komple yeniden tasarlama planı.

---

## 🎯 Mevcut Durum Analizi

### Status Projesi (Şu An)

- Eski Navbar + Footer sistemi kullanıyor
- Basit card-based layout
- Eski tema sistemi (light/dark/mint)
- Standart responsive tasarım

### Portfolio Projesi (Hedef)

- ActivityBar (sol taraf, vertical icon bar)
- Sidebar (sol kenarda, filtrelenebilir navigation)
- Gelişmiş tema sistemi (Obsidian, Aurora, Sunset, vb. - 20+ tema)
- Modern glass-panel efektleri
- Smooth animations ve transitions

---

## 🔄 ADIM ADIM DÖNÜŞÜM PLANI

### **PHASE 1: Temel Altyapı** ⚙️

#### 1.1 - Theme System Update ✅ TAMAMLANDI

- ✅ Theme Provider güncellendi (Obsidian temalar)
- ✅ CSS Variables güncellendi
- ✅ Theme Switcher modernize edildi
- ✅ 6 ana tema eklendi: Obsidian, Aurora, Sunset, Oceanic, Forest, Midnight

#### 1.2 - Navigation Data Cleanup ✅ TAMAMLANDI

- ✅ `data/navigation.ts` güncellendi (ikonlar düzeltildi)
- ✅ Status-specific linkler ayarlandı
- ✅ Social links modernize edildi

---

### **PHASE 2: Layout Transformation** 🎨

#### 2.1 - ActivityBar Implementasyonu

**Dosya:** `components/layout/activitybar.tsx`

**Görevler:**

- [ ] Portfolio ActivityBar'ı kopyala ve adapt et
- [ ] SearchData type'ını Status projelerine göre düzenle
  ```typescript
  type SearchData = {
    projects: AnyProject[];
  };
  ```
- [ ] ACTIVITY_LINKS yapılandırması:
  - Status (/)
  - Portfolio (https://poyrazavsever.com)
  - Search (#)
- [ ] SOCIAL_LINKS aynen kullanılacak
- [ ] Avatar image ayarla (`/avatars/activitybar.png`)
- [ ] Mobile bottom bar implementasyonu
- [ ] Tooltip animasyonları
- [ ] Social dropdown menüsü
- [ ] Settings butonu

**Özellikler:**

- Vertical icon bar (desktop)
- Bottom sticky bar (mobile)
- Keyboard shortcut support (⌘K / Ctrl+K)
- Hover tooltips
- Social dropdown with animations
- Settings sheet trigger

---

#### 2.2 - Sidebar Implementasyonu

**Dosya:** `components/layout/sidebar.tsx`

**Görevler:**

- [ ] Portfolio Sidebar'ı kopyala
- [ ] Sidebar linklerini ayarla:
  - All Projects (/)
  - Active Projects (/active)
  - Pending Projects (/pending)
  - Inactive Projects (/inactive)
- [ ] Search functionality: Proje isimlerine göre filtrele
- [ ] Active state highlighting
- [ ] Mobile overlay/drawer modal
- [ ] Smooth animations (Framer Motion)

**Özellikler:**

- Fixed left sidebar (desktop)
- Search input ile filtreleme
- Active route highlighting
- Mobile hamburger menu
- Smooth transitions

---

#### 2.3 - Layout.tsx Yeniden Yapılandırma

**Dosya:** `app/layout.tsx`

**Görevler:**

- [ ] Navbar + Footer sistemini kaldır
- [ ] ThemeProvider wrapper ekle
- [ ] ActivityBar ekle
- [ ] Sidebar ekle
- [ ] Main content area için margin ayarları:
  ```css
  main {
    margin-left: calc(56px + 16rem + 1rem); /* ActivityBar + Sidebar */
    padding-bottom: 5rem; /* Mobile bottom bar için */
  }
  ```
- [ ] LayoutWrapper component oluştur (client-side rendering için)
- [ ] Projects data'yı layout'a aktar

**Yapı:**

```tsx
<ThemeProvider>
  <ActivityBar searchData={...} />
  <Sidebar links={categoryLinks} />
  <main>{children}</main>
  <Footer />
</ThemeProvider>
```

---

#### 2.4 - LayoutWrapper Component

**Dosya:** `components/layout/layout-wrapper.tsx`

**Görevler:**

- [ ] Client component olarak işaretle (`"use client"`)
- [ ] ActivityBar ve Sidebar'ı wrap et
- [ ] Props: `projects`, `sidebarLinks`
- [ ] Server component'ten gelen data'yı client component'e aktar

---

### **PHASE 3: Page Components Update** 📄

#### 3.1 - Home Page (All Projects)

**Dosya:** `app/page.tsx`

**Mevcut:** StatusCard grid layout  
**Hedef:**

- [ ] Modern card design (glass-panel efekti)
- [ ] Hover animations (scale, glow)
- [ ] Status badge'leri güncel tasarım (Active/Pending/Inactive)
- [ ] Smooth transitions
- [ ] Stagger animations (kartlar sırayla belirir)
- [ ] Loading skeleton states
- [ ] Empty state design

**Card Layout:**

```tsx
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
>
  {projects.map((project) => (
    <motion.div key={project.id} variants={cardVariants}>
      <StatusCard project={project} />
    </motion.div>
  ))}
</motion.div>
```

---

#### 3.2 - Category Pages (Active/Pending/Inactive)

**Dosyalar:** `app/active/page.tsx`, `app/pending/page.tsx`, `app/inactive/page.tsx`

**Görevler:**

- [ ] Aynı card tasarımını kullan
- [ ] Filtrelenmiş içerik göster
- [ ] Header ile kategori bilgisi:
  ```tsx
  <h1>Active Projects</h1>
  <p className="text-muted">Currently running projects</p>
  ```
- [ ] Animations
- [ ] Empty state designs (kategori boşsa)
- [ ] Count badge (X active projects)

---

#### 3.3 - StatusCard Component Redesign

**Dosya:** `components/shared/statusCard.tsx`

**Görevler:**

- [ ] Glass-panel background effect
  ```css
  background: color-mix(in srgb, var(--color-surface) 70%, transparent);
  backdrop-filter: blur(12px);
  ```
- [ ] Gradient borders
- [ ] Hover effects:
  - Scale (1.02)
  - Glow shadow
  - Border color change
- [ ] Status indicator:
  - Active: Green pulse animation
  - Pending: Yellow/Orange pulse
  - Inactive: Gray static
- [ ] Tech stack pills:
  - Rounded badges
  - Accent color highlights
  - Hover effects
- [ ] Last updated badge:
  - Absolute position (top-right)
  - Glassmorphism
  - Icon + text
- [ ] Live URL button (sadece Active için):
  - External link icon
  - Hover animation

**Tasarım:**

```tsx
<motion.div
  whileHover={{ scale: 1.02, boxShadow: "var(--shadow-glow)" }}
  className="glass-panel rounded-2xl p-6 border border-(--color-border)"
>
  <StatusBadge status={project.status} />
  <h3>{project.title}</h3>
  <p className="text-muted">{project.description}</p>
  <TechStack items={project.stack} />
  <LastUpdated date={project.lastUpdated} />
  {project.liveUrl && <LiveButton url={project.liveUrl} />}
</motion.div>
```

---

### **PHASE 4: Search Modal** 🔍

#### 4.1 - SearchModal Implementation

**Dosya:** `components/layout/search-modal.tsx`

**Görevler:**

- [ ] Portfolio SearchModal'ı adapt et
- [ ] Search entities tanımla:
  - Projects (title, description, tech stack, status)
  - Social links
  - Quick actions (theme değiştir, email kopyala)
- [ ] Fuse.js entegrasyonu (fuzzy search)
- [ ] Keyboard shortcuts:
  - ⌘K / Ctrl+K: Modal aç
  - Escape: Modal kapat
  - Enter: İlk sonuca git
- [ ] Results categorization:
  - Actions
  - Projects
  - Social Links
- [ ] Empty state (sonuç bulunamadı)
- [ ] Loading state
- [ ] Smooth animations (modal entrance/exit)

**Özellikler:**

- Command palette style
- Real-time filtering
- Keyboard navigation
- Category icons
- Result preview

---

### **PHASE 5: Theme Sheet** ⚙️

#### 5.1 - SettingsSheet/ThemeSheet

**Dosya:** `components/layout/theme-sheet.tsx`

**Görevler:**

- [ ] Portfolio SettingsSheet'i kopyala
- [ ] ThemeSwitcher component'ini entegre et
- [ ] Modal overlay + backdrop blur
- [ ] Theme preview cards:
  - Tema renk paletleri
  - Mood indicator (Dark, Neon, Warm, Cool, vb.)
  - Active theme indicator (check icon)
- [ ] Click outside to close
- [ ] Escape to close
- [ ] Smooth animations (slide up from bottom)

**Tema Grid:**

```tsx
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
  {APP_THEMES.map((theme) => (
    <ThemeCard
      key={theme.id}
      theme={theme}
      active={currentTheme === theme.id}
      onClick={() => setTheme(theme.id)}
    />
  ))}
</div>
```

---

### **PHASE 6: Styling & Polish** ✨

#### 6.1 - Global Styles

**Dosya:** `app/globals.css`

**Görevler:**

- [ ] Custom scrollbar (tema uyumlu):
  ```css
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: var(--color-surface);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-accent);
  }
  ```
- [ ] Selection colors (tema renkleri)
- [ ] Focus states (accent color ring)
- [ ] Loading states (skeleton screens)
- [ ] Transition utilities

---

#### 6.2 - Animations

**Kütüphane:** Framer Motion

**Görevler:**

- [ ] Page transitions:
  - Fade in
  - Slide from bottom
  - Duration: 0.3s
- [ ] Card stagger animations:
  - Container: staggerChildren
  - Children: fadeIn + slideUp
- [ ] Hover effects:
  - whileHover: scale(1.02)
  - whileTap: scale(0.98)
- [ ] Modal animations:
  - Backdrop: fade in/out
  - Content: slide up + fade
- [ ] Button animations:
  - Ripple effect
  - Scale on press

**Örnek Variants:**

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
```

---

#### 6.3 - Responsive Design

**Breakpoints:**

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Görevler:**

- [ ] Mobile layout:
  - ActivityBar: Bottom sticky (icons only)
  - Sidebar: Overlay modal (hamburger button)
  - Content: Full width
  - Cards: 1 column
- [ ] Tablet layout:
  - ActivityBar: Left sidebar (collapsed)
  - Sidebar: Toggleable
  - Cards: 2 columns
- [ ] Desktop layout:
  - ActivityBar: Fixed left (56px)
  - Sidebar: Fixed left (256px)
  - Content: Margin-left (56px + 256px + 1rem)
  - Cards: 3 columns

---

### **PHASE 7: Final Touches** 🎉

#### 7.1 - Footer Update

**Dosya:** `components/layout/footer.tsx`

**Görevler:**

- [ ] Minimal glassmorphism design
- [ ] Copyright text
- [ ] Social links (optional)
- [ ] Theme: var(--color-surface) with backdrop-blur
- [ ] Border-top: var(--color-border)

```tsx
<footer className="glass-panel border-t border-(--color-border) py-6 text-center">
  <p className="text-sm text-(--color-muted)">
    © {new Date().getFullYear()} Poyraz Avsever - Status Page
  </p>
</footer>
```

---

#### 7.2 - Loading & Error States

**Görevler:**

- [ ] Loading skeleton screens (kartlar için)
- [ ] Spinner component (global loading)
- [ ] Error boundary
- [ ] Error page (500)
- [ ] Empty states (kategori boşsa)
- [ ] Toast notifications (kopyalama, tema değişimi)

---

#### 7.3 - 404 Page

**Dosya:** `app/not-found.tsx`

**Görevler:**

- [ ] Modern 404 design
- [ ] Animated illustration
- [ ] "Go back home" button
- [ ] Theme uyumlu

---

#### 7.4 - Accessibility (a11y)

**Görevler:**

- [ ] ARIA labels (buttons, links, modals)
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Focus indicators (visible focus ring)
- [ ] Screen reader support
- [ ] Color contrast (WCAG AA compliance)
- [ ] Skip to content link

---

#### 7.5 - Performance Optimization

**Görevler:**

- [ ] Image optimization (Next.js Image)
- [ ] Lazy loading (modals, search)
- [ ] Code splitting
- [ ] Font optimization
- [ ] CSS purge (unused styles)
- [ ] Bundle analysis

---

## 📊 DOSYA YAPISI DEĞİŞİKLİKLERİ

### Silinecek:

```
❌ components/layout/navbar.tsx
```

### Güncellenecek:

```
📝 components/layout/footer.tsx → Minimal footer
📝 app/layout.tsx → Major update (ActivityBar + Sidebar)
📝 app/page.tsx → Styling updates
📝 components/shared/statusCard.tsx → Complete redesign
📝 app/globals.css → ✅ Güncellendi (Phase 1)
```

### Eklenecek:

```
✨ components/layout/activitybar.tsx → Portfolio'dan adapt
✨ components/layout/sidebar.tsx → Portfolio'dan adapt
✨ components/layout/search-modal.tsx → Portfolio'dan adapt
✨ components/layout/theme-sheet.tsx → Portfolio'dan adapt
✨ components/layout/layout-wrapper.tsx → Client wrapper
✨ app/not-found.tsx → 404 page
```

---

## ⏱️ TAHMİNİ SÜRE

| Phase                          | Süre           | Durum         |
| ------------------------------ | -------------- | ------------- |
| Phase 1: Temel Altyapı         | ~5 dk          | ✅ Tamamlandı |
| Phase 2: Layout Transformation | ~15 dk         | ⏳ Bekliyor   |
| Phase 3: Page Components       | ~20 dk         | ⏳ Bekliyor   |
| Phase 4: Search Modal          | ~5 dk          | ⏳ Bekliyor   |
| Phase 5: Theme Sheet           | ~5 dk          | ⏳ Bekliyor   |
| Phase 6: Styling & Polish      | ~10 dk         | ⏳ Bekliyor   |
| Phase 7: Final Touches         | ~10 dk         | ⏳ Bekliyor   |
| **TOPLAM**                     | **~70 dakika** |               |

---

## 🎨 Tasarım Referansları

### Portfolio Site Özellikleri (Hedef)

- **Layout:** ActivityBar + Sidebar + Main Content
- **Tema Sistemi:** 20+ tema (Obsidian, Aurora, Sunset, vb.)
- **Animasyonlar:** Framer Motion (smooth, subtle)
- **Glassmorphism:** backdrop-blur, semi-transparent surfaces
- **Typography:** Nunito font family
- **Color System:** CSS variables (--color-\*)
- **Icons:** Iconify (solar, mdi, ri prefix'li)

### Status Page Özellikleri (Unique)

- **Content:** Project status cards
- **Categories:** Active, Pending, Inactive
- **Features:** Live URL links, tech stack badges, last updated
- **Search:** Project-specific search (title, tech, status)

---

## 🚀 Başlangıç Komutu

```bash
# Development server
pnpm dev

# Build
pnpm build

# Start production
pnpm start
```

---

## 📝 Notlar

1. **Theme Consistency:** Tüm componentlerde `var(--color-*)` kullan
2. **Animations:** Subtle ve performant (60fps)
3. **Accessibility:** Keyboard navigation ve screen reader support
4. **Mobile First:** Mobile tasarımdan başla, desktop'a genişlet
5. **Type Safety:** TypeScript strict mode
6. **Code Quality:** ESLint + Prettier

---

## ✅ İlerleme Takibi

- [x] Phase 1: Temel Altyapı
- [ ] Phase 2: Layout Transformation
- [ ] Phase 3: Page Components Update
- [ ] Phase 4: Search Modal
- [ ] Phase 5: Theme Sheet
- [ ] Phase 6: Styling & Polish
- [ ] Phase 7: Final Touches

---

**Son Güncelleme:** 10 Aralık 2025  
**Durum:** Phase 1 Tamamlandı, Phase 2'ye hazır 🚀
