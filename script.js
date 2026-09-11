const notes = [
  'Sign in with the username and password assigned to you. Your home page may look slightly different.',
  'Navigate to Tools > AI Agent Studio.',
  'In this lab, you will build an AI agent that creates new purchase orders.\n\nThe agent uses Business Object tools to securely search Fusion data en create/update Fusion data.',
  'The required tool already exists. Navigate to Resources > Tools.',
  'Search for the [RS001 Create Purchase Order], [RS001 Get Purchase Order] and [RS001 Get Supplier] tool.', 
  'Open the tool by clicking its Edit icon. It can search suppliers by name, search purchase order by order number and create new purchase orders.\n\nBusiness Object tools securely retrieve data and control the fields and actions available to the agent. Creating these tools usually requires a more technical role.\n\nClick Home.',
  'Now create the agent. Navigate to Resources > Agents.',
  'Click Add.',
  'Enter the following agent details.',
  'Add the tool. Search for [RS001 Create Purchase Order], [RS001 Get Purchase Order], [RS001 Get Supplier] and [MultiFileProcessor].\n\nThe MultiFileProcessor tool is needed for the agent to be able to understand document uploads.',
  'Hover over the tool and click Add to Agent.',
  'The tool is now part of the agent. Select the agent to add the prompt and other settings.',
  'Select Prompts.',
  'This prompt includes the required tool calls, selection logic, and guardrails. Paste it into the Prompt field.',
  'Set Summarization mode to Custom. Add the following text below the [answer requirements] section: Return the response in HTML, add light colours since the background is dark and add html tag icons to the response text.',
  'Click Save and Close.',
  'The agent is ready. Next, create a workflow to test it. Copy your agent code, then select AI Agent Studio.',
  'Use Ask Oracle to generate the workflow. First switch the scope from Applications to Workflows: remove Applications by clicking its x.',
  'Select Workflows.',
  '',
  'Enter the following in Ask Oracle.\n\nThe screenshot uses RS001_PURCHASE_ORDER_CREATION as an example. In the text you copy below, replace YOUR_AGENT_CODE with the code of the agent you created.',
  'Click Yes for each approval request until the workflow is created.',
  'Click Debug, enter the following question and upload one of the sample attachments to create a new PO.',
  ''
];

const titles = [
  'Sign in', 'Open AI Agent Studio', 'Lab overview', 'Review available tools', 'Find the relevant tools', 'Review tool details', 'Open Agents', 'Start a new agent', 'Enter agent details', 'Find the relevant tool', 'Add the tool to the agent', 'Configure the agent', 'Open Prompts', 'Add the agent prompt', 'Add the summarization prompt', 'Save the agent', 'Prepare the workflow', 'Switch to Workflows', 'Select Workflows', 'Ready to create the workflow', 'Request workflow generation', 'Approve workflow creation', 'Debug the agent','End of Lab'
];

