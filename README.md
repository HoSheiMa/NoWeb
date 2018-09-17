# NoWeb
NoWeb is a framework for change html,css,js to one single code by Json
 # How Use It
1- add it to index page in your website   
2- Then create a script tag after it  
3- then use it


# code
Hello world! code
```javascript
throw_alert({
  helloWorld : {
	   /*   
	   make sure at use a name of element 
	   becoase a name will be id of this element
	   or you can use a id=' ' to remove a id in it
	   */
	  type: 'div', // type of element
	  text: 'Hello World!' // text of element div
	  }
	}, undefined /* this for qf you can't change it */,
      undefined /* this for c_in_c you can't change it */,
      undefined /*this for style of parent of this element you can change it*/ , {
		position : 'relative' /*this for style of parent parent of this element you can change it*/ 
})
	
```

