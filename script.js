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
      "Quantity": {LineQuantity},
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
 * DOWNLOADABLE DOCUMENTS
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
 * HTML ESCAPING
 * ============================================================
 */

const escapeHtml = (text) =>
  text.replace(
    /[&<>"']/g,
    (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[char]
  );


/*
 * ============================================================
 * PAGE CONTAINERS
 * ============================================================
 *
 * IMPORTANT:
 *
 * This follows your known-working script:
 *
 * steps    = actual lab sections
 * contents = numbered navigation
 */

const steps = document.getElementById('steps');
const contents = document.getElementById('contents');

if (!steps || !contents) {
  throw new Error(
    'Missing required HTML elements with id="steps" or id="contents".'
  );
}


/*
 * ============================================================
 * CREATE LAB STEPS
 * ============================================================
 */

for (let slide = 1; slide <= titles.length; slide += 1) {

  /*
   * Create the section.
   */

  const section = document.createElement('section');

  section.className = 'lab-step';

  section.id = `slide-${slide}`;


  /*
   * Create note HTML.
   */

  const noteHtml = notes[slide - 1]
    ? notes[slide - 1]
        .split('\n\n')
        .map(
          (paragraph) =>
            `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`
        )
        .join('')
    : '';


  /*
   * ==========================================================
   * SCREENSHOT
   * ==========================================================
   *
   * Steps 1-23 have screenshots.
   * Step 24 is the blank final step.
   */

  let visual;


  if (slide === titles.length) {

    visual =
      '<div class="empty-slide" aria-label="End of lab"></div>';

  } else {

    const imageNumber =
      String(slide).padStart(2, '0');


    visual =
      `<img
        class="slide-shot"
        src="assets/slides/${imageNumber}.png"
        alt="Step ${slide}: ${escapeHtml(titles[slide - 1])}"
        loading="lazy"
      >`;

  }


  /*
   * ==========================================================
   * COPY BLOCK
   * ==========================================================
   */

  const copy = copyText[slide]
    ? `
      <div class="copy-block">

        <div class="copy-head">

          <span>Text to enter</span>

          <button
            type="button"
            data-copy="${slide}"
          >
            Copy
          </button>

        </div>

        <pre>${escapeHtml(copyText[slide])}</pre>

      </div>
    `
    : '';


  /*
   * ==========================================================
   * SAMPLE DOCUMENT DOWNLOADS
   * ==========================================================
   *
   * Only displayed on step 23.
   */

  let resource = '';


  if (slide === 23) {

    resource = `
      <div class="document-links">

        <p><strong>Sample documents:</strong></p>

        ${downloadableDocuments
          .map(
            (doc) => `
              <p class="document-link">
                <a
                  href="assets/documents/${encodeURIComponent(doc.file)}"
                  download="${escapeHtml(doc.file)}"
                >
                  ${escapeHtml(doc.label)}
                </a>
              </p>
            `
          )
          .join('')}

      </div>
    `;

  }


  /*
   * ==========================================================
   * BUILD THE COMPLETE SECTION
   * ==========================================================
   */

  section.innerHTML = `
    <div class="number">
      Step ${slide}
    </div>

    <div class="step-content">

      <h2>
        ${escapeHtml(titles[slide - 1])}
      </h2>

      <div class="notes">

        ${noteHtml}

        ${resource}

      </div>

      ${copy}

      ${visual}

    </div>
  `;


  /*
   * Add the actual lab section to #steps.
   */

  steps.append(section);


  /*
   * ==========================================================
   * CREATE NAVIGATION LINK
   * ==========================================================
   */

  const link = document.createElement('a');

  link.href = `#slide-${slide}`;

  link.textContent = slide;

  link.setAttribute(
    'aria-label',
    `Go to step ${slide}: ${titles[slide - 1]}`
  );


  /*
   * Add navigation link to #contents.
   */

  contents.append(link);

}


/*
 * ============================================================
 * COPY BUTTONS
 * ============================================================
 */

document.querySelectorAll('[data-copy]').forEach((button) => {

  button.addEventListener('click', async () => {

    const text =
      copyText[button.dataset.copy];


    try {

      await navigator.clipboard.writeText(text);

      button.textContent = 'Copied';

    } catch {

      button.textContent = 'Select text';

    }


    window.setTimeout(() => {

      button.textContent = 'Copy';

    }, 1600);

  });

});
```
