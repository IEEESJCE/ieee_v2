// Browsers may break a line at the hyphen in "IEEE-SJCE", leaving "IEEE-" at
// the end of one line and "SJCE" on the next. The name appears in well over a
// hundred places (data, headings, captions, labels), so instead of editing
// each one, this puts an invisible WORD JOINER (U+2060) on both sides of the
// hyphen in every text node on the page. The word joiner forbids a line break
// without drawing anything, so the name always stays on one line.
//
// It also watches the DOM, so text React renders or updates later is fixed too.

const WORD_JOINER = '⁠'
const PATTERN = /(IEEE)-(SJCE)/gi
const SKIP_PARENTS = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT'])

function fixTextNode(node) {
  const text = node.nodeValue
  if (!text || !/IEEE-SJCE/i.test(text)) return
  if (node.parentElement && SKIP_PARENTS.has(node.parentElement.tagName)) return
  node.nodeValue = text.replace(PATTERN, `$1${WORD_JOINER}-${WORD_JOINER}$2`)
}

function fixTree(root) {
  if (root.nodeType === Node.TEXT_NODE) {
    fixTextNode(root)
    return
  }
  if (root.nodeType !== Node.ELEMENT_NODE) return
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  while (walker.nextNode()) fixTextNode(walker.currentNode)
}

export function keepIeeeSjceTogether(root = document.body) {
  fixTree(root)

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'characterData') {
        fixTextNode(mutation.target)
      } else {
        mutation.addedNodes.forEach(fixTree)
      }
    }
  })

  observer.observe(root, { childList: true, subtree: true, characterData: true })
  return () => observer.disconnect()
}
