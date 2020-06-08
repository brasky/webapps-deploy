"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core = require("@actions/core");
const actions_secret_parser_1 = require("actions-secret-parser");
class PublishProfile {
    constructor(publishProfileContent) {
        try {
            let secrets = new actions_secret_parser_1.SecretParser(publishProfileContent, actions_secret_parser_1.FormatType.XML);
            this._creds = {
                uri: secrets.getSecret("//publishProfile/@publishUrl", false),
                username: secrets.getSecret("//publishProfile/@userName", true),
                password: secrets.getSecret("//publishProfile/@userPWD", true)
            };
            this._appUrl = secrets.getSecret("//publishProfile/@destinationAppUrl", false);
            this._creds.uri = `https://${this._creds.uri}`;
        }
        catch (error) {
            core.error("Failed to fetch credentials from Publish Profile. For more details on how to set publish profile credentials refer https://aka.ms/create-secrets-for-GitHub-workflows");
            throw error;
        }
    }
    static getPublishProfile(publishProfileContent) {
        if (!this._publishProfile) {
            this._publishProfile = new PublishProfile(publishProfileContent);
        }
        return this._publishProfile;
    }
    get creds() {
        return this._creds;
    }
    get appUrl() {
        return this._appUrl;
    }
}
exports.PublishProfile = PublishProfile;
