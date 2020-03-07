# gatsby-bucklescript-output-linker

Plugin that makes Gatsby aware of GraphQL queries on your ReasonML codebase when it lives outside the `src` directory.

## Why

With the current solutions that allow you to use Gatsby with ReasonML and Bucklescript, you are not allowed to write your GraphQL queries in your ReasonML code, unless your `.re`, as well as their compiled versions `.bs.js` files sit right next to your Gatsby `.js` files, in the `src` directory. The reason for this is Gatsby currently only looks for query in the `src`, `.cache`, `fragments` and the folders of the Gatsby plugins that you've declared on your `package.json`.

There's nothing wrong with using the `src` directory for the codebases of both languages and your GraphQL queries should work just fine if you do. However, if you prefer to keep them in separate folders of you'd like Bucklescript build files not to live next to their sources, but to use Bucklescript's `lib` output folder, there isn't an easy way.

This plugin basically hacks a symbolic link between the Buckescript's `lib` output folder and this plugin's own directory in `node_modules`, that Gatsby will properly watch for changes and compile.

## Setup

1.  Install `gatsby-bucklescript-output-linker`

    ```
    npm i gatsby-bucklescript-output-linker
    ```

    or

    ```
    yarn add gatsby-bucklescript-output-linker
    ```


2.  Add `'gatsby-bucklescript-output-linker'` to `gatsby-config.js`.

    ```js
    // gatsby-config.js
    module.exports = {
        // ...
        plugins: ['gatsby-bucklescript-output-linker']
        // ...
    };
    ```

4.  Your `bsconfig.json` file should have `in-source` disabled, to use `lib` as the output folder:

    ```json
    {
        "name": "my-gatsby-app",
        "reason": { "react-jsx": 3 },
        "bs-dependencies": ["reason-react"],
        "sources": {
            "dir": "re",
            "subdirs": true
        },
        "package-specs": {
            "module": "es6",
            "in-source": false
        },
        "suffix": ".js",
        "refmt": 3
    }
    ```

    For more configuration options refer to the [BuckleScript docs](https://bucklescript.github.io/docs/en/installation.html) or the [bsconfig.json spec](https://bucklescript.github.io/bucklescript/docson/#build-schema.json)

5.  That's it! Run your app just like you would and you should be able to write GraphQL queries in your `.re` files now.

## Usage

### Query Example in ReasonML

```reason
[@bs.module "gatsby"]
external useStaticQuery: string => Js.t(unit) = "useStaticQuery";

let backgroundImageQuery = [%raw
  {|graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `|}
];

[@react.component]
let make = () => {
  let result = useStaticQuery(backgroundImageQuery);
  Js.log(result);
  React.null
};
```

## License

[MIT](https://github.com/jtberglund/gatsby-plugin-reason/blob/master/LICENSE.md)