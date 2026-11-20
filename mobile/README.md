# GlobalEdge Mobile Application
**Built for GlobalEdge Consultancy / HUZ Global Solutions**

A world-class, cross-platform mobile application built with **React Native** and **Expo SDK 58**, delivering end-to-end international university placements, fully funded government scholarship hunting, fee breakdowns, bilateral legal contract downloads, and a mobile-optimized Admin CRM.

---

## 📱 Live Web & PWA Preview
- **Live Mobile App URL:** [https://frontend-mu-five-97.vercel.app/app](https://frontend-mu-five-97.vercel.app/app)
- **App Showcase & QR Scanner:** [https://frontend-mu-five-97.vercel.app/mobile](https://frontend-mu-five-97.vercel.app/mobile)
- **Main Platform:** [https://frontend-mu-five-97.vercel.app](https://frontend-mu-five-97.vercel.app)

---

## 🚀 Key Features

### 1. 🎓 19+ Fully Funded Scholarships Directory
- Search and filter across top global government scholarships:
  - **China**: CSC (Chinese Government Scholarship) & ANSO Research Fellowship
  - **Japan**: MEXT Japanese Government Scholarship
  - **Germany**: DAAD Scholarship (Public Universities)
  - **South Korea**: GKS (Global Korea Scholarship)
  - **Europe**: Erasmus Mundus Joint Masters
  - **Russia**: Open Doors Olympiad & Study in Russia State Quota
  - **Saudi Arabia**: Study in Saudi Government Scholarship
  - **Indonesia**: KNB Developing Countries Scholarship
  - **United States**: SUSI Student Leaders & Fulbright Foreign Student Program
  - **France**: Eiffel France Excellence Scholarship
  - **Belgium**: Master Mind Scholarships
  - **United Kingdom**: Commonwealth Scholarship & Chevening
  - **Australia**: Australia Awards
  - **Switzerland**: Swiss Government Excellence
  - **Hungary**: Stipendium Hungaricum
  - **Turkey**: Türkiye Bursları All-Inclusive
- Direct external links to official portals and 1-tap "Apply With Us" guidance.

### 2. 🌍 Study Destinations Guide
- Detailed breakdown of 19+ countries (UK, USA, Germany, Canada, Australia, China, Russia, Saudi Arabia, France, Japan, South Korea, etc.)
- Visa acceptance rates, average tuition / free tuition policies, work rights (20-24 hrs/wk), post-study graduate work visa rules, and high-demand degree sectors.

### 3. 📝 3-Step Interactive Student Assessment Form
- Step 1: Contact Details (Name, WhatsApp number with country code, Email, City)
- Step 2: Academic Profile (Degree level, GPA/Marks, Field of Study, English test: IELTS/Duolingo/Medium of Instruction)
- Step 3: Destination & Scholarship selection with instant API synchronization to `https://frontend-mu-five-97.vercel.app/api/applications`.
- Offline local cache backup prevents student application loss in poor network conditions.

### 4. ⚖️ Itemized Pricing & Legal Contract Hub
- **Module A**: University Admission Placement = **€350** *(Includes 50% Refund Guarantee: €175 returned if admission is not secured)*
- **Module B**: Documentation, Visa File Prep & Mock Interview Coaching = **€400**
- **Module C**: Comprehensive Educational Consultancy Retainer = **€500**
- **All-in-One Comprehensive Package**: **€1,125** *(10% Discount applied, saves €125)*
- **Specialized Government Scholarship Track**: **€2,000 – €5,000**
- **Targeted Professor Hunting Campaign**: **€0.25 / email** (China, Japan, Korea, Europe)
- 1-Tap download buttons for official **PDF** and **Word (.docx)** legal agreements governed under the Contract Act, 1872 of Pakistan.

### 5. 🔐 Mobile Admin CRM Pipeline
- Secure passcode authentication (`admin123`, `globaledge2025`, `huzglobal786`).
- Real-time pipeline status management: *New*, *Under Review*, *Interview Scheduled*, *Visa Processing*, *Enrolled*.
- 1-Tap direct student actions:
  - 💬 **WhatsApp**: Opens conversation directly with pre-drafted message
  - 📞 **Call**: Dials student mobile number directly
  - ✉️ **Email**: Opens client with subject and greeting

---

## 🛠️ How to Run Locally

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Expo Go app on your physical iPhone (App Store) or Android (Google Play)

### Development Setup
```bash
# 1. Navigate to the mobile directory
cd mobile

# 2. Install dependencies
npm install

# 3. Start Expo development server
npx expo start
```
- Press `w` in terminal to launch the web version in your desktop browser.
- Open the camera on iOS or the **Expo Go** app on Android and scan the QR code displayed in the terminal to run live on your phone!

---

## 📦 How to Build Standalone Android APK

To generate an installable Android `.apk` file for testing or distribution:

```bash
# 1. Install EAS CLI globally
npm install -g eas-cli

# 2. Log in to your Expo account
eas login

# 3. Configure EAS Build
eas build:configure

# 4. Build preview APK (standalone Android package)
eas build -p android --profile preview
```
EAS Cloud will build the `.apk` and provide a direct download link.

---

## 🏢 Company Contact
- **Brand**: GlobalEdge Consultancy / HUZ Global Solutions
- **WhatsApp & Phone**: +92 312 4718386
- **Email**: huzglobalsolutions@gmail.com
- **Website**: https://frontend-mu-five-97.vercel.app
