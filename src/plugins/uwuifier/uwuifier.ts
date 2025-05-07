/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

// most of the code has been taken from https://github.com/Schotsl/Uwuifier, with some tweaks inspired by https://github.com/uwwwuPP/UwwwuP


export const isAt = (value: string): boolean => {
    // Check if the first character is '@'
    const first = value.charAt(0);
    return first === "@";
};

export const isUri = (value: string): boolean => {
    try {
        new URL(value);
        return true;
    } catch {
        return false;
    }
};

export const isBreak = (word: string): boolean => {
    return word.trim() === "";
};


export function uwuify(text: string, _faces: string, _actions: string): string {


    const faces = _faces.split(" || ");
    const actions = _actions.split(" || ");

    const words = text.split(" ");

    const uwuifiedWords = words
        .map(word => {

            const lcw = word.toLowerCase();

            const wordMap = {
                "this": "dis",
                "them": "dem",
                "hello": ["haiiiiiii", "hewwoo x3", "hiiiii"],
                "hi": ["haiiiiiii", "hewwoo x3", "hiiiii"],
                "hii": ["haiiiiiii", "hewwoo x3", "hiiiii"],
                "cute": "kawaii",
                "over": "uvr",
                "dog": "doggo",
                "cat": "kitty",
                "you're": "ur",
                "youre": "ur",
                "you": "u",
                "your": "ur",
                "yourself": "urself",
                "bunny": "bnuy",
                "some": "sum",
                "cool": "keewl",
                "likes": "luvs",
                "small": "smol",
                "sexy": "lewd",
                "inappropriate": "lewd",
                "nice": "awwsum",
                "nicely": "awwsumly",
                "the": "twe",
                "thank you": "ur twe best <3333 xoxo",
                "thanks": "ur twe best :33 xoxo",
                "suwper": "sooper dooper",
                "emacs": "vim",
                "why": "y",
                "no": "nuu",
                "ok": ["okii", "okee"]
            };

            if (wordMap[lcw]) {
                const mapped = wordMap[lcw];
                return Array.isArray(mapped)
                    ? mapped[Math.floor(Math.random() * mapped.length)]
                    : mapped;
            }

            const patterns = [
                { from: /ove/gi, to: "uv" },
                { from: /have/gi, to: "haf" },
                { from: /tr/gi, to: "tw" },
                { from: /up/gi, to: "uwp" },
                { from: /oy/gi, to: "oi" },
                { from: /ude\b/gi, to: "ood" },
                { from: /ers\b/gi, to: "as" },
                { from: /er\b/gi, to: "a" },
                { from: /th(?=\W|$)/gi, to: "d" },
                { from: /(?:r|l)/g, to: "w" },
                { from: /n([aeiou])/g, to: "ny$1" },
            ];

            for (const { from, to } of patterns) {
                word = word.replace(from, to);
            }
            return word;
        });


    let uwuifiedString = uwuifiedWords.join(" ");
    console.log(uwuifiedString);

    const exclamations = ["!!", "!1", "1!!", "!1!"];
    const questions = ["?!?!", "/?", "??!!?", "?!/", "?~", "?w?"];

    uwuifiedString = uwuifiedString
        .replace(/\. /g, () => " " + faces[Math.floor(Math.random() * faces.length)] + " ")
        .replace(/, /g, () => " " + faces[Math.floor(Math.random() * faces.length)] + " ")
        .replace(/!/g, () => exclamations[Math.floor(Math.random() * exclamations.length)])
        .replace(/\?/g, () => questions[Math.floor(Math.random() * questions.length)]);

    if (Math.random() < 0.75) {
        uwuifiedString += " " + faces[Math.floor(Math.random() * faces.length)];
    }

    if (Math.random() < 0.2) {
        uwuifiedString += " " + actions[Math.floor(Math.random() * actions.length)];
    }

    return uwuifiedString;

}
