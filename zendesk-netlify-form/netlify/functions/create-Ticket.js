exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  const zendeskData = {
    ticket: {
      subject: data.subject,
      comment: {
        body: data.description
      },
      requester: {
        name: data.name,
        email: data.email
      },
      custom_fields: [
        { id: 43717209260305, value: data.IssueType },
        { id: 43927795988881, value: data.product }
      ],
      tags: ["website_form"]
    }
  };

  const response = await fetch("https://d3v-astonous-28503.zendesk.com/api/v2/tickets.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic " + process.env.ZENDESK_AUTH
    },
    body: JSON.stringify(zendeskData)
  });

  if (response.ok) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Ticket created" })
    };
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error creating ticket" })
    };
  }
};
