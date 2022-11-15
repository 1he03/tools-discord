"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.applications = exports.Fetch = void 0;
var _a = require("discord.js"), ButtonBuilder = _a.ButtonBuilder, SelectMenuBuilder = _a.SelectMenuBuilder, ActionRowBuilder = _a.ActionRowBuilder, ModalBuilder = _a.ModalBuilder, TextInputBuilder = _a.TextInputBuilder, TextInputStyle = _a.TextInputStyle;
function fetchChannel(client, id, cache) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.channels.fetch(id, { cache: cache })["catch"](function () { return false; })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
var Fetch = /** @class */ (function () {
    function Fetch(client) {
        this.client = client;
    }
    Fetch.prototype.getChannel = function (id, cache) {
        if (cache === void 0) { cache = false; }
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchChannel(this.client, id, cache)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); });
    };
    Fetch.prototype.getMessage = function (channelId, messageId, cache) {
        if (cache === void 0) { cache = false; }
        return __awaiter(this, void 0, void 0, function () {
            var channel, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetchChannel(this.client, channelId, cache)];
                    case 1:
                        channel = _a.sent();
                        if (!channel) return [3 /*break*/, 3];
                        return [4 /*yield*/, channel.messages.fetch(messageId, { cache: cache })["catch"](function () { return false; })];
                    case 2:
                        message = _a.sent();
                        return [2 /*return*/, message ? message : false];
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    return Fetch;
}());
exports.Fetch = Fetch;
exports.applications = {
    createButton: function (options) {
        if (!options.style)
            options.style = "Primary";
        var button = new ButtonBuilder();
        button.setStyle(options.style);
        if (options.style == "Link")
            button.setURL(options.url);
        else
            button.setCustomId(options.customId);
        if (options.label)
            button.setLabel(options.label);
        if (options.emoji)
            button.setEmoji(options.emoji);
        if (options.disable)
            button.setDisabled(options.disable);
        return button;
    },
    createSelectMenu: function (customId, options) {
        var selectMenu = new SelectMenuBuilder();
        selectMenu.setCustomId(customId);
        if (options.arrOptions)
            selectMenu.addOptions(options.arrOptions);
        if (options.disable)
            selectMenu.setDisabled(options.disable);
        if (options.max)
            selectMenu.setMaxValues(options.max);
        if (options.min)
            selectMenu.setMinValues(options.min);
        if (options.placeholder)
            selectMenu.setPlaceholder(options.placeholder);
        return selectMenu;
    },
    createActionRow: function (components) {
        var row = new ActionRowBuilder();
        if (components)
            if (components.constructor != Array)
                row.addComponents(components);
            else
                for (var _i = 0, components_1 = components; _i < components_1.length; _i++) {
                    var component = components_1[_i];
                    row.addComponents(component);
                }
        return row;
    },
    createModal: function (customId, title) {
        var modal = new ModalBuilder();
        modal.setCustomId(customId).setTitle(title);
        return modal;
    },
    createTextInput: function (customId, options) {
        if (!options.style)
            options.style = "Short";
        var input = new TextInputBuilder();
        input.setCustomId(customId);
        input.setStyle(TextInputStyle[options.style]);
        if (options.isRequired)
            input.setRequired(options.isRequired);
        if (options.placeholder)
            input.setPlaceholder(options.placeholder);
        if (options.label)
            input.setLabel(options.label);
        if (options.max)
            input.setMaxLength(options.max);
        if (options.min)
            input.setMinLength(options.min);
        if (options.value)
            input.setValue(options.value);
        return input;
    }
};