/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ApplicationCommandInputType, ApplicationCommandOptionType, findOption } from "@api/Commands";
import {
    MessageObject
} from "@api/MessageEvents";
import { definePluginSettings } from "@api/Settings";
import { Devs } from "@utils/constants";
import { sendMessage } from "@utils/discord";
import definePlugin, { OptionType } from "@utils/types";

import { uwuify } from "./uwuifier";



const settings = definePluginSettings({

    uwuifyEverything: {
        description: "UwUify every message (there's a command for it if you disable this)",
        type: OptionType.BOOLEAN,
        default: false,
    },

    facesList: {
        description: "List of emoticons that can appear in the uwufied message, seperated by a \" || \". The plugin will not work if done incorrectly.",
        type: OptionType.STRING,
        default: "(・`ω´・) || ;;w;; || OwO || UwU || >w< || ^w^ || ^-^ || :3 || x3 || qwq || uwu || owo || :3: || >.< || >w< || -w-",
    },

    actList: {
        description: "List of actions that can appear in the uwufied message, seperated by a \" || \".",
        type: OptionType.STRING,
        default: "*blushes* || *sweats* || *hugs tightly* || *boops your nose* || *paws at you*"
    }

});

export default definePlugin({
    name: "UwUifier",
    description: "make ur messages kawaii by uwuifying dem! >w<",
    authors: [Devs.sliwka],
    settings,

    commands: [{
        name: "uwuify",
        description: "uwuify ur message >.<",
        inputType: ApplicationCommandInputType.BUILT_IN,
        options: [
            {
                name: "text",
                description: "The text to uwuify",
                required: true,
                type: ApplicationCommandOptionType.STRING,
            },
        ],
        execute: async (args, ctx) => {
            const text = findOption(args, "text", "tbh i have no idea how to do this without using a fallback but it shouldnt ever trigger anyway right");

            sendMessage(ctx.channel.id, {
                content: uwuify(text, settings.store.facesList, settings.store.actList),
            });
        }

    }],

    onBeforeMessageSend(_, msg) {
        this.onSend(msg);
    },

    onSend(msg: MessageObject) {

        if (settings.store.uwuifyEverything) {
            msg.content = uwuify(msg.content, settings.store.facesList, settings.store.actList);
        }
        return msg;
    },
});


