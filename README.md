# Document Creator/Viewer For My Style Of Comments

[![Build Status](https://travis-ci.org/TerrordactylDesigns/TerrorDoc.png?branch=master)](https://travis-ci.org/TerrordactylDesigns/TerrorDoc)

### How I Header/TerrorDoc a js function:

    /**/// Public: function_name
    /**///
    /**/// Args
    /**/// arg1   - the_arg_value
    /**/// arg2   - the_arg_value
    /**///
    /**/// Returns
    /**/// return - the_return_value
    /**///
    /**/// Notes
    /**/// note   - note_about_the_function
    /**///          notes_can_be_multiline

## What is this?

It's my way to quickly scan a .js file using [this world renowned parser](https://github.com/TerrordactylDesigns/TerrorParser) to see what functions are in it and display them in a downloadable HTML page.

It is also an automated generator of documents into a Docs folder (Only goes one subfolder deep currently, till I actually spend some time on this).

## Setup

Download.

Run:

    npm install

from the extracted directory to install dependencies.

For some fun:

    node bin/terrordoc [-i <project folder path> (required)] [-o <optional doc output path>]

This will go through the project folder and parse each .js file and write a corresponding html file into the optional output path. Default path is projectfolder/Docs.

For quick single file site use:

    npm start

Go to [http://localhost:3000](http://localhost:3000)

Click select a file and.... seriously... It's 2 buttons, You'll be OK.....

## Issues/Bugs

HAHAHAHHAHA

Expect them.... Literally 0 error handling or tests.... Wait, why are you even using this?

### Screen Shots

![image](https://dl.dropbox.com/u/51430720/Screen%20Shot%202012-12-24%20at%206.20.44%20PM.png)

![image](https://dl.dropbox.com/u/51430720/Screen%20Shot%202012-12-24%20at%206.21.08%20PM.png)

![image](https://dl.dropbox.com/u/51430720/Screen%20Shot%202012-12-24%20at%206.21.14%20PM.png)

![image](https://dl.dropbox.com/u/51430720/Screen%20Shot%202012-12-24%20at%206.21.21%20PM.png)

### Download as HTML page!
![image](https://dl.dropbox.com/u/51430720/Screen%20Shot%202012-12-24%20at%206.21.45%20PM.png)

#### License

MIT
