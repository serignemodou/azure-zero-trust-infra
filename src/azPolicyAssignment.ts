import * as azure from "@pulumi/azure-native";

import {subscriptionID} from "./common";
import {storageAccountPolicyInitiative} from "./azPolicyInitiative"

new azure.authorization.PolicyAssignment('storageAccountPolicyAssignment', {
    displayName: "Storage Account Policies",
    policyAssignmentName: 'storageAccountPolicyAssignment',
    policyDefinitionId: storageAccountPolicyInitiative.id,
    scope: `/subscriptions/${subscriptionID}`
})