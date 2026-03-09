# GitHub Issues Tracker

A responsive single-page web application to manage and view GitHub issues, built with HTML, Tailwind CSS, and plain JavaScript.

## Features
- Login validation (`admin` / `admin123`)
- View a dashboard grid of issues
- Filter issues by category (All, Open, Closed)
- Search functionality via REST API
- Dynamic card styling based on issue category
- Issue detail modal popup
- Responsive grid layout

## Technology Stack
- HTML5
- CSS (Tailwind CSS CDN)
- Vanilla JavaScript

## Question Answers

### 1️⃣ What is the difference between var, let, and const?
- **var**: Function-scoped. Can be re-assigned and re-declared. Variables declared with `var` are hoisted to the top of their scope and initialized with `undefined`.
- **let**: Block-scoped (enclosed within `{}`). Can be re-assigned but cannot be re-declared within the same scope. They are also hoisted but remain uninitialized in the "Temporal Dead Zone".
- **const**: Block-scoped like `let`. It cannot be re-assigned after initialization nor re-declared. However, if dealing with objects or arrays, `const` only protects the binding, meaning properties/elements can still be mutated.

### 2️⃣ What is the spread operator (...)?
The spread operator (`...`) allows an iterable (like an array or string) or an object to be expanded in places where zero or more arguments or elements are expected. It is commonly used for copying arrays/objects, concatenating arrays, or passing array elements as individual arguments to a function (e.g., `Math.max(...[1, 2, 3])`).

### 3️⃣ What is the difference between map(), filter(), and forEach()?
- **map()**: Iterates over an array, executes a callback on each element, and returns a **new array** populated with the results of the callback without mutating the original array.
- **filter()**: Iterates over an array and returns a **new array** containing only the elements that passed a specified test (callback returned a truthy value), keeping the original array intact.
- **forEach()**: Simply iterates over an array and executes a callback function for each element. It always returns `undefined` and is typically used to perform side effects (like logging or modifying external variables).

### 4️⃣ What is an arrow function?
An arrow function is a compact alternative syntax for writing function expressions introduced in ES6. It does not have its own bindings to `this`, `arguments`, `super`, or `new.target`. Because standard functions dynamically bind `this` based on how they are called, arrow functions are especially useful when working with callbacks, as they inherit `this` lexically from the surrounding context. 
Example: `const add = (a, b) => a + b;`

### 5️⃣ What are template literals?
Template literals are enclosed by backticks (`` ` ``) instead of standard quotes. They allow for multi-line strings, string interpolation (embedding variables or expressions directly into strings using `${expression}`), and tagged templates (parsing strings through a function). This makes code cleaner and easier to read compared to traditional string concatenation operators like `+`.
Example: `` const greet = `Hello, ${name}!`; ``
