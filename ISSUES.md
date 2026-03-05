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
