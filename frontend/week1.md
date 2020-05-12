## _notes during_ Chapter 13

Chapter 13

Hypertext Transfer Protocol (HTTP) is a protocol for retrieving named resources (chunks of information, 
such as web pages or pictures). HTTP treats the network as a streamlike device into which you can put bits 
and have them arrive at the correct destination in the correct order

The Transmission Control Protocol (TCP) is how computers ‘talk’. One computer must be ‘listening’ (called: server), 
for other computers to start talking to it (called: client). To be able to listen for different kinds of communication 
at the same time on a single machine, each listener has a number (called a port) associated with it.

Each document on the Web is named by a Uniform Resource Locator (URL), which looks something like this:
```javascript
_￼https://www.webnexus.nl/wat-is-een-url/_
|    1  |        2      |       3       |
```

Most URL's are split up in 3 parts (See above). See below for what they mean
1. protocol
2. server
3. patch

HTML, which stands for Hypertext Markup Language, is the document format used for web pages.

Running programs downloaded from the Internet is potentially dangerous. That’s why you can go in a 
sandbox where your computer cannot be harmed by any mean.

## _notes during_ Chapter 14

The data structure the browser uses to represent a document is called a Document Object Model (DOM).

We call a data structure a tree when it has a branching structure, has no cycles and has a single, well-defined root.

DOM nodes contain a lot of links.
￼
In theory, you could move anywhere in the tree using just these parent and child links. 
But JavaScript also gives you access to a number of additional convenience links. 

You can find elements by various types of ways including: Finding them through the tree , 
Calling them with a ID (document.getElementById) or Calling the first one of the document (getElementsByTagName). 

You can change the document with insertBefore. 

You can change node with document.createTextNode method. Which gives a string.
If you want to create a element use document.createElement

You can also change colors with Javascript using var.style.whatUWantToChange

querySelector lets you look for html elements with Javascript
￼

You can also position and animate a element.


JavaScript programs may inspect and interfere with the document that the browser is displaying through a 
data structure called the DOM. This data structure represents the browser’s model of the document, and a 
JavaScript program can modify it to change the visible document.

The DOM is organized like a tree, in which elements are arranged hierarchically according to the structure 
of the document. The objects representing elements have properties such as parentNode and childNodes, which 
can be used to navigate through this tree.

The way a document is displayed can be influenced by styling, both by attaching styles to nodes directly and 
by defining rules that match certain nodes. There are many different style properties, such as color or display. 
JavaScript code can manipulate an element’s style directly through its style property.

## Exercise with Chapter 14
```javascript
<h1>Heading with a <span>span</span> element.</h1>
<p>A paragraph with <span>one</span>, <span>two</span>
  spans.</p>

<script>
  function byTagName(node, tagName) {
    var arr = [];
    tagName = tagName.toUpperCase();
 
  	function zoek(node) {
      for (var i = 0; i < node.childNodes.length; i++) {
        var child = node.childNodes[i];
        if (child.nodeType == document.ELEMENT_NODE) {
          if (child.nodeName == tagName)
            found.push(child);
          zoek(child);
        }
      }
  }
    
  console.log(byTagName(document.body, "h1").length);
  // → 1
  console.log(byTagName(document.body, "span").length);
  // → 3
  let para = document.querySelector("p");
  console.log(byTagName(para, "span").length);
  // → 2
</script>
```

### Feelings with the exercise
I had to search a lot online and in the end i didn't do it all by myself because I found it too hard too do. I hope you
will understeand and I hope I will get some explanation with it. I used (this)[https://github.com/briennakh/javascript-practice/blob/master/eloquent-javascript/13.2.%20Elements%20by%20tag%20name.html] source for further information.
