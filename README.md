### Download Portal (Node JS)

DownloadStore API is an api that you can use whenever you want to create an app or a website that is similar to app store or the google play store. It is great for creating sample code and for testing purposes.

This project is built using nodejs, pug, expressjs, mongoose and mongodb as the database and other tech's. The sole purpose of this project is for me to learn on how to create an api and write a simple documentation. All the images that used in this project like image thumbnails, details and the screenshots of each contents are owned by their respective developers/owners.

#### Demo and Links

**API Link: [Download Store API](http://downloadstoreportal.herokuapp.com/)**

___

#### Routes
| Method | Route |
|--------|:------|
| Get | /categories |
| Get | /categories/name of category |
| Get | /subcategories |
| Get | /subcategories/name of category |
| Get | /contents |
| Get | /contents/name of category |
| Get | /contents/name of category/name of subcategory |
| Get | /contents/search?keyword=user input |
| Get | /contents/featured |
| Get | /contents/details/id of content |

___

#### Usage
###### Fetch Categories
> `fetch(“https://downloadstoreportal.herokuapp.com/categories”)`

###### Fetch Single Category
> `fetch(“https://downloadstoreportal.herokuapp.com/categories/Games”)`

###### Fetch All Subcategories
> `fetch(“https://downloadstoreportal.herokuapp.com/subcategories”)`

###### Fetch Subcategories by Category
> `fetch(“https://downloadstoreportal.herokuapp.com/subcategories/Games”)`

###### Fetch All Contents
> `fetch(“https://downloadstoreportal.herokuapp.com/contents”)`

###### Fetch Contents by Category
> `fetch(“https://downloadstoreportal.herokuapp.com/contents/Games”)`

###### Fetch Contents by Subcategory
> `fetch(“https://downloadstoreportal.herokuapp.com/contents/Games/Arcade”)`

##### Fetch Contents via Search
> `fetch(“https://downloadstoreportal.herokuapp.com/contents/search”)`

###### Fetch Featured Contents
> `fetch(“https://downloadstoreportal.herokuapp.com/contents/featured”)`

###### Fetch Single Content Details
> `fetch(“https://downloadstoreportal.herokuapp.com/contents/details/60768cf51a2259428bce41bf”)`

___

#### Examples
- **[Download Store](https://downloadstore.netlify.app)**
- **[Portal 3](https://portal-template-3.netlify.app)**
- **[Portal 9](https://portal-template-9.netlify.app)**
- **[Portal 1](https://portal-template-1.netlify.app)**
- **[Portal 6](https://content-portal-6.netlify.app)**
___

#### Tech's used to build this project
- **[Node Js](https://nodejs.org/en/)**
- **[Express](https://expressjs.com/)**
- **[Mongoose](https://mongoosejs.com/)**
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**
- **[bcrypt](https://www.npmjs.com/package/bcryptjs)**
- **[dotenv](https://www.npmjs.com/package/dotenv)**
- **[moment](https://momentjs.com/)**
- **[lodash](https://lodash.com/)**
- **[pug](https://pugjs.org/api/getting-started.html)**
