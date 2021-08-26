const fetches = [
  {
    heading: "Fetch All Categories",
    link: "https://downloadstoreportal.herokuapp.com/categories",
    output: `
      {
          categories: [
              {
                _id: String, 
                catName: String, 
                catIcon: String, 
                catExt: String, 
                subCategories: Array, 
                active: Number
              }, 
              { ... }, 
              { ... }
          ]
      }`,
  },
  {
    heading: "Fetch Single Category",
    link: "https://downloadstoreportal.herokuapp.com/categories/Games",
    output: `
      {
          category: 
            {
                _id: String, 
                catName: String, 
                catIcon: String, 
                catExt: String, 
                subCategories: Array, 
                active: Number
            }
      }`,
  },
  {
    heading: "Fetch All Subcategories",
    link: "https://downloadstoreportal.herokuapp.com/subcategories",
    parameters: [
      {
        type: "optional",
        params: [
          {
            key: "group",
            values: [
              {
                value: "main",
                desc: "to group subcategories by category",
                example:
                  "https://downloadstoreportal.herokuapp.com/contents/subcategories?group=main",
              },
            ],
          },
        ],
      },
    ],
    output: `
      {
          subcategories: [
              {
                _id: String, 
                parent_id: String, 
                subCatName: String, 
                catName: String, 
                active: Number
              }, 
              { ... }, 
              { ... }
          ]
      }`,
  },
  {
    heading: "Fetch Subcategories By Category",
    link: "https://downloadstoreportal.herokuapp.com/subcategories/Games",
    output: `
      {
          subcategories: [
              {
                _id: String, 
                parent_id: String, 
                subCatName: String, 
                catName: String, 
                active: Number
              }, 
              { ... }, 
              { ... }
          ]
      }`,
  },
  {
    heading: "Fetch Contents By Category",
    link: "https://downloadstoreportal.herokuapp.com/contents/Games",
    parameters: [
      {
        type: "optional",
        params: [
          {
            key: "group",
            values: [
              {
                value: "main",
                desc: "to group contents by category",
                example:
                  "https://downloadstoreportal.herokuapp.com/contents/Games?group=sub",
              },
              {
                value: "sub",
                desc: "to group contents by each subcategories",
                example:
                  "https://downloadstoreportal.herokuapp.com/contents/Games?group=main",
              },
            ],
          },
          {
            key: "limit",
            values: [
              {
                value: "number",
                desc: "set limit of contents to show",
                example:
                  "https://downloadstoreportal.herokuapp.com/contents/Games?limit=20",
              },
            ],
          },
        ],
      },
    ],
    output: `
      {
        contents: 
            [
              {
                _id: String,
                name: String,
                catName: String,
                subCatName: String,
                thumbnail: String
              },
              { ... },
              { ... }
            ]
      }
      `,
  },
  {
    heading: "Fetch Contents By Subcategory",
    link: "https://downloadstoreportal.herokuapp.com/contents/Games/Arcade",
    output: `
        {
            contents:
                [
                    {
                        _id: String,
                        name: String,
                        catName: String,
                        subCatName: String,
                        thumbnail: String
                      },
                      { ... },
                      { ... }
                ]     
        }
    `,
  },
  {
    heading: "Fetch Contents Via Search",
    link: "https://downloadstoreportal.herokuapp.com/contents/search",
    parameters: [
      {
        type: "required",
        params: [
          {
            key: "keyword",
            values: [
              {
                value: "user input",
                desc: "search content collection based from the user input",
                example:
                  "https://downloadstoreportal.herokuapp.com/contents/search?keyword=user input",
              },
            ],
          },
        ],
      },
    ],
    output: `
      {
        contents: 
            [
              {
                _id: String,
                name: String,
                catName: String,
                subCatName: String,
                thumbnail: String
              },
              { ... },
              { ... }
            ]
      }
      `,
  },
  {
    heading: "Fetch Featured Contents",
    link: "https://downloadstoreportal.herokuapp.com/contents/search",
    output: `
      {
        contents:
          [
            {
              _id: String,
              name: String,
              catName: String,
              subCatName: String,
              thumbnail: String,
              featured: Boolean,
              snippet: String
            },
            { ... },
            { ... }
          ]
      }
      `,
  },
  {
    heading: "Fetch Single Content Details",
    link: "https://downloadstoreportal.herokuapp.com/contents/details/60768cf51a2259428bce41bf",
    output: `
      {
        content:
          {
            meta: Object,
            screenshots: Array,
            _id: String,
            name: String,
            catName: String,
            subCatName: String,
            description: String,
            thumbnail: String,
            filename: String,
            banner: String,
            snippet: String,
            featured: Boolean,
            filesize: Number
          }
      }
      `,
  },
];

const routes = [
  { method: "get", route: "/categories" },
  { method: "get", route: "/categories/name of category" },
  { method: "get", route: "/subcategories" },
  { method: "get", route: "/subcategories/name of category" },
  { method: "get", route: "/contents/name of category" },
  { method: "get", route: "/contents/name of category/name of subcategory" },
  { method: "get", route: "/contents/search?keyword=user input" },
  { method: "get", route: "/contents/featured" },
  { method: "get", route: "/contents/details/id of content" },
];

module.exports = {
  fetches,
  routes,
};
