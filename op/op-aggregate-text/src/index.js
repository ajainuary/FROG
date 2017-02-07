import JSONPath from 'jsonpath-plus'
import { unrollProducts } from 'frog-utils'

export const meta = {
  name: 'Aggregate Text',
  type: 'product'
}

export const config = {
  title: 'Configuration for Aggregate Text',
  type: 'object',
  properties: {
    'anonymize': {
      type: 'boolean',
      title: 'Anonymize contributions?'
    },
    'path': {
      type: 'string',
      title: 'JSONPath to text to aggregate'
    }
  }
}

export const operator = (config, products) => {
  const ret = unrollProducts(products).map(x => {
    const snippet = JSONPath({path: config.path, json: x.data})
    return(
      `<li key=${x._id}>
        ${!config.anonymize ? `<span>${x.groupId ? 'Group: ' + x.groupId : x.username}: </span>` : ''}
        ${snippet}
      </li>`
    )
  }).join('')
  return ret
}

export default { id: 'op-aggregate-text', operator: operator, config: config, meta: meta }