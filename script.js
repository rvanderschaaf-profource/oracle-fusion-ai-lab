```js
const notes = [
  'Sign in with the username and password assigned to you. Your home page may look slightly different.',
  'Navigate to Tools > AI Agent Studio.',
  'In this lab, you will build an AI agent that creates new purchase orders.\n\nThe agent uses Business Object tools to securely search, create, and update Fusion data.',
  'The required tools already exist. Navigate to Resources > Tools.',
  'Search for the [RS001 Create Purchase Order], [RS001 Get Purchase Order], and [RS001 Get Supplier] tools.',
  'Open the tools by clicking their Edit icons. The tools can search suppliers by name, search for purchase orders by order number, and create new purchase orders.\n\nBusiness Object tools securely retrieve data and control the fields and actions available to the agent. Creating these tools usually requires a more technical role.\n\nClick Home.',
  'Now create the agent. Navigate to Resources > Agents.',
  'Click Add.',
  'Enter the following agent details.',
  'Add the tools. Search for [RS001 Create Purchase Order], [RS001 Get Purchase Order], [RS001 Get Supplier], and [MultiFileProcessor].\n\nThe MultiFileProcessor tool is needed for the agent to understand document uploads.',
  'Hover over each tool and click Add to Agent.',
  'The tools are now part of the agent. Select the agent to add the prompt and other settings.',
  'Select Prompts.',
  'This prompt includes the required tool calls, selection logic, and guardrails. Paste it into the Prompt field.',
  'Set Summarization mode to Custom. Below the [answer requirements] section, add the following instruction: Return the response in HTML, use light colours because the background is dark, and add HTML icon tags to the response text.',
  'Click Save and Close.',
  'The agent is ready. Next, create a workflow to test it. Copy your agent code, then return to AI Agent Studio.',
  'Use Ask Oracle to generate the workflow. First switch the scope from Applications to Workflows by removing Applications using its x icon.',
  'Select Workflows.',
  '',
  'Enter the following instruction in Ask Oracle.\n\nThe screenshot uses RS001_PURCHASE_ORDER_CREATION as an example. In the text you copy below, replace YOUR_AGENT_CODE with the code of the agent you created.',
  'Click Yes for each approval request until the workflow is created.',
  'Click Debug, enter the supplied question, and upload one of the sample purchase order documents below.',
  'You have completed the Purchase Order Handler Workflow lab.'
];

const titles = [
  'Sign in',
  'Open AI Agent Studio',
  'Lab overview',
  'Review available tools',
  'Find the relevant tools',
  'Review tool details',
  'Open Agents',
  'Start a new agent',
  'Enter agent details',
  'Find the relevant tools',
  'Add the tools to the agent',
  'Configure the agent',
  'Open Prompts',
  'Add the agent prompt',
  'Add the summarization instruction',
  'Save the agent',
  'Prepare the workflow',
  'Switch to Workflows',
  'Select Workflows',
  'Ready to create the workflow',
  'Request workflow generation',
  'Approve workflow creation',
  'Debug the agent',
  'End of Lab'
];

/*
 * ============================================================
 * PURCHASE ORDER AGENT PROMPT
 * ============================================================
 */

const purchaseOrderPrompt = `## Role

You are a precise Oracle Fusion purchase order agent operating under a supervisor.

## Tools

Use only:

* \`MultiFileProcessor\`
* \`RS001 Create Purchase Order\`
* \`RS001 Get Purchase Order\`
* \`RS001 Get Supplier\`

## Default Data Handler

Read the user input.

If an attachment is provided, use \`MultiFileProcessor\` to understand and extract the purchase order data.

1. Extract:
   * OrderNumber
   * Supplier Name

2. If either value cannot be determined:
   * Inform the user which required values are missing.
   * Stop processing.
   * Do not use any other tools.
   * Return the message.

3. Use \`RS001 Get Supplier\` to validate the extracted Supplier Name.

4. If \`RS001 Get Supplier\` returns no supplier:
   * Inform the user that no matching supplier was found.
   * Explain that the purchase order therefore cannot be created.
   * Stop processing.
   * Do not use any other tools.
   * Return the message.

5. Use \`RS001 Get Purchase Order\` to check whether a purchase order already exists for the extracted OrderNumber.

6. Process the result according to the rules below.

### Existing Purchase Order

If a supplier is found and one purchase order is returned:

* Tell the user that the purchase order already exists.
* Use the returned poHeaderId to generate a deep link using this URL:

https://fa-erzv-dev4-saasfademo1.ds-fa.oraclepdemos.com/fscmUI/redwood/purchase-orders/manage/edit?poHeaderId={poHeaderId}&intent=Buyer

* Do not use any other tools.
* Return the message.

### New Purchase Order

If no purchase orders are found, extract these values from the user input or attachment:

* OrderNumber
* Buyer
* Supplier
* Currency
* SupplierSite
* LineNumber
* lineDescription
* LineQuantity
* Price
* ScheduleNumber
* ScheduleQuantity
* PromisedDeliveryDate
* ShipToLocation
* ShipToOrganization

Currency must always use a currency code such as USD or EUR.

If one or more required values are missing:

* Stop processing.
* Tell the user exactly which values are missing.
* Do not create the purchase order.

If all required values are available, format the data using this structure:

{
  "OrderNumber": "{OrderNumber}",
  "Buyer": "{Buyer}",
  "Supplier": "{Supplier}",
  "CurrencyCode": "{Currency}",
  "SupplierSite": "{SupplierSite}",
  "lines": [
    {
      "LineNumber": {LineNumber},
      "Description": "{lineDescription}",
      "Quantity": {lineQuantity},
      "Price": {Price},
      "schedules": [
        {
          "ScheduleNumber": {ScheduleNumber},
          "Quantity": {scheduleQuantity},
          "PromisedDeliveryDate": "{promisedDeliveryDate}",
          "ShipToLocation": "{shipToLocation}",
          "ShipToOrganization": "{shipToOrganization}"
        }
      ]
    }
  ]
}

Use the formatted data to create the purchase order with \`RS001 Create Purchase Order\`.

After creation:

* Use the returned poHeaderId to generate a deep link using this URL:

https://fa-erzv-dev4-saasfademo1.ds-fa.oraclepdemos.com/fscmUI/redwood/purchase-orders/manage/edit?poHeaderId={poHeaderId}&intent=Buyer

* Do not use any other tools.
* Return the result.

## Guardrails

**Never invent, infer, modify, or alter supplier data.**

**Never invent a SupplierId or poHeaderId.**

**Never use an identifier that was not returned by a configured tool.**

**Never call a tool other than the four configured tools.**

**Preserve all returned values exactly.**

**CurrencyCode and Currency must always use a currency code such as USD or EUR.**

## Output Behavior

* Existing purchase order: return the result and deep link.
* New purchase order: create the purchase order and return the result and deep link.
* Missing supplier: explain why creation is not possible.
* Missing required values: list all missing values.
* Be concise and professional.`;


/*
 * ============================================================
 * COPY TEXT
 * ============================================================
 */

const copyText = {
  9: `Agent Name: [Your initials][number] Purchase Order Handler Agent
Family: Common
Module: Other
Description: An agent that can query supplier and purchase order data and create new purchase orders.`,

  14: purchaseOrderPrompt,

  21: `Create a workflow using the agent YOUR_AGENT_CODE. The workflow should pass the user input to the agent, allowing the creation of purchase orders. Enable the file upload option.`,

  23: `Create a new purchase order based on the attached file.`
};


/*
 * ============================================================
 * DOWNLOADABLE SAMPLE DOCUMENTS
 * ============================================================
 */

const downloadableDocuments = [
  {
    file: 'SamplePO1.pdf',
    label: 'Purchase Order - Unknown Supplier'
  },
  {
    file: 'SamplePO2.pdf',
    label: 'Purchase Order - Already Exists'
  },
  {
    file: 'SamplePO3.pdf',
    label: 'Purchase Order - Create sample 1'
  },
  {
    file: 'SamplePO4.pdf',
    label: 'Purchase Order - Create sample 2'
  }
];


