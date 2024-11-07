# Pic-commerce

This is a simple e-commerce application built with `Vue.js` for the frontend and a `JSON Server` backend. The demo app allows users to:

1. Browse products, displaying images and details
2. Add products to their cart
3. View and manage the cart contents

The checkout process is not included in this demo. This application serves as an ideal example for demonstrating the integration of a Vue.js frontend with a RESTful API. It provides a clear and straightforward way to showcase product browsing, cart management, and communication with a backend API.

## Quick Start

You can install the application by first clone this repository

```
git@github.com:petrankar/pic-commerce.git
```

### Install backend

```
cd pic-commerce/backend
npm install
```

### Run the backend

```
cd pic-commerce/backend
npx  json-server db.json
```

### Install frontend

```
cd pic-commerce/frontend
npm install
```

### Run the frontend

```
cd pic-commerce/frontend
npm run dev
```

then open the localhost url to browse the application

## Frontend Application Details

### Framework and Libraries

The frontend application is developed using the `Vue.js` framework with `TypeScript` support. Components are written using `composition API` approach. For routing, the official `vue-router` library is used to handle navigation between different views and components within the application. For state management, the `Pinia` library is used, providing a simple and reactive way to manage and share state across components when needed.

## App Structure

The application follows a `hybrid structure` where separate directories are used to organize components, layouts, views, services, stores, and types. Each directory contains files relevant to a specific part of the application, with clear naming conventions. For example, for the products feature, files are named ProductList.vue, product.types.ts, and product.service.ts. This organization is effective for a `small application`, as it ensures a clean separation of concerns while keeping related code together.

However, as the application grows, this structure can be further refined. For larger applications with multiple distinct features, a more `feature-based approach` could be beneficial. For instance, the `ShoppingBasket` directory could include not just the components but also the service and store related to the shopping basket, making it easier to manage all aspects of the feature in one place.

For common or reusable functionality, such as utilities, types, or services, a common directory can be introduced. This allows different features to easily integrate shared resources, promoting reusability and maintainability. This approach is also referred to as `Screaming Architecture`, where the directory structure clearly indicates the purpose and responsibility of each feature or component, ensuring that the codebase remains scalable and easy to navigate as it grows.

### Layouts

In order to define a consistent structure or template that can be shared across the multiple pages layouts are used. There is a `DefaultLayout` in the layouts directory that determines the way the main elements of the layout appeared to a page. `DefaultLayout` is flexible, it uses slots in order to allow the `Views` to provide content to the appropriate position in the page.

### Views

The application consists of three main views: `HomeView`, `AboutView`, and `ShoppingBasketView`. Each of these views uses the `DefaultLayout`, with each view nesting its respective content components. While the views share a similar structure, having separate view components provides flexibility in structuring pages uniquely when needed. This approach allows for customizing elements like the `header`, `footer`, or other layout components in the future if specific views require a different layout or additional elements.

### Routes

The application has three main routes defined in `router/index.ts`, each rendering a specific view. To optimize loading performance, each view is loaded lazily through dynamic imports. This approach ensures that only the necessary view is loaded when a route is accessed, improving the application’s overall efficiency.

### Main Components

#### The Header

`The Header` component is a reusable component displayed across multiple app views. It provides navigation links to the main routes of the application and includes a `shopping cart icon` that displays the current item count. `The Header` component interacts with the `shopping-cart store` to dynamically show the total number of items in the basket, keeping the cart count updated in real time as items are added or removed.

#### Product List

When a user opens the application, they see the `Home view`, which displays the `ProductList` component. The `ProductList` is composed of two child components: `ProductCard` and `ProductSearch`.
Upon initialization, `ProductList` fetches products from the `product.service`, using pagination to retrieve a specified number of products per page. Pagination buttons allow users to navigate through different pages of products easily. Each product appears as a `ProductCard`, showcasing the product's image and essential details, along with an `"Add to Cart"` button for quick addition to the shopping cart. The `ProductList` also includes a `search feature` via the `ProductSearch` component.

Since this is the only page for product listing, it manages products within its own `internal component state`. Each time the user navigates back to this page, a fresh request is made to retrieve and display the latest set of products.

However for add to basket functionality, ProductList leverages the shopping-cart store to add products to the basket, ensuring the cart's state is consistent across the application. This approach enables seamless cart updates and improves user experience by keeping cart data accessible throughout the app.

#### Shopping Basket List

The `ShoppingBasketList` component displays the items currently in the shopping basket. Each item is rendered as a row using the `ShoppingBasketItem` component within a `ShoppingBasketTable` component, providing a structured view of all selected products.

The `ShoppingBasketList` integrates with the `shopping-cart store` to retrieve the list of products and the `total price` of the cart. Users can adjust the `quantity` of each item directly within the list, and setting an item’s quantity to zero removes it from the basket.

### State - Shopping Basket Store

The shopping basket store is the core of the basket functionality, built using Pinia. This store handles the addition, deletion, and all necessary calculations for managing the basket, and can be easily integrated into any part of the application. This approach offers a more seamless and efficient implementation than local storage, especially for real-time updates, as it keeps all basket data in memory and automatically re-renders components when changes occur.

However, unlike local storage, using only a Pinia store means that the shopping basket data will be lost on a page refresh or when the app is closed. To ensure the basket persists across hard refreshes, local storage can be used alongside the Pinia store, saving the basket state and reloading it when the app reopens. This hybrid approach combines the benefits of Pinia’s reactivity with the persistence of local storage, ensuring a more reliable and user-friendly experience.

### Services

To `fetch data` from the backend, a dedicated service directory is used, containing functions like `fetchProductsByPage`. By keeping data-fetching logic separate from UI components, these service functions can be easily reused across different parts of the application.

This separation not only `decouples API calls from the UI` views but also `centralizes error handling` and any necessary data transformation or mapping before passing data to components. This approach ensures that UI components receive prepared data, and makes future modifications to data-fetching logic easier to manage.

### Styling

For styling purposes, we use `CSS` and the `Flexbox` layout to create a flexible and responsive design. We leverage the default styles provided by Vue, such as `base.css`, which defines the basic color palette, global styles, and CSS custom properties (variables). These styles are then imported into `main.css`, which also includes additional global classes and media queries for app-wide usage. For component-specific styling,` scoped styles` are applied to modify and enhance the appearance of individual components.

## Testing

For testing, the application uses the Vitest library. To run the unit tests, use the following command:

bash
Αντιγραφή κώδικα

```
npm run test:unit
```

Unit tests have been created for the `shopping basket store`, `The Header` and some other key components. These tests help ensure that individual parts of the application function as expected, supporting code reliability and making maintenance easier.
