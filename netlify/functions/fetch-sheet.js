// netlify/functions/fetch-sheet.js

exports.handler = async (event, context) => {
  const url = process.env.GOOGLE_SHEET_URL;

  if (!url) {
    return {
      statusCode: 500,
      body: "GOOGLE_SHEET_URL is not set in environment variables."
    };
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return {
        statusCode: res.status,
        body: `Failed to fetch sheet: HTTP ${res.status}`
      };
    }

    const text = await res.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store"
      },
      body: text
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: "Error fetching sheet: " + err.message
    };
  }
};
