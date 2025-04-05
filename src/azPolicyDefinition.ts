import * as azure from "@pulumi/azure-native";

export const denyPublicBlobPolicy = new azure.authorization.PolicyDefinition('denyPublicBlocAccess', {
    policyType: "Custom",
    policyDefinitionName: "denyPublicBlobAccess",
    description: "Anonymous public access to containers and blob is a way to increase security risk",
    displayName: "[BEAPP] [DEV] [Storage]: Public Network Access must be disabled",
    mode: "All",
    metadata: {
        Category: "BeApp",
        env: "dev",
        securityCenter: {
            remediationDescription : "Documentation vers la rémédiation",
            Severity: "Medium"
        },
        vesion: 1
    },
    version: "1.0.0",
    parameters: {
        effect: {
            type: "String",
            metadata: {
                description: "The effect determine what happens when the policy rule is evaluated to match",
                displayName: "Effect"
            },
            allowedValues: [
                "Audit",
                "Deny"
            ],
            defaultValue: "Deny"
        }
    },
    policyRule: {
        if: {
            allOn: [
                {
                    field: "type",
                    equals: "Microsoft.Storage/storageAccounts"
                },
                {
                    not: {
                        field: "Microsoft.Storage/storageAccounts/allowBlobPublicAccess",
                        equals: false    
                    }
                }
            ]
        },
        then: {
            effect: "[parameters('effect')]"
        }
    },
    
})

export const enforceMinimumTlsPolicy = new azure.authorization.PolicyDefinition('enforceMinimumTlsPolicy', {
    policyType: "Custom",
    policyDefinitionName: "enforceMinimumTlsPolicy",
    description: "This policy enforce a minimum TLS version for storage account",
    displayName: "[BEAPP] [DEV] [Storage]: Enforce minimum TLS version",
    mode: "All",
    metadata: {
        Category: "BeApp",
        env: "dev",
        securityCenter: {
            remediationDescription : "Documentation vers la rémédiation",
            Severity: "Low"
        },
        vesion: 1
    },
    version: "1.0.0",
    parameters: {
        effect: {
            type: "String",
            metadata: {
                description: "The effect determine what happens when the policy rule is evaluated to match",
                displayName: "Effect"
            },
            allowedValues: [
                "Audit",
                "Deny"
            ],
            defaultValue: "Deny"
        }
    },
    policyRule: {
        if: {
            allOn: [
                {
                    field: "type",
                    equals: "Microsoft.Storage/storageAccounts"
                },
                {
                    not: {
                        field: "Microsoft.Storage/storageAccounts/minimumTlsVersion",
                        equals: false    
                    }
                }
            ]
        },
        then: {
            effect: "[parameters('effect')]"
        }
    },
    
})

export const geoRedundantPolicy = new azure.authorization.PolicyDefinition('geoRedundantPolicy', {
    policyType: "Custom",
    policyDefinitionName: "geoRedundantPolicy",
    description: "Use geo-redundancy to create highly available storage account",
    displayName: "[BEAPP] [DEV] [Storage]: Geo-redundant storage should be enabled",
    mode: "All",
    metadata: {
        Category: "BeApp",
        env: "dev",
        securityCenter: {
            remediationDescription : "Documentation vers la rémédiation",
            Severity: "Low"
        },
        vesion: 1
    },
    version: "1.0.0",
    parameters: {
        effect: {
            type: "String",
            metadata: {
                description: "The effect determine what happens when the policy rule is evaluated to match",
                displayName: "Effect"
            },
            allowedValues: [
                "Audit",
            ],
            defaultValue: "Audit"
        }
    },
    policyRule: {
        if: {
            allOn: [
                {
                    field: "type",
                    equals: "Microsoft.Storage/storageAccounts"
                },
                {
                    not: {
                        field: "Microsoft.Storage/storageAccounts/minimumTlsVersion",
                        in: [
                            "Standard_ZRS",
                            "Standard_GRS",
                            "Standard_RAGRS",
                            "Standard_GZRS",
                            "Standard_RAGZRS"
                        ]  
                    }
                }
            ]
        },
        then: {
            effect: "[parameters('effect')]"
        }
    },
    
})

export const softDeletePolicy = new azure.authorization.PolicyDefinition('softDeletePolicy', {
    policyType: "Custom",
    policyDefinitionName: "softDeletePolicy",
    description: "This policy audit for any storage account must have soft delete enabled",
    displayName: "[BEAPP] [DEV] [Storage]: Soft delete should be enabled for blobs",
    mode: "All",
    metadata: {
        Category: "BeApp",
        env: "dev",
        securityCenter: {
            remediationDescription : "Documentation vers la rémédiation",
            Severity: "Low"
        },
        vesion: 1
    },
    version: "1.0.0",
    parameters: {
        effect: {
            type: "String",
            metadata: {
                description: "The effect determine what happens when the policy rule is evaluated to match",
                displayName: "Effect"
            },
            allowedValues: [
                "Audit",
            ],
            defaultValue: "Audit"
        }
    },
    policyRule: {
        if: {
            allOn: [
                {
                    field: "type",
                    equals: "Microsoft.Storage/storageAccounts/blobServices"
                },
                {
                    anyOf: [
                        {
                            field: "Microsoft.Storage/storageAccounts/blobServices/deleteRetentionPolicy.enabled",
                            exists: false
                        },
                        {
                            field: "Microsoft.Storage/storageAccounts/blobServices/deleteRetentionPolicy.enabled",
                            equals: false
                        }
                    ]
                }
            ]
        },
        then: {
            effect: "[parameters('effect')]"
        }
    },
    
})

