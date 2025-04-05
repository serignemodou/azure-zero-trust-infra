import * as azure from "@pulumi/azure-native";

import { env } from './common';

import {
    restrictIPRangePolicy, 
    denyPublicBlobPolicy, 
    enforceMinimumTlsPolicy, 
    geoRedundantPolicy, 
    softDeletePolicy,
    enforceHttpsOnlyPolicy,
    enforceStorageTagsPolicy} from "./azPolicyDefinition";

export const storageAccountPolicyInitiative = new azure.authorization.PolicySetDefinition('storageAccountPolicyInitiative', {
    displayName: "[BeApp] [Dev] Storage Account",
    description: "Storage Polices for BeApp",
    policyType: "Custom",
    metadata: {
        category: "BeApp"
    },
    policyDefinitions: [
        {
            policyDefinitionId: restrictIPRangePolicy.id,
            parameters: {
                allowedAddressRanges: {
                    value: ["192.168.0.1/24", "10.0.0.0/16"]
                },
                effect: {
                    value: "Deny"
                }
            }
        },
        {
            policyDefinitionId: denyPublicBlobPolicy.id,
            parameters: {
                effect: {
                    value: "Deny"
                }
            }
        },
        {
            policyDefinitionId: enforceMinimumTlsPolicy.id,
            parameters: {
                effect: {
                    value: "Deny"
                }
            }
        },
        {
            policyDefinitionId: geoRedundantPolicy.id,
            parameters: {
                effect: {
                    value: "Audit"
                }
            }
        },
        {
            policyDefinitionId: softDeletePolicy.id,
            parameters: {
                effect: {
                    value: "Audit"
                }
            }
        },
        {
            policyDefinitionId: enforceHttpsOnlyPolicy.id,
            parameters: {
                effect: {
                    value: "Deny"
                }
            }
        },
        {
            policyDefinitionId: enforceStorageTagsPolicy.id,
            parameters: {
                effect: {
                    value: `${env}`
                }
            }
        }
    ]
})