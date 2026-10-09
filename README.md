<div align="center">
  <img src="./assets/images/burger.png" alt="Juicy burger" width="220" />

  # Burger House

  **A little taste of something extraordinary.**

  A mobile-first burger menu built with Expo and React Native. Browse the menu,
  find your favorite, and make it yours.

  <br />

  ![Expo SDK 57](https://img.shields.io/badge/Expo-SDK%2057-4630EB?logo=expo&logoColor=white)
  ![React Native 0.86](https://img.shields.io/badge/React%20Native-0.86-61DAFB?logo=react&logoColor=black)
  ![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178C6?logo=typescript&logoColor=white)
</div>

---

## The menu, made delightful

Explore a curated burger menu in a warm, dark interface designed for browsing on
your phone. Filter by **Beef**, **Chicken**, or **Vegetarian**, check out the
featured picks, and open any burger for a closer look.

### What you can do

- Browse featured picks and the full burger menu.
- Filter the menu by category.
- View burger descriptions and prices on a dedicated detail screen.
- Adjust the quantity and see the total update instantly.
- Try the add-to-cart interaction on the detail screen.
- Run the app on Android, iOS, or the web.

> **Note:** This is a UI prototype. Menu items are local mock data, and cart
> interactions are for demonstration; no order is sent or saved.

## Get started

### Requirements

- Node.js (LTS recommended)
- npm
- For Android or iOS: a configured native development environment, or a
  compatible Expo development build

### Install and run

```bash
npm install
npm run start
```

Use the Expo CLI prompts to open the app on a connected device or simulator.

| Platform | Command |
| --- | --- |
| Android | `npm run android` |
| iOS | `npm run ios` |
| Web | `npm run web` |

> The Android and iOS scripts run native projects and require the corresponding
> platform development tools. The iOS simulator requires macOS.

## Project structure

```text
src/
├── app/                  # Expo Router screens
│   ├── burger/[id]/      # Burger detail screen
│   ├── about.tsx
│   ├── contact.tsx
│   ├── index.tsx         # Menu home screen
│   └── _layout.tsx       # Navigation layout
├── components/           # Reusable UI
├── mock/                 # Local burger menu data
└── types/                # Shared TypeScript types
assets/
└── images/               # App and menu imagery
```

## Tech stack

- [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/)
- [React Native](https://reactnative.dev/)
- [Expo Router](https://docs.expo.dev/versions/v57.0.0/sdk/router/)
- TypeScript
- `expo-image` and `expo-linear-gradient`

## Useful commands

```bash
npm run lint       # Check code with Expo ESLint
npx tsc --noEmit   # Type-check the project
```

---

<div align="center">
  Made with 🍔 and React Native
</div>
