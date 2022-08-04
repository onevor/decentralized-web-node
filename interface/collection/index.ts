import { Descriptor } from '../../type/index.ts';

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
 *  2.  The object MAY contain a schema property,
 *          and if present its value MUST be a URI string that indicates the schema of the associated data
 *  3.  The object MAY contain an recordId property,
 *          and its value MUST be a [RFC4122] UUID Version 4 string
 *  4.  The object MAY contain a dataFormat property,
 *          and its value MUST be a string that indicates the format of the data in accordance with its MIME type designation.
 *          The most common format is JSON, which is indicated by setting the value of the dataFormat property to application/json
 *  5.  The object MAY contain a dateSort field,
 *          and if present its value MUST be one of the following strings
 *  5.1 createdAscending: return results in order from the earliest dateCreated value to the latest
 *  5.2 createdDescending: return results in order from the latest dateCreated value to the earliest
 *  5.3 publishedAscending: return results in order from the earliest datePublished value to the latest
 *  5.4 publishedDescending: return results in order from the latest datePublished value to the earliest.
 */

export enum DateSort {
    createdAscending,
    createdDescending,
    publishedAscending,
    publishedDescending,
}

export interface CollectionQuery extends Descriptor {
    schema: string; // MUST be a URI string
    recordId: string; // MUST be a [RFC4122] UUID Version 4 string
    dateSort: keyof typeof DateSort;
};

