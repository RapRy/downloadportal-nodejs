### Download Portal (Node JS)

#### Demo and Links

**API Link: [Download Store API](http://downloadstoreportal.herokuapp.com/)**

---

#### Routes

| Method | Route                                          |
| ------ | :--------------------------------------------- |
| Get    | /categories                                    |
| Get    | /contents/name of category                     |
| Get    | /subcategories                                 |
| Get    | /subcategories/name of category                |
| Get    | /contents                                      |
| Get    | /contents/name of category                     |
| Get    | /contents/name of category/name of subcategory |
| Get    | /contents/search?keyword=user input            |
| Get    | /contents/featured                             |
| Get    | /contents/details/id of content                |

---

#### Usage

###### Fetch Categories

> `fetch(“https://downloadstoreportal.herokuapp.com/categories”)`

###### Fetch Subcategories

> `fetch("https://downloadstoreportal.herokuapp.com/subcategories")`

###### Fetch Subcategories By Category

> `fetch("https://downloadstoreportal.herokuapp.com/subcategories/Games")`

###### Fetch All Contents

> `fetch("https://downloadstoreportal.herokuapp.com/contents")`

###### Fetch Contents By Category

> `fetch(“https://downloadstoreportal.herokuapp.com/contents/Games”)`

###### Fetch Contents By Subcategory

> `fetch(“https://downloadstoreportal.herokuapp.com/contents/Games/Arcade”)`

###### Fetch Contents Via Search

> `fetch(“https://downloadstoreportal.herokuapp.com/contents/search”)`

###### Fetch Featured Contents

> `fetch(“https://downloadstoreportal.herokuapp.com/contents/featured”)`

###### Fetch Single Content Details

> `fetch(“https://downloadstoreportal.herokuapp.com/contents/details/60768cf51a2259428bce41bf”)`

---

#### Examples

- **[Download Store](https://downloadstore.netlify.app)**
- **[Portal 3](https://portal-template-3.netlify.app)**
- **[Portal 9](https://portal-template-9.netlify.app)**
- **[Portal 1](https://portal-template-1.netlify.app)**
- **[Portal 6](https://content-portal-6.netlify.app)**

---

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
