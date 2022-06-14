# Type Programming in TypeScript #

This lab will show you how advanced features of the TypeScript language can be used to make your code shorter, safer and (to a certain extent) self describing. We will take a simple problem, with an inelegant solution, and improve it over a series of iterations.

### The Problem ###

We are asked to design a web page which allows users to view a video, and switch to a backup video if they choose. A form should allow the user to choose the main and backup videos, and to alter the height and width of the video player.

The code should be written in TypeScript and not use any additional libraries beyond the DOM and Bootstrap. Types should be used to make the code as maintainable as possible.

### Iteration 1 - The Initial Solution ###

The code found in **iteration-1** meets the requirements. We have defined separate types for the controls in the form (`VideoSettings`) and the data to be collected from the form (`FormControls`). 

There are however a number of weaknesses:

* To simplify the code our data structures come in two versions. One where all the fields are optional and one where they are not. So we have `VideoSettings` paired with `VideoSettingsOptional` and `FormControls` paired with `FormControlsOptional`. Going forward these types will need to be kept in sync manually.
* Similarly, there is a `VideoBackupSettings` type used for state management. This contains a subset of the fields from `VideoSettings` - but there is nothing to ensure the names used in these types are kept consistent.
* When fetching data from the page we are relying entirely on calls to `getElementById` followed by a cast to the expected DOM type. This is ugly code which is 'stringly typed' - leaving us vulnerable to typos.

### The Exercise

Starting with Iteration 1, go through and complete all the TODOs.

Each iteration is the solution to the previous so if you get really stuck, have a
peek at the next iteration.

### Solution Descriptions

*** ONLY READ AT THE END ***


### Iteration 2 - Creating Mapped Types ###

In this iteration we make a start on removing the duplication by:

* Introducing our own mapped types called `MyPartial` and `MyStringify`
* Deriving `VideoSettingsOptional` from `VideoSettings` via `MyPartial`
* Deriving `FormControlsOptional` from `FormControls` via `MyPartial`

### Iteration 3 - Using Built-In Mapped Types ###

* We use the built in `Pick` type for deriving `VideoBackupSettings` from `VideoSettings`
* We create a `VideoSelection` type, which makes use of Template Literal Types

### Iteration 4 - Strongly Typing Return Values ###

Now that the data structures have been improved we turn our attention to the unsafe and heavily duplicated calls to `getElementById`. These are eliminated as follows:

* We create a `PageElements` type. In this type the keys are the names of ids on the page and the values are the types of the elements with the corresponding ids. So for example the element with an id of *mainVideoURL* has a type of `HTMLSelectElement`.
* Using the above type we create a `findElementWithID` helper function. The return value from this function will be exactly the type we require, so for example we can access the `width` and `height` properties of an `HTMLIFrameElement`.

### Iteration 5 - Strongly Typing Parameters ###

With the newly introduced `VideoModel` type we generate `VideoSettings`.

### Iteration 6 - Basic Conditional Types ###

In this iteration we imagine there is a new requirement to log when the numerical values relating to the video player change. To achieve this we:

* Create a Conditional Type called `NumericFields` - which selects properties whose type is `number`
* Use this type to select the correct properties from `VideoModel`
* This `VideoDimensions` type is now used in a `logNumbers` function

### Iteration 7 - Advanced Conditional Types ###

In this iteration we imagine that we need an interface to write out the model settings

* Create a `VideoModelWriter` that has all of the members of the model as inputs to specifically named methods