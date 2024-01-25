# <span style="color:#FF8900">CSS FlexBox</span>

## <span style="color:#FF8900">Table Of Contents:

- What are Flexbox?
- How to create a Flexbox?
- Flex Direction
- Flex Wrap
- Flex Flow
- Order
- Row gap or column gap
- Positioning of content

## <span style="color:#FF8900">What are CSS Flexbox?

The Flexbox Layout module aims at providing a more efficient way to lay out, align and distribute space among items in a container, even when their size is unknown or dynamic (thus the word “flex”).

The main idea behind the flex layout is to give the container the ability to alter its items width/height to best fill the available space.

### Example of a typical CSS Flexbox<br><br>

![This is a Flexbox](Images1/flex.JPG)

## <span style="color:#FF8900">How to create a Flexbox?

The syntax for creating a Flexbox is

    .flex-container 
    {
        display: flex; | inline-flex;
    }

Inline Flexbox are used to create flexbox which is an inline element<br>    

## <span style="color:#FF8900">Flex Direction

This creates or defines a main axis in which the flexbox is created.<br><br>We can create either <span style="color:red">***row***</span> wise or <span style="color:red">***column***</span> wise<br><br>

    .flex-container
    {
        flex-direction: row | row-reverse | column | column-reverse;
    }

![Flexdir](Images1/flexdir.JPG)


## <span style="color:#FF8900">Flex Wrap

This is used to define whether a flex box should wrap around if the space is filled or not<br><br>By default, flex items will all try to fit onto one line. You can change that and allow the items to wrap as needed with this property.

#### Syntax:

    .flex-container 
    {
        flex-wrap: nowrap | wrap | wrap-reverse;
    }

![flexwrap](Images1/flexwrap.JPG)    

<span style="color:blue">nowrap:</span> Does not wrap the content.<br><span style="color:blue">wrap:</span> wraps the content.<br><span style="color:blue">wrap-reverse:</span> wraps the content in reverse.

## <span style="color:#FF8900">Flex Flow</span>

This is a shorthand for the flex-direction and flex-wrap properties, which together define the flex container’s main and cross axes. The default value is row nowrap.<br><br> We can wrap around the column or row.

    .flex-container 
    {
        flex-flow: column wrap; | row wrap;
    }    

![flexwrap](Images1/flexwrap1.JPG)
## <span style="color:#FF8900">Order

the order property controls the order in which they appear in the flex container.<br>By default all the elements will have 0 order.<br><br>This action is performed to each item seperately in the flexbox , so it is defined inside a class. 

    .item 
    {
        order: 5; /* default is 0 */
    }

This assigns *item* to position 5.<br><br>
![flexwrap](Images1/flexorder.JPG)
 



## <span style="color:#FF8900">Row gap or column gap</span>

    .flex-container 
    {
        display: flex;
        gap: 10px 20px; /* row-gap column gap */
        row-gap: 10px;
        column-gap: 20px;
    }

 ![xample](Images1/flexgap.JPG)




## <span style="color:#FF8900">Positioning Of Content

We can use some properties to position the contents of the flex in the webpage according to our need<br> The ways to do these are

1.Justify<br>
2.Align<br>
3.Place

## <span style="color:#B931FC"> Justify

Justify is used to align the contents along the main-axis.<br><br> The different types of justify are

<span style="color:#96C291">***flex-start***</span> :items are packed toward the start of the flex-direction.

<span style="color:#96C291">***flex-end:***</span> items are packed toward the end of the flex-direction.

<span style="color:#96C291">***start:***</span> items are packed toward the start of the writing-mode direction.

<span style="color:#96C291">***end:*** </span>items are packed toward the end of the writing-mode direction.

<span style="color:#96C291">***left:***</span> items are packed toward left edge of the container.

<span style="color:#96C291">***right:***</span> items are packed toward right edge of the container.

<span style="color:#96C291">***center:***</span> items are centered along the line

<span style="color:#96C291">***space-between:***</span> items are evenly distributed in the line; first item is on the start line, last item on the end line

<span style="color:#96C291">***space-around:***</span> items are evenly distributed in the line with equal space around them.

<span style="color:#96C291">***space-evenly:***</span> items are distributed so that the spacing between any two items are equal.

**Sample code:**

    .flex-container 
    {
        justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly | start | end | left | right ... + safe | unsafe;
    }

![flexjustify](Images1/flexjustify.JPG)

## <span style="color:#B931FC"> Align

There are two types of Align property in flexbox

- align-items
- align-content

### <span style="color:blue">Align-content</span>
This aligns a flex container contents along the vertical axis , similar to how justify aligns it with horizontal axis.

The types in align-content are:


- flexstart
- flexend
- center
- stretch
- space-between
- space-around

it works similar to justify-content.

**sample code:**

    .flex-container 
    {
        align-content: flex-start | flex-end | center | space-between | space-around | space-evenly | stretch;
    }
![flexalignitems](Images1/flexalignitems.JPG)

### <span style="color:blue">Align-items</span>

This defines the default behavior for how flex items are laid out along the cross axis on the current line. Think of it as the justify-content version for the cross-axis 

The types in align-items are:

- flexstart
- flexend
- center
- stretch
- baseline

**sample code:**

    .flex-container 
    {
        align-items: stretch | flex-start | flex-end | center | baseline;
    }

![flexalignitems](Images1/flexaligncontent.JPG)    

### <span style="color:blue">Align-self</span>

It is used to insert a seperate item and align it inside the flexbox

**sample code:**

    .item 
    {
        align-self: auto | flex-start | flex-end | center | baseline | stretch;
    }

![flexalignitems](Images1/flexalignself.JPG) 

This concludes all the CSS Flexbox properties

x-----------------------------------------------------x--------------------------------------------------------x




    







