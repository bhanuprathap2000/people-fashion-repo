There is a component folder which contains all the components for using in the pages
Based on the place there are used in the page they are splitted into different folders
Header,Directory,Footer

We are folwwing this folder structure where
it contains index.js and styles.scss

---

React-router-dom
switch we are using because to match first match and return and we are using the render prop to render the required layout and the children components.

Layout
layout folder is for different layout we might need so acroos differnt routes

ex:

header and footer might be needed throught so we can wrap them in a layout and other routes pass props and render them and make them children for this layout.

For admin section we might require different layout so wrap other routes in this layout

---

pages

This is a folder containing the main pages we use all the components we made and reuse here to make a
page like registrtion or login or homepage
