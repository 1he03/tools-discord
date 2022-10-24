## Update 0.0.6
# Install
```
npm install tools-discord --save
```
# how to use
```
const {applications} = require("tools-discord");
```

```javascript
applications.createButton(/* options: ButtonOptions */) // return ButtonBuilder

applications.createSelectMenu(/* customId: string, options: SelectMenuOptions */) // return SelectMenuBuilder

applications.createTextInput(/* customId: string, options: TextInputOptions */) // return TextInputBuilder

applications.createActionRow(/* components: Components */) // return ActionRowBuilder

applications.createModal(/* customId: string, title: string */) // return ModalBuilder
```
# Options
### ButtonOptions:
Key | Type
---- | -----
customId?| string
url?|string
label?| string
emoji?:|string
style| Link, Primary, Secondary, Success, Danger
disable?|boolean
    
### SelectMenuOptions:
Key | Type
----- | ----
arrOptions| Array({ label?:string, description?:string, emoji?:string, value:string})
disable?| boolean
placeholder?| string
min?|number
max?|numbe

### TextInputOptions:
Key | Type
----- | -----
label?|string
max?|number
min?|number 
value?|string 
placeholder?|string
style| Short, Paragraph 
isRequired|boolean