# <span style="color:#FF8900">CSS Grids</span>

## <span style="color:#FF8900">Table Of Contents:

- What are CSS Grids?
- How to create a Grid?
- What are Grid lines?
- Grid Rows and Columns
- Grid container and items
- Grid Gap
- How to fill the Grids
- MinMax
- Auto-fit & Auto-fill
- Auto-flow
- Positioning of content
- Subgrid

## <span style="color:#FF8900">What are CSS Grids?

The <span style="color:green">**CSS grid layout**</span> module excels at dividing a page into major regions or defining the relationship in terms of size, position, and layer, between parts of a control built from HTML primitives.

Like tables, grid layout enables an author to align elements into <span style="color:red">***columns***</span> and<span style="color:red"> ***rows***</span>. However, many more layouts are either possible or easier with CSS grid than they were with tables. For example, a grid container's child elements could position themselves so they actually overlap and layer, similar to CSS positioned elements.

### Example of a typical CSS Grid<br><br>

![This is a css-grid](Images/css-grid-with-gaps.jpg)

## <span style="color:#FF8900">How to create a Grid?

The syntax for creating a Grid is

    .grid-container 
    {
     display: grid; | inline-grid;
    }

Inline-grid is used to create a grid which acts as inline instead of block<br>    
This is the basic syntax for creating a Grid. <br><br>
We can add rows and columns as we needed.

## <span style="color:#FF8900">What are Grid lines?

CSS grid lines are the lines browsers create on a grid container when you define the <span style="color:blue">**grid-template-columns**</span> or<span style="color:blue"> **grid-template-rows property.**</span><br><br>

![Grid Lines](Images/grid_lines.png)


## <span style="color:#FF8900">Grid Rows and Column

The divison of grids along the vertical axis are called <span style="color:red">**Columns**</span> and along the horizontal axis are called as <span style="color:red">**Rows.**</span>

![rows and columns](Images/h9qs07pm0a8s20scr6wr.png)

#### Syntax to define Rows and Columns

    .grid-container 
    {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows:auto auto auto;
    }

Here as we can see <span style="color:blue">**grid-template-columns**</span> or<span style="color:blue"> **grid-template-rows**</span> are used to define the number of rows and columns.<br><br>
There are various units we can use to define the number of rows and columns.They are:

|Units|Description|
|-----|-----------|
|em|Font size of parent|
|px|equals one pixel value|
|fr|equals one fractional value|
|%|Percentage value|
|auto|automatically fills the space|

#### Repeat Property
As we could see in the previous example we have used the auto property 3 times instead of that we can use the repeat function which mimics the same functionality

    .grid-container 
    {
    display: grid;
    grid-template-columns: repeat(3,auto);
    grid-template-rows:repeat(3,auto);
    }

## <span style="color:#FF8900">Grid container and items</span>

A grid container is the whole grid box and each boxes inside a grid are called as grid items. we can perform different actions on the whole grid or the grid items seperately.<br><br>To perform actions on a single grid item we should define that item seperately as

    .grid-container 
    {
    display: grid;
    grid-template-columns: auto auto auto;
    }
    .item1 
    {
        <!-- *any text here* --> 
    }  
as we can see if we want to change properties of item1 we can define it inside item1.   
## <span style="color:#FF8900">Grid Gaps

This property defines the size of the gap between the rows and columns in a grid layout.

    .grid-container 
    {
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-column-gap: 50px;
    grid-row-gap: 10px;
    }

This creates a 50px gap between each colums and 10px gap between each rows.

#### <span style="color:#B931FC">**Shorthand**:

**syntax**:
    
    grid-gap: 50px;

This leavs a gap of 50px for both rows and columns.    



## <span style="color:#FF8900">How to fill the Grids</span>

This is the most important property , because it teaches us how to actually use our grid. There are
multiple ways to do this they are:
 
 - start and end
 - span
 - shorthand for start and stop
 - start and span
 - Grid Areas
 - Shorthand for Grid Areas


 Now let us see an example and see how to create that using different metods

 ![xample](Images/Capture.JPG)


