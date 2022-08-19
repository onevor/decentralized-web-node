/**
 * Types and interfaces for collections.
 * https://identity.foundation/decentralized-web-node/spec/#collections
 *
 * Author:    Dennis Lien
 * Created:   07.08.2022
 *
 * (c) Copyright by the onevor authors. All rights reserved. MIT license.
 */

import { Descriptor } from '../../type/index';

export enum DateSort {
    CREATED_ASCENDING = 'createdAscending',
    CREATED_DESCENDING = 'createdDescending',
    PUBLISHED_ASCENDING = 'publishedAscending',
    PUBLISHED_DESCENDING = 'publishedDescending',
}

export enum CollectionMethods {
    COLLECTIONS_QUERY = 'CollectionsQuery',
    COLLECTIONS_WRITE = 'CollectionsWrite',
    COLLECTIONS_COMMIT = 'CollectionsCommit',
    COLLECTIONS_DELETE = 'CollectionsDelete',
};

/**
 * https://identity.foundation/decentralized-web-node/spec/#query
 * CollectionsQuery messages are JSON objects that include general Message Descriptor properties
 *  and the following additional properties, which MUST be composed as follows:
 *
 * The message object MUST contain a descriptor property,
 *  and its value MUST be a JSON object composed as follows:
 *
 *
 *  1.  The object MUST contain a method property,
 *          and its value MUST be the string CollectionsQuery
 *
 *  2.  The object MAY contain a schema property,
 *          and if present its value MUST be a URI string that indicates the schema of the associated data
 *
 *  3.  The object MAY contain an recordId property,
 *          and its value MUST be a [RFC4122] UUID Version 4 string
 *
 *  4.  The object MAY contain a dataFormat property,
 *          and its value MUST be a string that indicates the format of the data in accordance with its MIME type designation.
 *          The most common format is JSON, which is indicated by setting the value of the dataFormat property to application/json
 *
 *  5.  The object MAY contain a dateSort field,
 *          and if present its value MUST be one of the following strings
 *
 *      5.1 createdAscending:
 *              return results in order from the earliest dateCreated value to the latest
 *      5.2 createdDescending:
 *              return results in order from the latest dateCreated value to the earliest
 *      5.3 publishedAscending:
 *              return results in order from the earliest datePublished value to the latest
 *      5.4 publishedDescending:
 *              return results in order from the latest datePublished value to the earliest.
 */
export interface CollectionQuery extends Descriptor {
    method: CollectionMethods.COLLECTIONS_QUERY;
    schema?: string; // MUST be a URI string
    recordId?: string; // MUST be a [RFC4122] UUID Version 4 string
    dateSort: keyof typeof DateSort;
};

/**
 * https://identity.foundation/decentralized-web-node/spec/#write
 * CollectionsWrite messages are JSON objects
 *  that include general Message Descriptor properties
 *  and the following additional properties, which MUST be composed as follows:
 *
 * The message object MUST contain a descriptor property,
 *  and its value MUST be a JSON object composed as follows:
 *
 *  1.  The object MUST contain a method property,
 *      and its value MUST be the string CollectionsWrite.
 *
 *  2.  The object MUST contain an recordId property,
 *      and its value MUST be a [RFC4122] UUID Version 4 string.
 *
 *  3.  The object MAY contain a schema property,
 *      and if present its value MUST be a URI string that indicates the schema of the associated data.
 *
 *  4.  The object MAY contain a published property,
 *      and if present its value MUST be a boolean indicating the record’s publication state.
 *      A value of true indicates the record has been published for public queries and consumption without requiring authorization.
 *      A value of false or the absence of the property indicates the record
 *      MUST NOT be served in response to public queries that lack proper authorization.
 *
 *  5.  The object MUST contain a dateCreated property,
 *      and its value MUST be a Unix epoch timestamp
 *      that MUST be set and interpreted as the time the logical entry was created by the DID owner or another permitted party.
 *
 *  6.  The object MAY contain a datePublished property,
 *      and its value MUST be a Unix epoch timestamp
 *      that MUST be set and interpreted as the time the logical entry was published by the DID owner or another permitted party.
 */
export interface CollectionWrite extends Descriptor {
    method: CollectionMethods.COLLECTIONS_WRITE;
    recordId: string; // MUST be a [RFC4122] UUID Version 4 string
    schema?: string; // MUST be a URI string
    published?: boolean; // MUST be a boolean indicating the record’s publication state.
    dateCreated: number; // MUST be a Unix epoch timestamp that MUST be set and interpreted as the time the logical entry was created by the DID owner or another permitted party.
    datePublished?: number; // MUST be a Unix epoch timestamp that MUST be set and interpreted as the time the logical entry was published by the DID owner or another permitted party.
};

/**
 * https://identity.foundation/decentralized-web-node/spec/#commit
 * CollectionsCommit messages are JSON objects that include general Message Descriptor properties
 *  and the following additional properties, which MUST be composed as follows:
 *
 * The message object MUST contain a descriptor property,
 *  and its value MUST be a JSON object composed as follows:
 *
 *  1.  The object MUST contain a method property,
 *      and its value MUST be the string CollectionsCommit.
 *
 *  2.  The object MUST contain an recordId property,
 *      and its value MUST be a [RFC4122] UUID Version 4 string.
 *
 *  3.  The object MAY contain a schema property,
 *      and if present its value MUST be a URI string that indicates the schema of the associated data.
 *
 *  4.  The object MUST contain a dateCreated property,
 *      and its value MUST be a Unix epoch timestamp
 *      that MUST be set and interpreted as the time the logical entry was created by the DID owner or another permitted party.
 *
 *  5.  The object MAY contain a datePublished property,
 *      and its value MUST be a Unix epoch timestamp
 *      that MUST be set and interpreted as the time the logical entry was published by the DID owner or another permitted party.
 */

export interface CollectionCommit extends Descriptor {
    method: CollectionMethods.COLLECTIONS_COMMIT;
    recordId: string; // MUST be a [RFC4122] UUID Version 4 string
    schema?: string; // MUST be a URI string
    dateCreated: number; // MUST be a Unix epoch timestamp that MUST be set and interpreted as the time the logical entry was created by the DID owner or another permitted party.
    datePublished?: number; // MUST be a Unix epoch timestamp that MUST be set and interpreted as the time the logical entry was published by the DID owner or another permitted party.
};

/**
 * https://identity.foundation/decentralized-web-node/spec/#delete
 * CollectionsDelete messages are JSON objects that include general Message Descriptor properties
 *  and the following additional properties, which MUST be composed as follows: 
 *
 *  The message object MUST contain a descriptor property,
 *      and its value MUST be a JSON object composed as follows:
 *
 *  1. The object MUST contain a method property,
 *     and its value MUST be the string CollectionsDelete.
 *
 *  2. The object MUST contain an recordId property,
 *     and its value MUST be a [RFC4122] UUID Version 4 string of the record to be deleted.
 */
export interface CollectionDelete extends Descriptor {
    method: CollectionMethods.COLLECTIONS_DELETE;
    recordId: string; // MUST be a [RFC4122] UUID Version 4 string
};

