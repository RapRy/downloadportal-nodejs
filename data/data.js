const fetches = [
  {
    heading: "Fetch Categories",
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
            defaultValue: "main",
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
            defaultValue: "undefined",
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