/*
 * ============================================================
 * DOM ELEMENTS
 * ============================================================
 */

const stepsContainer = document.getElementById('steps');
const contentsContainer = document.getElementById('contents');

if (!stepsContainer || !contentsContainer) {
  throw new Error(
    'Missing required HTML elements with id="steps" or id="contents".'
  );
}


/*
 * ============================================================
 * ASSET PATHS
 * ============================================================
 *
 * Your GitHub Pages structure should be:
 *
 * oracle-fusion-ai-lab/
 * ├── index.html
 * ├── script.js
 * ├── style.css
 * └── assets/
 *     ├── slides/
 *     │   ├── 01.png
 *     │   ├── 02.png
 *     │   ├── ...
 *     │   └── 23.png
 *     └── documents/
 *         ├── SamplePO1.pdf
 *         ├── SamplePO2.pdf
 *         ├── SamplePO3.pdf
 *         └── SamplePO4.pdf
 *
 * Because this script is loaded from the lab page, relative
 * paths are used intentionally.
 */

const slidesPath = './assets/slides/';
const documentsPath = './assets/documents/';


/*
 * ============================================================
 * CREATE STEP NAVIGATION
 * ============================================================
 */

titles.forEach((title, index) => {
  const stepNumber = index + 1;

  const link = document.createElement('a');

  link.href = `#step-${stepNumber}`;
  link.textContent = stepNumber;
  link.title = `Go to step ${stepNumber}`;
  link.setAttribute('aria-label', `Go to step ${stepNumber}`);

  stepsContainer.appendChild(link);
});


/*
 * ============================================================
 * CREATE LAB STEPS
 * ============================================================
 */

