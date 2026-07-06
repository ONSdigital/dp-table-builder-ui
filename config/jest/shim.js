// A solution for React 16 complaining of missing rAF.

global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};

// TextEncoder/TextDecoder are not exposed globally in jest-environment-jsdom 27.
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Web Streams API globals required by undici (via cheerio/enzyme) on Node 18+.
const { ReadableStream, WritableStream, TransformStream } = require('node:stream/web');
global.ReadableStream = ReadableStream;
global.WritableStream = WritableStream;
global.TransformStream = TransformStream;
