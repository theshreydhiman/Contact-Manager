# Contact Manager - Project Issues

## Bug: Critical

### 1. ContactDetail crashes on direct URL navigation
**File:** `src/components/ContactDetail.js:6`

Navigating directly to `/contact/:id` (e.g. refreshing the page or sharing the URL) causes the app to crash with a TypeError. `props.location.state.contact` is accessed without checking if `props.location.state` exists. When navigating directly (not via `<Link>`), `location.state` is `undefined`.

**Fix:** Add a null check for `props.location.state` and provide a fallback UI or redirect to the contact list.

---

### 2. localStorage data loss race condition on initial load
**File:** `src/components/App.js:27-34`

Contacts saved in localStorage can be overwritten with an empty array on page load. The initial state of `contacts` is `[]`. The save effect (line 32-34) fires with `[]` which can overwrite stored data before the load effect (line 27-30) runs.

**Fix:** Use lazy initialization for `useState`:
```js
const [contacts, setContacts] = useState(() => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
});
```

---

## Bug: Minor

### 3. Multiple typos in variable/function names and UI text

| File | Line | Current | Correct |
|------|------|---------|---------|
| `src/components/App.js` | 28 | `retriveContacts` | `retrieveContacts` |
| `src/components/ContactList.js` | 8 | `deleteConactHandler` | `deleteContactHandler` |
| `src/components/ContactCard.js` | 22 | `clickHander` | `clickHandler` |
| `src/components/ContactList.js` | 16 | `clickHander` | `clickHandler` |
| `src/components/AddContact.js` | 12 | `"ALl the fields are mandatory!"` | `"All the fields are mandatory!"` |

---

### 4. No email validation on Add Contact form
**File:** `src/components/AddContact.js:39`

The email input uses `type="text"` instead of `type="email"`. No format validation is performed — users can enter any arbitrary string as an email address.

**Fix:** Change to `type="email"` and optionally add regex validation before submission.

---

## Code Quality

### 5. Console.log statements left in production code

Debug statements leak internal data to the browser console:
- `src/components/App.js:15` — `console.log(contact)`
- `src/components/AddContact.js:17` — `console.log(this.props)`
- `src/components/ContactList.js:6` — `console.log(props)`

**Fix:** Remove all `console.log` statements.

---

### 6. Mixed component patterns: class and functional components

`AddContact.js` is a class component while all other components are functional. This creates inconsistency and prevents using hooks in `AddContact`.

**Fix:** Convert `AddContact.js` to a functional component using `useState`.

---

### 7. `.eslintcache` committed to repository

The `.eslintcache` file is a machine-specific cache file and should not be tracked by git.

**Fix:** Add `.eslintcache` to `.gitignore` and run `git rm --cached .eslintcache`.

---

### 8. No tests written despite testing libraries in dependencies

`@testing-library/react`, `@testing-library/jest-dom`, and `@testing-library/user-event` are listed as dependencies but no test files exist in the project.

**Fix:** Add unit tests for core functionality: adding/deleting contacts, rendering lists, form validation.

---

## Maintenance / Dependencies

### 9. Outdated dependencies: React 17, react-router-dom v5, react-scripts 4

| Package | Current | Latest |
|---------|---------|--------|
| react | 17.0.1 | 19.x |
| react-dom | 17.0.1 | 19.x |
| react-router-dom | 5.2.0 | 7.x |
| react-scripts | 4.0.1 | 5.x |
| uuidv4 | 6.2.6 | deprecated |

`react-router-dom v5` uses `<Switch>` and `component` prop removed in v6+. The `uuidv4` package is deprecated — use `uuid` or `crypto.randomUUID()`.

---

## Accessibility

### 10. Delete button not keyboard accessible
**File:** `src/components/ContactCard.js:18-22`

The delete action is an `<i>` element with `onClick`. It is not keyboard focusable, has no ARIA label, and no semantic role.

**Fix:** Replace with a `<button>` or add `role="button"`, `tabIndex={0}`, `aria-label="Delete contact"`, and `onKeyDown` handler.

