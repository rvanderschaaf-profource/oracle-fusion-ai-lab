const notes = [
  'Sign in with the username and password assigned to you. Your home page may look slightly different.',
  'Navigate to Tools > AI Agent Studio.',
  'In this lab, you will build an AI agent that creates new suppliers.\n\nThe agent uses Business Object tools to securely search Fusion data en create/update Fusion data.',
  'The required business objects and tools already exists. Navigate to Resources > Business Object.',
  'Search for the [RVS_SUPPLIERS] Business Object.\n\nDo not change the object, you can use them for review (by clicking on the pencil) but you need to create your own Object.', 
  'Go back to Business Objects > Click on Add > Fill in the details:',
  'Click on Add from Specification > Select \'/suppliers\' > getall_suppliers:',
  'Create another function that is able to create the supplier.\n\nOracle Suppliers API Documentation: https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-post.html\n\nThe steps are similair to the previous step.\n\nWe will  provide you a sample payload which you need for the configuration, but feel free to use your own payload to add additional fields like the address details for example:',
  'Navigate to Resources > Tools > Add > Fill in the following details:',
  'Now create the agent. Navigate to Resources > Agents.',
  'Click Add.',
  'Enter the following agent details.',
  'Add the tool. Search for [YOUR_TOOL_CODE] and [MultiFileProcessor].\n\nThe MultiFileProcessor tool is a seeded tool and needed for the agent to be able to understand document uploads.',
  'Hover over the tool and click Add to Agent.',
  'The tool is now part of the agent. Select the agent to add the prompt and other settings.',
  'Select Prompts.',
  'This prompt includes the required tool calls, selection logic, and guardrails. Paste it into the Prompt field.',
  'Go to LLM > Make sure to select the basic [OSS} LLM.\n\nGo back to Prompts > Set Summarization mode to Custom. Add the following text below the [answer requirements] section.',
  'Click Create & Close.',
  'The agent is ready. Next, create a workflow to test it. Copy your agent code, then select AI Agent Studio.',
  'Use Ask Oracle to generate the workflow. First switch the scope from Applications to Workflows: remove Applications by clicking its x.',
  'Select Workflows.',
  'Enter the following in Ask Oracle.\n\nThe screenshot uses [RS001_SUPPLIER_HANDLER_AGENT] as an example. In the text you copy below, replace YOUR_AGENT_CODE with the code of the agent you created.',
  'Click Yes for each approval request until the workflow is created.\n\nThe file-upload can be manually enabled by going to the settings > chat experience > enable file upload.',
  'Click Debug, enter the following question and upload one of the sample attachments to create a new supplier.',
  '',
];

const titles = [
  'Sign in', 'Open AI Agent Studio', 'Lab overview', 'Review available business objects', 'Find the relevant business objects', 'Create new business object', 'Create new function within business object (1/2)', 'Create new function within business object (2/2)', 'Create new tool', 'Open Agents', 'Start a new agent', 'Enter agent details', 'Find the relevant tool', 'Add the tool to the agent', 'Configure the agent', 'Open Prompts', 'Add the agent prompt', 'Add the summarization prompt', 'Save the agent', 'Prepare the workflow', 'Switch to Workflows', 'Select Workflows', 'Request workflow generation','Approve workflow creation','Debug the agent','End of Lab'
];

const supplierPrompt = `Analyze {{$context.$system.$inputMessage}} and identify the supplier name. Store the result in: [supplierName]. In case of a delivered attachment, use the tool [MultiFileProcessor] to read and understand the attachment.

Use [supplierName] to check if the supplier already exists. You can use the function [YOUR_FUNCTION_CODE] from the tool [YOUR_TOOL_CODE] for this.

If supplier already exists, then stop the agent and do not use any tools. Return with a deeplink to the supplier: Make a clickable deeplink to the supplier page. Link to use: https://fa-esdr-dev3-saasfademo1.ds-fa.oraclepdemos.com/fscmUI/redwood/suppliers/manage-profile?supplierId=[SupplierId] -- This last SupplierId must be filled based on the response of the [FOUR_FUNCTION_CODE] tool function.

If supplier does not exists, then use the function [YOUR_FUNCTION_CODE] from the tool [YOUR_TOOL_CODE] to create this new supplier.Return with a deeplink to the supplier: Make a clickable deeplink to the supplier page. Link to use: https://fa-esdr-dev3-saasfademo1.ds-fa.oraclepdemos.com/fscmUI/redwood/suppliers/manage-profile?supplierId=[SupplierId] -- This last SupplierId must be filled based on the response of the [FOUR_FUNCTION_CODE] tool function.

The deeplink must be rendered as an HTML anchor element with target="_blank" so that the browser opens the supplier page in a new tab`;

