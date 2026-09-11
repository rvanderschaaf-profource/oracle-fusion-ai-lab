const downloadableDocuments = [
  {
    file: 'assets/documents/SamplePO1.pdf',
    label: 'Purchase Order - Unknown Supplier'
  },
  {
    file: 'assets/documents/SamplePO2.pdf',
    label: 'Purchase Order - Already Exists'
  },
  {
    file: 'assets/documents/SamplePO3.pdf',
    label: 'Purchase Order - Create sample 1'
  },
  {
    file: 'assets/documents/SamplePO4.pdf',
    label: 'Purchase Order - Create sample 2'
  }
];

const steps = document.getElementById('steps');
const contents = document.getElementById('contents');

if (!steps || !contents) {
  throw new Error(
    'Missing required HTML elements with id="steps" or id="contents".'
  );
}

for (let step = 1; step <= titles.length; step += 1) {
  const title = titles[step - 1];
  const note = notes[step - 1] || '';

  /*
   * Create the complete step section.
   */
  const section = document.createElement('section');
  section.className = 'lab-step';
  section.id = `step-${step}`;

  /*
   * Create the step number.
   */
  const numberElement = document.createElement('div');
  numberElement.className = 'number';
  numberElement.textContent = `Step ${step}`;

  /*
   * Create the content container.
   */
  const stepContent = document.createElement('div');
  stepContent.className = 'step-content';

  /*
   * Create the step title.
   */
  const heading = document.createElement('h2');
  heading.textContent = title;

  /*
   * Create the notes.
   */
  const notesContainer = document.createElement('div');
  notesContainer.className = 'notes';

  if (note.trim() !== '') {
    const paragraphs = note.split('\n\n');

    paragraphs.forEach((paragraph) => {
      if (paragraph.trim() === '') {
        return;
      }

      const paragraphElement = document.createElement('p');
      const lines = paragraph.split('\n');

      lines.forEach((line, lineIndex) => {
        if (lineIndex > 0) {
          paragraphElement.appendChild(document.createElement('br'));
        }

        paragraphElement.appendChild(
          document.createTextNode(line)
        );
      });

      notesContainer.appendChild(paragraphElement);
    });
  }

  /*
   * Add the four downloadable documents only to step 23.
   */
  if (step === 23) {
    const documentLinksContainer = document.createElement('div');
    documentLinksContainer.className = 'document-links';

    const documentHeading = document.createElement('p');
    const documentHeadingStrong = document.createElement('strong');

    documentHeadingStrong.textContent = 'Sample documents:';
    documentHeading.appendChild(documentHeadingStrong);
    documentLinksContainer.appendChild(documentHeading);

    downloadableDocuments.forEach((document) => {
      const paragraph = document.createElement('p');
      paragraph.className = 'document-link';

      const downloadLink = document.createElement('a');
      downloadLink.href = document.file;
      downloadLink.textContent = document.label;
      downloadLink.setAttribute('download', '');
      downloadLink.setAttribute('title', document.label);

      paragraph.appendChild(downloadLink);
      documentLinksContainer.appendChild(paragraph);
    });

    notesContainer.appendChild(documentLinksContainer);
  }

  /*
   * Add the copy block when copy text exists for this step.
   */
  let copyBlock = null;

  if (copyText[step]) {
    copyBlock = document.createElement('div');
    copyBlock.className = 'copy-block';

    const copyHeader = document.createElement('div');
    copyHeader.className = 'copy-head';

    const copyLabel = document.createElement('span');
    copyLabel.textContent = 'Text to enter';

    const copyButton = document.createElement('button');
    copyButton.type = 'button';
    copyButton.textContent = 'Copy';

    const copyContent = document.createElement('pre');
    copyContent.textContent = copyText[step];

    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(copyText[step]);
        copyButton.textContent = 'Copied';
      } catch {
        copyButton.textContent = 'Select text';
      }

      window.setTimeout(() => {
        copyButton.textContent = 'Copy';
      }, 1600);
    });

    copyHeader.appendChild(copyLabel);
    copyHeader.appendChild(copyButton);

    copyBlock.appendChild(copyHeader);
    copyBlock.appendChild(copyContent);
  }

  /*
   * Show screenshots for steps 1 through 23.
   * Step 24 is the final step and does not need a screenshot.
   */
  let visualElement;

  if (step === titles.length) {
    visualElement = document.createElement('div');
    visualElement.className = 'empty-slide';
    visualElement.setAttribute('aria-label', 'End of lab');
  } else {
    visualElement = document.createElement('img');
    visualElement.className = 'slide-shot';
    visualElement.src =
      `assets/slides/${String