---

## UI / UX

### 11. Page title is generic "React App"
**File:** `public/index.html:32`

The page title and meta description are still the Create React App defaults.

**Fix:** Change `<title>` to "Contact Manager" and update the `<meta name="description">` tag.

---

## Bug: Medium

### 12. Stale closure in `addContactHandler` can lose contacts
**File:** `src/components/App.js:16`

`addContactHandler` references `contacts` directly: `setContacts([...contacts, ...])`. If two contacts are added in rapid succession before a re-render, the second add overwrites the first because `contacts` is stale.

**Fix:** Use functional state update: `setContacts(prev => [...prev, { id: uuid(), ...contact }])`.

---

### 13. No 404 / fallback route for unmatched URLs
**File:** `src/components/App.js:40-60`

Navigating to any URL not matching `/`, `/add`, or `/contact/:id` renders a blank page with only the header. No feedback is given to the user.

**Fix:** Add a catch-all `<Route>` at the end of `<Switch>` that renders a "Page Not Found" component or redirects to `/`.

---

## Bug: Minor (additional)

### 14. Button nested inside Link is invalid HTML
**File:** `src/components/ContactList.js:25-27`

A `<button>` is wrapped inside a `<Link>` (which renders an `<a>` tag). Nesting interactive elements (`<button>` inside `<a>`) is invalid HTML per the spec and causes unpredictable behavior across browsers and screen readers.

**Fix:** Either style the `<Link>` as a button using CSS classes (`className="ui button blue right"`), or use `useHistory().push("/add")` on the button's `onClick`.

---

### 15. Inconsistent avatar images between ContactCard and ContactDetail
**Files:** `src/components/ContactCard.js:3`, `src/components/ContactDetail.js:3`

`ContactCard` imports `user.png` while `ContactDetail` imports `user.jpg`. Both files exist in `src/images/` but may display different images, causing visual inconsistency between the list and detail views.

**Fix:** Use the same image file in both components and remove the unused one.

---

### 16. Missing `logo192.png` referenced in index.html
**File:** `public/index.html:12`

The apple-touch-icon references `%PUBLIC_URL%/logo192.png` but this file does not exist in the `public/` directory. This causes a 404 when the app is added to a mobile home screen.

**Fix:** Either add a proper `logo192.png` or remove the `<link>` tag.

---

## Code Quality (additional)

### 17. Misleading prop name `getContactId` for delete handler
**File:** `src/components/App.js:48`

The `removeContactHandler` function is passed to `ContactList` as `getContactId`. The name implies a getter/accessor, but it actually deletes a contact. This is confusing for anyone reading the code.

**Fix:** Rename the prop to `onDeleteContact` or `removeContact` to match its behavior.

---

### 18. Testing libraries in `dependencies` instead of `devDependencies`
**File:** `package.json:6-8`

`@testing-library/jest-dom`, `@testing-library/react`, and `@testing-library/user-event` are listed under `dependencies` instead of `devDependencies`. These are only needed during development/testing and should not be bundled in production.

**Fix:** Move to `devDependencies`.

---

### 19. Unused CSS rule for search functionality
**File:** `src/components/App.css:10-13`

CSS rule `.ui.search input` exists but there is no search feature in the application. This is dead code.

**Fix:** Remove the unused CSS rule, or implement the search feature.

---

### 20. No error boundary wrapping the application
**File:** `src/index.js`

There is no React error boundary. Any unhandled error in a component (e.g., the ContactDetail crash from Issue #1) takes down the entire application with a white screen.

**Fix:** Add an error boundary component wrapping `<App />` that displays a user-friendly error message and a way to recover.

---

### 21. SRI integrity hash may be incorrect for Semantic UI CDN
**File:** `public/index.html:20`

The `integrity` attribute on the Semantic UI CSS `<link>` tag contains an SRI hash. If this hash doesn't match the actual file served by the CDN, the stylesheet will fail to load silently, leaving the app unstyled.

**Fix:** Verify the hash against the current CDN file, or remove the `integrity` attribute if not needed.
