/**
 * Document 解析及类型定义
 * http://webapp.docx4java.org/OnlineDemo/ecma376/WordML/document.html
 * http://webapp.docx4java.org/OnlineDemo/ecma376/WordML/Main%20Document%20Story.html
 */

import {parseColorAttr} from '../../parse/parseColor';
import Word from '../../Word';
import {DocumentBackground} from './Background';
import {Body} from './Body';

export class WDocument {
  body: Body;
  documentBackground?: DocumentBackground;

  static fromXML(word: Word, element: Document): WDocument {
    const doc = new WDocument();
    const body = element.querySelector('body');
    if (body) {
      doc.body = Body.fromXML(word, body);
    }

    const background = element.querySelector('background');

    if (background) {
      const documentBackground: DocumentBackground = {};

      for (const attr of background.attributes) {
        const name = attr.name;
        switch (name) {
          case 'w:color':
            documentBackground.color = parseColorAttr(
              word,
              background,
              'w:color'
            );
            break;

          case 'w:themeColor':
            documentBackground.themeColor = parseColorAttr(
              word,
              background,
              'w:themeColor'
            );
            break;

          case 'w:themeShade':
            documentBackground.themeShade = parseColorAttr(
              word,
              background,
              'w:themeShade'
            );
            break;

          case 'w:themeTint':
            documentBackground.themeTint = parseColorAttr(
              word,
              background,
              'w:themeTint'
            );
            break;

          default:
            break;
        }
      }
    }

    return doc;
  }
}