export const restrictIPRangePolicy = new azure.authorization.PolicyDefinition('restrictIPRangePolicy', {
    policyType: "Custom",
    policyDefinitionName: "restrictIPRangePolicy",
    description: "This policy restrict Ips ranges used in Storage account firewall rules",
    displayName: "[BEAPP] [DEV] [Storage]: Restrict IPs range in storage account firewall rules",
    mode: "All",
    metadata: {
        Category: "BeApp",
        env: "dev",
        securityCenter: {
            remediationDescription : "Documentation vers la rémédiation",
            Severity: "Meduim"
        },
        vesion: 1
    },
    version: "1.0.0",
    parameters: {
        allowedAddressRanges: {
            type: "Array",
            metadata: {
                description: "The list of allowed IP address range",
                displayName: "Address range"
            }
        },
        effect: {
            type: "String",
            metadata: {
                description: "The effect determine what happens when the policy rule is evaluated to match",
                displayName: "Effect"
            },
            allowedValues: [
                "Audit",
                "Deny"
            ],
            defaultValue: "Deny"
        }
    },
    policyRule: {
        if: {
            allOn: [
                {
                    field: "type",
                    equals: "Microsoft.Storage/storageAccounts"
                },
                {
                    anyOf: [
                        {
                            field: "Microsoft.Storage/storageAccounts/networrkAcls.defaultAction",
                            notEquals: "deny"
                        },
                        {
                            count: {
                                field: "Microsoft.Storage/storageAccounts/networrkAcls.ipRules[*]",
                                where: {
                                    not: {
                                        field: "Microsoft.Storage/storageAccounts/networrkAcls.ipRules[*].value",
                                        in: "[parameters('allowedAddressRanges')]"
                                    }
                                }
                            },
                            greater: 0
                        }
                    ]
                },
                {
                    field: "Microsoft.Storage/storageAccounts/publicNetworkAccess",
                    notEquals: "Disabled"
                }
            ]
        },
        then: {
            effect: "[parameters('effect')]"
        }
    },
    
})

export const enforceHttpsOnlyPolicy = new azure.authorization.PolicyDefinition('enforceHttpsOnlyPolicy', {
    policyType: "Custom",
    policyDefinitionName: "enforceHttpsOnlyPolicy",
    description: "This policy enforce to use https on storage account",
    displayName: "[BEAPP] [DEV] [Storage]: Enforce Https only",
    mode: "All",
    metadata: {
        Category: "BeApp",
        env: "dev",
        securityCenter: {
            remediationDescription : "Documentation vers la rémédiation",
            Severity: "Medium"
        },
        vesion: 1
    },
    version: "1.0.0",
    parameters: {
        effect: {
            type: "String",
            metadata: {
                description: "The effect determine what happens when the policy rule is evaluated to match",
                displayName: "Effect"
            },
            allowedValues: [
                "Audit",
                "Deny"
            ],
            defaultValue: "Deny"
        }
    },
    policyRule: {
        if: {
            allOn: [
                {
                    field: "type",
                    equals: "Microsoft.Storage/storageAccounts"
                },
                {
                    field: "Microsoft.Storage/storageAccounts/supportsHttpsTrafficOnly",
                    equals: false
                }
            ]
        },
        then: {
            effect: "[parameters('effect')]"
        }
    },
})

export const enforceStorageTagsPolicy = new azure.authorization.PolicyDefinition('enforceStorageTagsPolicy', {
    policyType: "Custom",
    policyDefinitionName: "enforceStorageTagsPolicy",
    description: "This policy enforce tgas on storage account",
    displayName: "[BEAPP] [DEV] [Storage]: Enforce use specific tags",
    mode: "All",
    metadata: {
        Category: "BeApp",
        env: "dev",
        securityCenter: {
            remediationDescription : "Documentation vers la rémédiation",
            Severity: "Low"
        },
        vesion: 1
    },
    version: "1.0.0",
    parameters: {
        effect: {
            type: "String",
            metadata: {
                description: "The effect determine what happens when the policy rule is evaluated to match",
                displayName: "Effect"
            },
            allowedValues: [
                "Audit",
                "Modify"
            ],
            defaultValue: "Deny"
        },
        tagValues: {
            type: "String",
            metadata: {
                displayName: "Tags Values",
                description: "Tags resource"
            }
        }
    },
    policyRule: {
        if: {
            allOn: [
                {
                    field: "type",
                    equals: "Microsoft.Storage/storageAccounts"
                },
                {
                    field: "tags[Environment]",
                    exists: false
                }
            ]
        },
        then: {
            effect: "[parameters('effect')]",
            details: {
                operations: [
                    {
                        operation: "add",
                        field: "tags[Environment]",
                        value: "[parameters('tagValues')]"
                    }
                ]
            }
        }
    },
})