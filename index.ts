import {ButtonBuilder, SelectMenuBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ChannelType, ButtonStyle, 
    SelectMenuComponentOptionData, Channel, Client, Message, AnyComponentBuilder,
} from 'discord.js';

async function fetchChannel(client, id, cache) : Promise<Channel>
{
    return await client.channels.fetch(id,{cache}).catch(()=> { return false });
}

export class Fetch{
    private client:Client;
    constructor(client: Client)
    {
        this.client = client;
    }
    public async getChannel(id: string, cache:boolean = false) : Promise<Channel | boolean>
    { return await fetchChannel(this.client, id, cache) }
    public async getMessage(channelId: string, messageId: string, cache:boolean = false) : Promise<Message | boolean>
    {
        let channel = await fetchChannel(this.client, channelId, cache);
        if(channel)
        {
            if(channel.type == ChannelType.GuildText)
            {
                let message = await channel.messages.fetch({message:messageId, cache}).catch(()=> { return false });
                return message ? message : false;
            } else return false;
        }else return false;
    }
}

export let applications = {
    createButton(options: ButtonOptions) : ButtonBuilder
    {
        if(!options.style) options.style = ButtonStyle.Primary;
        let button = new ButtonBuilder();
        button.setStyle(options.style);
        if(options.style == ButtonStyle.Link) button.setURL(options.url || "");
        else button.setCustomId(options.customId || "");
        if(options.label) button.setLabel(options.label);
        if(options.emoji) button.setEmoji(options.emoji);
        if(options.disable) button.setDisabled(options.disable);
        return button;
    },
    createSelectMenu(customId: string, options: SelectMenuOptions) : SelectMenuBuilder
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
    createActionRow(components: AnyComponentBuilder) : ActionRowBuilder
    {
        let row = new ActionRowBuilder();
        row.addComponents(components);
        return row;
    },
    createModal(customId: string, title: string) : ModalBuilder
    {
        let modal = new ModalBuilder();
        modal.setCustomId(customId).setTitle(title);
        return modal;
    },
    createTextInput(customId: string, options: TextInputOptions) : TextInputBuilder
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
    style: ButtonStyle,
    disable: boolean
}
interface SelectMenuOptions{
    arrOptions: [SelectMenuComponentOptionData],
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