const purchaseOrderPrompt = `## Role
You are a precise, Oracle Fusion purchase order agent operating under a supervisor.

## Tools
Use only:
* \`MultiFileProcessor\`
* \`RS001 Create Purchase Order\`
* \`RS001 Get Purchase Order\`
* \`RS001 Get Supplier\`

## Default Data Handler
Read the input. If an attachment is provided, use \`MultiFileProcessor\` to understand and extract the data.

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
   * Inform the user that no matching supplier was found and therefore the purchase order cannot be created.
   * Stop processing.
   * Do not use any other tools.
   * Return the message.

5. Use \`RS001 Get Purchase Order\` to check whether a purchase order already exists for the extracted OrderNumber.

6. Process the results according to the rules below.

### Exactly One Match
If a supplier is found and one purchase order is returned:
* Tell the user that a purchase order is found.
* Use the following URL https://fa-erzv-dev4-saasfademo1.ds-fa.oraclepdemos.com/fscmUI/redwood/purchase-orders/manage/edit?poHeaderId={poHeaderId}&intent=Buyer to generate a deeplink to this purchase order.
* Do not use any other tools, return the message.

### No Matches
If no purchase orders are found:
* Extract the values from the user input (use the tool \`MultiFileProcessor\` in case of a delivered attachment): OrderNumber, Buyer, Supplier, Currency (Always in valuta code like USD, EUR etc.), SupplierSite, LineNumbers, lineDescriptions, LineQuantitys, Prices, ScheduleNumber, ScheduleQuantity, PromisedDeliveryDate, ShipToLocation, ShipToOrganization.
* If not all values all filled, stop the agent and mention which values you miss in the provided data. Otherwise proceed.
* Format the data in the below sample payload, since records in array can occur: 
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
					"ScheduleNumber":{ScheduleNumber},
					"Quantity":{ScheduleQuantity},
					"PromisedDeliveryDate": "{PromisedDeliveryDate}",
					"ShipToLocation":"{ShipToLocation}",
					"ShipToOrganization":"{ShipToOrganization}",
					}
				]
			}
		]
	}

* Use this data to create the purchase order using the tool \`RS001 Create Purchase Order\`.
* Use the following URL https://fa-erzv-dev4-saasfademo1.ds-fa.oraclepdemos.com/fscmUI/redwood/purchase-orders/manage/edit?poHeaderId={poHeaderId}&intent=Buyer to generate a deeplink to this purchase order.
* Do not use any other tools, return the message.

## Guardrails
**Never invent, infer, modify, or alter supplier data.**
**Never invent a SupplierId.**
**Never use a SupplierId that was not returned by the configured search tool.**
**Never call a tool other than the two configured tools.**
**Never create, update, delete, or modify supplier data.**
**Preserve returned values exactly.
**Currency Code and Currency always in valuta code like USD, EUR etc.

## Output Behavior
* Single match: return the full supplier-details result.
* Multiple matches: return all search matches, then ask the user to select one.
* No matches: state that no matching suppliers were found.
* Be concise and professional.`;

const copyText = {
  9: 'Agent Name: [Your initials][number] Purchase Order Handler Agent\nFamily: Common\nModule: Other\nDescription: An agent that can query on supplier and purchase order data. And can new create purchase orders.',
  14: purchaseOrderPrompt,
  21: 'Create a workflow using the agent YOUR_AGENT_CODE. The workflow should pass the user input to the agent, allowing the creation of purchase orders. Enable the file upload option.',
  23: 'Create a new purchase order based on the attached file.',
};

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

const escapeHtml = (text) =>
  text.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[char]);

const steps = document.getElementById('steps');
const contents = document.getElementById('contents');

for (let slide = 1; slide <= titles.length; slide += 1) {
  const section = document.createElement('section');

  section.className = 'lab-step';
  section.id = `slide-${slide}`;

  const noteHtml = notes[slide - 1]
    ? notes[slide - 1]
        .split('\n\n')
        .map(
          (paragraph) =>
            `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`
        )
        .join('')
    : '';

  let visual;

  if (slide === titles.length) {
    visual = '<div class="empty-slide" aria-label="Blank final step"></div>';
  } else {
    visual = `
      <img
        class="slide-shot"
        src="assets/slides/${String(slide).padStart(2, '0')}.png"
        alt="Step ${slide}: ${escapeHtml(titles[slide - 1])}"
      >
    `;
  }

  const copy = copyText[slide]
    ? `
      <div class="copy-block">
        <div class="copy-head">
          <span>Text to enter</span>
          <button type="button" data-copy="${slide}">Copy</button>
        </div>
        <pre>${escapeHtml(copyText[slide])}</pre>
      </div>
    `
    : '';

  const resource = slide === 23
    ? `
      <div class="document-links">
        <p><strong>Download a sample purchase order:</strong></p>

        ${downloadableDocuments
          .map(
            (doc) => `
              <p>
                <a
                  href="assets/documents/${encodeURIComponent(doc.file)}"
                  target="_blank"
                  rel="noopener"
                >
                  ${escapeHtml(doc.label)}
                </a>
              </p>
            `
          )
          .join('')}
      </div>
    `
    : '';

  section.innerHTML = `
    <div class="number">Step ${slide}</div>

    <div class="step-content">
      <h2>${escapeHtml(titles[slide - 1])}</h2>

      <div class="notes">
        ${noteHtml}
        ${resource}
      </div>

      ${copy}

      ${visual}
    </div>
  `;

  steps.append(section);

  const link = document.createElement('a');

  link.href = `#slide-${slide}`;
  link.textContent = slide;
  link.setAttribute(
    'aria-label',
    `Go to step ${slide}: ${titles[slide - 1]}`
  );

  contents.append(link);
}

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const text = copyText[button.dataset.copy];

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