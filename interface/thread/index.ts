/**
 * Types and interfaces for Threads.
 * https://identity.foundation/decentralized-web-node/spec/#threads
 *
 * Author:    Dennis Lien
 * Created:   07.08.2022
 *
 * (c) Copyright by the onevor authors. All rights reserved. MIT license.
 */
import { Descriptor } from '../../type/index.ts';

/**
 * Threads are a linked series of topically associated messages
 *  that are intended to result in activities performed by entities participating in the message thread.
 *
 *  Threads have the following methods:
 *    - ThreadsQuery
 *    - ThreadsCreate
 *    - ThreadsReply
 *    - ThreadsClose
 *    - ThreadsDelete
 */

export enum ThreadMethods {
    ThreadsQuery,
    ThreadsCreate,
    ThreadsReply,
    ThreadsClose,
    ThreadsDelete,
};

/**
 * https://identity.foundation/decentralized-web-node/spec/#query-2
 *
 * Threads query dos not have a defined description in the spec.
 *  Only an example exists:
 * ```
 * { // Message
 *   "descriptor": { // Message Descriptor
 *    "nonce": "9b9c7f1fcabfc471ee2682890b58a427ba2c8db59ddf3c2d5ad16ccc84bb3106",
 *    "method": "ThreadsQuery",
 *    "threadId": "b6464162-84af-4aab-aff5-f1f8438dfc1e"
 *  }
 * }
 * ```
 */

export interface ThreadQuery extends Descriptor {
    method: ThreadMethods.ThreadsQuery;
    threadId?: string; // MUST be a [RFC4122] UUID Version 4 string
};

/**
 * https://identity.foundation/decentralized-web-node/spec/#create
 * ThreadsCreate messages are JSON objects that include general Message Descriptor properties
 *  and the following additional properties, which MUST be composed as follows:
 *
 * The message object MUST contain a descriptor property,
 *  and its value MUST be a JSON object composed as follows:
 *
 * 1. The object MUST contain a method property,
 *      and its value MUST be the string ThreadsCreate.
 *
 * 2. The object MUST contain a threadId property,
 *      and its value MUST be a [RFC4122] UUID Version 4 string for the Thread being created.
 *
 * 3. The object MUST contain a threadType property,
 *      and its value MUST be a URI string that indicates the overall type of thread that is being transacted.
 *
 * 4. The object MUST contain a schema property,
 *      and its value MUST be a URI string that indicates the schema of the data being passed in the thread message.
 *
 * 5. The object MAY contain a published property,
 *      and if present its value MUST be a boolean indicating the thread’s publication state.
 *      A value of true indicates the record has been published for public queries and consumption without requiring authorization.
 *      A value of false or the absence of the property indicates the thread MUST NOT be served in response to public queries that lack proper authorization.
 */
export interface ThreadCreate extends Descriptor {
    method: ThreadMethods.ThreadsCreate;
    threadId: string; // MUST be a [RFC4122] UUID Version 4 string
    threadType: string; // MUST be a URI string that indicates the overall type of thread that is being transacted.
    schema: string; // MUST be a URI string that indicates the schema of the data being passed in the thread message.
    published?: boolean;
};

/**
 * https://identity.foundation/decentralized-web-node/spec/#reply
 * ThreadsReply messages are JSON objects that include general Message Descriptor properties
 *  and the following additional properties, which MUST be composed as follows:
 *
 * The message object MUST contain a descriptor property,
 *  and its value MUST be a JSON object composed as follows:
 *
 * 1. The object MUST contain a method property,
 *     and its value MUST be the string ThreadsReply.
 *
 * 2. The object MUST contain a threadId property,
 *      and its value MUST be a [RFC4122] UUID Version 4 string for the Thread to which the reply belongs.
 *
 * 3. The object MUST contain a parentId property,
 *     and its value MUST be a [RFC4122] UUID Version 4 string for the message in the Thread being replied to.
 *
 * 4. The object MUST contain a schema property,
 *      and its value MUST be a URI string that indicates the schema of the data being passed in the thread message.
 */

export interface ThreadReply extends Descriptor {
    method: ThreadMethods.ThreadsReply;
    threadId: string; // MUST be a [RFC4122] UUID Version 4 string
    parentId: string; // MUST be a [RFC4122] UUID Version 4 string
    schema: string; // MUST be a URI string that indicates the schema of the data being passed in the thread message.
};

/**
 * https://identity.foundation/decentralized-web-node/spec/#close
 * ThreadsClose messages are JSON objects that include general Message Descriptor properties
 *  and the following additional properties, which MUST be composed as follows:
 *
 * The message object MUST contain a descriptor property,
 *  and its value MUST be a JSON object composed as follows:
 *
 * 1. The object MUST contain a method property,
 *      and its value MUST be the string ThreadsClose.
 *
 * 2. The object MUST contain a threadId property,
 *      and its value MUST be a [RFC4122] UUID Version 4 string for the Thread to be closed.
 */
export interface ThreadClose extends Descriptor {
    method: ThreadMethods.ThreadsClose;
    threadId: string; // MUST be a [RFC4122] UUID Version 4 string
};

/**
 * https://identity.foundation/decentralized-web-node/spec/#delete-2
 * ThreadsDelete messages are JSON objects that include general Message Descriptor properties
 * and the following additional properties, which MUST be composed as follows:
 *
 * The message object MUST contain a descriptor property,
 * and its value MUST be a JSON object composed as follows:
 *
 * 1. The object MUST contain a method property,
 *    and its value MUST be the string ThreadsDelete.
 *
 * 2. The object MUST contain a threadId property,
 *   and its value MUST be a [RFC4122] UUID Version 4 string for the Thread to be deleted.
 */

export interface ThreadDelete extends Descriptor {
    method: ThreadMethods.ThreadsDelete;
    threadId: string; // MUST be a [RFC4122] UUID Version 4 string
};