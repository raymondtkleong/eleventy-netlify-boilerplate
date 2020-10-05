const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");
const UglifyJS = require("uglify-es");
const htmlmin = require("html-minifier");
const slugify = require("slugify");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const fs = require('fs');
const path = require('path');

const copyLinkFiles = function (source, target) {
  if ( ! fs.existsSync(target) ) {
    fs.mkdirSync(target);
  }

  const files = fs.readdirSync(`${source}`);
  files.forEach(file => {
    fs.copyFileSync(`${source}/${file}`, `${target}/${file}` );
  });
}

const processShopifyFiles = function (source, target, domains) {

  if ( ! fs.existsSync(target) ) {
    fs.mkdirSync(target);
  }

  // process index.htm
  const targetFileName = `${target}/index.html`;
  fs.copyFileSync(`${source}/index.htm`, targetFileName );
  copyLinkFiles(`${source}/index_files`, `${target}/index_files`);
  domains.forEach( domain => {
    replaceStringInFile( targetFileName, domain);
  });

  // process subfolders
  const subfolders = ['pages', 'products'];
  subfolders.forEach(subfolder => {
    if ( ! fs.existsSync(`${target}/${subfolder}`) ) {
      fs.mkdirSync(`${target}/${subfolder}`);
    }

    const files = fs.readdirSync(`${source}/${subfolder}`);
    files.forEach(file => {
      console.log('file', file);
      if (path.extname(file) == ".htm") {
        const sourceFilename = `${source}/${subfolder}/${file}`;
        const targetFilePath = `${target}/${subfolder}/${path.parse(file).name}`;
        const targetFileName = `${targetFilePath}/index.html`;
        if ( ! fs.existsSync(targetFilePath) ) {
          fs.mkdirSync(targetFilePath);
        }
        fs.copyFileSync(sourceFilename, targetFileName );
        copyLinkFiles(`${source}/${subfolder}/${path.parse(file).name}_files`, targetFilePath);
        domains.forEach( domain => {
          replaceStringInFile( targetFileName, domain, path.parse(file).name);
        });
      } 
    })
  });
}

const  replaceAll = function (str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

const replaceStringInFile = function (filename, domain, filenameOnly) {
  console.log('replaceStringInFile', filename);
  let data = fs.readFileSync(filename, 'utf8')

  // var rxDomain = /https:\/\/care.omieo.co\/(pages|products)\/([^\s]+)/gmi;
  // data = data.replace(rxDomain, (match) => {
  //   var result = match.replace("https:\/\/care.omieo.co\/","/");
  //   if ( result.substr(result.length -1, 1) === '"' ) {
  //     result = result.substr(0, result.length -1 ) + ".html";
  //   }
  //   console.log('match', match, "=>", result);
  //   return result;
  // });
  data = replaceAll(data, `https://${domain}/products/`, `/products/`);
  data = replaceAll(data, `https://${domain}/pages/`, `/pages/`);
  console.log('_files', `${filenameOnly}_files`);
  data = replaceAll(data, `./${filenameOnly}_files/`, './');

  fs.writeFileSync(filename, data);

}

module.exports = function(eleventyConfig) {

  // Eleventy Navigation https://www.11ty.dev/docs/plugins/navigation/
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Configuration API: use eleventyConfig.addLayoutAlias(from, to) to add
  // layout aliases! Say you have a bunch of existing content using
  // layout: post. If you don’t want to rewrite all of those values, just map
  // post to a new file like this:
  // eleventyConfig.addLayoutAlias("post", "layouts/my_new_post_layout.njk");

  // Merge data instead of overriding
  // https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  // Date formatting (human readable)
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  // Date formatting (machine readable)
  eleventyConfig.addFilter("machineDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });

  // Minify CSS
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Minify JS
  eleventyConfig.addFilter("jsmin", function(code) {
    let minified = UglifyJS.minify(code);
    if (minified.error) {
      console.log("UglifyJS error: ", minified.error);
      return code;
    }
    return minified.code;
  });

  // Minify HTML output
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if (outputPath.indexOf(".html") > -1) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  // Universal slug filter strips unsafe chars from URLs
  eleventyConfig.addFilter("slugify", function(str) {
    return slugify(str, {
      lower: true,
      replacement: "-",
      remove: /[*+~.·,()'"`´%!?¿:@]/g
    });
  });

  // Don't process folders with static assets e.g. images
  eleventyConfig.addPassthroughCopy("favicon.ico");
  //eleventyConfig.addPassthroughCopy("static/img");
  //eleventyConfig.addPassthroughCopy("static/");

  processShopifyFiles("shopify", "_site", ['care.omieo.co','3dmf.myshopify.com']);

  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("_includes/assets/");

  /* Markdown Plugins */
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let opts = {
    permalink: false
  };

  eleventyConfig.setLibrary("md", markdownIt(options)
    .use(markdownItAnchor, opts)
  );

  return {
    templateFormats: ["md", "njk", "html", "liquid"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/static/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: "./static/",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
