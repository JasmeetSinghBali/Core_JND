# DOM Events

- Responding to user inputs and actions.
- example- clicking ,pressing key ,moving cursor ,resizing screen, copying, pasting, hovering , infinite scrolling , keyboard pressing etc..

- example trello adding dashboards, reordering etc...

***
****Example****
****Infinite scrolling****

where the new elements are appended as the user scrolls down. the initial page dont contains all the elements however they eventually keeps get added up as the user scrols.

# Inline Events

where we specify what event occurs in the html itself like the

****onclick='alert("you clicked me!")'****
where the text in '' is treated as javascript

Try Clicking the button below.

<button onclick='alert("you clicked me!");alert("Stop Clicking ME !! thats enough for the Demo!")'>Inline Event Button Click Me!</button>


<button ondblclick='alert("you clicked me!");alert("Stop Clicking ME !! thats enough for the Demo!")'>Inline Event Button Double Click</button>
# Disadvantages of Inline Events

- Not Flexible
- Clumsy
- Cannot be reused have to copy it to say other button to have this DOM Event.

# Onclick Property
