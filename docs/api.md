## Modules

<dl>
<dt><a href="#module_CozyClient">CozyClient</a></dt>
<dd></dd>
<dt><a href="#module_AppCollection">AppCollection</a></dt>
<dd></dd>
<dt><a href="#module_CozyStackClient">CozyStackClient</a></dt>
<dd></dd>
<dt><a href="#module_DocumentCollection">DocumentCollection</a></dt>
<dd><p>Abstracts a collection of documents of the same doctype, providing CRUD methods and other helpers.</p>
</dd>
<dt><a href="#module_FileCollection">FileCollection</a></dt>
<dd><p>Abstracts a collection of files</p>
<p>Files are a special type of documents and are handled differently by the stack:
special routes are to be used, and there is a notion of referenced files, aka
files associated to a specific document</p>
</dd>
<dt><a href="#module_OAuthClient">OAuthClient</a></dt>
<dd></dd>
<dt><a href="#module_PermissionCollection">PermissionCollection</a></dt>
<dd><p>Interact with permissions</p>
</dd>
<dt><a href="#module_SharingCollection">SharingCollection</a></dt>
<dd><p>Interact with sharing doctypes</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#encode">encode</a></dt>
<dd><p>Encode an object as querystring, values are encoded as
URI components, keys are not.</p>
</dd>
<dt><a href="#buildURL">buildURL</a></dt>
<dd><p>Returns a URL from base url and a query parameter object.
Any undefined parameter is removed.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#normalizeDoctypeSchema">normalizeDoctypeSchema()</a></dt>
<dd><p>Returns a normalized schema object from the schema definition.</p>
<ul>
<li>Relationships are resolved to classes if needed</li>
<li>The name of the relationship (its key in the schema definition)
is included in the relationship</li>
<li>Empty relationships are nulled</li>
</ul>
</dd>
<dt><a href="#getDoctypeSchema">getDoctypeSchema()</a></dt>
<dd><p>Returns the schema for a doctype</p>
</dd>
<dt><a href="#getRelationship">getRelationship()</a></dt>
<dd><p>Returns the relationship for a given doctype/name</p>
</dd>
<dt><a href="#validate">validate()</a></dt>
<dd><p>Validates a document considering the descriptions in schema.attributes.</p>
</dd>
<dt><a href="#withClient">withClient(Component)</a> ⇒ <code>function</code></dt>
<dd><p>HOC to provide client from context as prop</p>
</dd>
<dt><a href="#queryConnect">queryConnect(querySpecs)</a> ⇒ <code>function</code></dt>
<dd><p>HOC creator to connect component to several queries in a declarative manner</p>
</dd>
<dt><a href="#startReplication">startReplication()</a> ⇒ <code>void</code></dt>
<dd><p>User of the link can call this to start ongoing replications.
Typically, it can be used when the application regains focus.</p>
</dd>
<dt><a href="#stopReplication">stopReplication()</a> ⇒ <code>void</code></dt>
<dd><p>User of the link can call this to stop ongoing replications.
Typically, it can be used when the applications loses focus.</p>
</dd>
<dt><a href="#startReplicationLoop">startReplicationLoop()</a></dt>
<dd><p>Starts periodic syncing of the pouches</p>
</dd>
<dt><a href="#stopReplicationLoop">stopReplicationLoop()</a></dt>
<dd><p>Stop periodic syncing of the pouches</p>
</dd>
<dt><a href="#replicateOnce">replicateOnce()</a></dt>
<dd><p>Starts replication</p>
</dd>
<dt><a href="#defaultSelector">defaultSelector(options)</a> ⇒ <code>Array</code></dt>
<dd><p>Compute fields that should be indexed for a mango
query to work</p>
</dd>
<dt><a href="#setIntervalPromise">setIntervalPromise()</a></dt>
<dd><p>Will periodically run a function so that when the promise
is resolved, the next function is called after <delay>ms.</p>
<p>Returns a function which cancels the periodic calling.
When canceled, if there is an ongoing promise, it will
continue.</p>
</dd>
<dt><a href="#uri">uri()</a></dt>
<dd><p>Template tag function for URIs encoding</p>
<p>Will automatically apply <code>encodeURIComponent</code> to template literal placeholders</p>
</dd>
<dt><a href="#attempt">attempt()</a></dt>
<dd><p>Helps to avoid nested try/catch when using async/await</p>
<p>Inspired by a Go pattern: <a href="http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/">http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/</a></p>
</dd>
<dt><a href="#sleep">sleep()</a></dt>
<dd><p>Helps to avoid nested try/catch when using async/await — see documentation for attemp</p>
</dd>
</dl>

