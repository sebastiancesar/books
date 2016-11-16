### For the implementation I chose a stack of technologies provided in the angular generator https://github.com/yeoman/generator-angular#readme (0.15.1.
) because I found it very complete and It's a good starting point for a client side project:
    - AngularJS (1.5)
    - Bootstrap
    - Jasmine
    - Grunt
  
  ## Keeping in mind that is a test/prototype and not a real production-ready application, I know there are many thing to do to improve the quality, for example: 
    - Unit testing (karam+jasmine is already configured in the generator)
    - i18n
    - Backend pagination and search
    - Responsive
    - Url seo friendly
    - Sentry or similar for handling client side exceptions
    
  and so.
  
  The application is divided in modules, trying to follow some principles from an angular style guide
  https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md
  
  The code is organized by features or models, trying to capture the main widgets into isolated directives for better reusability.
  
  An additional feature is the responsiveness, It's not fully implemented. It's just a glimpse of the possibilities provided by bootstrap grid layouts.
  
  For the search input I used the typeahead wrapper provided by https://angular-ui.github.io/bootstrap/
  
  For the pagination I used http://www.michaelbromley.co.uk/blog/108/paginate-almost-anything-in-angularjs
  and It's entirey in the front, there is no backend. In a real proyect probably the backend pagination could be a better option, but in this case the json with all the books is very lightweight and the browser can handle it very well.
 
  ## Running
  There is a grunt task to run in mode development "$ grunt serve" and another task for building the app for production, with  minification, obfuscation, concat, etc, wich is "$ grunt build" and the result is in /dist ready to be deployed to a webserver.
  ("$ python -m SimpleHTTPServer" could be an option for testing purpouse)
  