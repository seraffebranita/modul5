$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // On page load (before images or CSS)
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });
});

(function (global) {

var dc = {};

var homeHtml = "snippets/home-snippet.html";
var allCategoriesUrl =
  "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
var categoriesTitleHtml = "snippets/categories-title-snippet.html";
var categoryHtml = "snippets/category-snippet.html";
var menuItemsUrl =
  "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/";
var menuItemsTitleHtml = "snippets/menu-items-title.html";
var menuItemHtml = "snippets/menu-item.html";

// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

// Return substitute #string# with propValue in given 'string'
var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string.replace(new RegExp(propToReplace, "g"), propValue);
  return string;
};

// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {

// On first load, show home view
showLoading("#main-content");
$ajaxUtils.sendGetRequest(
  allCategoriesUrl,
  buildAndLoadHomeHTML,
  true);
});

// Builds HTML for the home page based on categories array
// returned from the server.
function buildAndLoadHomeHTML (categories) {

  // Load home snippet page
  $ajaxUtils.sendGetRequest(
    homeHtml,
    function (homeHtmlSnippet) {

      // Choose a random category short name
      var chosenCategoryShortName = chooseRandomCategory(categories).short_name;

      // Substitute {{randomCategoryShortName}} in home snippet string
      var homeHtmlToInsertIntoPage = insertProperty(homeHtmlSnippet, "randomCategoryShortName", "'" + chosenCategoryShortName + "'");

      // Insert the produced HTML into the main view
      insertHtml("#main-content", homeHtmlToInsertIntoPage);

    },
    false);
}

// Given array of category objects, returns a random category object.
function chooseRandomCategory (categories) {
  // Choose a random index into the array (from 0 inclusively up to array length (exclusively))
  var randomArrayIndex = Math.floor(Math.random() * categories.length);

  // Return category object with that randomArrayIndex
  return categories[randomArrayIndex];
}

global.$dc = dc;

})(window);
