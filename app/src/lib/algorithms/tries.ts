/**
 * Represents a node in a Trie data structure.
 */
class TrieNode {
  /**
   * An object that stores child nodes for each character in the alphabet.
   */
  children: Record<string, TrieNode> = {}

  /**
   * Indicates whether the node represents the end of a word.
   */
  isWord = false

  // Store metadata for autocomplete
  metadata: any[] = [];
}

/**
 * Trie Data structure for storing and searching words.
 */
export class Trie {
  /**
   * The root node of the Trie.
   */
  root: TrieNode = new TrieNode()

  /**
   * Inserts a word into the Trie.
   *
   * @param word - The word to insert into the Trie.
   * @param metadata - Any metadata associated with the word (e.g. lesson object).
   */
  public add(word: string, metadata?: any): this {
    let node = this.root
    for (const char of word.toLowerCase()) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode()
      }
      node = node.children[char]
    }
    node.isWord = true
    if (metadata) {
       node.metadata.push(metadata);
    }
    return this
  }

  /**
   * Searches for a word in the Trie.
   *
   * @param word - The word to search for.
   * @param isPrefixMatch - Indicates whether to perform a prefix match (default: false).
   * @returns True if the word (or prefix) is found in the Trie; otherwise, false.
   */
  public find(word: string, isPrefixMatch = false): boolean {
    return this.searchNode(this.root, word.toLowerCase(), isPrefixMatch)
  }

  /**
   * Finds all words matching the prefix and returns their metadata.
   */
  public getWordsWithPrefix(prefix: string): { word: string, metadata: any }[] {
    const results: { word: string, metadata: any }[] = [];
    let node = this.root;
    
    // Traverse to the end of the prefix
    for (const char of prefix.toLowerCase()) {
      if (!node.children[char]) return results;
      node = node.children[char];
    }
    
    // DFS to find all complete words from this node
    this.dfs(node, prefix.toLowerCase(), results);
    return results;
  }

  private dfs(node: TrieNode, currentWord: string, results: { word: string, metadata: any }[]) {
    if (node.isWord) {
      for (const meta of node.metadata) {
        results.push({ word: currentWord, metadata: meta });
      }
    }
    for (const char in node.children) {
      this.dfs(node.children[char], currentWord + char, results);
    }
  }

  private searchNode(
    node: TrieNode,
    word: string,
    prefixMatch: boolean
  ): boolean {
    for (const char of word) {
      if (!node.children[char]) {
        return false
      }
      node = node.children[char]
    }
    return prefixMatch || node.isWord
  }
}
