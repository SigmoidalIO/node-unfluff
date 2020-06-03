"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cheerio = _interopRequireDefault(require("cheerio"));

var _extractor = _interopRequireDefault(require("./extractor"));

var _pythonextractor = _interopRequireDefault(require("./pythonextractor"));

var _cleaner = _interopRequireDefault(require("./cleaner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let unfluff;

var _default = unfluff = function (html, language) {
  const doc = _cheerio.default.load(html);

  const lng = language || _extractor.default.lang(doc);

  const pageData = {
    title: _extractor.default.title(doc),
    softTitle: _extractor.default.softTitle(doc),
    date: _extractor.default.date(doc),
    author: _extractor.default.author(doc),
    publisher: _extractor.default.publisher(doc),
    copyright: _extractor.default.copyright(doc),
    favicon: _extractor.default.favicon(doc),
    description: _extractor.default.description(doc),
    keywords: _extractor.default.keywords(doc),
    lang: lng,
    canonicalLink: _extractor.default.canonicalLink(doc),
    tags: _extractor.default.tags(doc),
    image: _extractor.default.image(doc)
  }; // Step 1: Clean the doc

  (0, _cleaner.default)(doc); // Step 2: Find the doc node with the best text

  const topNode = _extractor.default.calculateBestNode(doc, lng); // Step 3: Extract text, videos, images, links


  pageData.videos = _extractor.default.videos(doc, topNode);
  pageData.links = _extractor.default.links(doc, topNode, lng);
  pageData.text = _extractor.default.text(doc, topNode, lng); // no other way, because the entire API is synchronous

  pageData.getPythonDate = async () => _pythonextractor.default.instance.findDate(html);

  return pageData;
}; // Allow access to document properties with lazy evaluation


exports.default = _default;

unfluff.lazy = function (html, language) {
  return {
    title() {
      const doc = getParsedDoc.call(this, html);
      return this.title_ != null ? this.title_ : this.title_ = _extractor.default.title(doc);
    },

    softTitle() {
      const doc = getParsedDoc.call(this, html);
      return this.softTitle_ != null ? this.softTitle_ : this.softTitle_ = _extractor.default.softTitle(doc);
    },

    date() {
      const doc = getParsedDoc.call(this, html);
      return this.date_ != null ? this.date_ : this.date_ = _extractor.default.date(doc);
    },

    copyright() {
      const doc = getParsedDoc.call(this, html);
      return this.copyright_ != null ? this.copyright_ : this.copyright_ = _extractor.default.copyright(doc);
    },

    author() {
      const doc = getParsedDoc.call(this, html);
      return this.author_ != null ? this.author_ : this.author_ = _extractor.default.author(doc);
    },

    publisher() {
      const doc = getParsedDoc.call(this, html);
      return this.publisher_ != null ? this.publisher_ : this.publisher_ = _extractor.default.publisher(doc);
    },

    favicon() {
      const doc = getParsedDoc.call(this, html);
      return this.favicon_ != null ? this.favicon_ : this.favicon_ = _extractor.default.favicon(doc);
    },

    description() {
      const doc = getParsedDoc.call(this, html);
      return this.description_ != null ? this.description_ : this.description_ = _extractor.default.description(doc);
    },

    keywords() {
      const doc = getParsedDoc.call(this, html);
      return this.keywords_ != null ? this.keywords_ : this.keywords_ = _extractor.default.keywords(doc);
    },

    lang() {
      const doc = getParsedDoc.call(this, html);
      return this.language_ != null ? this.language_ : this.language_ = language || _extractor.default.lang(doc);
    },

    canonicalLink() {
      const doc = getParsedDoc.call(this, html);
      return this.canonicalLink_ != null ? this.canonicalLink_ : this.canonicalLink_ = _extractor.default.canonicalLink(doc);
    },

    tags() {
      const doc = getParsedDoc.call(this, html);
      return this.tags_ != null ? this.tags_ : this.tags_ = _extractor.default.tags(doc);
    },

    image() {
      const doc = getParsedDoc.call(this, html);
      return this.image_ != null ? this.image_ : this.image_ = _extractor.default.image(doc);
    },

    videos() {
      if (this.videos_ != null) {
        return this.videos_;
      }

      const doc = getCleanedDoc.call(this, html);
      const topNode = getTopNode.call(this, doc, this.lang());
      return this.videos_ = _extractor.default.videos(doc, topNode);
    },

    text() {
      if (this.text_ != null) {
        return this.text_;
      }

      const doc = getCleanedDoc.call(this, html);
      const topNode = getTopNode.call(this, doc, this.lang());
      return this.text_ = _extractor.default.text(doc, topNode, this.lang());
    },

    links() {
      if (this.links_ != null) {
        return this.links_;
      }

      const doc = getCleanedDoc.call(this, html);
      const topNode = getTopNode.call(this, doc, this.lang());
      return this.links_ = _extractor.default.links(doc, topNode, this.lang());
    }

  };
}; // Load the doc in cheerio and cache it


var getParsedDoc = function (html) {
  return this.doc_ != null ? this.doc_ : this.doc_ = _cheerio.default.load(html);
}; // Cached version of calculateBestNode


var getTopNode = function (doc, lng) {
  return this.topNode_ != null ? this.topNode_ : this.topNode_ = _extractor.default.calculateBestNode(doc, lng);
}; // Cached version of the cleaned doc


var getCleanedDoc = function (html) {
  if (this.cleanedDoc_ != null) {
    return this.cleanedDoc_;
  }

  const doc = getParsedDoc.call(this, html);
  this.cleanedDoc_ = (0, _cleaner.default)(doc);
  return this.cleanedDoc_;
};