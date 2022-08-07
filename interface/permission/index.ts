/**
 * Types and interfaces for Permissions
 * https://identity.foundation/decentralized-web-node/spec/#permissions
 *
 * Author:    Dennis Lien
 * Created:   07.08.2022
 *
 * (c) Copyright by the onevor authors. All rights reserved. MIT license.
 */

import { Descriptor } from '../../type/index.ts';

/**
 * The Permissions interface provides a mechanism for external entities to request access
 *  to various data and functionality provided by a Decentralized Web Node.
 * Permissions employ a capabilities-based architecture that allows for DID-based authorization
 *  and delegation of authorized capabilities to others, if allowed by the owner of a Decentralized Web Node.
 * 
 * 
 */

export enum PermissionMethods {
    PermissionsRequest,
    PermissionsGrant,
    PermissionsRevoke,
    PermissionsQuery,
};
/**
 * https://identity.foundation/decentralized-web-node/spec/#request
 * The message object MUST contain a descriptor property,
 *  and its value MUST be a JSON object composed as follows:
 *
 * 1. The object MUST contain a method property,
 *      and its value MUST be the string PermissionsRequest
 *
 * 2. The object MUST contain a grantedBy property,
 *      and its value MUST be the DID URI string of the party that is granting the permission.
 *
 * 3. The object MUST contain a grantedTo property,
 *      and its value MUST be the DID URI string of the party that is being granted the permission.
 *
 * 4. The object MAY contain a description property,
 *      and its value MUST be a string that the requesting party uses to communicate what the permission is being used for.
 *
 * 5. The object MUST contain a scope property,
 *      and its value MUST be an object of the following properties:
 *
 * 5.1 The object MUST contain a method property,
 *      and its value MUST be the interface method the requesting party wants to invoke.
 *
 * 5.2 The object MAY contain a schema property,
 *       and its value MUST be a URI string that indicates the schema of the associated data.
 *
 * 5.3 The object MAY contain an identifier property
 *      that corresponds with the method specified (i.e. recordId for Collections, threadId for Threads),
 *      and its value MUST be a UUID 4 string reference to an object.
 *      If an identifier property is present the scope object MUST include a schema property.
 */
export interface Scope {
    method: string; // all interface methods
    schema?: string; // schema of the associated data
    identifier?: string; // UUID 4 string reference to an object
}

export interface PermissionRequestDescriptor extends Descriptor {
    method: PermissionMethods.PermissionsRequest;
    grantedBy: string; // DID URI string of the party that is granting the permission
    grantedTo: string; // DID URI string of the party that is being granted the permission
    description?: string; // description of the permission
    scope: Scope;
};