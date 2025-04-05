import * as pulumi from "@pulumi/pulumi"

export const env = pulumi.getStack();
export const projectName = pulumi.getProject();
export const projectConfig = new pulumi.Config('project');

const azureNativeConfig = new pulumi.Config('azure-native');

export const subscriptionID = azureNativeConfig.require('subscriptionID');