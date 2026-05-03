# Stylra — Setup & Testing

## Quick Start

### Local Development
```bash
# Serve the app locally
npx serve

# Or use Python
python -m http.server 8000

# Or use PHP
php -S localhost:8000
```

Then open `http://localhost:8000/landing.html`

## Testing Shareable URLs

Try these examples:

```
http://localhost:8000/app.html?name=Tunde&style=cursive&gradient=linear-gradient(135deg,%23f9a8d4,%23e879f9)

http://localhost:8000/app.html?name=Stylra&style=vaporwave&glow=80&shadow=true

http://localhost:8000/app.html?name=Sisco&style=zalgo&gradient=linear-gradient(135deg,%23ef4444,%23c026d3)&italic=true
```

## Testing Offline Mode

1. Open app in browser
2. Open DevTools → Application → Service Workers
3. Check "Offline" checkbox
4. Refresh page — should still work
5. Fonts should load from cache

## Testing Canvas Export

1. Go to Studio
2. Type a name
3. Apply any style
4. Click download button
5. Check that exported PNG uses Plus Jakarta Sans font (not system font)
6. Compare to preview — should match closely

## Testing Responsive Design

### Landing Page
- Resize browser to 320px width
- Check nav doesn't wrap awkwardly
- Hero title should scale down
- Feature cards stack properly
- Footer stacks vertically

### App
- Already responsive
- Bottom nav shows on mobile
- Sidebar hidden on mobile

## Testing Zalgo Overflow

1. Go to Home
2. Type "Test"
3. Find the "Corrupt" style (Zalgo)
4. Card should not overflow vertically
5. Go to Studio with Zalgo
6. Preview should clip at max-height

## Browser Testing

Test in:
- Chrome/Edge (Chromium)
- Firefox
- Safari (iOS + macOS)
- Mobile browsers

## PWA Testing

1. Visit app 3+ times
2. Install prompt should appear after 10 seconds
3. Install the app
4. Open from home screen
5. Should work offline

## Performance Checks

- Lighthouse score should be 90+ for all categories
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- No console errors
- Service worker registers successfully

## Known Limitations

1. **ES modules require server** — Cannot open `file://` directly
2. **Canvas gradient approximation** — Won't perfectly match CSS
3. **Zalgo on very long names** — May still overflow if name is 30 chars + Zalgo

## Deployment

### Netlify
```bash
# netlify.toml
[build]
  publish = "."

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

### Vercel
```json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "status": 404, "dest": "/404.html" }
  ]
}
```

### GitHub Pages
- Just push to `gh-pages` branch
- Set custom 404.html in repo settings

## Troubleshooting

### Fonts not loading offline
- Clear cache and reload
- Check Network tab for font requests
- Verify service worker is active

### Shareable URLs not working
- Check console for errors
- Verify query params are URL-encoded
- Test with simple params first

### Canvas export looks wrong
- Check if font loaded (Network tab)
- Try exporting after 2-3 seconds
- Verify FontFace API support

## Support

For issues, contact Sisco via WhatsApp (link in app settings).
