import { Descriptor } from '../../type/index.ts';

export enum DateSort {
    createdAscending,
    createdDescending,
    publishedAscending,
    publishedDescending,
}

export enum CollectionMethods {
    CollectionsQuery,
    CollectionsWrite,
    CollectionsCommit,
    CollectionsDelete,
};

/**
 * CollectionsQuery messages are JSON objects that include general Message Descriptor properties
 *  and the following additional properties, which MUST be composed as follows:
 *
 * The message object MUST contain a descriptor property,
 *  and its value MUST be a JSON object composed as follows:
 *
 *
 *  1.  The object MUST contain a method property,
 *          and its value MUST be the string CollectionsQuery
 *      FROM    TYPE    DESCRIPTION
 *
 *  2.  The object MAY contain a schema property,
 *          and if present its value MUST be a URI string that indicates the schema of the associated data
 *  3.  The object MAY contain an recordId property,
 *          and its value MUST be a [RFC4122] UUID Version 4 string
 *  4.  The object MAY contain a dataFormat property,
 *          and its value MUST be a string that indicates the format of the data in accordance with its MIME type designation.
 *          The most common format is JSON, which is indicated by setting the value of the dataFormat property to application/json
 *      FROM    TYPE    DESCRIPTION
 *
 *  5.  The object MAY contain a dateSort field,
 *          and if present its value MUST be one of the following strings
 *  5.1 createdAscending: return results in order from the earliest dateCreated value to the latest
 *  5.2 createdDescending: return results in order from the latest dateCreated value to the earliest
 *  5.3 publishedAscending: return results in order from the earliest datePublished value to the latest
 *  5.4 publishedDescending: return results in order from the latest datePublished value to the earliest.
 */
export interface CollectionQuery extends Descriptor {
    method: CollectionMethods.CollectionsQuery;
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
 *      FROM    TYPE    DESCRIPTION
 *
 *  2.  The object MUST contain an recordId property,
 *      and its value MUST be a [RFC4122] UUID Version 4 string.
 *  3.  The object MAY contain a schema property,
 *      and if present its value MUST be a URI string that indicates the schema of the associated data.
 *  4.  The object MAY contain a published property,
 *      and if present its value MUST be a boolean indicating the record’s publication state.
 *      A value of true indicates the record has been published for public queries and consumption without requiring authorization.
 *      A value of false or the absence of the property indicates the record
 *      MUST NOT be served in response to public queries that lack proper authorization.
 *  5.  The object MUST contain a dateCreated property,
 *      and its value MUST be a Unix epoch timestamp
 *      that MUST be set and interpreted as the time the logical entry was created by the DID owner or another permitted party.
 *  6.  The object MAY contain a datePublished property,
 *      and its value MUST be a Unix epoch timestamp
 *      that MUST be set and interpreted as the time the logical entry was published by the DID owner or another permitted party.
 */
export interface CollectionWrite extends Descriptor {
    method: CollectionMethods.CollectionsWrite;
    recordId: string; // MUST be a [RFC4122] UUID Version 4 string
    schema?: string; // MUST be a URI string
    published?: boolean; // MUST be a boolean indicating the record’s publication state.
    dateCreated: number; // MUST be a Unix epoch timestamp that MUST be set and interpreted as the time the logical entry was created by the DID owner or another permitted party.
    datePublished?: number; // MUST be a Unix epoch timestamp that MUST be set and interpreted as the time the logical entry was published by the DID owner or another permitted party.
};

/**
 *
 * CollectionsCommit messages are JSON objects that include general Message Descriptor properties
 *  and the following additional properties, which MUST be composed as follows:
 * 
 * The message object MUST contain a descriptor property,
 *  and its value MUST be a JSON object composed as follows:
 * 
 *  1.  The object MUST contain a method property,
 *      and its value MUST be the string CollectionsCommit.
 *      FROM    TYPE    DESCRIPTION
 *
 *  2.  The object MUST contain an recordId property,
 *      and its value MUST be a [RFC4122] UUID Version 4 string.
 *  3.  The object MAY contain a schema property,
 *      and if present its value MUST be a URI string that indicates the schema of the associated data.
 *  4.  The object MUST contain a dateCreated property,
 *      and its value MUST be a Unix epoch timestamp
 *      that MUST be set and interpreted as the time the logical entry was created by the DID owner or another permitted party.
 *  5.  The object MAY contain a datePublished property,
 *      and its value MUST be a Unix epoch timestamp
 *      that MUST be set and interpreted as the time the logical entry was published by the DID owner or another permitted party.
 */

export interface CollectionCommit extends Descriptor {
    method: CollectionMethods.CollectionsCommit;
    recordId: string; // MUST be a [RFC4122] UUID Version 4 string
    schema?: string; // MUST be a URI string
    dateCreated: number; // MUST be a Unix epoch timestamp that MUST be set and interpreted as the time the logical entry was created by the DID owner or another permitted party.
    datePublished?: number; // MUST be a Unix epoch timestamp that MUST be set and interpreted as the time the logical entry was published by the DID owner or another permitted party.
};

/**
 *
 * CollectionsDelete messages are JSON objects that include general Message Descriptor properties
 *  and the following additional properties, which MUST be composed as follows: 
 *
 *  The message object MUST contain a descriptor property,
 *      and its value MUST be a JSON object composed as follows:
 *
 *  1. The object MUST contain a method property,
 *     and its value MUST be the string CollectionsDelete.
 *  2. The object MUST contain an recordId property,
 *     and its value MUST be a [RFC4122] UUID Version 4 string of the record to be deleted.
 */
export interface CollectionDelete extends Descriptor {
    method: CollectionMethods.CollectionsDelete;
    recordId: string; // MUST be a [RFC4122] UUID Version 4 string
};

