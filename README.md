# SmartStock
projet de soutenance croisé

### Project structure

```
└─ .
      ├─ .env
   ├─ .env.example
   ├─ .expo
   │  ├─ devices.json
   │  ├─ README.md
   │  ├─ types
   │  │  └─ router.d.ts
   │  └─ web
   │     └─ cache
   │        └─ production
   │           └─ images
   │              └─ favicon
   │                 └─ favicon-24272cdaeff82cc5facdaccd982a6f05b60c4504704bbf94c19a6388659880bb-contain-transparent
   │                    └─ favicon-48.png
   ├─ api
   │  └─ axios.config.ts
   ├─ app
   │  ├─ (auth)
   │  │  ├─ login.tsx
   │  │  └─ _layout.tsx
   │  ├─ (products)
   │  │  ├─ new.tsx
   │  │  ├─ products.tsx
   │  │  ├─ reports.tsx
   │  │  ├─ [id].tsx
   │  │  └─ _layout.tsx
   │  ├─ (tabs)
   │  │  ├─ explore.tsx
   │  │  ├─ index.tsx
   │  │  ├─ scan.tsx
   │  │  ├─ settings.tsx
   │  │  └─ _layout.tsx
   │  ├─ +not-found.tsx
   │  ├─ loading.tsx
   │  ├─ StatsScreen.tsx
   │  └─ _layout.tsx
   ├─ App.css
   ├─ app.json
   ├─ assets
   │  ├─ fonts
   │  │  └─ SpaceMono-Regular.ttf
   │  └─ images
   │     ├─ favicon.png
   │     ├─ logo.jpg
   │     └─ scan.png
   ├─ babel.config.js
   ├─ components
   │  ├─ auth
   │  │  └─ ProtectedRoute.tsx
   │  ├─ Collapsible.tsx
   │  ├─ common
   │  │  ├─ ErrorBoundary.tsx
   │  │  ├─ Header.tsx
   │  │  └─ Loading.tsx
   │  ├─ ExternalLink.tsx
   │  ├─ forms
   │  │  ├─ FormInput.tsx
   │  │  ├─ ProductForm.tsx
   │  │  └─ StockForm.tsx
   │  ├─ HapticTab.tsx
   │  ├─ HelloWave.tsx
   │  ├─ ParallaxScrollView.tsx
   │  ├─ products
   │  │  ├─ BarcodeScanner.tsx
   │  │  ├─ HeaderSection.tsx
   │  │  ├─ PaginationControls.tsx
   │  │  ├─ ProductCard.tsx
   │  │  ├─ ProductForm.tsx
   │  │  ├─ ProductList.tsx
   │  │  ├─ SearchBar.tsx
   │  │  └─ SortButton.tsx
   │  ├─ statistics
   │  │  ├─ StatsCard.tsx
   │  │  └─ StatsGrid.tsx
   │  ├─ ThemedText.tsx
   │  ├─ ThemedView.tsx
   │  ├─ ui
   │  │  ├─ IconSymbol.ios.tsx
   │  │  ├─ IconSymbol.tsx
   │  │  ├─ modals
   │  │  │  └─ QuantityModal.tsx
   │  │  ├─ TabBarBackground.ios.tsx
   │  │  └─ TabBarBackground.tsx
   │  └─ __tests__
   │     ├─ ThemedText-test.tsx
   │     └─ __snapshots__
   │        └─ ThemedText-test.tsx.snap
   ├─ constants
   │  ├─ actionsItems.ts
   │  ├─ Colors.ts
   │  ├─ menuItems.ts
   │  └─ settingsItems.ts
   ├─ data
   │  └─ db.json
   ├─ expo-env.d.ts
   ├─ hooks
   │  ├─ useAuth.ts
   │  ├─ useColorScheme.ts
   │  ├─ useColorScheme.web.ts
   │  ├─ usePagination.ts
   │  ├─ useProductMutations.ts
   │  ├─ useProducts.ts
   │  ├─ useScanner.ts
   │  ├─ useStatistics.ts
   │  └─ useThemeColor.ts
   ├─ metro.config.js
   ├─ nativewind-env.d.ts
   ├─ package-lock.json
   ├─ package.json
   ├─ README.md
   ├─ scripts
   │  └─ reset-project.js
   ├─ services
   │  ├─ auth.ts
   │  ├─ products.ts
   │  └─ statistics.ts
   ├─ tailwind.config.js
   ├─ tests
   │  └─ auth.test.ts
   ├─ tsconfig.json
   ├─ types
   │  ├─ product.ts
   │  └─ stats.ts
   └─ utils
      ├─ productUtils.ts
      └─ validation.ts
```