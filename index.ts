const {ButtonBuilder, SelectMenuBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle} = require("discord.js");

export class Fetch{
    private client:import("discord.js").Client;
    constructor(client: import("discord.js").Client)
    {
        this.client = client;
    }
    private async fetchChannel(id, cache) : Promise<import("discord.js").Channel | boolean | any>
    {
        return await this.client.channels.fetch(id,{cache}).catch(()=> { return false });
    }
    
    private async fetchMessage(channelId, messageId, cache)  : Promise<import("discord.js").Message | any>
    {
        let channel = await this.fetchChannel(channelId, cache);
        if(channel)
        {
            let message = await channel.messages.fetch(messageId,{cache}).catch(()=> { return false });
            return message ? message : false;
        }else return false;
    }

    public async getChannel(id: string, cache:boolean = false) : Promise<import("discord.js").Channel>
    { return await this.fetchChannel(id, cache) }

    public async getMessage(channelId: string, messageId: string, cache:boolean = false) : Promise<import("discord.js").Message>
    { return await this.fetchMessage(channelId, messageId, cache) }
}

export let applications = {
    createButton(options: ButtonOptions) : import("discord.js").ButtonBuilder
    {
        if(!options.style) options.style = "Primary";
        let button = new ButtonBuilder();
        button.setStyle(options.style);
        if(options.style == "Link") button.setURL(options.url);
        else button.setCustomId(options.customId);
        if(options.label) button.setLabel(options.label);
        if(options.emoji) button.setEmoji(options.emoji);
        if(options.disable) button.setDisabled(options.disable);
        return button;
    },
    createSelectMenu(customId: string, options: SelectMenuOptions) : import("discord.js").SelectMenuBuilder
    {
        let selectMenu = new SelectMenuBuilder();
        selectMenu.setCustomId(customId);
        if(options.arrOptions) selectMenu.addOptions( options.arrOptions );
        if(options.disable) selectMenu.setDisabled(options.disable);
        if(options.max) selectMenu.setMaxValues(options.max)
        if(options.min) selectMenu.setMinValues(options.min)
        if(options.placeholder) selectMenu.setPlaceholder(options.placeholder);
        return selectMenu;
    },
    createActionRow(components: Components) : import("discord.js").ActionRowBuilder
    {
        let row = new ActionRowBuilder();
        if(components) if(components.constructor != Array) row.addComponents(components);
        else for(let component of components) row.addComponents(component);
        return row;
    },
    createModal(customId: string, title: string) : import("discord.js").ModalBuilder
    {
        let modal = new ModalBuilder();
        modal.setCustomId(customId).setTitle(title);
        return modal;
    },
    createTextInput(customId: string, options: TextInputOptions) : import("discord.js").TextInputBuilder
    {
        if(!options.style) options.style = "Short";
        let input = new TextInputBuilder();
        input.setCustomId(customId);
        input.setStyle(TextInputStyle[options.style]);
        if(options.isRequired) input.setRequired(options.isRequired);
        if(options.placeholder) input.setPlaceholder(options.placeholder);
        if(options.label) input.setLabel(options.label);
        if(options.max) input.setMaxLength(options.max);
        if(options.min) input.setMinLength(options.min);
        if(options.value) input.setValue(options.value);
        return input;
    }
};


interface ButtonOptions{
    customId?: string, 
    url?: string, 
    label?: string, 
    emoji?: string, 
    style: "Link" | "Primary" | "Secondary" | "Success" | "Danger",
    disable: boolean
}
interface SelectMenuOptions{
    arrOptions: {label?:string, description?:string, emoji?:string, value:string}[],
    disable: boolean,
    placeholder?: string,
    min?: number,
    max?: number
}
interface TextInputOptions{
    label?: string, 
    max?: number, 
    min?: number, 
    value?: string, 
    placeholder?: string,
    style: "Short" | "Paragraph", 
    isRequired: boolean
}

type Components = import("discord.js").ButtonBuilder | import("discord.js").SelectMenuBuilder | import("discord.js").TextInputBuilder | 
[ import("discord.js").SelectMenuBuilder | import("discord.js").ButtonBuilder | import("discord.js").TextInputBuilder ];