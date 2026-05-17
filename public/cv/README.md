# 📄 CV Storage

Welcome to the CV hub! This folder manages the CV downloads for the **Interactive Portfolio**.

🔗 **Live Portfolio:** https://vladpocris.github.io/InteractiveCV/

---

## 🚀 Quick Start

Place your CV PDF in this folder with the exact filename: `Vlad_Pocris_CV.pdf`

The portfolio's download button will automatically serve it to visitors.

## 📝 How to Update Your CV

1. **Replace** the old `Vlad_Pocris_CV.pdf` with your updated version
2. **Commit** the changes: `git add public/cv/Vlad_Pocris_CV.pdf && git commit -m "Update CV"`
3. **Push** to GitHub: `git push origin main`
4. **Done!** GitHub Actions automatically redeploys your site within seconds

The visitors hitting the "Download CV" button on your portfolio will always get the latest version.

## ⚙️ Technical Details

- **File location:** `/public/cv/Vlad_Pocris_CV.pdf`
- **Deployed at:** `https://vladpocris.github.io/InteractiveCV/cv/Vlad_Pocris_CV.pdf`
- **Accessed via:** Portfolio download button (uses Vite's `BASE_URL` for path resolution)
- **No build step needed:** Static assets in the `public/` folder are copied as-is during deployment

## 💡 Pro Tips

- Keep your CV file size reasonable (< 5MB) for faster downloads
- Use a consistent naming convention for version tracking
- Test the download link after each deployment
- Consider adding a "Last Updated" date to your CV for transparency