const copyText = {
  6: 'Business Object Name: [Your initials][number] Supplier Object\nFamily: Common\nModule: Other\nDescription: A business object that searches for supplier data and creates new suppliers\nResource Type: Monolith resource\nResource Path: /fscmRestApi/resources/11.13.18.05/suppliers',
  7: 'Function Name: [Your initials][number]_get_supplier\nDescription: A function to retrieve supplier data.\nOperation Type: Get\nUse Native Authentication: Yes\nResource Path: ?q=Supplier LIKE \'%{supplierName}%\' or LIKE \'{supplierName}%\' or LIKE \'%{supplierName}\'\nHeader: REST-Framework-Version=1\n\n\nMake sure to fill in the rest of the required fields, you can use AI (generate) to fill these records.',
  8:'{\n\"Supplier\" : \"{supplierName}\",\n\"TaxOrganizationType\" : \"Corporation\",\n\"SupplierType\" : \"Services\",\n\"BusinessRelationship\" : \"Prospective\"\n}',
  9:'Tool Type: Business Object\nTool Name: [Your initials][number]_Suppliers\nFamily: Common\nModule: Other\nDescription: A tool to retrieve and create supplier data.\nRequire Human Approval: Off\nBusiness Object: [YOUR_BO_CODE]\n\nSelect both functions.',
  12:'Agent Name: [Your initials][number] Supplier Handler Agent\nFamily: Common\nModule: Other\nDescription: An agent that can query on supplier data and can create new suppliers.',
  17: supplierPrompt,
  18: 'Return the response in HTML, add light colours since the background is dark and add html tag icons to the response text.',
  23: 'Create a workflow agent based on the just created agent YOUR_AGENT_CODE. The workflow should pass the user input to the agent. It is a reusable agent, allowing the creation of suppliers. Enable the file upload option in the settings menu of the workflow agent, setup is in chat experience.',
  25: 'Create a new supplier based on the attached file.',
};

const downloadableDocuments = [
  {
    file: 'SampleSupplier1.pdf',
    label: 'Supplier - Already Exists'
  },
  {
    file: 'SampleSupplier2.pdf',
    label: 'Supplier - Create sample 1'
  },
  {
    file: 'SampleSupplier3.pdf',
    label: 'Supplier - Create sample 2'
  },
  {
    file: 'SampleSupplier4.pdf',
    label: 'Supplier - Create sample 3'
  },
  {
    file: 'SampleSupplier5.pdf',
    label: 'Supplier - Create sample 4'
  },
  {
    file: 'SampleSupplier6.pdf',
    label: 'Supplier - Create sample 5'
  },
  {
    file: 'SampleSupplier7.pdf',
    label: 'Supplier - Create sample 6'
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

 const resource = slide === 25
  ? `
    <div class="document-link">
      <p><strong>Download a sample supplier creation request:</strong></p>

      ${downloadableDocuments
        .map(
          (doc) => `
            <a
              href="assets/documents/${encodeURIComponent(doc.file)}"
              target="_blank"
              rel="noopener"
              style="
                display: block;
                width: 320px;
                margin-bottom: 10px;
                padding: 10px 14px;
                color: #fff;
                background: #005e68;
                border-radius: 4px;
                font-size: 0.9rem;
                font-weight: 750;
                text-decoration: none;
              "
            >
              ${escapeHtml(doc.label)}
            </a>
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