### <span style="color:#B931FC">Start and End
we can define the start and end of both rows and columns we want our item to occupy

    .grid-container 
    {
    display: grid;
    grid-template-columns: auto auto auto;
    }
    .item1 
    {
        grid-column-start: 1;
        grid-column-end: 3;
    }  

Here the item1 will occupy space from column 1 to column 3 and row 1 to 3.

### <span style="color:#B931FC">Span

We can also make our item span as much columns or rows that we want

    .grid-container 
    {
    display: grid;
    grid-template-columns: auto auto auto;
    }
    .item1 
    {
        grid-column-start: span 3;
    }  
Item1 will span for 2 column from where the previous item ended.<br>Similarly we can use<span style="color:blue"> grid-column-start: span 2; </span>

### <span style="color:#B931FC">Shorthand for start and stop

Instead of defining start and stop seperately we can use a shorthand rule to define it both together

    .grid-container 
    {
    display: grid;
    grid-template-columns: auto auto auto;
    }
    .item1 
    {
        grid-column-start:1/3;
    }

The column will span from column 1 to 3.

### <span style="color:#B931FC">Start and span

It is used to define where to start before spanning the given number of rows or columns.

    .grid-container 
    {
    display: grid;
    grid-template-columns: auto auto auto;
    }
    .item1 
    {
        grid-column-start:1/span 3;
    }
It tells the grid to start from row 1 and span across 3 rows.   

### <span style="color:#B931FC">Grid Areas

Defines a grid template by referencing the names of the grid areas which are specified with the <span style="color:red">***grid-area***</span> property. Repeating the name of a grid area causes the content to span those cells.<br>We can use a period(.) if it is a empty grid.

    .container 
    {
    display: grid;
    grid-template-columns: 50px 50px 50px 50px;
    grid-template-areas: 
        "header header header header"
        "main main . sidebar"
        "footer footer footer footer";
    }
    .item-a {
    grid-area: header;
    }
    .item-b {
    grid-area: main;
    }
    .item-c {
    grid-area: sidebar;
    }
    .item-d {
    grid-area: footer;
    }
output:
![example of grid areas](Images/template-areas.svg)    

### <span style="color:#B931FC">Shorthand for Grid Areas

**syntax:**

    grid-area: start row | start column | end row | end column
so instead of defining the grid area rows and columns seperately we can use shorthand.

## <span style="color:#FF8900">MinMax

Sometimes if we don't know the exact space our grid would occupy and if we want to adjust it based on the content in the grid itself , we can use minmax ,<span style="color:blue">***min-content***</span> would force the grid to occupy the minimum space required by the biggest content in the grid and <span style="color:blue">***max-content***</span>   does the vice versa.

**Example for min-content**
![min-content](Images/Capture1.JPG)

**Example for max-content**
![max-content](Images/max-content.JPG)

There is also a Keyword <span style="color:blue">***minmax***</span> by which we can define the minimum and maximum allowed sixe of a grid.

    .grid-container
    {
    display: grid;
    grid-template-columns: minmax(0px, 500px) 1fr 1fr;
    }

**ouput:**
![minmax](Images/minmax.png)

## <span style="color:#FF8900">Auto

Auto keyword is used to automatically fill the gaps in our grid. This can be done in two ways 

- auto-fill
- auto-fit

**auto-fill:** Fit as many possible columns as possible on a row, even if they are empty.<br><br>
**auto-fit:** Fit whatever columns there are into the space. Prefer expanding columns to fill space rather than empty columns.

**syntax:**

    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr) );

    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr) );

**output:**

![auto-fill & auto-fit](Images/auto-fit.JPG)

## <span style="color:#FF8900">Auto-flow

If we have grid items that you don’t explicitly place on the grid, the auto-placement algorithm kicks in to automatically place the items. This property controls how the auto-placement algorithm works.

There are three types of auto-flow values

<span style="color:blue">**Row**</span> – tells the auto-placement algorithm to fill in each row in turn, adding new rows as necessary (default)

![auto flow row](Images/flowrow.JPG)


<span style="color:blue">**Column**</span> – tells the auto-placement algorithm to fill in each column in turn, adding new columns as necessary

![auto flow column](Images/flowcolumn.JPG)


