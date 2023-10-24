const { Client } = require('@elastic/elasticsearch');

const configPropName = 'elasticsearch-url';

const cfg = {
  'elasticsearch-url': process.env.ES_URL,
};

let connection;

/**
 * pre initiate the connection with elastic search and
 * preserve the connection for future use.
 * TODO: We need to check how this connection will behave when
 * connection expired or gone during run time. In other way round,
 * will connection restored when server is back?
 * @return {object} elastic search connection object
 */
const getConnection = () =>
  new Promise((resolve, reject) => {
    if (connection) return resolve(connection);
    const elasticSearchURL = cfg[configPropName];
    if (!elasticSearchURL) {
      throw new Error(`${configPropName} config is missing`);
    }
    connection = new Client({
      node: elasticSearchURL,
      requestTimeout: 6000,
    });
    connection
      .ping({})
      .then((available) => {
        if (available) {
          console.info('Elastic search connection is OK');
          return resolve(connection);
        } else {
          return reject(new Error('elasticsearch cluster is down!'));
        }
      })
      .catch((e) => {
        console.error(e);
        return reject(new Error('elasticsearch cluster is down!'));
      });
  });

module.exports.connect = getConnection;

/**
 * To crete new document.
 * @param {string} index elastic search index name.
 * @param {object} data the data object that to be inserted.
 * @param {object} options (optional) test connection params.
 * @return {object} document that newly created.
 */
module.exports.create = async (index, data, options) => {
  const query = {
    index,
    body: {
      ...data,
      createdOn: new Date(),
      modifiedOn: new Date(),
    },
  };
  // console.debug('creating new document:', JSON.stringify(query));
  return getConnection(options)
    .then(async (esclient) => {
      const result = await esclient.index(query);
      console.log('result', result);
      if (result) await esclient.indices.refresh({ index });
      return result;
    })
    .catch((e) => {
      console.log(e.body);
      console.error('creating document failed', e.message);
      return [];
    });
};

/**
 * To search documents with conditions.
 * @param {object} query es query to find matched documents.
 * @param {object} options (optional) test connection params.
 * @return {array} array of matched documents - without es metadata.
 */
module.exports.fetch = async (query, options) =>
  getConnection(options)
    .then((esclient) => esclient.search(query))
    .then((doc) => doc.hits.hits.map((d) => ({ id: d._id, ...d._source })));

/**
 * To Update exist document.
 * @param {string} index elastic search index name.
 * @param {object} data the data object that to be inserted.
 * @param {object} options (optional) test connection params.
 * @return {object} document that newly created.
 */

module.exports.updateByQuery = async (query, index) => {
  return getConnection()
    .then(async (esclient) => {
      const result = await esclient.updateByQuery(query);
      if (result) await esclient.indices.refresh({ index });
      return result;
    })
    .catch((e) => {
      console.log(e.body);
      console.error('creating document failed', e.message);
      return [];
    });
};
