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
          "Quantity": {ScheduleQuantity},
          "PromisedDeliveryDate": "{PromisedDeliveryDate}",
          "ShipToLocation": "{ShipToLocation}",
          "ShipToOrganization": "{ShipToOrganization}"
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

const copyText = {
  9: `Agent Name: [Your initials][number] Purchase Order Handler Agent
Family: Common
Module: Other
Description: An agent that can query supplier and purchase order data and create new purchase orders.`,

  14: purchaseOrderPrompt,

  21: `Create a workflow using the agent YOUR_AGENT_CODE. The workflow should pass the user input to the agent, allowing the creation of purchase orders. Enable the file upload option.`,

  23: `Create a new purchase order based on the attached file.`
};

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

const escapeHtml = (text) =>
  String(text).replace(/[&<>"']/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };

    return entities[character];
  });

const steps = document.getElementById('steps');
const contents = document.getElementById('contents');

if (!steps || !contents) {
  throw new Error(
    'The page must contain elements with id="steps" and id="contents".'
  );
}

for (let step = 1; step <= titles.length; step += 1) {
  const title = titles[step - 1];
  const note = notes[step - 1] || '';

  const section = document.createElement('section');
  section.className = 'lab-step';
  section.id = `step-${step}`;

  const noteHtml = note
    .split('\n\n')
    .filter((paragraph) => paragraph.trim() !== '')
    .map(
      (paragraph) =>
        `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`
    )
    .join('');

  const copyHtml = copyText[step]
    ? `
      <div class="copy-block">
        <div class="copy-head">
          <span>Text to enter</span>
          <button type="button" data-copy="${step}">Copy</button>
        </div>
        <pre>${escapeHtml(copyText[step])}</pre>
      </div>
    `
    : '';

  const documentLinksHtml =
    step === 23
      ? `
        <div class="document-links">
          <p><strong>Sample documents:</strong></p>

          ${downloadableDocuments
            .map(
              (document) => `
                <p class="document-link">
                  ${document.file}
                    ${escapeHtml(document.label)}
                  </a>
                </p>
              `
            )
            .join('')}
        </div>
      `
      : '';

  const visualHtml =
    step === titles.length
      ? '<div class="empty-slide" aria-label="End of lab"></div>'
      : `
        padStart(2, '0')}.png"
          alt="Step ${step}: ${escapeHtml(title)}"
          loading="lazy"
        >
      `;

  section.innerHTML = `
    <div class="number">Step ${step}</div>

    <div class="step-content">
      <h2>${escapeHtml(title)}</h2>

      <div class="notes">
        ${noteHtml}
        ${documentLinksHtml}
      </div>

      ${copyHtml}
      ${visualHtml}
    </div>
  `;

  steps.append(section);

  const navigationLink = document.createElement('a');
  navigationLink.href = `#step-${step}`;
  navigationLink.textContent = step;
  navigationLink.setAttribute(
    'aria-label',
    `Go to step ${step}: ${title}`
  );

  contents.append(navigationLink);
}

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const step = Number(button.dataset.copy);
    const text = copyText[step];

    if (!text) {
      return;
    }

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