<span style="color:blue">**Dense**</span> – tells the auto-placement algorithm to attempt to fill in holes earlier in the grid if smaller items come up later

![auto flow dense](Images/D4QoZBCWAAA-RgD.jpg)

## <span style="color:#FF8900">Positioning Of Content

We can position and arrange the items in the grid or the whole grid itself however we want using differnet commands. These contents are

1.Justify<br>
2.Align<br>
3.Place

## <span style="color:#B931FC"> Justify

### <span style="color:blue"> 1. justify-content:
 
We can use this property to position the whole grid  inside the grid container along the X-Axis.
 
![This represents justify-content!](Images/justify-content1.png)
![This represents justify-content!](Images/justify-content2.png)

Sample Code:
 
        .container {
            display: grid;
            gap: 50px;
            grid-template-rows: 200px 200px;
            grid-template-columns: 200px 200px;
 
            justify-content : center;
        }
 

 ### <span style="color:blue">2. justify-items:
 
We can use this property to position grid-items inside grid containers along the X-Axis.
 
![This represents justify-items!](Images/justify-items1.png)
![This representd justify-items!](Images/justify-items2.png)

Sample Code:


 
        .container {
            display: grid;
            gap: 50px;
            grid-template-rows: 200px 200px;
            grid-template-columns: 200px 200px;
 
            justify-items : end;
        }

### <span style="color:blue">3. justify-self:
 
We can use this property to position 1 individual grid-item inside a grid container along the X-Axis.
 
![This represents justify-self!](Images/justify-self.png)

Sample code:
 
    .box-1 {
        justify-self : start;  
    }

## <span style="color:#B931FC"> Align

         
### <span style="color:blue"> 1. align-content
 
We can use this property to position our grid inside the grid container along the Y-Axis.
 
![This represents align-content!](Images/align-content1.png)
![This represents align-content!](Images/align-content2.png)

Sample code:
 
        .container {
            display: grid;
            gap: 50px;
            grid-template-rows: 200px 200px;
            grid-template-columns: 200px 200px;
 
            align-content : space-between;
        }

 
### <span style="color:blue"> 2. align-items:
 
We can use this property to position grid-items inside the grid container along the Y-Axis.
 
![This represens align-items!](Images/align-items.png)

Sample code:
 
        .container {
            display: grid;
            gap: 50px;
            grid-template-rows: 200px 200px;
            grid-template-columns: 200px 200px;
 
            align-items : center;
        }
 

 

### <span style="color:blue"> 3. align-self:
 
We can use this property to position 1 individual grid-item (child) inside a grid container along the Y-Axis.
 
![This represents align-self!](Images/align-self.png)

Sample code:
 
    .box-1 {
        align-self : start;  
    }

## <span style="color:#B931FC"> Place

### <span style="color:blue"> 1.  place-content:
 
This is the shorthand of 2 properties:
 
- align-content
- justify-content

Syntax:
 
>place-content: align-content / justify-content;
 
        align-content : center;
        justify-content : end;
 
        /* The shorthand */
        place-content : center / end ;
       
 
### <span style="color:blue">2. place-items:
 
This is the shorthand of 2 properties:
 
- align-items
- justify-items

Syntax:
 
>place-items: align-items / justify-items;
 
        align-items : end;
        justify-items : center;
 
        /* The shorthand */
        place-items : end / center ;
 
### <span style="color:blue">3. place-self:
 
This is the shorthand of 2 properties:
 
- align-self
- justify-self

Syntax:
 
>place-self: align-self / justify-self;
 
        align-self : start ;
        justify-self : end ;
 
        /* The shorthand */
        place-self : start / end ;

## <span style="color:#FF8900">Sub Grids

CSS subgrid is a value used in place of a list of grid tracks. The rows and columns the element is spanning from its parent, are now the same rows and columns it offers. 

    .grid-items
    {
        grid-column:2/7;
        display:grid;
        grid-template-columns:subgrid;
    }
    .child-of-grid-item
    {
        grid-column:3/6
    }

now inside the main grid column , child grid spans from 3 to 6.

This concludes all the CSS Grid properties

x-----------------------------------------------------x--------------------------------------------------------x




 






































































