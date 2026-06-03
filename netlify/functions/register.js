exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: cors() };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { SUPABASE_URL, SUPABASE_SERVICE_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return { statusCode: 500, headers: cors(), body: JSON.stringify({ error: 'Server chưa cấu hình database' }) };
  }

  try {
    const data = JSON.parse(event.body);

    const res = await fetch(`${SUPABASE_URL}/rest/v1/registrations`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        hoten:            data.hoten            || '',
        sdt:              data.sdt              || '',
        email:            data.email            || '',
        congty:           data.congty           || '',
        chucvu:           data.chucvu           || '',
        ghichu:           data.ghichu           || '',
        da_chuyen_khoan:  data.dachuyenkhoan    || 'Chưa chuyển khoản'
      })
    });

    if (!res.ok) throw new Error(await res.text());

    return { statusCode: 200, headers: cors(), body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error('register error:', err);
    return { statusCode: 500, headers: cors(), body: JSON.stringify({ error: err.message }) };
  }
};

function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };
}
