ProductListAngularWebApp
ProductListAngularWebApp is a simple Angular application that demonstrates:

A Login screen requiring a bearer token.
A Products List view (fetches from a REST API).
A Product Detail dialog/page for creating or editing products.
Angular Material UI components and Reactive Forms for form handling.
This project is built with the Angular standalone component approach (no traditional AppModule), using Angular CLI v15+ (or higher).

Prerequisites
Node.js – version 16+ recommended
npm – version 8+ recommended (installed automatically with Node.js)
(Optional) Angular CLI – globally installed via:
```bash
npm install -g @angular/cli
```
Getting the Source
Clone this repository:
```bash
git clone https://github.com/<bekabaydullaev>/ProductListAngularWebApp.git
```
Navigate into the newly created folder:
```bash
cd ProductListAngularWebApp
```
Installation
Inside the project folder, install all dependencies:

```bash
npm install
```
This command reads package.json and downloads all the required npm packages into node_modules/.
Running Locally
To launch the local development server:

```bash
npm start
```
or:

```bash
ng serve --open
```
By default, it will run at http://localhost:4200.
The --open (or -o) flag automatically opens your default browser to that address.
Usage
1. Open the app in your browser at http://localhost:4200 (if it didn’t open automatically).
2. Login page:
- Enter any non-empty token in the text field, click Login.
- This token is used for the Authorization: Bearer <token> header in API requests.
3. Products List view:
- Displays all products retrieved from the REST API.
- Use the Create button to add a new product.
- Use the Edit or Delete actions on existing products.
4. Product Detail dialog (or page):
- Create mode: Fill out the fields (SKU, name, cost, description) and submit.
- Edit mode: Modify an existing product’s fields (except SKU if it’s disabled) and save changes.
