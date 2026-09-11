const notes = [
  `Sign in to your Oracle Fusion Cloud environment and open AI Agent Studio.`,
  `Open the AI Agent Studio landing page.`,
  `Navigate to the Agents section.`,
  `Open the list of available agents.`,
  `Create a new agent.`,
  `Review the available agent configuration options.`,
  `Configure the agent instructions and behaviour.`,
  `Define the agent name and description.`,
  `Enter the following agent name and description.`,
  `Review the agent configuration.`,
  `Configure the agent instructions.`,
  `Review the available tools and actions.`,
  `Add the required tools to the agent.`,
  `Enter the following instructions for the Purchase Order Handler.`,
  `Review the agent instructions.`,
  `Configure the agent's actions.`,
  `Review the available actions and tools.`,
  `Save the agent configuration.`,
  `Open the workflow configuration.`,
  `Configure the workflow.`,
  `Enter the following workflow instructions.`,
  `Review the completed workflow.`,
  `Test the Purchase Order Handler using one of the sample purchase orders below.`,
  `End of lab.`
];

const titles = [
  'Sign in',
  'Open AI Agent Studio',
  'Open Agents',
  'View agents',
  'Create an agent',
  'Agent configuration',
  'Configure agent',
  'Agent instructions',
  'Agent name and description',
  'Review configuration',
  'Agent instructions',
  'Agent tools',
  'Add tools',
  'Purchase Order Handler instructions',
  'Review instructions',
  'Agent actions',
  'Available actions',
  'Save agent',
  'Workflow configuration',
  'Configure workflow',
  'Workflow instructions',
  'Review workflow',
  'Test the Purchase Order Handler',
  'End of lab'
];

const purchaseOrderPrompt = `You are a Purchase Order Handler.

Your task is to process a purchase order document and create a purchase order in Oracle Fusion Cloud Procurement.

Follow these rules:

1. Extract the supplier, business unit, procurement BU, currency, buyer, description, item, quantity, price and requested delivery date from the document.

2. If the supplier cannot be identified, ask the user to provide the supplier.

3. Before creating the purchase order, check whether a purchase order already exists for the same supplier and document.

4. If a matching purchase order already exists, inform the user and do not create a duplicate.

5. If no matching purchase order exists, create the purchase order.

6. Use the following values when creating the purchase order:

Supplier: {Supplier}
BusinessUnit: {BusinessUnit}
ProcurementBU: {ProcurementBU}
Currency: {Currency}
Buyer: {Buyer}
Description: {Description}
Item: {Item}
Quantity: {LineQuantity}
Price: {Price}
ScheduleNumber: {ScheduleNumber}
ScheduleQuantity: {ScheduleQuantity}
PromisedDeliveryDate: "{PromisedDeliveryDate}"
Product: {Product}
Module: Other

7. After creation, return the purchase order number to the user.

8. Do not create a purchase order if required information is missing. Instead, ask the user for the missing information.`;

const copyText = {
  9: `Agent Name: Purchase Order Handler
Description: Handles purchase order documents and creates purchase orders in Oracle Fusion Cloud Procurement.`,

  14: purchaseOrderPrompt,

  21: `Create a workflow using the agent YOUR_AGENT_CODE.

The workflow should accept a purchase order document as input and pass the document to the Purchase Order Handler agent.

The workflow should return the result from the agent to the user.`,

  23: `Create a new purchase order based on the attached file.`
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
