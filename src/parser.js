import { fetchFeed } from './api'

function parseFeed(content) {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(content, 'text/xml')
  const channel = xmlDoc.querySelector('channel')

  if (xmlDoc.querySelector('parsererror') || !channel) {
    throw new Error('errors.invalidRSS')
  }

  const getTextContent = (element, selector) =>
    element.querySelector(selector)?.textContent || ''

  return {
    feed: {
      title: getTextContent(channel, 'title'),
      description: getTextContent(channel, 'description'),
      link: getTextContent(channel, 'link'),
    },
    posts: Array.from(xmlDoc.querySelectorAll('item')).map(item => ({
      title: getTextContent(item, 'title'),
      description: getTextContent(item, 'description'),
      link: getTextContent(item, 'link'),
    })),
  }
}

export default function loadRssFeed(url) {
  return fetchFeed(url)
    .then(content => parseFeed(content, url))
    .catch((error) => {
      throw error
    })
}
