import React, { useState, useContext, useEffect } from 'react';
import { StockContext } from "../../context/StockContext";

// Component to display all stocks and the forms to add/edit stocks
const Trie = () => {
    // TrieNode to hold the letter and children
    function TrieNode(letter) {
        // letter is the key
        this.letter = letter;
        // parent node reference
        this.parent = null;
        // list of children nodes
        this.children = {};
        // if word is true then this is the end of the current word
        this.word = false;
    }

    // iterates through the parents to get the word.
    // time complexity: O(k), k = word length
    TrieNode.prototype.getWord = function () {
        let output = [];
        let node = this;

        while (node !== null) {
            output.unshift(node.letter);
            node = node.parent;
        }

        return output.join('');
    };


    // Instantiate the trie with root node
    function Trie() {
        this.root = new TrieNode(null);
    }

    // Inserts a word in the trie
    Trie.prototype.insert = function (word) {
        let node = this.root;

        // go through every character
        for (let i = 0; i < word.length; i++) {
            // check if character exists
            if (!node.children[word[i]]) {
                // create new letter in trie if it does not exist
                node.children[word[i]] = new TrieNode(word[i]);

                // we also assign the parent to the child node.
                node.children[word[i]].parent = node;
            }

            // proceed to the next depth in the trie.
            node = node.children[word[i]];

            // finally, we check to see if it's the last word.
            if (i === word.length - 1) {
                // if it is, we set the end flag to true.
                node.word = true;
            }
        }
    };

    // check if it contains a whole word.
    // time complexity: O(k), k = word length
    Trie.prototype.contains = function (word) {
        let node = this.root;

        // for every character in the word
        for (let i = 0; i < word.length; i++) {
            // check to see if character node exists in children.
            if (node.children[word[i]]) {
                // if it exists, proceed to the next depth of the trie.
                node = node.children[word[i]];
            } else {
                // doesn't exist, return false since it's not a valid word.
                return false;
            }
        }

        // we finished going through all the words, but is it a whole word?
        return node.word;
    };

    // returns every word with given prefix
    // time complexity: O(p + n), p = prefix length, n = number of child paths
    Trie.prototype.find = function (prefix) {
        let node = this.root;
        let output = [];

        // for every character in the prefix
        for (let i = 0; i < prefix.length; i++) {
            // make sure prefix actually has words
            if (node.children[prefix[i]]) {
                node = node.children[prefix[i]];
            } else {
                // there's none. just return it.
                return output;
            }
        }

        // recursively find all words in the node
        findAllWords(node, output);

        return output;
    };

    // recursive function to find all words in the given node.
    function findAllWords(node, arr) {
        // base case, if node is at a word, push to output
        if (node.word) {
            arr.unshift(node.getWord());
        }

        // iterate through each children, call recursive findAllWords
        for (let child in node.children) {
            findAllWords(node.children[child], arr);
        }
    }

    // removes a word from the trie
    Trie.prototype.remove = function (word) {
        let root = this.root;

        if (!word) return;

        // recursively finds and removes a word
        const removeWord = (node, currWord) => {

            // check if current node contains the word
            if (node.word && node.getWord() === currWord) {

                // check and see if node has children
                let hasChildren = Object.keys(node.children).length > 0;

                // if has children we only want to un-flag the end node that marks end of a word.
                // this way we do not remove words that contain/include supplied word
                if (hasChildren) {
                    node.word = false;
                } else {
                    // remove word by getting parent and setting children to empty dictionary
                    node.parent.children = {};
                }

                return true;
            }

            // recursively remove word from all children
            for (let key in node.children) {
                removeWord(node.children[key], currWord)
            }

            return false
        };

        // call remove word on root node
        removeWord(root, word);
    };
}

export default Trie;
