
/**
 * The object MAY contain a collections property.
 *  If the property is not present, it indicates the Decentralized Web Node
 *  implementation does not support any methods of the interface.
 *  
 *  If the property is present,
 *      its value MUST be an object that MAY include any of the following properties,
 *      wherein a boolean true value indicates support for the interface method, while a boolean false value
 *      or omission of the property indicates the interface method is not supported:
 *  
 *  - CollectionsQuery
 *  - CollectionsWrite
 *  - CollectionsCommit
 *  - CollectionsDelete
 */
type Collection = {
    CollectionsQuery?: boolean;
    CollectionsWrite?: boolean;
    CollectionsCommit?: boolean;
    CollectionsDelete?: boolean;
};

/**
 * The object MAY contain a actions property.
 *  If the property is not present, it indicates the Decentralized Web Node
 * implementation does not support any methods of the interface.
 * 
 *  If the property is present,
 *      its value MUST be an object that MAY include any of the following properties,
 *      wherein a boolean true value indicates support for the interface method, while a boolean false value
 *      or omission of the property indicates the interface method is not supported:
 * 
 *  - ThreadsQuery
 *  - ThreadsCreate
 *  - ThreadsReply
 *  - ThreadsClose
 *  - ThreadsDelete
 */
type Action = {
    ThreadsQuery?: boolean;
    ThreadsCreate?: boolean;
    ThreadsReply?: boolean;
    ThreadsClose?: boolean;
    ThreadsDelete?: boolean;
};

/**
 * The object MAY contain a permissions property.
 *  If the property is not present, it indicates the Decentralized Web Node
 * implementation does not support any methods of the interface.
 * 
 *  If the property is present,
 *      its value MUST be an object that MAY include any of the following properties,
 *      wherein a boolean true value indicates support for the interface method, while a boolean false value
 *      or omission of the property indicates the interface method is not supported:
 * 
 *  - PermissionsRequest
 *  - PermissionsGrant
 *  - PermissionsRevoke
 */
type Permission = {
    PermissionsRequest?: boolean;
    PermissionsGrant?: boolean;
    PermissionsRevoke?: boolean;
};

/**
 * The object MAY contain a messaging property,
 * and its value MAY be an object composed of the following:
 * 
 * The object MAY contain a batching property,
 *  and if present its value MUST be a boolean indicating whether the
 *  Decentralized Web Node handles multiple messages in a single request.
 *  The absence of this property SHALL indicate that the Decentralized Web Node DOES support multiple messages in a single request,
 *  thus if an implementer does not support multiple messages in a request, they MUST include this property and explicitly set its value to false.
 */
type Messaging = {
    batching?: boolean;
};

type Interfaces = {
    collections: Collection;
    actions: Action;
    permissions: Permission;
    messaging: Messaging;
};

interface FeatureDetection {
    type: 'FeatureDetection';
    interfaces: Interfaces;
};