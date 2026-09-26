import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_HOSTS = ['archive.org', 'ia800404.us.archive.org', 'ia600404.us.archive.org'];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  try {
    const parsed = new URL(targetUrl);
    const isAllowed = ALLOWED_HOSTS.some(
      (h) => parsed.hostname === h || parsed.hostname.endsWith('.archive.org')
    );

    if (!isAllowed) {
      return NextResponse.json({ error: 'Host not allowed' }, { status: 403 });
    }

    const remoteRes = await fetch(targetUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!remoteRes.ok || !remoteRes.body) {
      return NextResponse.json(
        { error: `Remote returned ${remoteRes.status}` },
        { status: remoteRes.status }
      );
    }

    const contentType =
      remoteRes.headers.get('content-type') || 'application/octet-stream';
    const contentLength = remoteRes.headers.get('content-length');

    const headers = new Headers();
    headers.set('Content-Type', contentType);
    if (contentLength) {
      headers.set('Content-Length', contentLength);
    }
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Cache-Control', 'public, max-age=86400');

    return new Response(remoteRes.body, {
      status: 200,
      headers,
    });
  } catch (err) {
    console.error('Error proxying Cambridge asset:', err);
    return NextResponse.json(
      { error: 'Failed to stream remote asset' },
      { status: 500 }
    );
  }
}
