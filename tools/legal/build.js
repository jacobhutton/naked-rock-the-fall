// Builds the legal documents from content-*.js:
//   legal/<Name>.docx  -> for attorney review (published text + a final "Notes for review" page)
//   legal/<name>.md    -> published text only, for pasting into the app
// Needs the "docx" package:  npm i docx   then   node tools/legal/build.js
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, LevelFormat, Footer, PageNumber, PageBreak,
} = require('docx');

const OUT = path.join(__dirname, '..', '..', 'legal');
fs.mkdirSync(OUT, { recursive: true });
const FONT = 'Calibri';

// "**bold** text" -> TextRuns
const runs = (text, base = {}) =>
  text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((part) =>
    part.startsWith('**')
      ? new TextRun({ ...base, text: part.slice(2, -2), bold: true })
      : new TextRun({ ...base, text: part }));

function buildDocx(doc) {
  let listCount = 0;
  const numbering = [{
    reference: 'bullets',
    levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } }],
  }];

  const blocks = (items) => items.flatMap((item) => {
    if (typeof item === 'string') return [new Paragraph({ children: runs(item), spacing: { after: 160 } })];
    if (item.h3) return [new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: item.h3 })] })];
    if (item.ul) return item.ul.map((t) => new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: runs(t), spacing: { after: 100 } }));
    if (item.ol) {
      const reference = 'numbers-' + (++listCount);
      numbering.push({ reference, levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 360 } } } }] });
      return item.ol.map((t) => new Paragraph({ numbering: { reference, level: 0 }, children: runs(t), spacing: { after: 100 } }));
    }
    return [];
  });

  const children = [
    new Paragraph({ children: [new TextRun({ text: 'NAKED TRAINING', bold: true, size: 20, characterSpacing: 60, color: '9E3F0E' })], spacing: { after: 80 } }),
    new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun({ text: doc.title })] }),
    new Paragraph({ children: [new TextRun({ text: 'Last updated: ' + doc.updated, italics: true, color: '5A4A40' })], spacing: { after: 280 } }),
    ...blocks(doc.intro),
    ...doc.sections.flatMap((s) => [
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: s.h })] }),
      ...blocks(s.body),
    ]),
    new Paragraph({ children: [new PageBreak()] }),
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: 'Notes for review (not part of the published text)' })] }),
    ...blocks(doc.notes),
  ];

  return new Document({
    creator: 'Naked Training',
    title: 'Naked Training ' + doc.title,
    numbering: { config: numbering },
    styles: {
      default: { document: { run: { font: FONT, size: 22 }, paragraph: { spacing: { line: 288 } } } },
      paragraphStyles: [
        { id: 'Title', name: 'Title', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 52, bold: true, color: '1F1712' }, paragraph: { spacing: { after: 80 } } },
        { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 28, bold: true, color: '1F1712' }, paragraph: { spacing: { before: 360, after: 140 }, keepNext: true, outlineLevel: 0 } },
        { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 23, bold: true, color: '9E3F0E' }, paragraph: { spacing: { before: 220, after: 100 }, keepNext: true, outlineLevel: 1 } },
      ],
    },
    sections: [{
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
      footers: {
        default: new Footer({ children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: 'Naked Training ' + doc.title + '  |  Draft for attorney review  |  Page ', size: 18, color: '6F5D52' }),
            new TextRun({ children: [PageNumber.CURRENT], size: 18, color: '6F5D52' }),
            new TextRun({ text: ' of ', size: 18, color: '6F5D52' }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: '6F5D52' }),
          ],
        })] }),
      },
      children,
    }],
  });
}

function buildMarkdown(doc) {
  const blocks = (items) => items.map((item) => {
    if (typeof item === 'string') return item;
    if (item.h3) return '### ' + item.h3;
    if (item.ul) return item.ul.map((t) => '- ' + t).join('\n');
    if (item.ol) return item.ol.map((t, i) => (i + 1) + '. ' + t).join('\n');
    return '';
  }).join('\n\n');
  return [
    '# ' + doc.title,
    '_Last updated: ' + doc.updated + '_',
    blocks(doc.intro),
    ...doc.sections.map((s) => '## ' + s.h + '\n\n' + blocks(s.body)),
  ].join('\n\n') + '\n';
}

(async () => {
  for (const name of ['content-terms', 'content-privacy']) {
    const doc = require('./' + name);
    const buffer = await Packer.toBuffer(buildDocx(doc));
    fs.writeFileSync(path.join(OUT, doc.file + '.docx'), buffer);
    const md = buildMarkdown(doc);
    fs.writeFileSync(path.join(OUT, doc.md + '.md'), md);
    const words = md.split(/\s+/).length;
    console.log(doc.file + '.docx', Math.round(buffer.length / 1024) + 'KB', '|', doc.md + '.md', words, 'words,', doc.sections.length, 'sections');
  }
})();
