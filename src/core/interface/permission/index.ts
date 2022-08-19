/**
 * Types and interfaces for Permissions
 * https://identity.foundation/decentralized-web-node/spec/#permissions
 *
 * Author:    Dennis Lien
 * Created:   07.08.2022
 *
 * (c) Copyright by the onevor authors. All rights reserved. MIT license.
 */

import { Descriptor } from '../../type/index';

/**
 * The Permissions interface provides a mechanism for external entities to request access
 *  to various data and functionality provided by a Decentralized Web Node.
 * Permissions employ a capabilities-based architecture that allows for DID-based authorization
 *  and delegation of authorized capabilities to others, if allowed by the owner of a Decentralized Web Node.
 */

export enum PermissionMethods {
    PERMISSIONS_REQUEST = 'PermissionsRequest',
    PERMISSIONS_GRANT = 'PermissionsGrant',
    PERMISSIONS_REVOKE = 'PermissionsRevoke',
    PERMISSIONS_QUERY = 'PermissionsQuery',
}
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
    method: PermissionMethods.PERMISSIONS_REQUEST;
    grantedBy: string; // DID URI string of the party that is granting the permission
    grantedTo: string; // DID URI string of the party that is being granted the permission
    description?: string; // description of the permission
    scope: Scope;
}

/**
 * https://identity.foundation/decentralized-web-node/spec/#request
 * The object MAY contain a conditions property,
 *  and its value MUST be an object of the following properties:
 *
 * 1. The object MAY contain an attestation property,
 *      and if present its value MUST be a string representing the signing conditions detailed below.
 *      If the property is not present it MUST be evaluated as if it were set to the value optional.
 *
 *      1.1  prohibited - the object MUST NOT be signed.
 *
 *      1.2  optional - the object MAY be signed using a key linked to the DID of the owner of a Decentralized Web Node
 *           or authoring party (whichever is relevant to the application-level use case).
 *
 *      1.3  required - the object MUST be signed using a key linked to the DID of the owner of a Decentralized Web Node
 *           or authoring party (whichever is relevant to the application-level use case).
 *
 * 2. The object MAY contain an encryption property,
 *     and if present its value MUST be a string representing the encryption conditions detailed below.
 *     If the property is not present it MUST be evaluated as if it were set to the value optional.
 *
 *      2.1  optional - the object MAY be encrypted using the key provided by the owner of a Decentralized Web Node in the [RFC7516] JSON Web Encryption (JWE) format.
 *
 *      2.2  required - the object MUST be encrypted using the key provided by the owner of a Decentralized Web Node in the [RFC7516] JSON Web Encryption (JWE) format.
 *
 * 3. The object MAY contain a delegation property,
 *      and its value MUST be a boolean, wherein true indicates the issuing party is allowing the grantee the ability to delegate the capability.
 *      A value of false or omission of the property MUST be evaluated as false, and indicates the grantee MUST NOT be allowed to delegate the capability.
 *
 * 4. The object MAY contain a publication property,
 *      and its value MUST be a boolean, wherein true indicates the issuing party is allowing the grantee the ability to publish data tied to methods that support the public boolean value in their descriptor field sets.
 *      Conforming implementations MUST throw an error and fail to grant a permission if this property is present and the method does not support publication.
 *
 * 5. The object MAY contain a sharedAccess property,
 *      and its value MUST be a boolean, wherein true indicates the requesting party wants the ability to use the permission against any object or data that aligns with the capability’s definition, regardless of which entity created the object or data.
 *      A value of false or omission of the property MUST be evaluated as false, and indicates the requesting party only needs the ability to invoke the permission against objects or data it creates.
 */
export interface PermissionConditions {
    attestation?: 'prohibited' | 'optional' | 'required';
    encryption?: 'optional' | 'required';
    delegation?: boolean;
    publication?: boolean;
    sharedAccess?: boolean;
}

