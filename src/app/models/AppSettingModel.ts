export class AppSettingsPublicValues{
    // Social Medias
    discordUrl : string = "";
    instagramUrl : string = "";
    youtubeUrl : string = "";
    twitterUrl : string = "";
    tikTokUrl : string = "";

    // Server
    serverIp : string = "";

    [key: string]: string;
}

export class AppSettingValues extends AppSettingsPublicValues
{
    // Key Tebex
    webStoreIdentifier : string = "";
    xTebexSecret : string = "";
}