<a name="module_CozyClient"></a>

## CozyClient

* [CozyClient](#module_CozyClient)
    * [.collection(doctype)](#module_CozyClient+collection) ⇒ <code>DocumentCollection</code>
    * [.getDocumentSavePlan(document, relationships)](#module_CozyClient+getDocumentSavePlan) ⇒ <code>Array.&lt;object&gt;</code>
    * [.hydrateDocument()](#module_CozyClient+hydrateDocument)
    * [.register(cozyURL)](#module_CozyClient+register) ⇒ <code>object</code>
    * [.startOAuthFlow(openURLCallback)](#module_CozyClient+startOAuthFlow) ⇒ <code>object</code>
    * [.renewAuthorization()](#module_CozyClient+renewAuthorization) ⇒ <code>object</code>
    * [.setData(data)](#module_CozyClient+setData)

<a name="module_CozyClient+collection"></a>

### cozyClient.collection(doctype) ⇒ <code>DocumentCollection</code>
Forwards to a stack client instance and returns
a [DocumentCollection](DocumentCollection) instance.

**Kind**: instance method of [<code>CozyClient</code>](#module_CozyClient)  

| Param | Type | Description |
| --- | --- | --- |
| doctype | <code>String</code> | The collection doctype. |

<a name="module_CozyClient+getDocumentSavePlan"></a>

### cozyClient.getDocumentSavePlan(document, relationships) ⇒ <code>Array.&lt;object&gt;</code>
getDocumentSavePlan - Creates a list of mutations to execute to create a document and its relationships.

**Kind**: instance method of [<code>CozyClient</code>](#module_CozyClient)  
**Returns**: <code>Array.&lt;object&gt;</code> - One or more mutation to execute  

| Param | Type | Description |
| --- | --- | --- |
| document | <code>object</code> | The base document to create |
| relationships | <code>object</code> | The list of relationships to add, as a dictionnary. Keys should be relationship names and values the documents to link. |

**Example**  
```js
const baseDoc = { _type: 'io.cozy.todo', label: 'Go hiking' }
// relations can be arrays or single objects
const relationships = {
  attachments: [{ _id: 12345, _type: 'io.cozy.files' }, { _id: 6789, _type: 'io.cozy.files' }],
  bills: { _id: 9999, _type: 'io.cozy.bills' }
}
client.getDocumentSavePlan(baseDoc, relationships)
```
<a name="module_CozyClient+hydrateDocument"></a>

### cozyClient.hydrateDocument()
Instantiate relationships on a document

The original document is kept in the target attribute of
the relationship

**Kind**: instance method of [<code>CozyClient</code>](#module_CozyClient)  
<a name="module_CozyClient+register"></a>

### cozyClient.register(cozyURL) ⇒ <code>object</code>
Performs a complete OAuth flow using a Cordova webview for auth.
The `register` method's name has been chosen for compat reasons with the Authentication compo.

**Kind**: instance method of [<code>CozyClient</code>](#module_CozyClient)  
**Returns**: <code>object</code> - Contains the fetched token and the client information.  

| Param | Type | Description |
| --- | --- | --- |
| cozyURL | <code>string</code> | Receives the URL of the cozy instance. |

<a name="module_CozyClient+startOAuthFlow"></a>

### cozyClient.startOAuthFlow(openURLCallback) ⇒ <code>object</code>
Performs a complete OAuth flow, including upating the internal token at the end.

**Kind**: instance method of [<code>CozyClient</code>](#module_CozyClient)  
**Returns**: <code>object</code> - Contains the fetched token and the client information. These should be stored and used to restore the client.  

| Param | Type | Description |
| --- | --- | --- |
| openURLCallback | <code>function</code> | Receives the URL to present to the user as a parameter, and should return a promise that resolves with the URL the user was redirected to after accepting the permissions. |

<a name="module_CozyClient+renewAuthorization"></a>

### cozyClient.renewAuthorization() ⇒ <code>object</code>
Renews the token if, for instance, new permissions are required.

**Kind**: instance method of [<code>CozyClient</code>](#module_CozyClient)  
**Returns**: <code>object</code> - Contains the fetched token and the client information.  
<a name="module_CozyClient+setData"></a>

### cozyClient.setData(data)
Directly set the data in the store, without using a query
This is useful for cases like Pouch replication, which wants to
set some data in the store.

**Kind**: instance method of [<code>CozyClient</code>](#module_CozyClient)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | { doctype: [data] } |

<a name="module_AppCollection"></a>

## AppCollection
<a name="module_AppCollection+all"></a>

### appCollection.all() ⇒ <code>Object</code>
Lists all apps, without filters.

The returned documents are not paginated by the stack.

**Kind**: instance method of [<code>AppCollection</code>](#module_AppCollection)  
**Returns**: <code>Object</code> - The JSON API conformant response.  
**Throws**:

- <code>FetchError</code> 

<a name="module_CozyStackClient"></a>

## CozyStackClient

* [CozyStackClient](#module_CozyStackClient)
    * [.collection(doctype)](#module_CozyStackClient+collection) ⇒ <code>DocumentCollection</code>
    * [.fetch(method, path, body, options)](#module_CozyStackClient+fetch) ⇒ <code>Object</code>

<a name="module_CozyStackClient+collection"></a>

### cozyStackClient.collection(doctype) ⇒ <code>DocumentCollection</code>
Creates a [DocumentCollection](DocumentCollection) instance.

**Kind**: instance method of [<code>CozyStackClient</code>](#module_CozyStackClient)  

| Param | Type | Description |
| --- | --- | --- |
| doctype | <code>String</code> | The collection doctype. |

<a name="module_CozyStackClient+fetch"></a>

### cozyStackClient.fetch(method, path, body, options) ⇒ <code>Object</code>
Fetches JSON in an authorized way.

**Kind**: instance method of [<code>CozyStackClient</code>](#module_CozyStackClient)  
**Throws**:

- <code>FetchError</code> 


| Param | Type | Description |
| --- | --- | --- |
| method | <code>String</code> | The HTTP method. |
| path | <code>String</code> | The URI. |
| body | <code>Object</code> | The payload. |
| options | <code>Object</code> |  |

<a name="module_DocumentCollection"></a>

## DocumentCollection
Abstracts a collection of documents of the same doctype, providing CRUD methods and other helpers.


* [DocumentCollection](#module_DocumentCollection)
    * [.all(options)](#module_DocumentCollection+all) ⇒ <code>Object</code>
    * [.find(selector, options)](#module_DocumentCollection+find) ⇒ <code>Object</code>
    * [.getIndexFields(options)](#module_DocumentCollection+getIndexFields) ⇒ <code>Array</code>

<a name="module_DocumentCollection+all"></a>

### documentCollection.all(options) ⇒ <code>Object</code>
Lists all documents of the collection, without filters.

The returned documents are paginated by the stack.

**Kind**: instance method of [<code>DocumentCollection</code>](#module_DocumentCollection)  
**Returns**: <code>Object</code> - The JSON API conformant response.  
**Throws**:

- <code>FetchError</code> 


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | The fetch options: pagination & fetch of specific docs. |

<a name="module_DocumentCollection+find"></a>

### documentCollection.find(selector, options) ⇒ <code>Object</code>
Returns a filtered list of documents using a Mango selector.

The returned documents are paginated by the stack.

**Kind**: instance method of [<code>DocumentCollection</code>](#module_DocumentCollection)  
**Returns**: <code>Object</code> - The JSON API conformant response.  
**Throws**:

- <code>FetchError</code> 


| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The Mango selector. |
| options | <code>Object</code> | The query options. |

<a name="module_DocumentCollection+getIndexFields"></a>

### documentCollection.getIndexFields(options) ⇒ <code>Array</code>
Compute fields that should be indexed for a mango
query to work

**Kind**: instance method of [<code>DocumentCollection</code>](#module_DocumentCollection)  
**Returns**: <code>Array</code> - - Fields to index  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Mango query options |

<a name="module_FileCollection"></a>

## FileCollection
Abstracts a collection of files

Files are a special type of documents and are handled differently by the stack:
special routes are to be used, and there is a notion of referenced files, aka
files associated to a specific document


* [FileCollection](#module_FileCollection)
    * [.find(selector, options)](#module_FileCollection+find) ⇒ <code>Object</code>
    * [.findReferencedBy(document, {, limit)](#module_FileCollection+findReferencedBy) ⇒ <code>object</code>

<a name="module_FileCollection+find"></a>

### fileCollection.find(selector, options) ⇒ <code>Object</code>
Returns a filtered list of documents using a Mango selector.

The returned documents are paginated by the stack.

**Kind**: instance method of [<code>FileCollection</code>](#module_FileCollection)  
**Returns**: <code>Object</code> - The JSON API conformant response.  
**Throws**:

- <code>FetchError</code> 


| Param | Type | Description |
| --- | --- | --- |
| selector | <code>Object</code> | The Mango selector. |
| options | <code>Object</code> | The query options. |

<a name="module_FileCollection+findReferencedBy"></a>

### fileCollection.findReferencedBy(document, {, limit) ⇒ <code>object</code>
async findReferencedBy - Returns the list of files referenced by a document — see https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/

**Kind**: instance method of [<code>FileCollection</code>](#module_FileCollection)  
**Returns**: <code>object</code> - The JSON API conformant response.  

| Param | Type | Description |
| --- | --- | --- |
| document | <code>object</code> | A JSON representing a document, with at least a `_type` and `_id` field. |
| { | <code>number</code> | skip = 0   For pagination, the number of referenced files to skip |
| limit | <code>number</code> | } For pagination, the number of results to return. |

<a name="module_OAuthClient"></a>

## OAuthClient

* [OAuthClient](#module_OAuthClient)
    * [.register()](#module_OAuthClient+register) ⇒ <code>promise</code>
    * [.unregister()](#module_OAuthClient+unregister) ⇒ <code>promise</code>
    * [.fetchInformation()](#module_OAuthClient+fetchInformation) ⇒ <code>promise</code>
    * [.updateInformation(information, resetSecret)](#module_OAuthClient+updateInformation) ⇒ <code>promise</code>
    * [.generateStateCode()](#module_OAuthClient+generateStateCode) ⇒ <code>string</code>
    * [.getAuthCodeURL(stateCode, scopes)](#module_OAuthClient+getAuthCodeURL) ⇒ <code>string</code>
    * [.getAccessCodeFromURL(pageURL, stateCode)](#module_OAuthClient+getAccessCodeFromURL) ⇒ <code>string</code>
    * [.fetchAccessToken(accessCode)](#module_OAuthClient+fetchAccessToken) ⇒ <code>Promise</code>
    * [.refreshToken()](#module_OAuthClient+refreshToken) ⇒ <code>Promise</code>
    * [.setCredentials(token)](#module_OAuthClient+setCredentials)
    * [.setOAuthOptions(options)](#module_OAuthClient+setOAuthOptions)

<a name="module_OAuthClient+register"></a>

### oAuthClient.register() ⇒ <code>promise</code>
Registers the currenly configured client with the OAuth server.

**Kind**: instance method of [<code>OAuthClient</code>](#module_OAuthClient)  
**Returns**: <code>promise</code> - A promise that resolves with a complete list of client information, including client ID and client secret.  
**Throws**:

- <code>Error</code> When the client is already registered

<a name="module_OAuthClient+unregister"></a>

### oAuthClient.unregister() ⇒ <code>promise</code>
Unregisters the currenly configured client with the OAuth server.

**Kind**: instance method of [<code>OAuthClient</code>](#module_OAuthClient)  
**Throws**:

- <code>NotRegisteredException</code> When the client doesn't have it's registration information

<a name="module_OAuthClient+fetchInformation"></a>

### oAuthClient.fetchInformation() ⇒ <code>promise</code>
Fetches the complete set of client information from the server after it has been registered.

**Kind**: instance method of [<code>OAuthClient</code>](#module_OAuthClient)  
**Throws**:

- <code>NotRegisteredException</code> When the client doesn't have it's registration information

<a name="module_OAuthClient+updateInformation"></a>

### oAuthClient.updateInformation(information, resetSecret) ⇒ <code>promise</code>
Overwrites the client own information. This method will update both the local information and the remote information on the OAuth server.

**Kind**: instance method of [<code>OAuthClient</code>](#module_OAuthClient)  
**Returns**: <code>promise</code> - A promise that resolves to a complete, updated list of client information  
**Throws**:

- <code>NotRegisteredException</code> When the client doesn't have it's registration information


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| information | <code>object</code> |  | Set of information to update. Note that some fields such as `clientID` can't be updated. |
| resetSecret | <code>boolean</code> | <code>false</code> | = false Optionnal, whether to reset the client secret or not |

<a name="module_OAuthClient+generateStateCode"></a>

### oAuthClient.generateStateCode() ⇒ <code>string</code>
Generates a random state code to be used during the OAuth process

**Kind**: instance method of [<code>OAuthClient</code>](#module_OAuthClient)  
<a name="module_OAuthClient+getAuthCodeURL"></a>

### oAuthClient.getAuthCodeURL(stateCode, scopes) ⇒ <code>string</code>
Generates the URL that the user should be sent to in order to accept the app's permissions.

**Kind**: instance method of [<code>OAuthClient</code>](#module_OAuthClient)  
**Returns**: <code>string</code> - The URL  
**Throws**:

- <code>NotRegisteredException</code> When the client doesn't have it's registration information


| Param | Type | Description |
| --- | --- | --- |
| stateCode | <code>string</code> | A random code to be included in the URl for security. Can be generated with `client.generateStateCode()` |
| scopes | <code>Array</code> | = [] An array of permission scopes for the token. |

<a name="module_OAuthClient+getAccessCodeFromURL"></a>

### oAuthClient.getAccessCodeFromURL(pageURL, stateCode) ⇒ <code>string</code>
Retrieves the access code contained in the URL to which the user is redirected after accepting the app's permissions (the `redirectURI`).

**Kind**: instance method of [<code>OAuthClient</code>](#module_OAuthClient)  
**Returns**: <code>string</code> - The access code  
**Throws**:

- <code>Error</code> The URL should contain the same state code as the one generated with `client.getAuthCodeURL()`. If not, it will throw an error


| Param | Type | Description |
| --- | --- | --- |
| pageURL | <code>string</code> | The redirected page URL, containing the state code and the access code |
| stateCode | <code>string</code> | The state code that was contained in the original URL the user was sent to (see `client.getAuthCodeURL()`) |

<a name="module_OAuthClient+fetchAccessToken"></a>

### oAuthClient.fetchAccessToken(accessCode) ⇒ <code>Promise</code>
Exchanges an access code for an access token. This function does **not** update the client's token.

**Kind**: instance method of [<code>OAuthClient</code>](#module_OAuthClient)  
**Returns**: <code>Promise</code> - A promise that resolves with an AccessToken object.  
**Throws**:

- <code>NotRegisteredException</code> When the client doesn't have it's registration information


| Param | Type | Description |
| --- | --- | --- |
| accessCode | <code>string</code> | The access code contained in the redirection URL — sett `client.getAccessCodeFromURL()` |

<a name="module_OAuthClient+refreshToken"></a>

### oAuthClient.refreshToken() ⇒ <code>Promise</code>
Retrieves a new access token by refreshing the currently used token.

**Kind**: instance method of [<code>OAuthClient</code>](#module_OAuthClient)  
**Returns**: <code>Promise</code> - A promise that resolves with a new AccessToen object  
**Throws**:

- <code>NotRegisteredException</code> When the client doesn't have it's registration information
- <code>Error</code> The client should already have an access token to use this function

<a name="module_OAuthClient+setCredentials"></a>

### oAuthClient.setCredentials(token)
Updates the client's stored token

**Kind**: instance method of [<code>OAuthClient</code>](#module_OAuthClient)  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | = null The new token to use — can be a string, a json object or an AccessToken instance. |

<a name="module_OAuthClient+setOAuthOptions"></a>

### oAuthClient.setOAuthOptions(options)
Updates the OAuth informations

**Kind**: instance method of [<code>OAuthClient</code>](#module_OAuthClient)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Map of OAuth options |

<a name="module_PermissionCollection"></a>

## PermissionCollection
Interact with permissions

<a name="module_PermissionCollection+getOwnPermissions"></a>

### permissionCollection.getOwnPermissions() ⇒ <code>object</code>
async getOwnPermissions - Gets the permission for the current token

**Kind**: instance method of [<code>PermissionCollection</code>](#module_PermissionCollection)  
<a name="module_SharingCollection"></a>

## SharingCollection
Interact with sharing doctypes


* [SharingCollection](#module_SharingCollection)
    * [.share(document, recipients, sharingType, description, [previewPath])](#module_SharingCollection+share)
    * [.getDiscoveryLink(sharingId, sharecode)](#module_SharingCollection+getDiscoveryLink) ⇒ <code>string</code>

<a name="module_SharingCollection+share"></a>

### sharingCollection.share(document, recipients, sharingType, description, [previewPath])
share - Creates a new sharing. See https://docs.cozy.io/en/cozy-stack/sharing/#post-sharings

**Kind**: instance method of [<code>SharingCollection</code>](#module_SharingCollection)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| document | <code>object</code> |  | The document to share. Should have and _id and a name. |
| recipients | <code>array</code> |  | A list of io.cozy.contacts |
| sharingType | <code>string</code> |  |  |
| description | <code>string</code> |  |  |
| [previewPath] | <code>string</code> | <code>null</code> | Relative URL of the sharings preview page |

<a name="module_SharingCollection+getDiscoveryLink"></a>

### sharingCollection.getDiscoveryLink(sharingId, sharecode) ⇒ <code>string</code>
getDiscoveryLink - Returns the URL of the page that can be used to accept a sharing. See https://docs.cozy.io/en/cozy-stack/sharing/#get-sharingssharing-iddiscovery

**Kind**: instance method of [<code>SharingCollection</code>](#module_SharingCollection)  

| Param | Type |
| --- | --- |
| sharingId | <code>string</code> | 
| sharecode | <code>string</code> | 

<a name="encode"></a>

## encode
Encode an object as querystring, values are encoded as
URI components, keys are not.

**Kind**: global constant  
<a name="buildURL"></a>

## buildURL
Returns a URL from base url and a query parameter object.
Any undefined parameter is removed.

**Kind**: global constant  
<a name="normalizeDoctypeSchema"></a>

## normalizeDoctypeSchema()
Returns a normalized schema object from the schema definition.

- Relationships are resolved to classes if needed
- The name of the relationship (its key in the schema definition)
  is included in the relationship
- Empty relationships are nulled

**Kind**: global function  
<a name="getDoctypeSchema"></a>

## getDoctypeSchema()
Returns the schema for a doctype

**Kind**: global function  
<a name="getRelationship"></a>

## getRelationship()
Returns the relationship for a given doctype/name

**Kind**: global function  
<a name="validate"></a>

## validate()
Validates a document considering the descriptions in schema.attributes.

**Kind**: global function  
<a name="withClient"></a>

## withClient(Component) ⇒ <code>function</code>
HOC to provide client from context as prop

**Kind**: global function  
**Returns**: <code>function</code> - - Component that will receive client as prop  

| Param | Type | Description |
| --- | --- | --- |
| Component | <code>Component</code> | wrapped component |

<a name="queryConnect"></a>

## queryConnect(querySpecs) ⇒ <code>function</code>
HOC creator to connect component to several queries in a declarative manner

**Kind**: global function  
**Returns**: <code>function</code> - - HOC to apply to a component  

| Param | Type | Description |
| --- | --- | --- |
| querySpecs | <code>object</code> | Definition of the queries |

<a name="startReplication"></a>

## startReplication() ⇒ <code>void</code>
User of the link can call this to start ongoing replications.
Typically, it can be used when the application regains focus.

**Kind**: global function  
**Access**: public  
<a name="stopReplication"></a>

## stopReplication() ⇒ <code>void</code>
User of the link can call this to stop ongoing replications.
Typically, it can be used when the applications loses focus.

**Kind**: global function  
**Access**: public  
<a name="startReplicationLoop"></a>

## startReplicationLoop()
Starts periodic syncing of the pouches

**Kind**: global function  
<a name="stopReplicationLoop"></a>

## stopReplicationLoop()
Stop periodic syncing of the pouches

**Kind**: global function  
<a name="replicateOnce"></a>

## replicateOnce()
Starts replication

**Kind**: global function  
<a name="defaultSelector"></a>

## defaultSelector(options) ⇒ <code>Array</code>
Compute fields that should be indexed for a mango
query to work

**Kind**: global function  
**Returns**: <code>Array</code> - - Fields to index  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Mango query options |

<a name="setIntervalPromise"></a>

## setIntervalPromise()
Will periodically run a function so that when the promise
is resolved, the next function is called after <delay>ms.

Returns a function which cancels the periodic calling.
When canceled, if there is an ongoing promise, it will
continue.

**Kind**: global function  
<a name="uri"></a>

## uri()
Template tag function for URIs encoding

Will automatically apply `encodeURIComponent` to template literal placeholders

**Kind**: global function  
**Example**  
```
const safe = uri`/data/${doctype}/_all_docs?limit=${limit}`
```
<a name="attempt"></a>

## attempt()
Helps to avoid nested try/catch when using async/await

Inspired by a Go pattern: http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/

**Kind**: global function  
**Example**  
```
if (await attempt(collection.all()) return
await sleep(1000)
if (await attempt(collection.all()) return
await sleep(1000)
return
```
<a name="sleep"></a>

## sleep()
Helps to avoid nested try/catch when using async/await — see documentation for attemp

**Kind**: global function  