for (let step = 1; step <= titles.length; step += 1) {

  const title = titles[step - 1];
  const note = notes[step - 1] || '';


  /*
   * ----------------------------------------------------------
   * STEP SECTION
   * ----------------------------------------------------------
   */

  const section = document.createElement('section');

  section.className = 'lab-step';
  section.id = `step-${step}`;


  /*
   * ----------------------------------------------------------
   * STEP NUMBER
   * ----------------------------------------------------------
   */

  const numberElement = document.createElement('div');

  numberElement.className = 'number';
  numberElement.textContent = `Step ${step}`;


  /*
   * ----------------------------------------------------------
   * CONTENT CONTAINER
   * ----------------------------------------------------------
   */

  const stepContent = document.createElement('div');

  stepContent.className = 'step-content';


  /*
   * ----------------------------------------------------------
   * TITLE
   * ----------------------------------------------------------
   */

  const heading = document.createElement('h2');

  heading.textContent = title;

  stepContent.appendChild(heading);


  /*
   * ----------------------------------------------------------
   * NOTES
   * ----------------------------------------------------------
   */

  const notesContainer = document.createElement('div');

  notesContainer.className = 'notes';


  if (note.trim() !== '') {

    const paragraphs = note.split('\n\n');


    paragraphs.forEach((paragraph) => {

      if (!paragraph.trim()) {
        return;
      }


      const paragraphElement = document.createElement('p');

      const lines = paragraph.split('\n');


      lines.forEach((line, lineIndex) => {

        if (lineIndex > 0) {
          paragraphElement.appendChild(
            document.createElement('br')
          );
        }


        paragraphElement.appendChild(
          document.createTextNode(line)
        );

      });


      notesContainer.appendChild(paragraphElement);

    });

  }


  /*
   * ----------------------------------------------------------
   * DOWNLOADABLE DOCUMENTS
   *
   * Only displayed on step 23.
   * ----------------------------------------------------------
   */

  if (step === 23) {

    const documentLinksContainer = document.createElement('div');

    documentLinksContainer.className = 'document-links';


    const documentHeading = document.createElement('p');

    const documentHeadingStrong = document.createElement('strong');

    documentHeadingStrong.textContent = 'Sample documents:';

    documentHeading.appendChild(documentHeadingStrong);

    documentLinksContainer.appendChild(documentHeading);


    downloadableDocuments.forEach((doc) => {

      const paragraph = document.createElement('p');

      paragraph.className = 'document-link';


      const downloadLink = document.createElement('a');

      /*
       * Full relative path to the PDF.
       *
       * Example:
       * ./assets/documents/SamplePO1.pdf
       */

      downloadLink.href =
        `${documentsPath}${doc.file}`;


      downloadLink.textContent = doc.label;

      downloadLink.title = `Download ${doc.label}`;

      downloadLink.setAttribute('download', doc.file);


      paragraph.appendChild(downloadLink);

      documentLinksContainer.appendChild(paragraph);

    });


    notesContainer.appendChild(
      documentLinksContainer
    );

  }


  /*
   * Add notes to the step.
   */

  stepContent.appendChild(notesContainer);


  /*
   * ----------------------------------------------------------
   * COPY BLOCK
   * ----------------------------------------------------------
   */

  if (Object.prototype.hasOwnProperty.call(copyText, step)) {

    const copyBlock = document.createElement('div');

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


    /*
     * Copy button.
     */

    copyButton.addEventListener('click', async () => {

      try {

        await navigator.clipboard.writeText(
          copyText[step]
        );

        copyButton.textContent = 'Copied';

      } catch (error) {

        /*
         * Fallback for browsers where clipboard API
         * is unavailable.
         */

        copyContent.focus();

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


    stepContent.appendChild(copyBlock);

  }


  /*
   * ----------------------------------------------------------
   * SCREENSHOT
   * ----------------------------------------------------------
   *
   * Steps 1-23 have screenshots.
   * Step 24 is the end of the lab.
   * ----------------------------------------------------------
   */

  let visualElement;


  if (step === titles.length) {

    /*
     * Final step has no screenshot.
     */

    visualElement = document.createElement('div');

    visualElement.className = 'empty-slide';

    visualElement.setAttribute(
      'aria-label',
      'End of lab'
    );

  } else {

    /*
     * Create screenshot image.
     */

    visualElement = document.createElement('img');

    visualElement.className = 'slide-shot';


    /*
     * Convert:
     *
     * 1  -> 01
     * 2  -> 02
     * 9  -> 09
     * 10 -> 10
     *
     * This was the main syntax problem in the original script.
     */

    const slideNumber = String(step).padStart(2, '0');


    /*
     * Expected:
     *
     * ./assets/slides/01.png
     * ./assets/slides/02.png
     * ...
     * ./assets/slides/23.png
     */

    visualElement.src =
      `${slidesPath}${slideNumber}.png`;


    visualElement.alt =
      `Step ${step}: ${title}`;


    visualElement.loading = 'lazy';


    /*
     * If an image cannot be found, show a useful message
     * instead of silently displaying a broken image.
     */

    visualElement.addEventListener('error', () => {

      const errorElement =
        document.createElement('div');

      errorElement.className = 'image-error';

      errorElement.textContent =
        `Screenshot unavailable: ${slidesPath}${slideNumber}.png`;


      visualElement.replaceWith(
        errorElement
      );

    });

  }


  /*
   * ----------------------------------------------------------
   * ASSEMBLE STEP
   * ----------------------------------------------------------
   */

  section.appendChild(numberElement);

  section.appendChild(stepContent);

  section.appendChild(visualElement);


  /*
   * Add completed step to page.
   */

  contentsContainer.appendChild(section);

}


/*
 * ============================================================
 * OPTIONAL IMAGE DEBUGGING
 * ============================================================
 *
 * Open the browser console to see which screenshot is being
 * loaded if something is missing.
 * ============================================================
 */

console.info(
  `Loaded ${titles.length} lab steps.`
);

console.info(
  `Screenshot directory: ${slidesPath}`
);

console.info(
  `Document directory: ${documentsPath}`
);
```