/**
 * https://identity.foundation/decentralized-web-node/spec/#grant
 * The message object MUST contain a descriptor property, and its value MUST be a JSON object composed as follows:
 *
 * 1. The object MUST contain a method property,
 *      and its value MUST be the string PermissionsGrant.
 *
 * 2. The object MUST contain an permissionGrantId property,
 *     and its value MUST be a [RFC4122] UUID Version 4 string representing the reply object.
 *
 * 3. If the granted permission is in response to a PermissionRequest, the object MUST contain a permissionRequestId property,
 *      and its value MUST be the [RFC4122] UUID Version 4 string of the PermissionRequest object the permission is being granted in relation to.
 *
 * 4. The object MUST contain a grantedBy property,
 *      and its value MUST be the DID URI string of the party that is granting the permission.
 *
 * 5. The object MUST contain a grantedTo property,
 *      and its value MUST be the DID URI string of the party that is being granted the permission.
 *
 * 6. If the PermissionsGrant is a delegated permission, the object MUST contain a delegatedFrom property,
 *      and its value MUST be a [RFC4122] UUID Version 4 string matching the permissionGrantId of the PermissionsGrant it was delegated from.
 *
 * 7. The object MUST contain a expiry property,
 *      and its value MUST be a Unix epoch timestamp that can be used to trigger revocation activities.
 *
 * 8. The object MUST contain a scope property,
 *     and its value MUST be an object of the following properties:
 *
 *      8.1. The object MUST contain a method property,
 *           and its value MUST be the interface method the requesting party wants to invoke.
 *
 *      8.2. The object MAY contain a schema property,
 *           and its value MUST be a URI string that indicates the schema of the associated data.
 *
 *      8.3. The object MAY contain an identifier property
 *           that corresponds with the method specified (i.e. recordId for Collections, threadId for Threads),
 *           and its value MUST be a UUID 4 string reference to an object.
 *           If an identifier property is present the scope object MUST include a schema property.
 */
export interface PermissionGrantDescriptor extends Descriptor {
    method: PermissionMethods.PERMISSIONS_GRANT;
    permissionGrantId: string; // UUID 4 string representing the reply object
    permissionRequestId?: string; // UUID 4 string of the PermissionRequest object the permission is being granted in relation to
    grantedBy: string; // DID URI string of the party that is granting the permission
    grantedTo: string; // DID URI string of the party that is being granted the permission
    delegatedFrom?: string; // UUID 4 string matching the permissionGrantId of the PermissionsGrant it was delegated from
    expiry: number; // Unix epoch timestamp that can be used to trigger revocation activities
    scope: Scope;
}

/**
 * https://identity.foundation/decentralized-web-node/spec/#revoke
 * Revocation of a permission is the act of closing off any additional or invalid invocations of that permission.
 * The Revoke interface method enables revocation of a permission via direct reference to the permission’s nonce.
 *
 * TODO: this.
 */

/**
 * https://identity.foundation/decentralized-web-node/spec/#query-3
 * The message object MUST contain a descriptor property, and its value MUST be a JSON object composed as follows:
 *
 * 1. The object MUST contain a method property,
 *     and its value MUST be the string PermissionsQuery.
 *
 * 2. The object MAY contain any of the following properties from the descriptors of
 *      PermissionsRequest, PermissionsGrant, and PermissionsRevoke objects:
 *
 *      2.1. permissionRequestId
 *      2.2. permissionGrantId
 *      2.3. permissionRevokeId
 *      2.4. grantedBy
 *      2.5. grantedTo
 *      2.6. delegatedFrom
 *      2.7. all properties of scope objects
 */

export interface PermissionQueryDescriptor extends Descriptor {
    method: PermissionMethods.PERMISSIONS_QUERY;
    permissionRequestId?: string; // UUID 4 string of the PermissionRequest object the permission is being granted in relation to
    permissionGrantId?: string; // UUID 4 string of the PermissionGrant object the permission is being granted in relation to
    permissionRevokeId?: string; // UUID 4 string of the PermissionRevoke object the permission is being revoked in relation to
    grantedBy?: string; // DID URI string of the party that is granting the permission
    grantedTo?: string; // DID URI string of the party that is being granted the permission
    delegatedFrom?: string; // UUID 4 string matching the permissionGrantId of the PermissionsGrant it was delegated from
    scope?: Scope;
}
