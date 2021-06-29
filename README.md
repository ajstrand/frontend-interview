# frontend-interview

In this code assignment you will be making a form. You can you use any frontend framework such as Vue, React, Angular, Polymer, or Web Components.

The form will be approximating a form to gather information about volunteers including information about how to contact and address them

The form should have the following fields, each using the appropriate HTML input type:
- Name: Text, Required
- Email: Email, Required
- Phone: Phone, Optional
- Volunteer Date: Date, Required
- Location: Select, Required
  - Will load data from the following url using the browser native fetch function, the axios library, or other promise based HTTP library, we recomend fetch as it's the simplest to use and doesn't require installing dependencies
  - 
- Pronouns: Checkboxes/Checklist, Optional, Supports multiple values
  - Should have the following options 
    -  He/Him
    -  She/Her
    -  They/Them
    -  Other (with text field to enter)
    -  Prefer Not to Disclose
  -  Should include the following descriptor explaining why this is being gathered: "These are used to help our on the ground staff refer to you by your perferred pronouns when introducing you to other volunteers, if you don't wish to provide this information you don't have to". This could be done using title, inline with aria-described-by or as a "why do we ask?" link.


The form should have a Submit and Cancel button with the approriate button type set.
The form should override it's submit event and instead display a message telling the user it was sent and out put a JSON serialization of this data to the console.
The forms reset button can just use the default handling.

This form should be useable and good looking on both mobile and desktop. We recomend using CSS framework such as bootstrap or foundation to accomplish this with minimal effort.







