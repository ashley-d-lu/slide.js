# slide.js :sparkles:

slide.js is a javascript library that lets you **animate the opening and closing of a set of HTML elements**, such as a set of images or divs. It also has a lightbox feature that lets you **turn a set of HTML elements into a simple lightbox**.

## Demo and Documentation

- #### Demo on [Landing Page](https://ashley-d-lu.github.io/slide.js/index.html)
  - #### [Getting Started](https://ashley-d-lu.github.io/slide.js/gettingStarted.html)
  - #### [API](https://ashley-d-lu.github.io/slide.js/api.html)
## Getting Started

1. Download the latest version of slide.js from [releases](https://github.com/csc309-summer-2020/js-library-luashle1/releases).
2. Place
    ```
    <script type='text/javascript' src='path/to/slide.js'></script>
    <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'></script>
    ```
    in the `<head>` of your HTML file, and make sure any scripts that will be using slide.js are deferred or placed at the very bottom of `<body>`.
    
## How To Use

To turn a set of HTML elements into a slider:
1. Give a unique id to each HTML element.
2. Enclose all the HTML elements in a container div.
3. Set the height and width of the container div. This will determine the height and width of the slider when it is open (and how far apart the elements will be).
4. Instantiate a `Slider` object, passing 2 arguments: the selector of the container div and an object mapping customizable properties to their values. The only required customizable property is `direction`, which takes value `'horizontal'`, `'vertical'`, or `'diagonal'`. If any other property is not specified, it will take its default value. (See the API to learn about the customizable properties!)

**Example:**

HTML:
```
<div id='cards' class='card-container'
    <div id='card1' class='card blue'></div>
    <div id='card2' class='card yellow'></div>
    <div id='card3' class='card red'></div>
    <div id='card4' class='card green'></div>
    <div id='card5' class='card orange'></div>
</div>
```
CSS:
```
#cards {
    height: 100px;
    width: 400px;
}

.card {
    height: 100px;
    width: 100px;
}      
```
Javascript:
```
const slider = new Slider('#cards', {
    direction: 'horizontal'
});
```
**Check out the Getting Started page for more details and the results of this code!**
